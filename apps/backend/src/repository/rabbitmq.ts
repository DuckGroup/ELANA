import amqp, { type Channel } from "amqplib";

let channel: Channel | null = null;
const exchange_value = process.env.ECOMMERCE_EXCHANGE!;
const queue_url = process.env.RABBITMQ_URL!;
const queue = process.env.RABBITMQ_QUEUE!;
const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

export async function connectRabbitMQ(retries = 0) {
  try {
    const connection = await amqp.connect(queue_url);
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log("RabbitMQ connected");

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err);
      setTimeout(() => connectRabbitMQ(), RETRY_DELAY);
    });

    connection.on("close", () => {
      console.log("RabbitMQ connection closed, attempting to reconnect...");
      setTimeout(() => connectRabbitMQ(), RETRY_DELAY);
    });
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    if (retries < MAX_RETRIES) {
      console.log(`Retrying connection (${retries + 1}/${MAX_RETRIES})...`);
      setTimeout(() => connectRabbitMQ(retries + 1), RETRY_DELAY);
    } else {
      console.error("Max retries reached. Exiting...");
      process.exit(1);
    }
  }
}

export async function publishToQueue(message: unknown) {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}

import amqp from "amqplib";

let channel: amqp.Channel | null = null;
const QUEUE_NAME = process.env.RABBITMQ_QUEUE || "product_events";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "");
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
};

export const publishToQueue = async (message: { event: string; data: any }) => {
  try {
    if (!channel) {
      throw new Error("RabbitMQ channel not initialized");
    }
    const success = channel.sendToQueue(
      QUEUE_NAME,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    console.log("Message sent to queue:", message);
    return success;
  } catch (error) {
    console.error("Error publishing to queue:", error);
    throw error;
  }
};

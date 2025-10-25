import amqp from "amqplib";
import { createBasketService } from "../services/basketService";

let channel: amqp.Channel | null = null;
const QUEUE_NAME = process.env.RABBITMQ_QUEUE || "product_events";

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL || "");
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  connection.on("connect", () => console.log("Connected to RabbitMQ"));
  connection.on("disconnect", (err) =>
    console.error("Disconnected from RabbitMQ:", err)
  );
  await startBasketConsumer()
};

const startBasketConsumer = async () => {
  if (!channel) {
    throw new Error("Channel is not initialized");
  }

  await channel.consume(
    QUEUE_NAME,
    async (payload) => {
      if (!payload) return;

      try {
        const message = JSON.parse(payload.content.toString());
        console.log("Received message:", message.event);

        switch (message.event) {
          case "create.basket":
            await createBasketService(message.data);
            console.log("Basket created successfully");
            break;

          default:
            console.warn(`Unknown event type: ${message.event}`);
            break;
        }

        channel?.ack(payload);
        
      } catch (error: unknown) {
        if(error instanceof Error) {
          console.error("❌ Error processing message:", error.message);
          channel?.nack(payload, false, false);
        }
      }
    },
    { noAck: false }
  );
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

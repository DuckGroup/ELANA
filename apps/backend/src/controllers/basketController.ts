import type { Request, Response } from "express";
import { publishToQueue } from "../repository/rabbitmq";
import { createBasketService } from "../services/basketService";
import amqp from "amqplib";

let channel: amqp.Channel | null = null;
const QUEUE_NAME = "basket_queue";

export const connectBasketController = async (req: Request, res: Response) => {
  try {

    publishToQueue({ event: "create.basket", data: "68f22931add31f77edfa067d" });
    res.json();

    return 
  } catch (error) {
    console.error("Basket queue connection error:", error);
    return
  }
};

import type { Request, Response } from "express";
import amqp from "amqplib";
import { publishToQueue } from "../queues/connection";
import { getBasketByUserIdService } from "../services/basketService";

let channel: amqp.Channel | null = null;
const QUEUE_NAME = "basket_queue";

export const createBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.body;
    const basket = publishToQueue({
      event: "create.basket",
      data: user_id,
    });

    res.status(200).json({
      success: true,
      message: "Basket created successfully",
    });
    return;
  } catch (error) {
    console.error("Basket queue connection error:", error);
    return;
  }
};

export const getBasketByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user_id = id;

    if (!user_id || user_id.trim() === "") {
      res.status(400).json({
        success: false,
        message: "Failed to fetch, Missing params",
      });
      return;
    }

    const basket = await getBasketByUserIdService(user_id);

    if (!basket) {
      res.status(404).json({
        success: false,
        message: "Basket not found for this user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: basket,
      message: "Basket fetched successfully",
    });
    return;
  } catch (error) {
    console.error("Basket fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch basket",
    });
    return;
  }
};

import type { Request, Response } from "express";
import amqp from "amqplib";
import { publishToQueue } from "../queues/connection";
import { getBasketByUserIdService } from "../services/basketService";
import type { BasketMessage } from "../queues/types/basketQueue";

let channel: amqp.Channel | null = null;
const QUEUE_NAME = "basket_queue";

export const createBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== "string") {
      res.status(400).json({
        success: false,
        message: "user_id is required",
      });
      return;
    }

    await publishToQueue({
      event: "create.basket",
      data: { user_id },
    });

    res.status(200).json({
      success: true,
      message: "Basket creation queued successfully",
    });
    return;
  } catch (error) {
    console.error("Basket queue connection error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to queue basket creation",
    });
    return;
  }
};

export const deleteBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const basket_id = req.params.id;

    if (!basket_id || !/^[0-9a-fA-F]{24}$/.test(basket_id)) {
      res.status(400).json({
        success: false,
        message: "Invalid basket ID format",
      });
      return;
    }

    await publishToQueue({
      event: "delete.basket",
      data: { basket_id },
    });

    res.status(200).json({
      success: true,
      message: "Basket deletion queued successfully",
    });
    return;
  } catch (error) {
    console.error("Basket queue connection error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to queue basket deletion",
    });
    return;
  }
};
export const addProductToBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const basket = publishToQueue({
      event: "add.product.basket",
      data: data,
    });

    res.status(200).json({
      success: true,
      data: basket,
      message: "Added product successfully to basket",
    });
    return;
  } catch (error) {
    console.error("Basket queue connection error:", error);
    return;
  }
};
export const removeProductToBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const basket = publishToQueue({
      event: "remove.product.basket",
      data: data,
    });

    res.status(200).json({
      success: true,
      data: basket,
      message: "Removed product successfully from basket",
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
    const user_id = req.params.id;
    console.log(user_id);

    if (!user_id) {
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

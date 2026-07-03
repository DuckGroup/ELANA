import type { Request, Response } from "express";
import { ZodError } from "zod";
import {
  createOrderService,
  getOrderStatsService,
  getOrdersService,
} from "../services/orderService";
import { createOrderSchema } from "../validators/order";

export const getOrderStats = async (req: Request, res: Response) => {
  try {
    const stats = await getOrderStatsService();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrdersService();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { basket_id } = createOrderSchema.parse(req.body);
    const order = await createOrderService(basket_id);
    res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: error.issues,
        message: "Invalid input data",
      });
      return;
    }
    const message = (error as Error).message;
    const status = message.includes("not found")
      ? 404
      : message.includes("already exists")
        ? 409
        : 400;
    res.status(status).json({ success: false, message });
  }
};

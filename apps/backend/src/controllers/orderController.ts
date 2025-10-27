import type { Request, Response } from "express";
import { getOrderStatsService } from "../services/orderService";

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
import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import { addIncome } from "../../services/financial/expense.financial.service";
import { IMonthlySummary } from "../../types/financial.service";

export const addMonthly = async (req: Request, res: Response) => {
  try {
    const { user_id, income, fixed_costs, disposable, description } = req.body;
    const dataIncome: IMonthlySummary = {
      user_id,
      income,
      disposable,
      fixed_costs,
      description,
    };
    await addIncome(dataIncome);
    logger.debug("Added income data to table successfully");
    return;
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

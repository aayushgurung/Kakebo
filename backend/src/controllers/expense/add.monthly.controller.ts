import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import {
  addGoalAndIntentions,
  addIncome,
  addPermanentCostItems,
} from "../../services/financial/expense.financial.service";
import {
  IGoalAndIntention,
  IMonthlySummary,
  IPermanentCostItem,
} from "../../types/financial.service";

export const addMonthly = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      income,
      fixed_costs,
      disposable,
      description,
      item_cost,
      item_name,
      category_id,
      goal_type,
      gamount,
    } = req.body;

    const dataIncome: IMonthlySummary = {
      user_id,
      income,
      disposable,
      fixed_costs,
      description,
    };
    const monthlySummary = await addIncome(dataIncome);
    logger.debug("Added income data to table successfully");

    if (!monthlySummary) return res.status(500).json("Failed to add");

    const dataPermanentCost: IPermanentCostItem = {
      user_id,
      item_cost,
      item_name,
      category_id,
      monthly_summary_id: monthlySummary.id,
    };

    await addPermanentCostItems(dataPermanentCost);

    const dataGoalAndIntention: IGoalAndIntention = {
      user_id,
      goal_type,
      amount: gamount,
      is_achieved_flg: "N",
      additional_info: "",
      description,
    };

    await addGoalAndIntentions(dataGoalAndIntention);
    return res.status(200).json({ message: "Successfully added!" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.status(500).json({ message: "Failed to add." });
    }
  }
};

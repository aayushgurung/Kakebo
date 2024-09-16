import { prisma } from "../base.service";
import {
  IDailySpending,
  IGoalAndIntention,
  IMonthlySummary,
  IPermanentCostItem,
  ITransactionData,
} from "../../types/financial.service";
import { createTransaction } from "./transaction.financial.service"; // Assuming transaction.financial.service also uses functions
import { handleErrorService } from "../base.service";
import {
  DailySpending,
  GoalAndIntention,
  MonthlySummary,
  PermanentCostItem,
} from "@prisma/client";

export async function addIncome(
  data: IMonthlySummary
): Promise<MonthlySummary | null> {
  try {
    const tranData: ITransactionData = {
      user_id: data.user_id,
      amount: data.income,
      description: data.description ?? "No description",
      type: "income",
      is_recurring_flg: "Y",
    };

    const transaction = await createTransaction(tranData);
    if (!transaction) throw new Error("Transaction creation failed");

    const monthly = await prisma.monthlySummary.create({
      data: {
        user_id: data.user_id,
        description: data.description ?? "No description",
        total_expenses: data.total_expenses,
        total_savings: data.total_savings,
        disposable: data.disposable,
        income: data.income,
        fixed_costs: data.fixed_costs,
      },
    });

    if (!monthly) throw new Error("Monthly summary creation failed");
    return monthly;
  } catch (error) {
    handleErrorService(error);
    return null;
  }
}

export async function addPermanentCostItems(
  data: IPermanentCostItem
): Promise<PermanentCostItem | null> {
  try {
    const tranData: ITransactionData = {
      user_id: data.user_id,
      amount: data.item_cost,
      description: data.item_name ?? "No description",
      type: "expense",
      is_recurring_flg: "N",
    };

    const transaction = await createTransaction(tranData);
    if (!transaction) throw new Error("Transaction creation failed");

    const perma = await prisma.permanentCostItem.create({
      data: {
        user_id: data.user_id,
        category_id: data.category_id,
        item_cost: data.item_cost,
        item_name: data.item_name,
        monthly_summary_id: data.monthly_summary_id,
      },
    });

    if (!perma) throw new Error("Permanent cost item creation failed");
    return perma;
  } catch (error) {
    handleErrorService(error);
    return null;
  }
}

export async function addGoalAndIntentions(
  data: IGoalAndIntention
): Promise<GoalAndIntention | null> {
  try {
    const tranData: ITransactionData = {
      user_id: data.user_id,
      amount: data.amount,
      description: data.description ?? "No description",
      type: data.goal_type,
      is_recurring_flg: "N",
    };

    const transaction = await createTransaction(tranData);
    if (!transaction) throw new Error("Transaction creation failed");

    const goal = await prisma.goalAndIntention.create({
      data: {
        user_id: data.user_id,
        goal_type: data.goal_type,
        amount: data.amount,
        description: data.description ?? "No description",
        is_achieved_flg: data.is_achieved_flg,
        additional_info: data.additional_info,
      },
    });

    if (!goal) throw new Error("Goal and intention creation failed");
    return goal;
  } catch (error) {
    handleErrorService(error);
    return null;
  }
}

export async function addDailySpending(
  data: IDailySpending
): Promise<DailySpending | null> {
  try {
    const tranData: ITransactionData = {
      user_id: data.user_id,
      amount: data.amount,
      description: data.description ?? "No description",
      type: "Daily Expense",
      is_recurring_flg: "Y",
    };

    const transaction = await createTransaction(tranData);
    if (!transaction) throw new Error("Transaction creation failed");

    const spending = await prisma.dailySpending.create({
      data: {
        user_id: data.user_id,
        amount: data.amount,
        description: data.description ?? "No description",
        day_of_week: data.day_of_week,
        category_id: data.category_id,
      },
    });

    if (!spending) throw new Error("Daily spending creation failed");
    return spending;
  } catch (error) {
    handleErrorService(error);
    return null;
  }
}

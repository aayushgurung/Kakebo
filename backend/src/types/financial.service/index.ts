import { InputJsonValue } from "@prisma/client/runtime/library";

export type ITransactionData = {
  user_id: number;
  amount: number;
  description: string | null;
  type: string;
  is_recurring_flg: string;
};

export type IGoalAndIntention = {
  user_id: number;
  goal_type: string;
  amount: number;
  description: string | null;
  additional_info: InputJsonValue;
  is_achieved_flg: string;
};
export type IMonthlySummary = {
  user_id: number;
  income: number;
  total_expenses?: number;
  total_savings?: number;
  disposable: number;
  description: string;
  fixed_costs: number;
};

export type IBudgetPeriod = {
  user_id: number;
  period_type: string;
  start_date: Date;
  end_date: Date;
  disposal_amount: number;
};

export type IPermanentCostItem = {
  user_id: number;
  category_id: number;
  item_name: string;
  item_cost: number;
  monthly_summary_id: number;
};

export type IWeekMonthTracking = {
  budget_id: number;
  week_number: number;
  month_name: string;
  year: number;
};

export type IDailySpending = {
  user_id: number;
  category_id: number;
  day_of_week: string;
  amount: number;
  description: string;
};

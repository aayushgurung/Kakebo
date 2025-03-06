import { IIncomeData } from "../../types/financial.service"; // Assuming you have an IIncomeData interface defined
import { handleErrorService } from "../base.service";
import { prisma } from "../base.service";
import { logger } from "../../utils/logger";

function format(data: IIncomeData): IIncomeData {
  return {
    user_id: data.user_id,
    date: data.date,
    income: data.income,
    category_id: data.category_id,
    description: data.description,
    is_del_flg: data.is_del_flg || "N",
  };
}

export async function createIncome(data: IIncomeData) {
  try {
    logger.debug("This is in service add Income", data);
    const income = await prisma.income.create({
      data: format(data),
    });
    console.log("/n", income, "/n");
    return income;
  } catch (error) {
    handleErrorService(error);
  }
}

export async function getIncome(id: number) {
  try {
    const income = await prisma.income.findUnique({
      where: { id: id },
    });
    return income;
  } catch (error) {
    handleErrorService(error);
  }
}

export async function updateIncome(id: number, data: IIncomeData) {
  try {
    const income = await prisma.income.update({
      where: { id: id },
      data: format(data),
    });
    return income;
  } catch (error) {
    handleErrorService(error);
  }
}

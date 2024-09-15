import { PrismaClient } from "@prisma/client";
import { ITransactionData } from "../../types/financial.service";
import { handleErrorService } from "../base.service";

export async function createTransaction(
  data: ITransactionData,
  prisma: PrismaClient
) {
  try {
    const transaction = await prisma.transaction.create({
      data,
    });
    return transaction;
  } catch (error) {
    handleErrorService(error);
  }
}

export async function getTransaction(id: number, prisma: PrismaClient) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: id },
    });
    return transaction;
  } catch (error) {
    handleErrorService(error);
  }
}

export async function updateTransaction(
  id: number,
  data: ITransactionData,
  prisma: PrismaClient
) {
  try {
    const transaction = await prisma.transaction.update({
      where: { id: id },
      data,
    });
    return transaction;
  } catch (error) {
    handleErrorService(error);
  }
}

import { logger } from "../utils/logger";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export function handleErrorService(error: unknown) {
  if (error instanceof Error) {
    logger.error("Error occurred:", error.message);
    throw new Error(error.message);
  } else {
    throw new Error("An unknown error occurred");
  }
}

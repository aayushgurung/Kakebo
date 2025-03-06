import { logger } from "../utils/logger";
import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function handleErrorService(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        logger.error("Database Error: Unique constraint failed", {
          meta: error.meta,
        });
        throw new Error("A record with this unique field already exists.");
      case "P2025":
        logger.error("Database Error: Record not found", { meta: error.meta });
        throw new Error("The requested record does not exist.");
      default:
        logger.error("Database Error:", {
          message: error.message,
          meta: error.meta,
        });
        throw new Error("A database error occurred.");
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    logger.error("Validation Error:", { message: error.message });
    throw new Error("Invalid data provided.");
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    logger.error("Prisma Initialization Error:", { message: error.message });
    throw new Error(
      "Database connection error. Please check the database configuration."
    );
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    logger.error("Prisma Rust Panic:", { message: error.message });
    throw new Error("An internal database error occurred.");
  } else if (error instanceof Error) {
    logger.error("Application Error:", { message: error.message });
    throw new Error(error.message);
  } else {
    logger.error("Unknown Error Occurred");
    throw new Error("An unknown error occurred.");
  }
}

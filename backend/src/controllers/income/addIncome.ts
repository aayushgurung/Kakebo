import { Request, Response } from "express";
import { logger } from "../../utils/logger";
import { createIncome } from "../../services/financial/income.financial.service";

export const addIncome = async (req: Request, res: Response) => {
  try {
    // logger.debug("This is in service add Income", req.body);
    const income = createIncome(req.body);
    
    return res.status(200).json({ message: "Successfully added!" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      return res.status(500).json({ message: "Failed to add." });
    }
  }
};

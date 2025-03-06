import { Request, Response } from "express";
import { register } from "../../services/auth/user.auth.service";
import { logger } from "../../utils/logger";

export const registerUser = async (req: Request, res: Response) => {
  try {
    logger.info(req.body);
    if (
      !req.body.email ||
      !req.body.password ||
      req.body.confirmPassword != req.body.password
    ) {
      logger.warn("Registration attempt without username or password");
      return res.status(400).json({ message: "Try Again!" });
    }

    await register(req.body);

    // logger.error(`User ${req.body.username} created successfully`);
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof Error)
      logger.error(
        `Error during registration for user ${req.body.username}: ${error.message}`
      );
    return res.status(500).json({
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

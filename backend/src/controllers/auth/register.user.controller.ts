import { Request, Response } from "express";
import { register } from "../../services/auth/user.auth.service";
import { logger } from "../../utils/logger"; // Assuming the logger is stored in the utils folder

export const registerUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      logger.warn("Registration attempt without username or password");
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    await register(req.body);

    logger.info(`User ${req.body.username} created successfully`);
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

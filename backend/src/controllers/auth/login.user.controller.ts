import { Request, Response } from "express";
import { login } from "../../services/auth/user.auth.service";
import { logger } from "../../utils/logger"; // Assuming the logger is stored in the utils folder

export const loginUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      logger.warn("Login attempt without username or password");
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }
    const token = await login(req.body.username, req.body.password);
    logger.info(`User ${req.body.username} logged in successfully`);
    return res.json({ token, message: "Login successful" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        `Error during login for user ${req.body.username}: ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

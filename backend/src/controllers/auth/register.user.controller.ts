import { Request, Response } from "express";
import userService from "../../services/auth/user.auth.service";

export const registerUser = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const newUser = await userService.register(req.body);
  return res.status(200).json({ message: "User created successfully" });
};

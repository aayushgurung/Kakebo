import { Request, Response } from "express";
import userService from "../../services/auth/user.auth.service";

export const loginUser = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const token = await userService.login(req.body.username, req.body.password);

  return res.json({ token, message: "Login successful" });
};

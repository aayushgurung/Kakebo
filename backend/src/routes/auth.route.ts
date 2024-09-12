import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth";

const authRoutes = Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

export { authRoutes };

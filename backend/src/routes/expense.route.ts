import { Router } from "express";
import { addMonthly } from "../controllers/expense";
const expenseRoute = Router();

expenseRoute.post("/add-monthly", addMonthly);

export { expenseRoute };

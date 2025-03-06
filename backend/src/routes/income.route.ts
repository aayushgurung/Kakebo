import { Router } from "express";
import { addIncome } from "../controllers/income/addIncome";
const incomeRoute = Router();

incomeRoute.post("/add-income", addIncome);

export { incomeRoute };

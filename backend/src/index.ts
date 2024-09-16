import express, { Express } from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.route";
import { logger } from "./utils/logger";
import { expenseRoute } from "./routes/expense.route";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/api", expenseRoute);
app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localost:${port}`);
  logger.debug(`[server]: Server is running at http://localost:${port}`);
});

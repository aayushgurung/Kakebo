import express, { Express } from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.route";
import { logger } from "./utils/logger";
import { incomeRoute } from "./routes/income.route";
import cors from "cors"; // Import CORS

// import { expenseRoute } from "./routes/expense.route";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Add other methods if necessary
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

app.use("/auth", authRoutes);
app.use("/api", incomeRoute);
app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localost:${port}`);
  logger.debug(`[server]: Server is running at http://localost:${port}`);
});

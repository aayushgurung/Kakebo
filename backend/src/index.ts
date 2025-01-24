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

function summaryRanges(nums: number[]): string[] {
  let i = 0;
  let temp: number[] = [];
  let nt = true;
  let range: string[] = [];
  while (i < nums.length) {
    temp.push(nums[i]);
    while (nt) {
      console.log(nums[i]);
      if (nums[i] + 1 != nums[i + 1]) {
        temp.push(nums[i]);
        nt = false;
      }
      i++;
    }
    nt = true;
    if (temp[0] != temp[1]) range.push(`${temp[0]}->${temp[1]}`);
    else range.push(`${temp[0]}`);

    temp = [];
  }
  return range;
}

summaryRanges([0, 1, 2, 4, 5, 7]);

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.route";

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

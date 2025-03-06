import { PrismaClient, user } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { logger } from "../../utils/logger";

const prisma = new PrismaClient();
const JWT_SECRET: Secret =
  process.env.JWT_SECRET ||
  "c93154a4211dddf33d5af13bc5d26c0289fb6f21313b5ad7911b000ac6ad4840";
const SALT_ROUNDS = 12;

export async function login(email: string, password: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  logger.info("Checking the user exists or not");

  if (!user) {
    logger.error("No user available");
    throw new Error("Invalid credentials");
  }
  const hashedPassword = await bcrypt.hash(password, user.salt);
  if (hashedPassword !== user.password) {
    throw new Error("Invalid username or password");
  }
  const token = jwt.sign({ is: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  logger.info("Token generated", token);
  return token;
}

export async function register(user: user): Promise<user> {
  const userExists = await prisma.user.findUnique({
    where: { email: user.email },
  });
  logger.info("User has been signuped");
  if (userExists) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  return prisma.user.create({
    data: {
      firstname: user.firstname,
      lastname: user.lastname,
      password: hashedPassword,
      salt: salt,
      email: user.email,
    },
  });
}

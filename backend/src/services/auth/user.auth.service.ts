import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

interface IUserService {
  register(user: User): Promise<User>;
  login(username: string, password: string): Promise<string>;
}

const prisma = new PrismaClient();

class UserService implements IUserService {
  private JWT_SECRET: Secret;
  private SALT_ROUNDS = 12;
  constructor() {
    this.JWT_SECRET =
      process.env.JWT_SECRET ||
      "c93154a4211dddf33d5af13bc5d26c0289fb6f21313b5ad7911b000ac6ad4840";
  }
  async login(username: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword !== user.password) {
      throw new Error("Invalid username or password");
    }
    const token = jwt.sign(
      { is: user.id, username: user.username },
      this.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
  async register(user: User): Promise<User> {
    const userExists = await prisma.user.findUnique({
      where: { username: user.username },
    });

    if (userExists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: hashedPassword,
        salt: salt,
        email: user.email,
      },
    });
  }
}

const userService = new UserService();
export default userService;

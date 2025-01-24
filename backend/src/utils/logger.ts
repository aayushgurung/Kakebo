import winston, { format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  success: 5,
};

const messageColors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "gray",
  http: "magenta",
};

type levels = "info" | "debug" | "error" | "warn" | "http";

winston.addColors(messageColors);

const messageColorizer = format((info) => {
  const level = info.level as levels;
  if (messageColors[level]) {
    info.message = winston.format.colorize().colorize(info.level, info.message);
  }
  return info;
});

// Function to get file name and line number
const getCallerInfo = () => {
  const stack = new Error().stack;
  const stackArray = stack?.split("\n");
  const callerLine = stackArray ? stackArray[3] : ""; // Adjust the index if needed
  const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
  return match ? `at ${match[1]}:${match[2]}` : ""; // Returns the file path and line number
};

const consoleFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  messageColorizer(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const callerInfo = getCallerInfo(); // Get the file path and line number
    return `${timestamp} [${level}]: ${message} ${callerInfo} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  })
);

const fileFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, ...meta }) => {
    const callerInfo = getCallerInfo(); // Get the file path and line number
    return `${timestamp} [${level}]: ${message} ${callerInfo} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  })
);

const dailyRotateFileTransport = new DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  maxSize: "20m",
  level: "info",
  format: fileFormat,
});

export const logger = winston.createLogger({
  levels: logLevels,
  transports: [
    new transports.Console({
      level: "debug",
      format: consoleFormat,
      handleExceptions: true,
    }),
    dailyRotateFileTransport,
  ],
  exitOnError: false,
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason });
});

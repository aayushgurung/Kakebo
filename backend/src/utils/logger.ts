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

const consoleFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  messageColorizer(),
  format.printf(
    ({ timestamp, level, message, ...meta }) =>
      `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ""
      }`
  )
);

const fileFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    ({ timestamp, level, message, ...meta }) =>
      `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ""
      }`
  )
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

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason });
});

import express, { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";

// Internal Imports
import logger from "./config/logger";
import categoryRouter from "./category/category-router";
import toppingRouter from "./topping/topping-router";
import productRouter from "./product/product-route";

const app = express();

const ALLOWED_DOMAINS = [
    config.get("frontend.adminUI"),
];

app.use(
    cors({
        origin: ALLOWED_DOMAINS as string[],
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

// Health Check / Root
app.get("/", async (req: Request, res: Response) => {
   res.send(config.get("server.port"));
});

// Routes
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/toppings", toppingRouter);

// Global Error handling middleware
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        message: err.message,
        type: err.name || "Internal Server Error",
        path: req.path,
        status: statusCode
    });
});

export default app;
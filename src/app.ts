import express from "express";
import logger from "./config/logger";
import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import config from "config";
import categoryRouter from "./category/category-router";
import { cookie } from "express-validator";
import cookieParser from "cookie-parser";
import toppingRouter from "./topping/topping-router";
import cors from "cors";
import productRouter from "./product/product-route";
const app = express();
const ALLOWED_DOMAINS = [
    // config.get("frontend.clientUI"),
    config.get("frontend.adminUI"),
];
app.use(
    cors({
        origin: ALLOWED_DOMAINS as string[],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser())

app.get("/",async  (req: Request, res: Response,next: NextFunction) => {
   res.send(config.get("server.port"))
});
app.use("/categories",categoryRouter)
app.use("/products",productRouter)
app.use("/toppings",toppingRouter)
// Error handling middleware
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
import express from "express";
import logger from "./config/logger";
import { Request, Response, NextFunction } from "express";
import createHttpError, { HttpError } from "http-errors";
import config from "config";
const app = express();

app.get("/",async  (req: Request, res: Response,next: NextFunction) => {
   res.send(config.get("server.port"))
});

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
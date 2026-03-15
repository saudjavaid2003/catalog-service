
// import { Config } from "./config/index";
import logger from "./config/logger";
import app from "./app";
import config from "config";
import { initDb } from "./config/db";
const startServer = async () => {
    try {
        await initDb()
        logger.info("Database connected successfully");
        app.listen(config.get("server.port"), () => {
            // console.log(`Auth Service is running on port ${Config.PORT}`);
            logger.info(`catalog Service is running on port ${config.get("server.port") }`);
        })
    } catch (error) {
        console.error("Error starting catalog service:", error);
        process.exit(1);
    }
};

void startServer();
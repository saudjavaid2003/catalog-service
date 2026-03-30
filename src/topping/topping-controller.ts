import { NextFunction, Response, Request } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { FileStorage } from "../common/types/storage";
import { ToppingService } from "./topping-service";
import { CreataeRequestBody, Topping, ToppingEvents } from "./topping-types";
// import { MessageProducerBroker } from "../common/types/broker"; // Kafka disabled

export class ToppingController {
    constructor(
        private storage: FileStorage,
        private toppingService: ToppingService,
        // private broker: MessageProducerBroker, // 1. Disabled Kafka Broker
    ) {}

    create = async (
        req: Request<object, object, CreataeRequestBody>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const image = req.files!.image as UploadedFile;
            const fileUuid = uuidv4();

            await this.storage.upload({
                filename: fileUuid,
                fileData: image.data.buffer as any,
            });

            const savedTopping = await this.toppingService.create({
                ...req.body,
                image: fileUuid,
                tenantId: req.body.tenantId,
            } as Topping);

            /* // 2. Disabled Kafka Message for Topping Creation
            await this.broker.sendMessage(
                "topping",
                JSON.stringify({
                    event_type: ToppingEvents.TOPPING_CREATE,
                    data: {
                        id: savedTopping._id,
                        price: savedTopping.price,
                        tenantId: savedTopping.tenantId,
                    },
                }),
            );
            */

            res.json({ id: savedTopping._id });
        } catch (err) {
            return next(err);
        }
    };

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const toppings = await this.toppingService.getAll(
                req.query.tenantId as string,
            );

            const readyToppings = toppings.map((topping) => {
                return {
                    id: topping._id,
                    name: topping.name,
                    price: topping.price,
                    tenantId: topping.tenantId,
                    image: this.storage.getObjectUri(topping.image),
                };
            });
            res.json(readyToppings);
        } catch (err) {
            return next(err);
        }
    };
}
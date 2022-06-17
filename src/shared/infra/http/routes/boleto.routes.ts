import { Router } from "express";

import { ValidationController } from "@modules/boleto/useCases/validationOfboleto/ValidationController";

const boletoRouter = Router();

const validationController = new ValidationController();

boletoRouter.get("/:code", validationController.handle);

export { boletoRouter };

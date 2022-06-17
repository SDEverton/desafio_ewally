import { Router } from "express";

import { boletoRouter } from "./boleto.routes";

const router = Router();

router.use("/boleto", boletoRouter);

export { router };

import { Router } from "express";

const boletoRouter = Router();

boletoRouter.get("/:code", (request, response) => {
  return response.json({ message: "Hello World" });
});

export { boletoRouter };

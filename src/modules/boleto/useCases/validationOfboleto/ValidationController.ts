import { Request, Response } from "express";
import { container } from "tsyringe";

import { ValidationUseCase } from "./ValidationUseCase";

class ValidationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;

    const validationUseCase = container.resolve(ValidationUseCase);

    const data = validationUseCase.execute(code);

    return response.status(200).json(data);
  }
}

export { ValidationController };

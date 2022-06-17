import { AppError } from "@shared/errors/AppError";

import { ValidationUseCase } from "./ValidationUseCase";

let validationUseCase: ValidationUseCase;

describe("Validation", () => {
  beforeEach(() => {
    validationUseCase = new ValidationUseCase();
  });

  it("should be able to validation of line", () => {
    const response = validationUseCase.execute(
      "212900011921100012109044756174059758700000020001"
    );

    expect(response).toHaveProperty("amount");
  });

  it("should be able to return NULL in place of the date case this is 0000", () => {
    const response = validationUseCase.execute(
      "212900011921100012109044756174059000000000020001"
    );

    expect(response.expirationDate).toBe(null);
  });

  it("should not be able to validate of line because the length is larger the allowed", () => {
    try {
      validationUseCase.execute(
        "21290001192110001210904475617405900000000002000111111"
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should not be able validate of line because is number", () => {
    const value = 1 as any;
    try {
      validationUseCase.execute(value);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should be able to validate boleto traditional", () => {
    const response = validationUseCase.execute(
      "21290001192110001210904475617405975870000002000"
    );

    expect(response).toHaveProperty("amount");
  });
});

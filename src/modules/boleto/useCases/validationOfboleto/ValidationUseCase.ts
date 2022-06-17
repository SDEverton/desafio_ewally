import { addDays, format } from "date-fns";

import { IResponse } from "@modules/boleto/dtos/IResponseDTO";
import { AppError } from "@shared/errors/AppError";
import { substringReplace } from "@utils/substringReplace";

class ValidationUseCase {
  private identificationTypeCode(code: string): string {
    if (typeof code !== "string")
      throw new AppError("Insira uma string válida!", 400);

    code = code.replace(/[^0-9]/g, "");

    if (code.length === 47) {
      return "BOLETO_TRADICIONAL";
    }
    if (code.length === 48) {
      return "BOLETO_CONCESSIONARIAS";
    }
    throw new AppError("Número de dígitos inválido!", 400);
  }

  private barCode(code: string): string {
    code = code.replace(/[^0-9]/g, "");

    const result =
      code.substr(0, 4) +
      code.substr(32, 1) +
      code.substr(33, 14) +
      code.substr(4, 5) +
      code.substr(10, 10) +
      code.substr(21, 10);

    return result;
  }

  private identifyDate(code: string): string {
    code = code.replace(/[^0-9]/g, "");

    let factorDate = "";
    const dataBoleto = new Date("1997-10-07 20:54:59.000Z");

    factorDate = code.substr(33, 4);

    if (factorDate === "0000") {
      return null;
    }

    const date = addDays(dataBoleto, parseInt(factorDate, 10));

    return format(date, "yyyy-MM-dd");
  }

  private identifyValue(code: string): string {
    let valueBoleto = "";
    let valueFinal = "";

    valueBoleto = code.substr(37);
    valueFinal = `${valueBoleto.substr(0, 8)}.${valueBoleto.substr(8, 2)}`;

    let char = valueFinal.substr(1, 1);
    while (char === "0") {
      valueFinal = substringReplace(valueFinal, "", 0, 1);
      char = valueFinal.substr(1, 1);
    }

    return parseFloat(valueFinal).toFixed(2);
  }

  public execute(code: string): IResponse {
    const identificationTypeCode = this.identificationTypeCode(code);

    const retorno: IResponse = {
      barCode: this.barCode(code),
      amount: this.identifyValue(code),
      expirationDate: this.identifyDate(code),
    };

    return retorno;
  }
}

export { ValidationUseCase };

import {
  checkDiapason,
  CheckErrorOptions,
  checkIsInteger,
  checkIsNumber,
  InputErrors,
} from "../errors";

export const errorsText = {
  notInteger: "Показания счетчика должно быть целым положительным числом",
  lessThanPrevious: "Новое значение не может быть меньше предыдущего",
  notNumber: "Цена должна быть целым или дробным числом",
  max2digitsAfterDot:
    "Количество копеек должно выражаться максимум двумя цифрами после точки",
};

export const metersInputErrors: InputErrors = {
  notInteger: {
    check: checkIsInteger,
    text: errorsText.notInteger,
  },
  lessThanPrevious: {
    check: checkDiapason,
    text: errorsText.lessThanPrevious,
  },
};
export const priceInputErrors: InputErrors = {
  notNumber: {
    check: checkIsNumber,
    text: errorsText.notNumber,
  },
  max2digitsAfterDot: {
    check: (inputed: string | number, options: CheckErrorOptions) =>
      checkDiapason(String(inputed).split(".")[1]?.length || 0, {
        max: options.maxAfterDot,
      }),
    text: errorsText.max2digitsAfterDot,
  },
};

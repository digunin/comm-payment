import {
  checkDiapason,
  CheckErrorOptions,
  checkIsInteger,
  checkIsNumber,
  InputChecker,
  Mutator,
} from "./errors";

export const errorsText = {
  notInteger: "Показания счетчика должно быть целым положительным числом",
  lessThanPrevious: "Новое значение не может быть меньше предыдущего",
  notNumber: "Цена должна быть целым или дробным числом",
  max2digitsAfterDot:
    "Количество копеек должно выражаться максимум двумя цифрами после точки",
};

export const notInteger: InputChecker = {
  check: checkIsInteger,
  text: errorsText.notInteger,
};

export const lessThanPrevious: InputChecker = {
  check: checkDiapason,
  text: errorsText.lessThanPrevious,
};

export const notNumber: InputChecker = {
  check: checkIsNumber,
  text: errorsText.notNumber,
};

export const max2digitsAfterDot: InputChecker = {
  check: (inputed: string | number, options: CheckErrorOptions) =>
    checkDiapason(String(inputed).split(".")[1]?.length || 0, {
      max: options.maxAfterDot,
    }),
  text: errorsText.max2digitsAfterDot,
};

export const priceMutator: Mutator = (inputed) => {
  if (inputed.endsWith(",") || inputed.startsWith(","))
    inputed = inputed.replace(",", ".");
  if (inputed.startsWith(".")) inputed = `0${inputed}`;
  return inputed;
};

export const meterMutator: Mutator = (inputed) => {
  if (inputed.startsWith("-")) return inputed.slice(1);
  return inputed;
};

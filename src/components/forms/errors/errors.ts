export type InputChecker = {
  text: string;
  check: (inputed: string | number, options: CheckErrorOptions) => boolean;
};

export type Mutator = (inputed: string) => string;

export type CheckErrorOptions = {
  min?: number;
  max?: number;
  moreThan?: number;
  lessThan?: number;
  maxAfterDot?: number;
};

export const checkDiapason = (
  inputed: string | number,
  options: CheckErrorOptions
) => {
  inputed = Number(inputed);
  if (isNaN(inputed)) return false;
  let correct = true;
  const { max, min, moreThan, lessThan } = options;
  if (typeof max === "number" && correct) correct = inputed <= max;
  if (typeof min === "number" && correct) correct = inputed >= min;
  if (typeof moreThan === "number" && correct) correct = inputed > moreThan;
  if (typeof lessThan === "number" && correct) correct = inputed < lessThan;
  return correct;
};

export const checkIsNumber = (inputed: string | number) =>
  !isNaN(Number(inputed));

export const checkIsInteger = (inputed: string | number) =>
  !isNaN(Number(inputed)) && Number.isInteger(Number(inputed));

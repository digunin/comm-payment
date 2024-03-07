export type InputChecker = {
  text: string;
  check: (inputed: string | number, options: CheckErrorOptions) => boolean;
};

export type InputErrors = {
  [key: string]: InputChecker;
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
  if (max) correct = inputed <= max;
  if (min) correct = inputed >= min;
  if (moreThan) correct = inputed > moreThan;
  if (lessThan) correct = inputed < lessThan;
  return correct;
};

export const checkIsNumber = (inputed: string | number) =>
  !isNaN(Number(inputed));

export const checkIsInteger = (inputed: string | number) =>
  !isNaN(Number(inputed)) && Number.isInteger(Number(inputed));

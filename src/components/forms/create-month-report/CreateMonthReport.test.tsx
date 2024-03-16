import React from "react";
import "@testing-library/jest-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import CreateMonthReport from "./CreateMonthReport";
import {
  Months,
  testTotalReport,
} from "../../../store/payment/paymentReducer.utils";
import { fireEvent } from "@testing-library/react";
import { Price, setPriceState } from "../../../store/price/priceReducer";
import { oldPrices } from "../../../store/price/priceReducer.spec";
import {
  selectStartReadings,
  setPaymentsState,
} from "../../../store/payment/paymentReducer";
import {
  InputFieldName,
  setInitialValues,
} from "../../../store/form/createMonthReportReducer";
import { errorsText } from "./createMonthReportErrors";
import { renderWithProvider } from "../../../utils";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isNewReport = !useSelector(selectStartReadings);
  const actualPrice: Price = oldPrices[4];
  const setState = () => {
    dispatch(setPaymentsState(testTotalReport));
    dispatch(setPriceState({ actualPrice, oldPrices: [] }));
    dispatch(
      setInitialValues({
        metersInputFields: {
          cold: { value: 211000, error: null },
          hot: { value: 211001, error: null },
          electricity: { value: 211002, error: null },
        },
        priceInputFields: {
          cold: { value: 24.04, error: null },
          hot: { value: 167.93, error: null },
          electricity: { value: 5.05, error: null },
          waterWaste: { value: 52.2, error: null },
        },
        monthAndYearInputFields: {
          month: {
            value: Months.nov,
            error: null,
          },
          year: {
            value: 2021,
            error: null,
          },
        },
      })
    );
  };

  return (
    <div>
      {!isNewReport && <CreateMonthReport />}
      <button data-testid="btn-setstate" onClick={setState}></button>
    </div>
  );
};

export type FormName = "meters" | "price";
const { lessThanPrevious, notInteger, notNumber, max2digitsAfterDot } =
  errorsText;
const errorNotFound = "error-not-found";

export const enterText = (
  meterName: InputFieldName,
  formName: FormName,
  container: HTMLElement,
  text: string
) => {
  const input = container.getElementsByClassName(
    `${formName}-input-element ${meterName}`
  )[0] as HTMLInputElement;
  fireEvent.change(input, {
    target: { value: text },
  });
};

export const checkEnteredText = (
  meterName: InputFieldName,
  formName: FormName,
  container: HTMLElement,
  text: string
): boolean => {
  const input = container.getElementsByClassName(
    `${formName}-input-element ${meterName}`
  )[0] as HTMLInputElement;
  return input.value === text;
};

export const errorInputQuantity = (container: HTMLElement) => {
  return container.getElementsByClassName("input-error").length;
};

export const getError = (
  meterName: InputFieldName,
  formName: FormName,
  container: HTMLElement
) => {
  const errorElement = container.getElementsByClassName(
    `${formName}-${meterName}-error-message`
  )[0];
  return errorElement?.textContent || errorNotFound;
};

test("create month report render", () => {
  const { container, getByTestId } = renderWithProvider(<App />);
  expect(getByTestId("btn-setstate")).toBeInTheDocument();
  expect(container.getElementsByClassName("create-month-report").length).toBe(
    0
  );
  fireEvent.click(getByTestId("btn-setstate"));
  expect(container.getElementsByClassName("input-element").length).toBe(7);
});

test("check meters form input value", () => {
  const { container, getByTestId } = renderWithProvider(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  expect(checkEnteredText("cold", "meters", container, "211000")).toBe(true);
  expect(checkEnteredText("hot", "meters", container, "211001")).toBe(true);
  expect(checkEnteredText("electricity", "meters", container, "211002")).toBe(
    true
  );
  enterText("hot", "meters", container, "211002");
  expect(checkEnteredText("hot", "meters", container, "211002")).toBe(true);

  enterText("hot", "meters", container, "21as");
  expect(checkEnteredText("hot", "meters", container, "21as")).toBe(true);

  enterText("hot", "meters", container, "222222");
  expect(checkEnteredText("hot", "meters", container, "222222")).toBe(true);

  enterText("hot", "meters", container, "0");
  expect(checkEnteredText("hot", "meters", container, "0")).toBe(true);

  enterText("cold", "meters", container, "211002");
  expect(checkEnteredText("cold", "meters", container, "211002")).toBe(true);

  enterText("cold", "meters", container, "21as");
  expect(checkEnteredText("cold", "meters", container, "21as")).toBe(true);

  enterText("cold", "meters", container, "222222");
  expect(checkEnteredText("cold", "meters", container, "222222")).toBe(true);

  enterText("cold", "meters", container, "0");
  expect(checkEnteredText("cold", "meters", container, "0")).toBe(true);

  enterText("electricity", "meters", container, "211002");
  expect(checkEnteredText("electricity", "meters", container, "211002")).toBe(
    true
  );

  enterText("electricity", "meters", container, "21as");
  expect(checkEnteredText("electricity", "meters", container, "21as")).toBe(
    true
  );

  enterText("electricity", "meters", container, "222222");
  expect(checkEnteredText("electricity", "meters", container, "222222")).toBe(
    true
  );

  enterText("electricity", "meters", container, "0");
  expect(checkEnteredText("electricity", "meters", container, "0")).toBe(true);
});

test("errors meters form", () => {
  const { container, getByTestId } = renderWithProvider(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  expect(checkEnteredText("cold", "meters", container, "211000")).toBe(true);
  expect(checkEnteredText("hot", "meters", container, "211001")).toBe(true);
  expect(checkEnteredText("electricity", "meters", container, "211002")).toBe(
    true
  );
  expect(errorInputQuantity(container)).toBe(0);

  const buttonOK = getByTestId("btn-ok");
  expect(buttonOK).not.toBeDisabled();

  enterText("cold", "meters", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(errorNotFound);

  enterText("hot", "meters", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(notInteger);
  expect(getError("electricity", "meters", container)).toBe(errorNotFound);

  enterText("electricity", "meters", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(3);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(notInteger);
  expect(getError("electricity", "meters", container)).toBe(notInteger);

  enterText("hot", "meters", container, "211222");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(notInteger);

  enterText("cold", "meters", container, "211");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(lessThanPrevious);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(notInteger);

  enterText("cold", "meters", container, "211111");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(errorNotFound);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(notInteger);

  enterText("electricity", "meters", container, "211333");
  expect(errorInputQuantity(container)).toBe(0);
  expect(buttonOK).not.toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(errorNotFound);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(errorNotFound);

  enterText("electricity", "meters", container, "21.33");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(errorNotFound);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(notInteger);

  enterText("cold", "meters", container, "2199999.33");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(notInteger);
});

test("check price form input value and errors", () => {
  const { container, getByTestId } = renderWithProvider(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  expect(checkEnteredText("cold", "price", container, "24.04")).toBe(true);
  expect(checkEnteredText("hot", "price", container, "167.93")).toBe(true);
  expect(checkEnteredText("electricity", "price", container, "5.05")).toBe(
    true
  );
  expect(checkEnteredText("waterWaste", "price", container, "52.2")).toBe(true);

  const buttonOK = getByTestId("btn-ok");
  expect(buttonOK).not.toBeDisabled();

  enterText("cold", "price", container, "2233");
  expect(checkEnteredText("cold", "price", container, "2233")).toBe(true);
  enterText("hot", "price", container, ".5");
  expect(checkEnteredText("hot", "price", container, "0.5")).toBe(true);
  enterText("electricity", "price", container, "4455,");
  expect(checkEnteredText("electricity", "price", container, "4455.")).toBe(
    true
  );
  enterText("waterWaste", "price", container, ",788");
  expect(checkEnteredText("waterWaste", "price", container, "0.788")).toBe(
    true
  );
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "price", container)).toBe(errorNotFound);
  expect(getError("hot", "price", container)).toBe(errorNotFound);
  expect(getError("electricity", "price", container)).toBe(errorNotFound);
  expect(getError("waterWaste", "price", container)).toBe(max2digitsAfterDot);

  enterText("hot", "price", container, "767n.5654");
  expect(checkEnteredText("hot", "price", container, "767n.5654")).toBe(true);
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "price", container)).toBe(errorNotFound);
  expect(getError("hot", "price", container)).toBe(notNumber);
  expect(getError("electricity", "price", container)).toBe(errorNotFound);
  expect(getError("waterWaste", "price", container)).toBe(max2digitsAfterDot);

  enterText("electricity", "price", container, "74.5h67");
  expect(checkEnteredText("electricity", "price", container, "74.5h67")).toBe(
    true
  );
  expect(errorInputQuantity(container)).toBe(3);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "price", container)).toBe(errorNotFound);
  expect(getError("hot", "price", container)).toBe(notNumber);
  expect(getError("electricity", "price", container)).toBe(notNumber);
  expect(getError("waterWaste", "price", container)).toBe(max2digitsAfterDot);
});

test("calendar", () => {
  const { getByTestId } = renderWithProvider(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  const calendar = getByTestId("calendar");
  expect(calendar.getAttribute("value")).toEqual("2021-11-01");
  fireEvent.change(calendar, { target: { value: "2023-05-05" } });
  expect(calendar.getAttribute("value")).toEqual("2023-05-01");
});

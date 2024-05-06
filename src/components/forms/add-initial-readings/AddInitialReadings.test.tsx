import React from "react";
import "@testing-library/jest-dom";
import AddInitialReadings from "./AddInitialReadings";
import { testTotalReport } from "../../../store/payment/paymentReducer.utils";
import { fireEvent } from "@testing-library/react";
import { Price, setPriceState } from "../../../store/price/priceReducer";
import { oldPrices } from "../../../store/price/priceReducer.spec";
import {
  selectStartReadings,
  setPaymentsState,
} from "../../../store/payment/paymentReducer";
import { useAppDispatch, useAppSelector } from "../../../AppHooks";
import { renderWithProvider } from "../../../utils";
import {
  checkEnteredText,
  enterText,
  errorInputQuantity,
  getError,
} from "../create-month-report/CreateMonthReport.test";
import { errorsText } from "../errors/monthReportErrors";
import { setMode } from "../../../store/app-mode/appModeReducer";

const { lessThanPrevious, notInteger } = errorsText;
const errorNotFound = "error-not-found";

const App = () => {
  const dispatch = useAppDispatch();
  const appMode = useAppSelector((state) => state.appModeState.mode);
  const setState = () => {
    dispatch(setMode("add-starting"));
  };
  return (
    <div>
      {appMode === "add-starting" && <AddInitialReadings />}
      <button data-testid="btn-setstate" onClick={setState}></button>
    </div>
  );
};

test("form render", () => {
  const { container, getByTestId } = renderWithProvider(<App />);
  expect(getByTestId("btn-setstate")).toBeInTheDocument();
  fireEvent.click(getByTestId("btn-setstate"));
  expect(container.getElementsByClassName("input-element").length).toBe(3);
  expect(checkEnteredText("cold", "meters", container, "0")).toBe(true);
  expect(checkEnteredText("hot", "meters", container, "0")).toBe(true);
  expect(checkEnteredText("electricity", "meters", container, "0")).toBe(true);
  expect(errorInputQuantity(container)).toBe(0);
});

test("handle input", () => {
  const { container, getByTestId } = renderWithProvider(<App />);
  fireEvent.click(getByTestId("btn-setstate"));

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
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(errorNotFound);
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

  enterText("electricity", "meters", container, "-21999");
  checkEnteredText("electricity", "meters", container, "21999");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(errorNotFound);

  enterText("hot", "meters", container, "-2");
  checkEnteredText("hot", "meters", container, "2");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(notInteger);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(errorNotFound);

  enterText("cold", "meters", container, "-1");
  checkEnteredText("cold", "meters", container, "1");
  expect(errorInputQuantity(container)).toBe(0);
  expect(buttonOK).not.toBeDisabled();
  expect(getError("cold", "meters", container)).toBe(errorNotFound);
  expect(getError("hot", "meters", container)).toBe(errorNotFound);
  expect(getError("electricity", "meters", container)).toBe(errorNotFound);
});

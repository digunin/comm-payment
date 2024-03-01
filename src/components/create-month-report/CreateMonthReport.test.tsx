import React from "react";
import "@testing-library/jest-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, store } from "../../store";
import CreateMonthReport from "./CreateMonthReport";
import { testTotalReport } from "../../store/payment/paymentReducer.utils";
import { fireEvent, render } from "@testing-library/react";
import { Price, setPriceState } from "../../store/price/priceReducer";
import { oldPrices } from "../../store/price/priceReducer.spec";
import {
  selectStartReadings,
  setPaymentsState,
} from "../../store/payment/paymentReducer";
import {
  InputFieldName,
  setInitialValues,
} from "../../store/form/createMonthReportReducer";

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

const enterText = (
  meterName: InputFieldName,
  formName: string,
  container: HTMLElement,
  text: string
) => {
  const input = container
    .getElementsByClassName(`${formName}-input-element ${meterName}`)[0]
    .children.namedItem(meterName) as HTMLInputElement;
  fireEvent.change(input, {
    target: { value: text },
  });
};

const chekEnteredText = (
  meterName: InputFieldName,
  formName: string,
  container: HTMLElement,
  text: string
) => {
  const input = container
    .getElementsByClassName(`${formName}-input-element ${meterName}`)[0]
    .children.namedItem(meterName) as HTMLInputElement;
  expect(input.value).toBe(text);
};

const errorInputQuantity = (container: HTMLElement) => {
  return container.getElementsByClassName("input-error").length;
};

test("create month report render", () => {
  const { container, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByTestId("btn-setstate")).toBeInTheDocument();
  expect(container.getElementsByClassName("create-month-report").length).toBe(
    0
  );
  fireEvent.click(getByTestId("btn-setstate"));
  expect(container.getElementsByClassName("input-element").length).toBe(7);
});

test("check input value", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  chekEnteredText("cold", "meters", container, "211000");
  chekEnteredText("hot", "meters", container, "211001");
  chekEnteredText("electricity", "meters", container, "211002");

  chekEnteredText("cold", "price", container, "24.04");
  chekEnteredText("hot", "price", container, "167.93");
  chekEnteredText("electricity", "price", container, "5.05");
  chekEnteredText("waterWaste", "price", container, "52.2");

  enterText("hot", "meters", container, "211002");
  chekEnteredText("hot", "meters", container, "211002");

  enterText("hot", "meters", container, "21as");
  chekEnteredText("hot", "meters", container, "21as");

  enterText("hot", "meters", container, "222222");
  chekEnteredText("hot", "meters", container, "222222");

  enterText("hot", "meters", container, "0");
  chekEnteredText("hot", "meters", container, "0");

  enterText("cold", "meters", container, "211002");
  chekEnteredText("cold", "meters", container, "211002");

  enterText("cold", "meters", container, "21as");
  chekEnteredText("cold", "meters", container, "21as");

  enterText("cold", "meters", container, "222222");
  chekEnteredText("cold", "meters", container, "222222");

  enterText("cold", "meters", container, "0");
  chekEnteredText("cold", "meters", container, "0");

  enterText("electricity", "meters", container, "211002");
  chekEnteredText("electricity", "meters", container, "211002");

  enterText("electricity", "meters", container, "21as");
  chekEnteredText("electricity", "meters", container, "21as");

  enterText("electricity", "meters", container, "222222");
  chekEnteredText("electricity", "meters", container, "222222");

  enterText("electricity", "meters", container, "0");
  chekEnteredText("electricity", "meters", container, "0");
});

test("errors", () => {
  const { container, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  fireEvent.click(getByTestId("btn-setstate"));
  chekEnteredText("cold", "meters", container, "211000");
  chekEnteredText("hot", "meters", container, "211001");
  chekEnteredText("electricity", "meters", container, "211002");
  expect(errorInputQuantity(container)).toBe(0);

  const buttonOK = getByTestId("btn-ok");
  expect(buttonOK).not.toBeDisabled();

  enterText("cold", "meters", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();

  enterText("hot", "meters", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();

  enterText("electricity", "meters", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(3);
  expect(buttonOK).toBeDisabled();

  enterText("hot", "meters", container, "211222");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();

  enterText("cold", "meters", container, "211");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();

  enterText("cold", "meters", container, "211111");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();

  enterText("electricity", "meters", container, "211333");
  expect(errorInputQuantity(container)).toBe(0);
  expect(buttonOK).not.toBeDisabled();
});

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
  PhysicalMeterName,
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
          cold: { value: 111, error: null },
          hot: { value: 222, error: null },
          electricity: { value: 333, error: null },
          waterWaste: { value: 444, error: null },
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
  meterName: PhysicalMeterName,
  container: HTMLElement,
  text: string
) => {
  const input = container
    .getElementsByClassName(`input-element ${meterName}`)[0]
    .children.namedItem(meterName) as HTMLInputElement;
  fireEvent.change(input, {
    target: { value: text },
  });
};

const chekEnteredText = (
  meterName: PhysicalMeterName,
  container: HTMLElement,
  text: string
) => {
  const input = container
    .getElementsByClassName(`input-element ${meterName}`)[0]
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
  expect(container.getElementsByClassName("input-element").length).toBe(3);
});

test("check input value", () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  chekEnteredText("cold", container, "211000");
  chekEnteredText("hot", container, "211001");
  chekEnteredText("electricity", container, "211002");

  enterText("hot", container, "211002");
  chekEnteredText("hot", container, "211002");

  enterText("hot", container, "21as");
  chekEnteredText("hot", container, "21as");

  enterText("hot", container, "222222");
  chekEnteredText("hot", container, "222222");

  enterText("hot", container, "0");
  chekEnteredText("hot", container, "0");

  enterText("cold", container, "211002");
  chekEnteredText("cold", container, "211002");

  enterText("cold", container, "21as");
  chekEnteredText("cold", container, "21as");

  enterText("cold", container, "222222");
  chekEnteredText("cold", container, "222222");

  enterText("cold", container, "0");
  chekEnteredText("cold", container, "0");

  enterText("electricity", container, "211002");
  chekEnteredText("electricity", container, "211002");

  enterText("electricity", container, "21as");
  chekEnteredText("electricity", container, "21as");

  enterText("electricity", container, "222222");
  chekEnteredText("electricity", container, "222222");

  enterText("electricity", container, "0");
  chekEnteredText("electricity", container, "0");
});

test("errors", () => {
  const { container, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  fireEvent.click(getByTestId("btn-setstate"));
  chekEnteredText("cold", container, "211000");
  chekEnteredText("hot", container, "211001");
  chekEnteredText("electricity", container, "211002");
  expect(errorInputQuantity(container)).toBe(0);

  const buttonOK = getByTestId("btn-ok");
  expect(buttonOK).not.toBeDisabled();

  enterText("cold", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();

  enterText("hot", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();

  enterText("electricity", container, "incorrect");
  expect(errorInputQuantity(container)).toBe(3);
  expect(buttonOK).toBeDisabled();

  enterText("hot", container, "211222");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();

  enterText("cold", container, "211");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();

  enterText("cold", container, "211111");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();

  enterText("electricity", container, "211333");
  expect(errorInputQuantity(container)).toBe(0);
  expect(buttonOK).not.toBeDisabled();
});

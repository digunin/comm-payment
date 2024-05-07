import React from "react";
import "@testing-library/jest-dom";
import CreateMonthReport from "./CreateMonthReport";
import {
  Months,
  testTotalReport,
} from "../../../store/payment/paymentReducer.utils";
import { fireEvent } from "@testing-library/react";
import { Price, setPriceState } from "../../../store/price/priceReducer";
import { oldPrices } from "../../../store/price/priceReducer.spec";
import { setPaymentsState } from "../../../store/payment/paymentReducer";
import { setInitialValues } from "../../../store/form/createMonthReportReducer";
import { errorsText } from "../errors/monthReportErrors";
import { renderWithProviderAndRouter } from "../../../utils";
import { PriceFieldName } from "../../../store/form/types";
import { useAppDispatch } from "../../../AppHooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import { pathNames } from "../../../route-paths";

const App = () => {
  const dispatch = useAppDispatch();
  const actualPrice: Price = oldPrices[4];
  const navigate = useNavigate();
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
    navigate(pathNames.create);
  };

  return (
    <>
      <Routes>
        <Route path={pathNames.create} element={<CreateMonthReport />} />
        <Route
          path={pathNames.home}
          element={
            <button data-testid="btn-setstate" onClick={setState}></button>
          }
        />
      </Routes>
    </>
  );
};

export type FormName = "meters" | "price";
const { lessThanPrevious, notInteger, notNumber, max2digitsAfterDot } =
  errorsText;
const errorNotFound = "error-not-found";

export const enterText = (
  meterName: PriceFieldName,
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

export const getEnteredText = (
  meterName: PriceFieldName,
  formName: FormName,
  container: HTMLElement
): string => {
  const input = container.getElementsByClassName(
    `${formName}-input-element ${meterName}`
  )[0] as HTMLInputElement;
  return input.value;
};

export const errorInputQuantity = (container: HTMLElement) => {
  return container.getElementsByClassName("input-error").length;
};

export const getError = (
  meterName: PriceFieldName,
  formName: FormName,
  container: HTMLElement
) => {
  const errorElement = container.getElementsByClassName(
    `${formName}-${meterName}-error-message`
  )[0];
  return errorElement?.textContent || errorNotFound;
};

test("create month report render", () => {
  const { container, getByTestId } = renderWithProviderAndRouter(<App />);
  expect(getByTestId("btn-setstate")).toBeInTheDocument();
  expect(container.getElementsByClassName("create-month-report").length).toBe(
    0
  );
  fireEvent.click(getByTestId("btn-setstate"));
  expect(container.getElementsByClassName("input-element").length).toBe(7);
});

test("check meters form input value", () => {
  const { container, getByTestId } = renderWithProviderAndRouter(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  expect(getEnteredText("cold", "meters", container)).toBe("211000");
  expect(getEnteredText("hot", "meters", container)).toBe("211001");
  expect(getEnteredText("electricity", "meters", container)).toBe("211002");
  enterText("hot", "meters", container, "211002");
  expect(getEnteredText("hot", "meters", container)).toBe("211002");

  enterText("hot", "meters", container, "21as");
  expect(getEnteredText("hot", "meters", container)).toBe("21as");

  enterText("hot", "meters", container, "222222");
  expect(getEnteredText("hot", "meters", container)).toBe("222222");

  enterText("hot", "meters", container, "0");
  expect(getEnteredText("hot", "meters", container)).toBe("0");

  enterText("cold", "meters", container, "211002");
  expect(getEnteredText("cold", "meters", container)).toBe("211002");

  enterText("cold", "meters", container, "21as");
  expect(getEnteredText("cold", "meters", container)).toBe("21as");

  enterText("cold", "meters", container, "222222");
  expect(getEnteredText("cold", "meters", container)).toBe("222222");

  enterText("cold", "meters", container, "0");
  expect(getEnteredText("cold", "meters", container)).toBe("0");

  enterText("electricity", "meters", container, "211002");
  expect(getEnteredText("electricity", "meters", container)).toBe("211002");

  enterText("electricity", "meters", container, "21as");
  expect(getEnteredText("electricity", "meters", container)).toBe("21as");

  enterText("electricity", "meters", container, "222222");
  expect(getEnteredText("electricity", "meters", container)).toBe("222222");

  enterText("electricity", "meters", container, "0");
  expect(getEnteredText("electricity", "meters", container)).toBe("0");
});

test("errors meters form", () => {
  const { container, getByTestId } = renderWithProviderAndRouter(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  expect(getEnteredText("cold", "meters", container)).toBe("211000");
  expect(getEnteredText("hot", "meters", container)).toBe("211001");
  expect(getEnteredText("electricity", "meters", container)).toBe("211002");
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
  const { container, getByTestId } = renderWithProviderAndRouter(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  expect(getEnteredText("cold", "price", container)).toBe("24.04");
  expect(getEnteredText("hot", "price", container)).toBe("167.93");
  expect(getEnteredText("electricity", "price", container)).toBe("5.05");
  expect(getEnteredText("waterWaste", "price", container)).toBe("52.2");

  const buttonOK = getByTestId("btn-ok");
  expect(buttonOK).not.toBeDisabled();

  enterText("cold", "price", container, "2233");
  expect(getEnteredText("cold", "price", container)).toBe("2233");
  enterText("hot", "price", container, ".5");
  expect(getEnteredText("hot", "price", container)).toBe("0.5");
  enterText("electricity", "price", container, "4455,");
  expect(getEnteredText("electricity", "price", container)).toBe("4455.");
  enterText("waterWaste", "price", container, ",788");
  expect(getEnteredText("waterWaste", "price", container)).toBe("0.788");
  expect(errorInputQuantity(container)).toBe(1);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "price", container)).toBe(errorNotFound);
  expect(getError("hot", "price", container)).toBe(errorNotFound);
  expect(getError("electricity", "price", container)).toBe(errorNotFound);
  expect(getError("waterWaste", "price", container)).toBe(max2digitsAfterDot);

  enterText("hot", "price", container, "767n.5654");
  expect(getEnteredText("hot", "price", container)).toBe("767n.5654");
  expect(errorInputQuantity(container)).toBe(2);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "price", container)).toBe(errorNotFound);
  expect(getError("hot", "price", container)).toBe(notNumber);
  expect(getError("electricity", "price", container)).toBe(errorNotFound);
  expect(getError("waterWaste", "price", container)).toBe(max2digitsAfterDot);

  enterText("electricity", "price", container, "74.5h67");
  expect(getEnteredText("electricity", "price", container)).toBe("74.5h67");
  expect(errorInputQuantity(container)).toBe(3);
  expect(buttonOK).toBeDisabled();
  expect(getError("cold", "price", container)).toBe(errorNotFound);
  expect(getError("hot", "price", container)).toBe(notNumber);
  expect(getError("electricity", "price", container)).toBe(notNumber);
  expect(getError("waterWaste", "price", container)).toBe(max2digitsAfterDot);
});

test("calendar", () => {
  const { getByTestId } = renderWithProviderAndRouter(<App />);
  fireEvent.click(getByTestId("btn-setstate"));
  const calendar = getByTestId("calendar");
  expect(calendar.getAttribute("value")).toEqual("2021-11-01");
  fireEvent.change(calendar, { target: { value: "2023-05-05" } });
  expect(calendar.getAttribute("value")).toEqual("2023-05-01");
});

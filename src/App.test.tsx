import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils";
import {
  enterText,
  checkEnteredText,
  getError,
  FormName,
  errorInputQuantity,
} from "./components/forms/create-month-report/CreateMonthReport.test";

test("renders starting page", () => {
  const { container, getByTestId } = renderWithProvider(<App />);

  expect(container.getElementsByClassName("start-page").length).toBe(1);
  expect(container.getElementsByClassName("info-text").length).toBe(1);
  expect(container.getElementsByClassName("btn-add-starting").length).toBe(1);
  expect(container.getElementsByClassName("global-report").length).toBe(0);

  fireEvent.click(getByTestId("btn-add-starting"));

  expect(container.getElementsByClassName("start-page").length).toBe(0);
  expect(container.getElementsByClassName("info-text").length).toBe(0);
  expect(container.getElementsByClassName("btn-add-starting").length).toBe(0);
  expect(container.getElementsByClassName("global-report").length).toBe(1);
});

test("report-blocks render", () => {
  const { container, getByTestId, getByText } = renderWithProvider(<App />);
  expect(container.getElementsByClassName("start-page").length).toBe(1);
  fireEvent.click(getByTestId("btn-add-testTotalReport"));
  expect(container.getElementsByClassName("start-page").length).toBe(0);
  expect(container.getElementsByClassName("global-report").length).toBe(1);
  expect(container.getElementsByClassName("report-block").length).toBe(3);
  expect(container.getElementsByClassName("add-button").length).toBe(1);
  expect(container.getElementsByClassName("year-button").length).toBe(3);
  expect(container.getElementsByClassName("month-button").length).toBe(0);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(0);

  fireEvent.click(container.getElementsByClassName("year-2014")[0]);

  expect(container.getElementsByClassName("year-details").length).toBe(1);
  expect(container.getElementsByClassName("month-details").length).toBe(0);
  expect(container.getElementsByClassName("month-button").length).toBe(12);
  expect(container.getElementsByClassName("year-button selected").length).toBe(
    1
  );
  expect(container.getElementsByClassName("mnth-button selected").length).toBe(
    0
  );
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    8
  );
  expect(container.getElementsByClassName("add-button").length).toBe(1);
  expect(container.getElementsByClassName("meter").length).toBe(0);

  fireEvent.click(container.getElementsByClassName("year-2021")[0]);

  expect(container.getElementsByClassName("year-details").length).toBe(1);
  expect(container.getElementsByClassName("month-details").length).toBe(0);
  expect(container.getElementsByClassName("month-button").length).toBe(10);
  expect(container.getElementsByClassName("year-button selected").length).toBe(
    1
  );
  expect(container.getElementsByClassName("mnth-button selected").length).toBe(
    0
  );
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    6
  );
  expect(container.getElementsByClassName("add-button").length).toBe(2);
  expect(container.getElementsByClassName("meter").length).toBe(0);

  fireEvent.click(container.getElementsByClassName("month-oct")[0]);

  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  expect(container.getElementsByClassName("month-button").length).toBe(10);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    6
  );
  expect(container.getElementsByClassName("year-button selected").length).toBe(
    1
  );
  expect(container.getElementsByClassName("month-button selected").length).toBe(
    1
  );
  expect(container.getElementsByClassName("meter").length).toBe(4);
  expect(getByText("211000")).toBeInTheDocument();
  expect(getByText("211001")).toBeInTheDocument();
  expect(getByText("211002")).toBeInTheDocument();

  fireEvent.click(container.getElementsByClassName("month-aug")[0]);

  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  expect(container.getElementsByClassName("month-button").length).toBe(10);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    6
  );
  expect(container.getElementsByClassName("year-button selected").length).toBe(
    1
  );
  expect(container.getElementsByClassName("month-button selected").length).toBe(
    1
  );
  expect(container.getElementsByClassName("meter").length).toBe(4);
  expect(getByText("210800")).toBeInTheDocument();
  expect(getByText("210801")).toBeInTheDocument();
  expect(getByText("210802")).toBeInTheDocument();
});

test("create new record", () => {
  const { container, getByTestId, getByText } = renderWithProvider(<App />);

  fireEvent.click(getByTestId("btn-add-testTotalReport"));

  expect(container.getElementsByClassName("add-button")[0]).toBeInTheDocument();

  fireEvent.click(container.getElementsByClassName("add-button")[0]);

  expect(getByTestId("btn-ok")).toBeInTheDocument();
  expect(getByTestId("calendar")).toBeInTheDocument();

  expect(container.getElementsByClassName("global-report").length).toBe(0);
  expect(container.getElementsByClassName("report-block").length).toBe(0);
  expect(container.getElementsByClassName("add-button").length).toBe(0);
  expect(container.getElementsByClassName("year-button").length).toBe(0);
  expect(container.getElementsByClassName("month-button").length).toBe(0);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(0);

  expect(container.getElementsByClassName("App")[0].firstChild).toHaveClass(
    "create-month-report"
  );
  expect(container.getElementsByClassName("month-year-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    1
  );
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("submit-block").length).toBe(1);
  expect(getByTestId("calendar").getAttribute("value")).toEqual("2021-11-01");
  expect(errorInputQuantity(container)).toBe(0);
  expect(checkEnteredText("cold", "meters", container, "211000")).toBe(true);
  expect(checkEnteredText("hot", "meters", container, "211001")).toBe(true);
  expect(checkEnteredText("electricity", "meters", container, "211002")).toBe(
    true
  );
  expect(checkEnteredText("cold", "price", container, "24.04")).toBe(true);
  expect(checkEnteredText("hot", "price", container, "167.93")).toBe(true);
  expect(checkEnteredText("electricity", "price", container, "5.05")).toBe(
    true
  );
  expect(checkEnteredText("waterWaste", "price", container, "52.2")).toBe(true);
  expect(getByTestId("btn-ok")).not.toBeDisabled();
});

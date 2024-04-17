import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils";
import {
  enterText,
  checkEnteredText,
  errorInputQuantity,
  getError,
} from "./components/forms/create-month-report/CreateMonthReport.test";
import { errorsText } from "./components/forms/errors/monthReportErrors";

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
  const { container, getByTestId, queryAllByText } = renderWithProvider(
    <App />
  );
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
  expect(container.getElementsByClassName("meter").length).toBe(5);
  expect(queryAllByText("211000").length).toBe(2);
  expect(queryAllByText("211001").length).toBe(2);
  expect(queryAllByText("211002").length).toBe(2);

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
  expect(container.getElementsByClassName("meter").length).toBe(5);
  expect(queryAllByText("210800").length).toBe(2);
  expect(queryAllByText("210801").length).toBe(2);
  expect(queryAllByText("210802").length).toBe(2);
});

test("create new record", () => {
  const { container, getByTestId } = renderWithProvider(<App />);

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

  fireEvent.click(getByTestId("btn-ok"));

  expect(container.getElementsByClassName("create-month-report").length).toBe(
    0
  );
  expect(container.getElementsByClassName("global-report").length).toBe(1);

  fireEvent.click(container.getElementsByClassName("year-2021")[0]);
  expect(container.getElementsByClassName("year-button").length).toBe(3);
  expect(container.getElementsByClassName("month-button").length).toBe(11);
  expect(container.getElementsByClassName("add-button").length).toBe(2);

  fireEvent.click(container.getElementsByClassName("month-nov")[0]);

  let paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[8].innerHTML).toBe("0");
  expect(paragraphs[13].innerHTML).toBe("0");
  expect(paragraphs[18].innerHTML).toBe("0");
  expect(paragraphs[23].innerHTML).toBe("0");

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  fireEvent.change(getByTestId("calendar"), {
    target: { value: "2022-02-01" },
  });
  enterText("cold", "meters", container, "211003");
  enterText("hot", "meters", container, "211002");
  enterText("electricity", "meters", container, "211099");
  expect(getByTestId("btn-ok")).not.toBeDisabled();

  fireEvent.click(getByTestId("btn-ok"));

  expect(container.getElementsByClassName("year-button").length).toBe(4);

  expect(container.getElementsByClassName("month-button").length).toBe(2);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    1
  );

  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[8].innerHTML).toBe("3");
  expect(paragraphs[13].innerHTML).toBe("1");
  expect(paragraphs[18].innerHTML).toBe("97");
  expect(paragraphs[23].innerHTML).toBe("4");

  fireEvent.click(container.getElementsByClassName("year-2021")[0]);

  expect(container.getElementsByClassName("month-button").length).toBe(11);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    6
  );
});

test("edit record", () => {
  const { container, getByTestId, getByText } = renderWithProvider(<App />);

  fireEvent.click(getByTestId("btn-add-testTotalReport"));

  fireEvent.click(container.getElementsByClassName("year-2014")[0]);
  fireEvent.click(container.getElementsByClassName("month-nov")[0]);
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    0
  );

  fireEvent.click(getByTestId("btn-cancel"));

  fireEvent.click(container.getElementsByClassName("year-2014")[0]);
  fireEvent.click(container.getElementsByClassName("month-dec")[0]);
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    0
  );

  fireEvent.click(getByTestId("btn-cancel"));

  fireEvent.click(container.getElementsByClassName("year-2016")[0]);
  fireEvent.click(container.getElementsByClassName("month-jan")[0]);
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    0
  );

  fireEvent.click(getByTestId("btn-cancel"));

  fireEvent.click(container.getElementsByClassName("year-2016")[0]);
  fireEvent.click(container.getElementsByClassName("month-sep")[0]);
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    0
  );

  fireEvent.click(getByTestId("btn-cancel"));

  fireEvent.click(container.getElementsByClassName("year-2021")[0]);
  fireEvent.click(container.getElementsByClassName("month-aug")[0]);
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    0
  );

  fireEvent.click(getByTestId("btn-cancel"));

  fireEvent.click(container.getElementsByClassName("year-2021")[0]);
  fireEvent.click(container.getElementsByClassName("month-oct")[0]);
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("price-form").length).toBe(1);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    1
  );
  expect(errorInputQuantity(container)).toBe(0);
  enterText("cold", "meters", container, "210900");
  enterText("hot", "meters", container, "210900");
  enterText("electricity", "meters", container, "210900");
  expect(errorInputQuantity(container)).toBe(0);
  enterText("cold", "meters", container, "210800");
  enterText("hot", "meters", container, "210801");
  enterText("electricity", "meters", container, "210802");
  expect(errorInputQuantity(container)).toBe(0);
  enterText("cold", "meters", container, "210799");
  enterText("hot", "meters", container, "210800");
  enterText("electricity", "meters", container, "210801");
  expect(errorInputQuantity(container)).toBe(3);
  expect(getError("cold", "meters", container)).toBe(
    errorsText.lessThanPrevious
  );
  expect(getError("hot", "meters", container)).toBe(
    errorsText.lessThanPrevious
  );
  expect(getError("electricity", "meters", container)).toBe(
    errorsText.lessThanPrevious
  );

  fireEvent.click(getByTestId("btn-cancel"));
  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  fireEvent.click(getByTestId("btn-ok"));

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  fireEvent.change(getByTestId("calendar"), {
    target: { value: "2022-02-01" },
  });
  enterText("cold", "meters", container, "211005");
  enterText("hot", "meters", container, "211004");
  enterText("electricity", "meters", container, "211053");
  fireEvent.click(getByTestId("btn-ok"));
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  let paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[8].innerHTML).toBe("5");
  expect(paragraphs[13].innerHTML).toBe("3");
  expect(paragraphs[18].innerHTML).toBe("51");
  expect(paragraphs[23].innerHTML).toBe("8");

  expect(paragraphs[10].innerHTML).toBe("120.2");
  expect(paragraphs[15].innerHTML).toBe("503.79");
  expect(paragraphs[20].innerHTML).toBe("257.55");
  expect(paragraphs[25].innerHTML).toBe("417.6");
  expect(paragraphs[27].innerHTML).toBe("1299.14");

  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  enterText("cold", "meters", container, "211003");
  enterText("hot", "meters", container, "211003");

  enterText("hot", "price", container, "168.93");
  enterText("electricity", "price", container, "5.09");
  enterText("waterWaste", "price", container, "53.03");

  fireEvent.click(getByTestId("btn-ok"));
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).not.toBeDisabled();

  expect(container.getElementsByClassName("payment").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("show-all-payments")[0]);
  expect(container.getElementsByClassName("payment").length).toBe(2);
  expect(container.getElementsByClassName("pos")[0]).toBeInTheDocument();
  expect(container.getElementsByClassName("pos")[0].innerHTML).toBe(
    "вы переплатили: 364.42"
  );
  fireEvent.click(container.getElementsByClassName("show-all-payments")[0]);
  expect(container.getElementsByClassName("payment").length).toBe(1);

  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[8].innerHTML).toBe("3");
  expect(paragraphs[13].innerHTML).toBe("2");
  expect(paragraphs[18].innerHTML).toBe("51");
  expect(paragraphs[23].innerHTML).toBe("5");

  expect(paragraphs[10].innerHTML).toBe("72.12");
  expect(paragraphs[15].innerHTML).toBe("337.86");
  expect(paragraphs[20].innerHTML).toBe("259.59");
  expect(paragraphs[25].innerHTML).toBe("265.15");
  expect(paragraphs[27].innerHTML).toBe("934.72");

  fireEvent.click(container.getElementsByClassName("show-all-payments")[0]);

  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(checkEnteredText("cold", "price", container, "24.04"));
  expect(checkEnteredText("hot", "price", container, "168.93"));
  expect(checkEnteredText("electricity", "price", container, "5.09"));
  expect(checkEnteredText("waterWaste", "price", container, "53.03"));

  expect(checkEnteredText("cold", "meters", container, "211003"));
  expect(checkEnteredText("hot", "meters", container, "211003"));
  expect(checkEnteredText("electricity", "meters", container, "211053"));

  fireEvent.click(getByTestId("btn-cancel"));
  expect(container.getElementsByClassName("payment").length).toBe(2);

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  expect(checkEnteredText("cold", "price", container, "24.04"));
  expect(checkEnteredText("hot", "price", container, "168.93"));
  expect(checkEnteredText("electricity", "price", container, "5.09"));
  expect(checkEnteredText("waterWaste", "price", container, "53.03"));

  fireEvent.click(getByTestId("btn-cancel"));
  expect(container.getElementsByClassName("payment").length).toBe(2);

  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  enterText("waterWaste", "price", container, "55");
  fireEvent.click(getByTestId("btn-ok"));
  expect(container.getElementsByClassName("payment").length).toBe(3);

  expect(container.getElementsByClassName("neg")[0]).toBeInTheDocument();
  expect(container.getElementsByClassName("neg")[0].innerHTML).toBe(
    "нужно доплатить: 9.85"
  );

  fireEvent.click(container.getElementsByClassName("payment")[0]);
  expect(container.getElementsByClassName("pos")[0]).toBeInTheDocument();
  expect(container.getElementsByClassName("pos")[0].innerHTML).toBe(
    "вы переплатили: 354.57"
  );
});

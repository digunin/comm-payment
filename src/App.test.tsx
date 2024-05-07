import React from "react";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProviderAndRouter } from "./utils/rtl-render-helper";
import {
  enterText,
  getEnteredText,
  errorInputQuantity,
  getError,
} from "./components/forms/create-month-report/CreateMonthReport.test";
import { errorsText } from "./components/forms/errors/monthReportErrors";
import { testState } from "./utils/values";

const getCheckboxes = (container: HTMLElement) => {
  const all = Array.from(container.getElementsByTagName("input")).filter(
    (input) => input.getAttribute("type") === "checkbox"
  );
  const checked = all.filter((input) => input.checked === true);
  const disabled = all.filter((input) => input.disabled === true);
  return { all, checked, disabled };
};

test("renders starting page", () => {
  const { container, getByTestId } = renderWithProviderAndRouter(<App />);

  expect(container.getElementsByClassName("start-page").length).toBe(1);
  expect(container.getElementsByClassName("info-text").length).toBe(1);
  expect(container.getElementsByClassName("btn-add-starting").length).toBe(1);
  expect(container.getElementsByClassName("global-report").length).toBe(0);

  fireEvent.click(getByTestId("btn-add-starting"));

  expect(container.getElementsByClassName("start-page").length).toBe(0);
  expect(container.getElementsByClassName("info-text").length).toBe(0);
  expect(container.getElementsByClassName("btn-add-starting").length).toBe(0);
  expect(container.getElementsByClassName("add-initial-readings").length).toBe(
    1
  );
});

test("report-blocks render", () => {
  const { container, queryAllByText } = renderWithProviderAndRouter(
    <App testState={testState} />
  );
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
  const { container, getByTestId } = renderWithProviderAndRouter(
    <App testState={testState} />
  );

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
  expect(getEnteredText("cold", "meters", container)).toBe("211000");
  expect(getEnteredText("hot", "meters", container)).toBe("211001");
  expect(getEnteredText("electricity", "meters", container)).toBe("211002");
  expect(getEnteredText("cold", "price", container)).toBe("24.04");
  expect(getEnteredText("hot", "price", container)).toBe("167.93");
  expect(getEnteredText("electricity", "price", container)).toBe("5.05");
  expect(getEnteredText("waterWaste", "price", container)).toBe("52.2");
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
  const { container, getByTestId } = renderWithProviderAndRouter(
    <App testState={testState} />
  );

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
  let chb = getCheckboxes(container);
  expect(chb.all.length).toBe(4);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("4,7,11,12");
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("11");
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("11");

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
  chb = getCheckboxes(container);
  expect(chb.all.length).toBe(4);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("4,7,11,12");
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("12");

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
  chb = getCheckboxes(container);
  expect(chb.all.length).toBe(4);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("1,5,8,9");
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("1");

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
  chb = getCheckboxes(container);
  expect(chb.all.length).toBe(4);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("1,5,8,9");
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("9");

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
  chb = getCheckboxes(container);
  expect(chb.all.length).toBe(4);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("5,6,8,10");
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("8");

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
  chb = getCheckboxes(container);
  expect(chb.all.length).toBe(4);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("5,6,8,10");
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("10");

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
  expect(container.getElementsByClassName("positive")[0]).toBeInTheDocument();
  expect(container.getElementsByClassName("positive")[0].innerHTML).toBe(
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
  expect(getEnteredText("cold", "price", container)).toBe("24.04");
  expect(getEnteredText("hot", "price", container)).toBe("168.93");
  expect(getEnteredText("electricity", "price", container)).toBe("5.09");
  expect(getEnteredText("waterWaste", "price", container)).toBe("53.03");

  expect(getEnteredText("cold", "meters", container)).toBe("211003");
  expect(getEnteredText("hot", "meters", container)).toBe("211003");
  expect(getEnteredText("electricity", "meters", container)).toBe("211053");

  fireEvent.click(getByTestId("btn-cancel"));
  expect(container.getElementsByClassName("payment").length).toBe(2);

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  expect(getEnteredText("cold", "price", container)).toBe("24.04");
  expect(getEnteredText("hot", "price", container)).toBe("168.93");
  expect(getEnteredText("electricity", "price", container)).toBe("5.09");
  expect(getEnteredText("waterWaste", "price", container)).toBe("53.03");

  fireEvent.click(getByTestId("btn-cancel"));
  expect(container.getElementsByClassName("payment").length).toBe(2);

  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  enterText("waterWaste", "price", container, "55");
  fireEvent.click(getByTestId("btn-ok"));
  expect(container.getElementsByClassName("payment").length).toBe(3);

  expect(container.getElementsByClassName("negative")[0]).toBeInTheDocument();
  expect(container.getElementsByClassName("negative")[0].innerHTML).toBe(
    "нужно доплатить: 9.85"
  );

  fireEvent.click(container.getElementsByClassName("payment")[0]);
  expect(container.getElementsByClassName("positive")[0]).toBeInTheDocument();
  expect(container.getElementsByClassName("positive")[0].innerHTML).toBe(
    "вы переплатили: 354.57"
  );
});

test("multiple price edit", () => {
  const { container, getByTestId } = renderWithProviderAndRouter(
    <App testState={testState} />
  );

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  fireEvent.click(getByTestId("btn-ok"));

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
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

  fireEvent.click(container.getElementsByClassName("add-button")[0]);
  fireEvent.change(getByTestId("calendar"), {
    target: { value: "2022-02-01" },
  });
  enterText("cold", "meters", container, "211008");
  enterText("hot", "meters", container, "211006");
  enterText("electricity", "meters", container, "211093");
  fireEvent.click(getByTestId("btn-ok"));
  expect(
    container.getElementsByClassName("show-all-payments")[0]
  ).toBeDisabled();
  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[8].innerHTML).toBe("3");
  expect(paragraphs[13].innerHTML).toBe("2");
  expect(paragraphs[18].innerHTML).toBe("40");
  expect(paragraphs[23].innerHTML).toBe("5");

  expect(paragraphs[10].innerHTML).toBe("72.12");
  expect(paragraphs[15].innerHTML).toBe("335.86");
  expect(paragraphs[20].innerHTML).toBe("202");
  expect(paragraphs[25].innerHTML).toBe("261");
  expect(paragraphs[27].innerHTML).toBe("870.98");

  fireEvent.click(container.getElementsByClassName("edit-month-report")[0]);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    1
  );
  let chb = getCheckboxes(container);
  expect(chb.all.length).toBe(1);
  expect(chb.checked.length).toBe(1);
  expect(chb.disabled.length).toBe(1);
  expect(chb.checked[0]).toBe(chb.disabled[0]);
  expect((chb.checked[0].nextSibling as HTMLElement).innerHTML).toBe("2");
  expect(container.getElementsByClassName("header").length).toBe(4);
  const H2021 = container.getElementsByClassName("header")[2];
  fireEvent.click(H2021);
  chb = getCheckboxes(container);
  expect(chb.all.length).toBe(7);
  expect(
    chb.all
      .map((input) => (input.nextSibling as HTMLElement).innerHTML)
      .join(",")
  ).toBe("5,6,8,10,11,12,2");
  fireEvent.click(chb.all[4]);
  expect(container.getElementsByClassName("meter-readings-form").length).toBe(
    0
  );
  fireEvent.click(chb.all[5]);
  chb = getCheckboxes(container);
  expect(chb.checked.length).toBe(3);
  expect(chb.disabled.length).toBe(1);
  enterText("cold", "price", container, "30");
  enterText("hot", "price", container, "200");
  enterText("electricity", "price", container, "10");
  enterText("waterWaste", "price", container, "55");
  fireEvent.click(getByTestId("btn-ok"));
  fireEvent.click(container.getElementsByClassName("year-2021")[0]);
  fireEvent.click(container.getElementsByClassName("month-oct")[0]);
  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[9].innerHTML).toBe("24.04");
  expect(paragraphs[14].innerHTML).toBe("167.93");
  expect(paragraphs[19].innerHTML).toBe("5.05");
  expect(paragraphs[24].innerHTML).toBe("52.2");

  fireEvent.click(container.getElementsByClassName("month-nov")[0]);
  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[9].innerHTML).toBe("30");
  expect(paragraphs[14].innerHTML).toBe("200");
  expect(paragraphs[19].innerHTML).toBe("10");
  expect(paragraphs[24].innerHTML).toBe("55");

  fireEvent.click(container.getElementsByClassName("month-nov")[0]);
  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[9].innerHTML).toBe("30");
  expect(paragraphs[14].innerHTML).toBe("200");
  expect(paragraphs[19].innerHTML).toBe("10");
  expect(paragraphs[24].innerHTML).toBe("55");

  expect(paragraphs[10].innerHTML).toBe("0");
  expect(paragraphs[15].innerHTML).toBe("0");
  expect(paragraphs[20].innerHTML).toBe("0");
  expect(paragraphs[25].innerHTML).toBe("0");
  expect(paragraphs[27].innerHTML).toBe("0");

  fireEvent.click(container.getElementsByClassName("month-dec")[0]);
  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[9].innerHTML).toBe("30");
  expect(paragraphs[14].innerHTML).toBe("200");
  expect(paragraphs[19].innerHTML).toBe("10");
  expect(paragraphs[24].innerHTML).toBe("55");

  expect(paragraphs[10].innerHTML).toBe("150");
  expect(paragraphs[15].innerHTML).toBe("600");
  expect(paragraphs[20].innerHTML).toBe("510");
  expect(paragraphs[25].innerHTML).toBe("440");
  expect(paragraphs[27].innerHTML).toBe("1700");

  fireEvent.click(container.getElementsByClassName("year-2022")[0]);
  fireEvent.click(container.getElementsByClassName("month-feb")[0]);
  paragraphs = container
    .getElementsByClassName("month-details")[0]
    .getElementsByTagName("p");
  expect(paragraphs[9].innerHTML).toBe("30");
  expect(paragraphs[14].innerHTML).toBe("200");
  expect(paragraphs[19].innerHTML).toBe("10");
  expect(paragraphs[24].innerHTML).toBe("55");

  expect(paragraphs[10].innerHTML).toBe("90");
  expect(paragraphs[15].innerHTML).toBe("400");
  expect(paragraphs[20].innerHTML).toBe("400");
  expect(paragraphs[25].innerHTML).toBe("275");
  expect(paragraphs[27].innerHTML).toBe("1165");

  fireEvent.click(container.getElementsByClassName("show-all-payments")[0]);
  expect(container.getElementsByClassName("negative")[0].innerHTML).toBe(
    "нужно доплатить: 294.02"
  );

  fireEvent.click(container.getElementsByClassName("year-2021")[0]);
  fireEvent.click(container.getElementsByClassName("month-dec")[0]);
  fireEvent.click(container.getElementsByClassName("show-all-payments")[0]);
  expect(container.getElementsByClassName("negative")[0].innerHTML).toBe(
    "нужно доплатить: 400.86"
  );
});

test("loadState", async () => {
  const { container, getByText } = renderWithProviderAndRouter(<App />);
  expect(
    getByText("Для начала нужно установить начальные значения счетчиков")
  ).toBeInTheDocument();
  expect(container.getElementsByClassName("add-button").length).toBe(0);
  await waitFor(() =>
    expect(
      container.getElementsByClassName("global-report")[0]
    ).toBeInTheDocument()
  );
  expect(container.getElementsByClassName("start-page").length).toBe(0);
  expect(container.getElementsByClassName("add-button").length).not.toBe(0);
});

test("add initial readings", () => {
  const { container } = renderWithProviderAndRouter(<App />);
  expect(
    screen.getByText(
      /Для начала нужно установить начальные значения счетчиков/i
    )
  ).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Добавить стартовые показания счетчиков/i));
  expect(
    screen.getByText(/Введите начальные показания счетчиков/i)
  ).toBeInTheDocument();
  enterText("cold", "meters", container, "4");
  enterText("hot", "meters", container, "-2");
  enterText("electricity", "meters", container, "55");
  fireEvent.click(screen.getByText(/ok/i));
  fireEvent.click(screen.getByTitle(/Добавить новую запись/i));
  expect(getEnteredText("cold", "meters", container)).toBe("4");
  expect(getEnteredText("hot", "meters", container)).toBe("2");
  expect(getEnteredText("electricity", "meters", container)).toBe("55");
});

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "../../store";
import ReportPage from "./ReportPage";
import { testTotalReport } from "../../store/payment/paymentReducer.utils";
import { oldPrices } from "../../store/price/priceReducer.spec";
import { setPaymentsState } from "../../store/payment/paymentReducer";
import { Price, setPriceState } from "../../store/price/priceReducer";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const actualPrice: Price = oldPrices[4];
  const setState = () => {
    dispatch(setPaymentsState(testTotalReport));
    dispatch(setPriceState({ actualPrice, oldPrices: [] }));
  };
  return (
    <>
      <ReportPage />
      <button data-testid="btn-setstate" onClick={setState}></button>
    </>
  );
};

test("renders report page", () => {
  const { container, getByTestId, queryByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(container.firstChild).toHaveClass("global-report");
  expect(container.getElementsByClassName("years-list").length).toBe(1);
  expect(container.getElementsByClassName("year-button").length).toBe(1);
  expect(
    container.getElementsByClassName("year-button add-button").length
  ).toBe(1);
  expect(container.getElementsByClassName("year-button selected").length).toBe(
    0
  );
  fireEvent.click(getByTestId("btn-setstate"));
  expect(container.getElementsByClassName("year-button").length).toBe(4);
  expect(
    container.getElementsByClassName("year-button add-button").length
  ).toBe(1);
  expect(container.getElementsByClassName("year-button selected").length).toBe(
    0
  );
  expect(
    container.getElementsByClassName("month-button add-button").length
  ).toBe(0);

  // click year 2016
  fireEvent.click(container.getElementsByClassName("year-button year-2016")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(1);
  expect(container.getElementsByClassName("month-details").length).toBe(0);
  expect(
    container.getElementsByClassName("year-button year-2014")[0]
  ).not.toHaveClass("selected");
  expect(
    container.getElementsByClassName("year-button year-2016")[0]
  ).toHaveClass("selected");
  expect(
    container.getElementsByClassName("year-button year-2021")[0]
  ).not.toHaveClass("selected");
  expect(container.getElementsByClassName("month-button").length).toBe(9);
  expect(
    container.getElementsByClassName("month-button add-button").length
  ).toBe(0);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    5
  );
  expect(container.getElementsByClassName("month-jan").length).toBe(1);
  expect(container.getElementsByClassName("month-jan")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-feb").length).toBe(0);
  expect(container.getElementsByClassName("month-mar").length).toBe(0);
  expect(container.getElementsByClassName("month-apr").length).toBe(0);
  expect(container.getElementsByClassName("month-may").length).toBe(1);
  expect(container.getElementsByClassName("month-may")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-jun").length).toBe(0);
  expect(container.getElementsByClassName("month-jul").length).toBe(0);
  expect(container.getElementsByClassName("month-aug").length).toBe(1);
  expect(container.getElementsByClassName("month-aug")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-sep").length).toBe(1);
  expect(container.getElementsByClassName("month-sep")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-oct").length).toBe(0);
  expect(container.getElementsByClassName("month-nov").length).toBe(0);
  expect(container.getElementsByClassName("month-dec").length).toBe(0);

  fireEvent.click(container.getElementsByClassName("month-may")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-jan")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-aug")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-sep")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);

  // click year 2014
  fireEvent.click(container.getElementsByClassName("year-button year-2014")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(1);
  expect(container.getElementsByClassName("month-details").length).toBe(0);
  expect(
    container.getElementsByClassName("year-button year-2014")[0]
  ).toHaveClass("selected");
  expect(
    container.getElementsByClassName("year-button year-2016")[0]
  ).not.toHaveClass("selected");
  expect(
    container.getElementsByClassName("year-button year-2021")[0]
  ).not.toHaveClass("selected");
  expect(container.getElementsByClassName("month-button").length).toBe(12);
  expect(
    container.getElementsByClassName("month-button add-button").length
  ).toBe(0);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    8
  );
  expect(container.getElementsByClassName("month-jan").length).toBe(0);
  expect(container.getElementsByClassName("month-feb").length).toBe(0);
  expect(container.getElementsByClassName("month-mar").length).toBe(0);
  expect(container.getElementsByClassName("month-apr").length).toBe(1);
  expect(container.getElementsByClassName("month-apr")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-may").length).toBe(0);
  expect(container.getElementsByClassName("month-jun").length).toBe(0);
  expect(container.getElementsByClassName("month-jul").length).toBe(1);
  expect(container.getElementsByClassName("month-jul")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-aug").length).toBe(0);
  expect(container.getElementsByClassName("month-sep").length).toBe(0);
  expect(container.getElementsByClassName("month-oct").length).toBe(0);
  expect(container.getElementsByClassName("month-nov").length).toBe(1);
  expect(container.getElementsByClassName("month-nov")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-dec").length).toBe(1);
  expect(container.getElementsByClassName("month-dec")[0]).not.toHaveClass(
    "selected"
  );

  fireEvent.click(container.getElementsByClassName("month-apr")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-jul")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-nov")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-dec")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);

  // click year 2021
  fireEvent.click(container.getElementsByClassName("year-button year-2021")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(1);
  expect(container.getElementsByClassName("month-details").length).toBe(0);
  expect(
    container.getElementsByClassName("year-button year-2014")[0]
  ).not.toHaveClass("selected");
  expect(
    container.getElementsByClassName("year-button year-2016")[0]
  ).not.toHaveClass("selected");
  expect(
    container.getElementsByClassName("year-button year-2021")[0]
  ).toHaveClass("selected");
  expect(container.getElementsByClassName("month-button").length).toBe(11);
  expect(
    container.getElementsByClassName("month-button add-button").length
  ).toBe(1);
  expect(container.getElementsByClassName("month-button disabled").length).toBe(
    6
  );
  expect(container.getElementsByClassName("month-jan").length).toBe(0);
  expect(container.getElementsByClassName("month-feb").length).toBe(0);
  expect(container.getElementsByClassName("month-mar").length).toBe(0);
  expect(container.getElementsByClassName("month-apr").length).toBe(0);
  expect(container.getElementsByClassName("month-may").length).toBe(1);
  expect(container.getElementsByClassName("month-may")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-jun").length).toBe(1);
  expect(container.getElementsByClassName("month-jun")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-jul").length).toBe(0);
  expect(container.getElementsByClassName("month-aug").length).toBe(1);
  expect(container.getElementsByClassName("month-aug")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-sep").length).toBe(0);
  expect(container.getElementsByClassName("month-oct").length).toBe(1);
  expect(container.getElementsByClassName("month-oct")[0]).not.toHaveClass(
    "selected"
  );
  expect(container.getElementsByClassName("month-nov").length).toBe(0);
  expect(container.getElementsByClassName("month-dec").length).toBe(0);

  fireEvent.click(container.getElementsByClassName("month-may")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-jun")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-aug")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
  fireEvent.click(container.getElementsByClassName("month-oct")[0]);
  expect(container.getElementsByClassName("year-details").length).toBe(0);
  expect(container.getElementsByClassName("month-details").length).toBe(1);
});

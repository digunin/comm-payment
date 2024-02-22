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

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isNewReport = !useSelector(selectStartReadings);
  const actualPrice: Price = oldPrices[4];
  const setState = () => {
    dispatch(setPaymentsState(testTotalReport));
    dispatch(setPriceState({ actualPrice, oldPrices: [] }));
  };

  return (
    <div>
      {!isNewReport && <CreateMonthReport />}
      <button data-testid="btn-setstate" onClick={setState}></button>
    </div>
  );
};

test("create month report render", () => {
  const { container, getByTestId, queryByText } = render(
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

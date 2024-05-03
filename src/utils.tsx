import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react";
import {
  MeterReadings,
  Months,
  price,
  testTotalReport,
} from "./store/payment/paymentReducer.utils";
import { Price } from "./store/price/priceReducer";
import { SerializedState } from "./store/app-storage";

export const renderWithProvider = (element: React.ReactElement) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  const wrapper = ({ children }: { children: React.ReactElement }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(element, { wrapper });
};

export function createFormInitialValue(
  month: Months,
  year: number,
  price: Price,
  readings: MeterReadings
) {
  return {
    metersInputFields: {
      cold: { value: readings.cold.totalValue, error: null },
      hot: { value: readings.hot.totalValue, error: null },
      electricity: { value: readings.electricity.totalValue, error: null },
    },
    priceInputFields: {
      cold: { value: price.cold / 100, error: null },
      hot: { value: price.hot / 100, error: null },
      electricity: { value: price.electricity / 100, error: null },
      waterWaste: { value: price.waterWaste / 100, error: null },
    },
    monthAndYearInputFields: {
      month: {
        value: month < 0 ? new Date().getMonth() : month,
        error: null,
      },
      year: {
        value: year < 0 ? new Date().getFullYear() : year,
        error: null,
      },
    },
  };
}

export const testState: SerializedState = {
  appModeState: {
    mode: "show-report",
  },
  paymentState: testTotalReport,
  priceState: {
    actualPrice: price,
    oldPrices: [],
  },
};

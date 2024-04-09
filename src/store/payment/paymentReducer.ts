import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  MeterReadings,
  Months,
  Payment,
  YearReport,
  calcPayment,
  getLatestMeterReadings,
  getPreviousYearsDesc,
} from "./paymentReducer.utils";
import { RootState } from "..";
import { Price } from "../price/priceReducer";

interface Selected {
  selectedYear: number | null;
  selectedMonth: Months | null;
}
export interface PaymentsState {
  startReadings: MeterReadings | null;
  // key is year
  [key: number]: YearReport;
  selected: Selected;
}

type AddRecordPayload = {
  year: number;
  month: Months;
  readings: { [key in keyof MeterReadings]: number };
  price: Price;
};

const initialState: PaymentsState = {
  startReadings: null,
  selected: { selectedYear: null, selectedMonth: null },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addStartReadings: (state, action: PayloadAction<MeterReadings>) => {
      state.startReadings = action.payload;
    },
    addNewRecord: (state, action: PayloadAction<AddRecordPayload>) => {
      const { year, month, readings, price } = action.payload;
      const { latestReadings } = getLatestMeterReadings(state);
      let newReadings: MeterReadings = {
        cold: {
          totalValue: readings.cold,
          monthValue: readings.cold - latestReadings.cold.totalValue,
        },
        hot: {
          totalValue: readings.hot,
          monthValue: readings.hot - latestReadings.hot.totalValue,
        },
        electricity: {
          totalValue: readings.electricity,
          monthValue:
            readings.electricity - latestReadings.electricity.totalValue,
        },
        waterWaste: {
          totalValue: readings.cold + readings.hot,
          monthValue:
            readings.cold + readings.hot - latestReadings.waterWaste.totalValue,
        },
      };
      const newPayment: Payment = {
        date: new Date().getTime(),
        ...calcPayment(newReadings, price),
      };
      if (!state[year]) state[year] = {};
      state[year][month] = {
        meterReadings: newReadings,
        payment: newPayment,
        price,
        previousPayments: [],
      };
      state.selected = { selectedMonth: month, selectedYear: year };
    },
    setPaymentsState: (state, action: PayloadAction<PaymentsState>) => {
      return action.payload;
    },
    setSelected: (state, action: PayloadAction<Selected>) => {
      state.selected = action.payload;
    },
  },
});

export const selectStartReadings = (state: RootState) =>
  state.paymentState.startReadings;

export const selectYearsDesc = (state: RootState) =>
  getPreviousYearsDesc(state.paymentState);

export const selectLatestRecord = (state: RootState): MeterReadings => {
  return getLatestMeterReadings(state.paymentState).latestReadings;
};

export const selectDateOfLatestRecord = (
  state: RootState
): { latestYear: number; latestMonth: Months | -1 } => {
  const { latestMonth, latestYear } = getLatestMeterReadings(
    state.paymentState
  );
  return { latestYear, latestMonth };
};

export const { addStartReadings, setPaymentsState, setSelected, addNewRecord } =
  paymentSlice.actions;

export default paymentSlice.reducer;

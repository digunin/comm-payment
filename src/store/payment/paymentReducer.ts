import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  MeterReadings,
  MonthReport,
  Months,
  Payment,
  YearReport,
  calcNewReadings,
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
      let newReadings: MeterReadings = calcNewReadings(
        readings,
        latestReadings
      );
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
    recalcPayment: (state, acttion: PayloadAction<AddRecordPayload>) => {
      const { month, year, price, readings } = acttion.payload;
      const { latestReadings } = getLatestMeterReadings(state, month);
      const { payment, previousPayments } = state[year][month] as MonthReport;
      const newReadings = calcNewReadings(readings, latestReadings);
      state[year][month] = {
        meterReadings: newReadings,
        previousPayments: [...previousPayments, payment],
        price,
        payment: { ...payment, ...calcPayment(newReadings, price) },
      };
    },
  },
});

export const selectStartReadings = (state: RootState) =>
  state.paymentState.startReadings;

export const selectYearsDesc = (state: RootState) =>
  getPreviousYearsDesc(state.paymentState);

export const selectLatestRecord = (
  state: RootState,
  month?: Months
): MeterReadings => {
  return getLatestMeterReadings(state.paymentState, month).latestReadings;
};

export const selectDateOfLatestRecord = (
  state: RootState
): { latestYear: number; latestMonth: Months | -1 } => {
  const { latestMonth, latestYear } = getLatestMeterReadings(
    state.paymentState
  );
  return { latestYear, latestMonth };
};

export const {
  addStartReadings,
  setPaymentsState,
  setSelected,
  addNewRecord,
  recalcPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;

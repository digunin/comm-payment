import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  MeterReadings,
  Months,
  YearReport,
  getLatestMeterReadings,
  getPreviousYearsDesc,
} from "./paymentReducer.utils";
import { RootState } from "..";

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

export const { addStartReadings, setPaymentsState, setSelected } =
  paymentSlice.actions;

export default paymentSlice.reducer;

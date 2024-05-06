import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  MeterReadings,
  MonthReport,
  Months,
  YearReport,
  calcNewReadings,
  calcPayAmount,
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

type MultipleReacalcPayload = {
  checked: {
    [key: number]: Array<Months>;
  };
  newPrice: Price;
};

const initialState: PaymentsState = {
  startReadings: null,
  selected: { selectedYear: null, selectedMonth: null },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addStartReadings: (
      state,
      action: PayloadAction<{ [key in keyof MeterReadings]: number }>
    ) => {
      state.startReadings = calcNewReadings(action.payload);
    },
    addNewRecord: (state, action: PayloadAction<AddRecordPayload>) => {
      const { year, month, readings, price } = action.payload;
      const { latestReadings } = getLatestMeterReadings(state);
      let newReadings: MeterReadings = calcNewReadings(
        readings,
        latestReadings
      );
      if (!state[year]) state[year] = {};
      state[year][month] = {
        selected: -1,
        showAllPayments: false,
        lastPayment: {
          date: new Date().getTime(),
          meterReadings: newReadings,
          payAmount: { ...calcPayAmount(newReadings, price) },
          price,
        },
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
      const { lastPayment, previousPayments, showAllPayments } = state[year][
        month
      ] as MonthReport;
      const newReadings = calcNewReadings(readings, latestReadings);
      state[year][month] = {
        selected: lastPayment.date,
        showAllPayments,
        lastPayment: {
          date: new Date().getTime(),
          meterReadings: newReadings,
          price,
          payAmount: { ...calcPayAmount(newReadings, price) },
        },
        previousPayments: [...previousPayments, lastPayment],
      };
    },
    multiplePriceFix: (
      state,
      action: PayloadAction<MultipleReacalcPayload>
    ) => {
      const { checked, newPrice } = action.payload;
      for (const key of Object.keys(checked)) {
        const year = Number(key);
        for (const month of Object.values(checked[year])) {
          const { lastPayment, previousPayments, showAllPayments } = state[
            year
          ][month] as MonthReport;
          state[year][month] = {
            selected: lastPayment.date,
            showAllPayments,
            lastPayment: {
              date: new Date().getTime(),
              meterReadings: lastPayment.meterReadings,
              price: newPrice,
              payAmount: {
                ...calcPayAmount(lastPayment.meterReadings, newPrice),
              },
            },
            previousPayments: [...previousPayments, lastPayment],
          };
        }
      }
    },
    toggleAllPaymentsShow: (
      state,
      action: PayloadAction<{ month: Months; year: number }>
    ) => {
      const { month, year } = action.payload;
      if (state[year][month] !== undefined) {
        (state[year][month] as MonthReport).showAllPayments =
          !state[year][month]?.showAllPayments;
      }
    },
    setSelectedPayment: (
      state,
      action: PayloadAction<{ month: Months; year: number; date: number }>
    ) => {
      const { month, year, date } = action.payload;
      if (state[year][month] !== undefined) {
        (state[year][month] as MonthReport).selected = date;
      }
    },
  },
});

export const selectStartReadings = (state: RootState) =>
  state.paymentState.startReadings;

export const selectYearsDesc = (state: RootState) =>
  getPreviousYearsDesc(state.paymentState).join(",");

export const selectLatestRecord = (
  state: RootState,
  month?: Months
): MeterReadings => {
  return getLatestMeterReadings(state.paymentState, month).latestReadings;
};

export const selectYearOfLatestRecord = (state: RootState) => {
  return getLatestMeterReadings(state.paymentState).latestYear;
};

export const selectMonthOfLatestRecord = (state: RootState) => {
  return getLatestMeterReadings(state.paymentState).latestMonth;
};

export const selectListOfReports = (state: RootState) => {
  const { selectedMonth, selectedYear } = state.paymentState.selected;
  return JSON.stringify(
    Object.keys(state.paymentState)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => Number(key))
      .reduce((list, year) => {
        return {
          ...list,
          [year]: Object.keys(state.paymentState[year])
            .map((month) => Number(month))
            .reduce((acc, month) => {
              return {
                ...acc,
                [month]:
                  year === selectedYear && month === selectedMonth
                    ? true
                    : false,
              };
            }, {}),
        };
      }, {})
  );
};

export const {
  addStartReadings,
  setPaymentsState,
  setSelected,
  addNewRecord,
  recalcPayment,
  toggleAllPaymentsShow,
  setSelectedPayment,
  multiplePriceFix,
} = paymentSlice.actions;

export default paymentSlice.reducer;

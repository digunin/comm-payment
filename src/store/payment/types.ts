import { Price } from "../price/priceReducer";

export enum Months {
  jan = 0,
  feb,
  mar,
  apr,
  may,
  jun,
  jul,
  aug,
  sep,
  oct,
  nov,
  dec,
}

export type MeterReading = { totalValue: number; monthValue: number };

export type MeterReadings = {
  cold: MeterReading;
  hot: MeterReading;
  electricity: MeterReading;
  waterWaste: MeterReading;
};

export interface PayAmount extends Price {
  total: number;
}

export type Payment = {
  date: number;
  meterReadings: MeterReadings;
  price: Price;
  payAmount: PayAmount;
};

export type MonthReport = {
  showAllPayments: boolean;
  lastPayment: Payment;
  previousPayments: Array<Payment>;
  selected: number;
};

export type YearReport = { [key in Months]?: MonthReport };

export interface Selected {
  selectedYear: number | null;
  selectedMonth: Months | null;
}

export interface PaymentsState {
  startReadings: MeterReadings | null;
  // key is year
  [key: number]: YearReport;
  selected: Selected;
}

export type AddRecordPayload = {
  year: number;
  month: Months;
  readings: { [key in keyof MeterReadings]: number };
  price: Price;
};

export type MultipleReacalcPayload = {
  checked: {
    [key: number]: Array<Months>;
  };
  newPrice: Price;
};

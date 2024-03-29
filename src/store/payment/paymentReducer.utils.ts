import { PaymentsState } from "./paymentReducer";
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

type MeterReading = { totalValue: number; monthValue: number };

export type MeterReadings = {
  cold: MeterReading;
  hot: MeterReading;
  electricity: MeterReading;
  waterWaste: MeterReading;
};

interface Payment extends Price {
  date: Date;
  total: number;
}

interface MonthReport {
  meterReadings: MeterReadings;
  price?: Price;
  payment?: Payment;
  previousPayments?: Array<Payment>;
}

export type YearReport = { [key in Months]?: MonthReport };

export function getLatestMeterReadings(totalReport: PaymentsState): {
  latestYear: number;
  latestMonth: Months | -1;
  latestReadings: MeterReadings;
} {
  const years = getPreviousYearsDesc(totalReport);
  for (const year of years) {
    const result = getLatestMeterReadingsInYear(totalReport[year]);
    if (result) {
      return {
        latestYear: year,
        latestMonth: result.month,
        latestReadings: result.readings,
      };
    }
  }
  return {
    latestYear: -1,
    latestMonth: -1,
    latestReadings: totalReport.startReadings as MeterReadings,
  };
}

export function getLatestMeterReadingsInYear(
  yearReport: YearReport,
  start?: Months
): { readings: MeterReadings; month: Months } | null {
  if (start === Months.jan) return null;
  start = start ? start - 1 : Months.dec;
  for (let i = start; i >= Months.jan; i--) {
    if (i in yearReport) {
      return {
        readings: <MeterReadings>yearReport[i]?.meterReadings,
        month: i,
      };
    }
  }
  return null;
}

export function getPreviousYearsDesc(
  totalReport: PaymentsState,
  year?: number
): Array<number> {
  let yearsArray: Array<number> = Object.keys(totalReport)
    .filter((key) => isNaN(Number(key)) === false)
    .map((str) => Number(str));
  yearsArray.sort((a, b) => b - a);
  if (typeof year === "number") return yearsArray.filter((y) => y < year);
  return yearsArray;
}

export function getCurrentDate(): { year: number; month: Months } {
  const date = new Date();
  return { year: date.getFullYear(), month: date.getMonth() };
}

export const testTotalReport: PaymentsState = {
  startReadings: {
    cold: { monthValue: 0, totalValue: 101 },
    hot: { monthValue: 0, totalValue: 102 },
    electricity: { monthValue: 0, totalValue: 103 },
    waterWaste: { monthValue: 0, totalValue: 104 },
  },
  selected: { selectedYear: null, selectedMonth: null },
  2014: {
    [Months.apr]: {
      meterReadings: {
        cold: { monthValue: 140400, totalValue: 140400 },
        hot: { monthValue: 140401, totalValue: 140401 },
        electricity: { monthValue: 140402, totalValue: 140402 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.jul]: {
      meterReadings: {
        cold: { monthValue: 140700, totalValue: 140700 },
        hot: { monthValue: 140701, totalValue: 140701 },
        electricity: { monthValue: 140702, totalValue: 140702 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.nov]: {
      meterReadings: {
        cold: { monthValue: 141100, totalValue: 141100 },
        hot: { monthValue: 141101, totalValue: 141101 },
        electricity: { monthValue: 141102, totalValue: 141102 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.dec]: {
      meterReadings: {
        cold: { monthValue: 141200, totalValue: 141200 },
        hot: { monthValue: 141201, totalValue: 141201 },
        electricity: { monthValue: 141202, totalValue: 141202 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
  },
  2016: {
    [Months.jan]: {
      meterReadings: {
        cold: { monthValue: 160100, totalValue: 160100 },
        hot: { monthValue: 160101, totalValue: 160101 },
        electricity: { monthValue: 160102, totalValue: 160102 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.may]: {
      meterReadings: {
        cold: { monthValue: 160500, totalValue: 160500 },
        hot: { monthValue: 160501, totalValue: 160501 },
        electricity: { monthValue: 160502, totalValue: 160502 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.aug]: {
      meterReadings: {
        cold: { monthValue: 160800, totalValue: 160800 },
        hot: { monthValue: 160801, totalValue: 160801 },
        electricity: { monthValue: 160802, totalValue: 160802 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.sep]: {
      meterReadings: {
        cold: { monthValue: 160900, totalValue: 160900 },
        hot: { monthValue: 160901, totalValue: 160901 },
        electricity: { monthValue: 160902, totalValue: 0 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
  },
  2021: {
    [Months.may]: {
      meterReadings: {
        cold: { monthValue: 210500, totalValue: 210500 },
        hot: { monthValue: 210501, totalValue: 210501 },
        electricity: { monthValue: 210502, totalValue: 210502 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.jun]: {
      meterReadings: {
        cold: { monthValue: 210600, totalValue: 210600 },
        hot: { monthValue: 210601, totalValue: 210601 },
        electricity: { monthValue: 210602, totalValue: 210602 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.aug]: {
      meterReadings: {
        cold: { monthValue: 210800, totalValue: 210800 },
        hot: { monthValue: 210801, totalValue: 210801 },
        electricity: { monthValue: 210802, totalValue: 210802 },
        waterWaste: { monthValue: 0, totalValue: 0 },
      },
    },
    [Months.oct]: {
      meterReadings: {
        cold: { monthValue: 211000, totalValue: 211000 },
        hot: { monthValue: 211001, totalValue: 211001 },
        electricity: { monthValue: 211002, totalValue: 211002 },
        waterWaste: { monthValue: 0, totalValue: 422001 },
      },
    },
  },
};

import {
  MeterReadings,
  Months,
  PayAmount,
  PaymentsState,
  YearReport,
} from "../store/payment/types";
import { Price } from "../store/price/priceReducer";
import { zeroReadings } from "./values";

export function getLatestMeterReadings(
  totalReport: PaymentsState,
  month?: Months
): {
  latestYear: number;
  latestMonth: Months | -1;
  latestReadings: MeterReadings;
} {
  const years = getPreviousYearsDesc(totalReport);

  for (const year of years) {
    month = years.indexOf(year) === 0 ? month : undefined;
    const result = getLatestMeterReadingsInYear(totalReport[year], month);
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
        readings: <MeterReadings>yearReport[i]?.lastPayment.meterReadings,
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

export function calcPayAmount(
  readings: MeterReadings,
  price: Price
): Omit<PayAmount, "date"> {
  let payment = {
    cold: readings.cold.monthValue * price.cold,
    hot: readings.hot.monthValue * price.hot,
    electricity: readings.electricity.monthValue * price.electricity,
    waterWaste: readings.waterWaste.monthValue * price.waterWaste,
  };
  return {
    ...payment,
    total: Object.values(payment).reduce((acc, value) => acc + value),
  };
}

export function calcNewReadings(
  readings: { [key in keyof MeterReadings]: number },
  previousReadings?: MeterReadings
): MeterReadings {
  previousReadings = previousReadings ? previousReadings : zeroReadings;
  return {
    cold: {
      totalValue: readings.cold,
      monthValue: readings.cold - previousReadings.cold.totalValue,
    },
    hot: {
      totalValue: readings.hot,
      monthValue: readings.hot - previousReadings.hot.totalValue,
    },
    electricity: {
      totalValue: readings.electricity,
      monthValue:
        readings.electricity - previousReadings.electricity.totalValue,
    },
    waterWaste: {
      totalValue: readings.cold + readings.hot,
      monthValue:
        readings.cold + readings.hot - previousReadings.waterWaste.totalValue,
    },
  };
}

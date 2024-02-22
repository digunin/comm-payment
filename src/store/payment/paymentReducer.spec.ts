import { PaymentsState } from "./paymentReducer";
import {
  getPreviousYearsDesc,
  getLatestMeterReadingsInYear,
  Months,
  testTotalReport,
  getCurrentDate,
  getLatestMeterReadings,
} from "./paymentReducer.utils";

describe("paymentReducer utility function testing", () => {
  describe("sort by desc", () => {
    test("no args", () => {
      expect(getPreviousYearsDesc(testTotalReport)).toStrictEqual([
        2021, 2016, 2014,
      ]);
    });
    test("2021", () => {
      expect(getPreviousYearsDesc(testTotalReport, 2021)).toStrictEqual([
        2016, 2014,
      ]);
    });
    test("2013", () => {
      expect(getPreviousYearsDesc(testTotalReport, 2013)).toStrictEqual([]);
    });
    test("2014", () => {
      expect(getPreviousYearsDesc(testTotalReport, 2014)).toStrictEqual([]);
    });
  });

  describe("getLatestMeterReadingInYear", () => {
    test("2021, electricity", () => {
      expect(
        getLatestMeterReadingsInYear(testTotalReport[2021])?.readings
          .electricity.monthValue
      ).toBe(211002);
    });
    test("21, hot, september", () => {
      expect(
        getLatestMeterReadingsInYear(testTotalReport[2021], Months.sep)
          ?.readings.hot.monthValue
      ).toBe(210801);
    });
    test("2014, cold, march", () => {
      expect(
        getLatestMeterReadingsInYear(testTotalReport[2014], Months.mar)
      ).toBe(null);
    });
    test("2016, electricity, september", () => {
      expect(
        getLatestMeterReadingsInYear(testTotalReport[2016], Months.sep)
          ?.readings.electricity.monthValue
      ).toBe(160802);
    });
  });

  test("get latest meter readings", () => {
    const result = getLatestMeterReadings(testTotalReport);
    expect(result.latestYear).toBe(2021);
    expect(result.latestMonth).toBe(Months.oct);
    expect(result.latestReadings.cold.totalValue).toBe(211000);
    expect(result.latestReadings.hot.totalValue).toBe(211001);
    expect(result.latestReadings.electricity.totalValue).toBe(211002);
    expect(result.latestReadings.waterWaste.totalValue).toBe(0);
  });

  test("current date", () => {
    const current_date = getCurrentDate();
    expect(current_date.year).toBe(2024);
    expect(current_date.month).toBe(Months.feb);
  });
});

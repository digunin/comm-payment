import { MeterReadings, Months } from "../store/payment/types";
import { Price } from "../store/price/priceReducer";

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

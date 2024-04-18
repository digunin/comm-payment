import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Months } from "../../store/payment/paymentReducer.utils";

export const useFormPayload = () => {
  const { metersInputFields, priceInputFields, monthAndYearInputFields } =
    useSelector((state: RootState) => state.createMonthReportState);

  const payload = {
    year: Number(monthAndYearInputFields.year.value),
    month: Number(monthAndYearInputFields.month.value) as Months,
    readings: {
      cold: Number(metersInputFields.cold.value),
      hot: Number(metersInputFields.hot.value),
      electricity: Number(metersInputFields.electricity.value),
      waterWaste: 0,
    },
    price: {
      cold: Number(priceInputFields.cold.value) * 100,
      hot: Number(priceInputFields.hot.value) * 100,
      electricity: Number(priceInputFields.electricity.value) * 100,
      waterWaste: Number(priceInputFields.waterWaste.value) * 100,
    },
  };
  return payload;
};

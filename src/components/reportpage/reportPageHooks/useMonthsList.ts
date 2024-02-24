import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  Months,
  YearReport,
} from "../../../store/payment/paymentReducer.utils";
import {
  selectLatestRecord,
  setSelected,
} from "../../../store/payment/paymentReducer";
import {
  setAllFields,
  toggleCreateMode,
} from "../../../store/form/createMonthReportReducer";
import { useSelected } from "./useSelected";

type returnedFromUseMonthsList = {
  fullYear: Array<number>;
  recordedMonths: Array<number>;
  onMonthButtonClick: (month: Months) => void;
  onAddButtonClick: () => void;
  selectedMonth: Months | null;
  selectedYear: number | null;
  isAddButtonNeed: boolean;
};

export function useMonthsList(): returnedFromUseMonthsList {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedYear, selectedMonth } = useSelected();

  const yearReport: YearReport = useSelector((state: RootState) =>
    selectedYear === null ? {} : state.paymentState[selectedYear]
  );

  const { latestYear, latestMonth } = useSelector(selectLatestRecord);
  let isAddButtonNeed = false;
  if (latestYear === selectedYear && latestMonth < Months.dec)
    isAddButtonNeed = true;
  const { latestReadings } = useSelector(selectLatestRecord);
  const { cold, hot, electricity } = latestReadings;
  const onMonthButtonClick = (month: Months) => {
    dispatch(setSelected({ selectedYear, selectedMonth: month }));
  };

  const onAddButtonClick = () => {
    dispatch(toggleCreateMode());
    dispatch(
      setAllFields({
        cold: { value: cold.totalValue, error: null },
        hot: { value: hot.totalValue, error: null },
        electricity: { value: electricity.totalValue, error: null },
      })
    );
  };

  const recordedMonths = Object.keys(yearReport).map((month) => Number(month));
  const fullYear =
    selectedYear === null || recordedMonths.length === 0
      ? []
      : Object.values(Months)
          .filter((month) => isNaN(Number(month)) === false)
          .map((month) => Number(month))
          .filter((month) => month <= Math.max(...recordedMonths));
  return {
    fullYear,
    recordedMonths,
    onMonthButtonClick,
    onAddButtonClick,
    selectedMonth,
    selectedYear,
    isAddButtonNeed,
  };
}

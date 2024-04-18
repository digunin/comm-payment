import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  Months,
  YearReport,
} from "../../../store/payment/paymentReducer.utils";
import {
  selectYearOfLatestRecord,
  selectMonthOfLatestRecord,
  setSelected,
} from "../../../store/payment/paymentReducer";
import { useSelected } from "./useSelected";

type returnedFromUseMonthsList = {
  fullYear: Array<number>;
  recordedMonths: Array<Months>;
  onMonthButtonClick: (month: Months) => void;
  selectedMonth: Months | null;
  selectedYear: number | null;
  isAddButtonNeed: boolean;
};

export function useMonthsList(): returnedFromUseMonthsList {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedYear, selectedMonth } = useSelected();

  const emptyReport = {};
  const yearReport: YearReport = useSelector((state: RootState) =>
    selectedYear === null ? emptyReport : state.paymentState[selectedYear]
  );

  const latestYear = useSelector(selectYearOfLatestRecord);
  const latestMonth = useSelector(selectMonthOfLatestRecord);
  let isAddButtonNeed = false;
  if (latestYear === selectedYear && latestMonth < Months.dec)
    isAddButtonNeed = true;
  const onMonthButtonClick = (month: Months) => {
    dispatch(setSelected({ selectedYear, selectedMonth: month }));
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
    selectedMonth,
    selectedYear,
    isAddButtonNeed,
  };
}

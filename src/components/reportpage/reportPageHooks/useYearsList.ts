import {
  selectYearsDesc,
  setSelected,
} from "../../../store/payment/paymentReducer";
import { useSelected } from "./useSelected";
import { useAppDispatch, useAppSelector } from "../../../AppHooks";

export function useYearsList() {
  const dispatch = useAppDispatch();

  const years = useAppSelector(selectYearsDesc)
    .split(",")
    .map((year) => Number(year));
  const { selectedYear } = useSelected();

  const onYearButtonClick = (year: number) => {
    dispatch(setSelected({ selectedYear: year, selectedMonth: null }));
  };

  return { years, selectedYear, onYearButtonClick };
}

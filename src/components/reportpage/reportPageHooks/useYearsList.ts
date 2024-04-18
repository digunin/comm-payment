import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import {
  selectYearsDesc,
  setSelected,
} from "../../../store/payment/paymentReducer";
import { useSelected } from "./useSelected";

export function useYearsList() {
  const dispatch = useDispatch<AppDispatch>();

  const years = useSelector(selectYearsDesc)
    .split(",")
    .map((year) => Number(year));
  const { selectedYear } = useSelected();

  const onYearButtonClick = (year: number) => {
    dispatch(setSelected({ selectedYear: year, selectedMonth: null }));
  };

  return { years, selectedYear, onYearButtonClick };
}

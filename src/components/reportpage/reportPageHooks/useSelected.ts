import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export function useSelected() {
  const selectedMonth = useSelector(
    (state: RootState) => state.paymentState.selected.selectedMonth
  );
  const selectedYear = useSelector(
    (state: RootState) => state.paymentState.selected.selectedYear
  );
  const selectedReport = useSelector((state: RootState) => {
    if (selectedMonth !== null)
      return state.paymentState[selectedYear as number][selectedMonth];
    return null;
  });
  return { selectedMonth, selectedYear, selectedReport };
}

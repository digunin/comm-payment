import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export function useSelected() {
  return useSelector((state: RootState) => {
    let selectedReport = null;
    const { selectedYear, selectedMonth } = state.paymentState.selected;
    if (selectedMonth !== null)
      selectedReport =
        state.paymentState[selectedYear as number][selectedMonth];
    return { selectedMonth, selectedYear, selectedReport };
  });
}

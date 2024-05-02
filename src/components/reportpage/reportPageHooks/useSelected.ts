import { useAppSelector } from "../../../AppHooks";

export function useSelected() {
  const selectedMonth = useAppSelector(
    (state) => state.paymentState.selected.selectedMonth
  );
  const selectedYear = useAppSelector(
    (state) => state.paymentState.selected.selectedYear
  );
  const selectedReport = useAppSelector((state) => {
    if (selectedMonth !== null)
      return state.paymentState[selectedYear as number][selectedMonth];
    return null;
  });
  return { selectedMonth, selectedYear, selectedReport };
}

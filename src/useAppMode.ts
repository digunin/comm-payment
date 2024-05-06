import { useAppSelector } from "./AppHooks";

export function useAppMode() {
  const { needSaving, mode } = useAppSelector((state) => state.appModeState);
  return {
    isMonthReportCreate: mode === "create-month-report",
    isStartingPage: mode === "starting-page",
    isReportShow: mode === "show-report",
    isMonthReportChange: mode === "change-month-report",
    isAddInitialReadings: mode === "add-starting",
    needSaving,
  };
}

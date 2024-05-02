import { useAppSelector } from "./AppHooks";

export function useAppMode() {
  const appMode = useAppSelector((state) => state.appModeState.mode);
  return {
    isMonthReportCreate: appMode === "create-month-report",
    isStartingPage: appMode === "starting-page",
    isReportShow: appMode === "show-report",
    isMonthReportChange: appMode === "change-month-report",
  };
}

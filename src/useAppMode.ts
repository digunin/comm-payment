import { RootState } from "./store/index";
import { useSelector } from "react-redux";

export function useAppMode() {
  const appMode = useSelector((state: RootState) => state.appModeState.mode);
  return {
    isMonthReportCreate: appMode === "create-month-report",
    isStartingPage: appMode === "starting-page",
    isReportShow: appMode === "show-report",
  };
}

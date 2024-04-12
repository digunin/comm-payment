import { useSelector } from "react-redux";
import { Months } from "../../store/payment/paymentReducer.utils";
import { useSelected } from "../reportpage/reportPageHooks/useSelected";
import { useLastRecord } from "./useLastRecord";
import { RootState } from "../../store";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

export const useMinReadings = () => {
  const { latestRecord } = useLastRecord();
  const { selectedMonth } = useSelected();
  const appMode = useSelector((state: RootState) => state.appModeState.mode);
  if (appMode === "change-month-report")
    return useSelector((state: RootState) =>
      selectLatestRecord(state, selectedMonth as Months)
    );
  return latestRecord;
};

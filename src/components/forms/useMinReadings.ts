import { Months } from "../../store/payment/paymentReducer.utils";
import { useSelected } from "../reportpage/reportPageHooks/useSelected";
import { useLastRecord } from "./useLastRecord";
import { selectLatestRecord } from "../../store/payment/paymentReducer";
import { useAppSelector } from "../../AppHooks";

export const useMinReadings = () => {
  const { latestRecord } = useLastRecord();
  const { selectedMonth } = useSelected();
  const appMode = useAppSelector((state) => state.appModeState.mode);
  if (appMode === "change-month-report")
    return useAppSelector((state) =>
      selectLatestRecord(state, selectedMonth as Months)
    );
  return latestRecord;
};

import { Months, zeroReadings } from "../../store/payment/paymentReducer.utils";
import { useSelected } from "../reportpage/reportPageHooks/useSelected";
import { useLastRecord } from "./useLastRecord";
import { selectLatestRecord } from "../../store/payment/paymentReducer";
import { useAppSelector } from "../../AppHooks";
import { useLocation } from "react-router-dom";
import { pathNames } from "../../route-paths";

export const useMinReadings = () => {
  const { latestRecord } = useLastRecord();
  const { selectedMonth } = useSelected();
  const { pathname } = useLocation();

  if (pathname === pathNames.edit)
    return useAppSelector((state) =>
      selectLatestRecord(state, selectedMonth as Months)
    );
  if (pathname == pathNames.addInitial) return zeroReadings;
  return latestRecord;
};

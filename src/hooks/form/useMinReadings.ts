import { useLocation } from "react-router-dom";
import { Months } from "../../store/payment/types";
import { zeroReadings } from "../../utils/values";
import { useSelected } from "../report-page/useSelected";
import { useLastRecord } from "./useLastRecord";
import { selectLatestRecord } from "../../store/payment/paymentReducer";
import { useAppSelector } from "../redux-hoks";
import { pathNames } from "../../utils/values";

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

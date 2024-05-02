import {
  selectLatestRecord,
  selectYearOfLatestRecord,
  selectMonthOfLatestRecord,
} from "../../store/payment/paymentReducer";
import { Months } from "../../store/payment/paymentReducer.utils";
import { useAppSelector } from "../../AppHooks";

export function useLastRecord() {
  const latestRecord = useAppSelector(selectLatestRecord);
  const latestYear = useAppSelector(selectYearOfLatestRecord);
  const latestMonth = useAppSelector(selectMonthOfLatestRecord);
  const [newMonth, newYear] =
    latestMonth === -1
      ? [-1, -1]
      : latestMonth === Months.dec
      ? [Months.jan, latestYear + 1]
      : [latestMonth + 1, latestYear];
  return { latestRecord, latestYear, latestMonth, newYear, newMonth };
}

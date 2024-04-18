import { useSelector } from "react-redux";
import {
  selectLatestRecord,
  selectYearOfLatestRecord,
  selectMonthOfLatestRecord,
} from "../../store/payment/paymentReducer";
import { Months } from "../../store/payment/paymentReducer.utils";

export function useLastRecord() {
  const latestRecord = useSelector(selectLatestRecord);
  const latestYear = useSelector(selectYearOfLatestRecord);
  const latestMonth = useSelector(selectMonthOfLatestRecord);
  const [newMonth, newYear] =
    latestMonth === -1
      ? [-1, -1]
      : latestMonth === Months.dec
      ? [Months.jan, latestYear + 1]
      : [latestMonth + 1, latestYear];
  return { latestRecord, latestYear, latestMonth, newYear, newMonth };
}

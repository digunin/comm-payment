import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

type returnedCreateMonthReport = {
  values: {
    hot: number;
    cold: number;
    electricity: number;
  };
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: "hot" | "cold" | "electricity"
  ) => void;
};

export function useCreateMonthReport(): returnedCreateMonthReport {
  const { latestReadings } = useSelector(selectLatestRecord);
  const { hot, cold, electricity } = latestReadings;
  const [values, setValues] = useState({
    hot: hot.totalValue,
    cold: cold.totalValue,
    electricity: electricity.totalValue,
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: "hot" | "cold" | "electricity"
  ) => {
    const inputed = Number(event.target.value);
    if (isNaN(inputed)) return;
    if (!Number.isInteger(inputed)) return;
    setValues({ ...values, [meterName]: inputed });
  };
  return { values, onChangeHandler };
}

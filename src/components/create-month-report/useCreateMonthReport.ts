import { AppDispatch, RootState } from "./../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  PhysicalMeters,
  setInputField,
} from "../../store/form/createMonthReportReducer";
import { selectIsValidForm } from "./../../store/form/createMonthReportReducer";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

type returnedCreateMonthReport = {
  values: {
    hot: number | string;
    cold: number | string;
    electricity: number | string;
  };
  errors: {
    hot: string | null;
    cold: string | null;
    electricity: string | null;
  };
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeters
  ) => void;
  isValidForm: boolean;
};

export function useCreateMonthReport(): returnedCreateMonthReport {
  const dispatch = useDispatch<AppDispatch>();
  const { latestReadings } = useSelector(selectLatestRecord);
  const isValidForm = useSelector(selectIsValidForm);
  const { hot, cold, electricity } = useSelector(
    (state: RootState) => state.createMonthReportReducer.inputFields
  );
  const values = {
    cold: cold.value,
    hot: hot.value,
    electricity: electricity.value,
  };
  const errors = {
    cold: cold.error,
    hot: hot.error,
    electricity: electricity.error,
  };
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeters
  ) => {
    let inputed: number | string = event.target.value;
    let error = null;
    if (isNaN(Number(inputed)) || !Number.isInteger(Number(inputed))) {
      error = "Показания счетчика должно быть целым полоительным числом";
    }
    if (Number(inputed) < latestReadings[meterName].totalValue) {
      error = "Новое значение не может быть меньше предыдущего";
    }
    if (!error) inputed = Number(inputed);
    dispatch(
      setInputField({ name: meterName, inputField: { value: inputed, error } })
    );
  };
  return { errors, values, onChangeHandler, isValidForm };
}

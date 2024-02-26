import { AppDispatch, RootState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputFields,
  PhysicalMeters,
  setMetersInputField,
} from "../../store/form/createMonthReportReducer";
import { selectIsValidForm } from "../../store/form/createMonthReportReducer";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

type returnedCreateMonthReport = {
  data: InputFields;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeters
  ) => void;
  isValidForm: boolean;
};

export function useMtersForm(): returnedCreateMonthReport {
  const dispatch = useDispatch<AppDispatch>();
  const { latestReadings } = useSelector(selectLatestRecord);
  const isValidForm = useSelector(selectIsValidForm);
  const { hot, cold, electricity } = useSelector(
    (state: RootState) => state.createMonthReportReducer.metersInputFields
  );
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeters
  ) => {
    let inputed: number | string = event.target.value;
    let error = null;
    if (isNaN(Number(inputed)) || !Number.isInteger(Number(inputed))) {
      error = "Показания счетчика должно быть целым положительным числом";
    }
    if (Number(inputed) < latestReadings[meterName].totalValue) {
      error = "Новое значение не может быть меньше предыдущего";
    }
    if (!error) inputed = Number(inputed);
    dispatch(
      setMetersInputField({
        name: meterName,
        inputField: { value: inputed, error },
      })
    );
  };
  return { data: { cold, hot, electricity }, onChangeHandler, isValidForm };
}

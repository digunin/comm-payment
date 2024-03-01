import { AppDispatch, RootState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputField,
  PhysicalMeterName,
  setMetersInputField,
} from "../../store/form/createMonthReportReducer";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

type returnedCreateMonthReport = {
  data: { [key in PhysicalMeterName]: InputField };
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeterName
  ) => void;
};

export function useMtersForm(): returnedCreateMonthReport {
  const dispatch = useDispatch<AppDispatch>();
  const { latestReadings } = useSelector(selectLatestRecord);
  const { metersInputFields } = useSelector(
    (state: RootState) => state.createMonthReportReducer
  );
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeterName
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
  return { data: metersInputFields, onChangeHandler };
}

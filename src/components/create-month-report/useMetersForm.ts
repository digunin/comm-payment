import { AppDispatch, RootState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputField,
  PhysicalMeterName,
  setMetersInputField,
} from "../../store/form/createMonthReportReducer";
import { selectLatestRecord } from "../../store/payment/paymentReducer";
import errorsList from "./errors";

type returnedUseMetersForm = {
  data: { [key in PhysicalMeterName]: InputField };
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeterName
  ) => void;
};

export function useMetersForm(): returnedUseMetersForm {
  const dispatch = useDispatch<AppDispatch>();
  const latestReadings = useSelector(selectLatestRecord);
  const { metersInputFields } = useSelector(
    (state: RootState) => state.createMonthReportReducer
  );
  const { metersInputErrors } = errorsList;
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeterName
  ) => {
    let inputed: number | string = event.target.value;
    let error = null;
    if (isNaN(Number(inputed)) || !Number.isInteger(Number(inputed))) {
      error = metersInputErrors.notInteger.text;
    }
    if (!error && Number(inputed) < latestReadings[meterName].totalValue) {
      error = metersInputErrors.lessThenPrevious.text;
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

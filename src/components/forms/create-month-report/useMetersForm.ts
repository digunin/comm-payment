import { AppDispatch, RootState } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputField,
  PhysicalMeterName,
  setMetersInputField,
} from "../../../store/form/createMonthReportReducer";
import { selectLatestRecord } from "../../../store/payment/paymentReducer";
import { metersInputErrors } from "./createMonthReportErrors";
import { CheckErrorOptions } from "../errors";

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

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeterName
  ) => {
    let inputed: number | string = event.target.value;
    let error = null;
    const opt: CheckErrorOptions = {
      min: latestReadings[meterName].totalValue,
    };

    for (const errorName of Object.keys(metersInputErrors)) {
      const { text, check } = metersInputErrors[errorName];
      if (!check(inputed, opt)) {
        error = text;
        break;
      }
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

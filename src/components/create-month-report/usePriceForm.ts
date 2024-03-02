import { AppDispatch, RootState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputField,
  InputFieldName,
  setPriceInputField,
} from "../../store/form/createMonthReportReducer";
import errorsList from "./errors";

type returnedUsePriceForm = {
  data: { [key in InputFieldName]: InputField };
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: InputFieldName
  ) => void;
};

export function usePriceForm(): returnedUsePriceForm {
  const dispatch = useDispatch<AppDispatch>();
  const { priceInputFields } = useSelector(
    (state: RootState) => state.createMonthReportReducer
  );
  const { priceInputErrors } = errorsList;
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: InputFieldName
  ) => {
    let inputed: number | string = event.target.value;
    let error = null;
    if (inputed.endsWith(",") || inputed.startsWith(","))
      inputed = inputed.replace(",", ".");
    if (inputed.startsWith(".")) inputed = `0${inputed}`;
    if (isNaN(Number(inputed))) {
      error = priceInputErrors.notNumber.text;
    }
    if (!error && inputed.split(".")[1]?.length > 2) {
      error = priceInputErrors.max2digitsAfterDot.text;
    }
    dispatch(
      setPriceInputField({
        name: meterName,
        inputField: { value: inputed, error },
      })
    );
  };
  return { data: priceInputFields, onChangeHandler };
}

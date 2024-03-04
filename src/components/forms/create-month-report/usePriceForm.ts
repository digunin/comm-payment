import { AppDispatch, RootState } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputField,
  InputFieldName,
  setPriceInputField,
} from "../../../store/form/createMonthReportReducer";
import { priceInputErrors } from "./createMonthReportErrors";
import { CheckErrorOptions } from "../errors";

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

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: InputFieldName
  ) => {
    let inputed: number | string = event.target.value;
    let error = null;
    const opt: CheckErrorOptions = { maxAfterDot: 2 };

    if (inputed.endsWith(",") || inputed.startsWith(","))
      inputed = inputed.replace(",", ".");
    if (inputed.startsWith(".")) inputed = `0${inputed}`;

    for (const errorName of Object.keys(priceInputErrors)) {
      const { text, check } = priceInputErrors[errorName];
      if (!check(inputed, opt)) {
        error = text;
        break;
      }
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

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
    inputed: string | number,
    meterName: InputFieldName
  ) => void;
};

export function usePriceForm(): returnedUsePriceForm {
  const dispatch = useDispatch<AppDispatch>();
  const { priceInputFields } = useSelector(
    (state: RootState) => state.createMonthReportState
  );

  const onChangeHandler = (
    inputed: string | number,
    meterName: InputFieldName
  ) => {
    let error = null;
    inputed = String(inputed);
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

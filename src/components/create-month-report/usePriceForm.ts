import { AppDispatch, RootState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  InputField,
  InputFieldName,
  setPriceInputField,
} from "../../store/form/createMonthReportReducer";

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
    if (isNaN(Number(inputed))) {
      error = "Цена должна быть целым или дробным числом";
    }
    if (!error) inputed = Number(inputed);
    dispatch(
      setPriceInputField({
        name: meterName,
        inputField: { value: inputed, error },
      })
    );
  };
  return { data: priceInputFields, onChangeHandler };
}

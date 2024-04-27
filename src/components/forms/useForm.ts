import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { InputField, InputFieldName } from "../../store/form/types";

export type FormType<N extends InputFieldName> = ({
  reducer,
}: {
  reducer: ActionCreatorWithPayload<{
    name: N;
    inputField: InputField;
  }>;
}) => React.JSX.Element;

export const useForm = <N>(
  reducer: ActionCreatorWithPayload<{
    name: N;
    inputField: InputField;
  }>
) => {
  const data = useSelector((state: RootState) => state.createMonthReportState);
  const dispatch = useDispatch<AppDispatch>();
  const onChangeHandler = (
    value: string | number,
    fieldName: N,
    error: string | null = null
  ) => {
    dispatch(
      reducer({
        name: fieldName,
        inputField: { value, error },
      })
    );
  };
  return { onChangeHandler, data };
};

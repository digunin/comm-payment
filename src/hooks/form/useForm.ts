import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { InputField, InputFieldName } from "../../store/form/types";
import { useAppDispatch, useAppSelector } from "../redux-hoks";

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
  const data = useAppSelector((state) => state.createMonthReportState);
  const dispatch = useAppDispatch();
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

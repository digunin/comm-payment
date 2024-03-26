import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { InputField } from "../../store/form/types";

export const useForm = <T>(
  formName: "price" | "meters" | "monthAndYear",
  reducer: ActionCreatorWithPayload<{ name: T; inputField: InputField }>
) => {
  const data = useSelector(
    (state: RootState) => state.createMonthReportState[`${formName}InputFields`]
  );
  const dispatch = useDispatch<AppDispatch>();
  const onChangeHandler = (
    value: string | number,
    fieldName: T,
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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { InputField } from "../../store/form/createMonthReportReducer";
import { selectLatestRecord } from "../../store/payment/paymentReducer";

export const useForm = <T>(
  formName: "price" | "meters",
  reducer: ActionCreatorWithPayload<{ name: T; inputField: InputField }>
) => {
  const data = useSelector(
    (state: RootState) => state.createMonthReportState[`${formName}InputFields`]
  );
  const latestRecord = useSelector(selectLatestRecord);
  const dispatch = useDispatch<AppDispatch>();
  const onChangeHandler = (
    value: string | number,
    meterName: T,
    error: string | null = null
  ) => {
    dispatch(
      reducer({
        name: meterName,
        inputField: { value, error },
      })
    );
  };
  return { onChangeHandler, data, latestRecord };
};

import { AppDispatch, RootState } from "./../../store/index";
import { useDispatch, useSelector } from "react-redux";
import {
  PhysicalMeters,
  setInputField,
} from "../../store/form/createMonthReportReducer";

type returnedCreateMonthReport = {
  values: {
    hot: number;
    cold: number;
    electricity: number;
  };
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeters
  ) => void;
};

export function useCreateMonthReport(): returnedCreateMonthReport {
  const dispatch = useDispatch<AppDispatch>();

  // const { latestReadings } = useSelector(selectLatestRecord);
  // const { hot, cold, electricity } = latestReadings;
  // const [values, setValues] = useState({
  //   hot: hot.totalValue,
  //   cold: cold.totalValue,
  //   electricity: electricity.totalValue,
  // });
  const { hot, cold, electricity } = useSelector(
    (state: RootState) => state.createMonthReportReducer.inputFields
  );
  const values = {
    cold: cold.value,
    hot: hot.value,
    electricity: electricity.value,
  };
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    meterName: PhysicalMeters
  ) => {
    const inputed = Number(event.target.value);
    if (isNaN(inputed)) return;
    if (!Number.isInteger(inputed)) return;
    if (inputed === 0) return;
    dispatch(
      setInputField({ name: meterName, inputField: { value: inputed } })
    );
  };
  return { values, onChangeHandler };
}

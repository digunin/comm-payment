import React, { useEffect } from "react";
import { StartPage } from "./components/StartPage";
import ReportPage from "./components/reportpage/ReportPage";
import CreateMonthReport from "./components/forms/create-month-report/CreateMonthReport";
import { useAppMode } from "./useAppMode";
import ChangeMonthReport from "./components/forms/edit-month-report/EditMonthReport";
import { setPaymentsState } from "./store/payment/paymentReducer";
import { setPriceState } from "./store/price/priceReducer";
import { setMode, setNeedSaving } from "./store/app-mode/appModeReducer";
import { useAppDispatch, useAppSelector } from "./AppHooks";
import { loadState, saveState } from "./store/app-storage/storageReducer";
import { SerializedState } from "./store/app-storage";
import AddInitialReadings from "./components/forms/add-initial-readings/AddInitialReadings";

function App({ testState }: { testState?: SerializedState }) {
  const dispatch = useAppDispatch();
  const paymentState = useAppSelector((state) => state.paymentState);
  const priceState = useAppSelector((state) => state.priceState);
  const {
    isMonthReportCreate,
    isStartingPage,
    isReportShow,
    isMonthReportChange,
    isAddInitialReadings,
    needSaving,
  } = useAppMode();

  useEffect(() => {
    if (testState) {
      dispatch(setPaymentsState(testState.paymentState));
      dispatch(setPriceState(testState.priceState));
      dispatch(setMode("show-report"));
    } else {
      dispatch(loadState())
        .unwrap()
        .then(({ paymentState, priceState }) => {
          dispatch(setPaymentsState(paymentState));
          dispatch(setPriceState(priceState));
          dispatch(setMode("show-report"));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (needSaving && !testState) {
      dispatch(saveState({ paymentState, priceState }));
      dispatch(setNeedSaving(false));
    }
  }, [needSaving]);

  return (
    <div className="App">
      {isAddInitialReadings && <AddInitialReadings />}
      {isMonthReportCreate && <CreateMonthReport />}
      {isMonthReportChange && <ChangeMonthReport />}
      {isStartingPage && <StartPage />}
      {isReportShow && <ReportPage />}
    </div>
  );
}

export default App;

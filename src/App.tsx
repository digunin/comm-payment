import React, { useEffect } from "react";
import { StartPage } from "./components/StartPage";
import ReportPage from "./components/reportpage/ReportPage";
import CreateMonthReport from "./components/forms/create-month-report/CreateMonthReport";
import { useAppMode } from "./useAppMode";
import ChangeMonthReport from "./components/forms/edit-month-report/EditMonthReport";
import { setPaymentsState } from "./store/payment/paymentReducer";
import { setPriceState } from "./store/price/priceReducer";
import { setMode } from "./store/app-mode/appModeReducer";
import { useAppDispatch } from "./AppHooks";
import { loadState } from "./store/app-storage/storageReducer";
import { SerializedState } from "./store/app-storage";

function App({ testState }: { testState?: SerializedState }) {
  const dispatch = useAppDispatch();
  const {
    isMonthReportCreate,
    isStartingPage,
    isReportShow,
    isMonthReportChange,
  } = useAppMode();
  useEffect(() => {
    if (testState) {
      dispatch(setPaymentsState(testState.paymentState));
      dispatch(setPriceState(testState.priceState));
      dispatch(setMode(testState.appModeState.mode));
    } else {
      dispatch(loadState())
        .unwrap()
        .then(({ appModeState, paymentState, priceState }) => {
          dispatch(setPaymentsState(paymentState));
          dispatch(setPriceState(priceState));
          dispatch(setMode(appModeState.mode));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="App">
      {isMonthReportCreate && <CreateMonthReport />}
      {isMonthReportChange && <ChangeMonthReport />}
      {isStartingPage && <StartPage />}
      {isReportShow && <ReportPage />}
    </div>
  );
}

export default App;

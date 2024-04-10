import React from "react";
import { selectStartReadings } from "./store/payment/paymentReducer";
import { useSelector } from "react-redux";
import { StartPage } from "./components/StartPage";
import ReportPage from "./components/reportpage/ReportPage";
import { RootState } from "./store";
import CreateMonthReport from "./components/forms/create-month-report/CreateMonthReport";
import { useAppMode } from "./useAppMode";

function App() {
  const { isMonthReportCreate, isStartingPage, isReportShow } = useAppMode();
  return (
    <div className="App">
      {isMonthReportCreate && <CreateMonthReport />}
      {isStartingPage && <StartPage />}
      {isReportShow && <ReportPage />}
    </div>
  );
}

export default App;

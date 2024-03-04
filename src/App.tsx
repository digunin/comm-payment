import React from "react";
import { selectStartReadings } from "./store/payment/paymentReducer";
import { useSelector } from "react-redux";
import { StartPage } from "./components/StartPage";
import ReportPage from "./components/reportpage/ReportPage";
import { RootState } from "./store";
import CreateMonthReport from "./components/forms/create-month-report/CreateMonthReport";

function App() {
  const isNewReport = !useSelector(selectStartReadings);
  const isCreateMode = useSelector(
    (state: RootState) => state.createMonthReportReducer.createMode
  );

  return (
    <div className="App">
      {isCreateMode && <CreateMonthReport />}
      {isNewReport && !isCreateMode && <StartPage />}
      {!isNewReport && !isCreateMode && <ReportPage />}
    </div>
  );
}

export default App;

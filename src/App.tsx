import React from "react";
import { StartPage } from "./components/StartPage";
import ReportPage from "./components/reportpage/ReportPage";
import CreateMonthReport from "./components/forms/create-month-report/CreateMonthReport";
import { useAppMode } from "./useAppMode";
import ChangeMonthReport from "./components/forms/edit-month-report/EditMonthReport";

function App() {
  const {
    isMonthReportCreate,
    isStartingPage,
    isReportShow,
    isMonthReportChange,
  } = useAppMode();
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

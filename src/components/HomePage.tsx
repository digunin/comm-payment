import React from "react";
import { useAppSelector } from "../AppHooks";
import { StartPage } from "./StartPage";
import ReportPage from "./reportpage/ReportPage";

const HomePage = () => {
  const isEmptyReport = !useAppSelector(
    (state) => state.paymentState.startReadings
  );
  return <>{isEmptyReport ? <StartPage /> : <ReportPage />}</>;
};

export default HomePage;

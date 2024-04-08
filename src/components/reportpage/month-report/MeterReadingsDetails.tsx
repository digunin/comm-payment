import React from "react";
import { useSelected } from "../reportPageHooks/useSelected";
import {
  MeterReadings,
  Payment,
} from "../../../store/payment/paymentReducer.utils";
import MeterReading from "./MeterReadingDetails";

const MeterReadingsDetails = () => {
  const { selectedReport, selectedYear, selectedMonth } = useSelected();
  const readings: MeterReadings =
    selectedReport?.meterReadings as MeterReadings;
  const payment: Payment = selectedReport?.payment as Payment;

  return (
    <div className="meter-readings">
      {Object.keys(readings).map((meterName: string) => {
        const { monthValue, totalValue } =
          readings[meterName as keyof MeterReadings];
        const paySum = payment[meterName as keyof MeterReadings];
        return (
          <MeterReading
            key={`${selectedMonth}-${selectedYear}-${meterName}-${totalValue}-${monthValue}`}
            name={meterName}
            monthValue={monthValue}
            paySum={paySum}
          />
        );
      })}
      <div className="toal">{payment.total}</div>
    </div>
  );
};

export default MeterReadingsDetails;

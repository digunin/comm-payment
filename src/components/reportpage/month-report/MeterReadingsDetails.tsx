import React from "react";
import { useSelected } from "../reportPageHooks/useSelected";
import {
  MeterReadings,
  PayAmount,
  Payment,
} from "../../../store/payment/paymentReducer.utils";
import MeterReading from "./MeterReadingDetails";

const MeterReadingsDetails = () => {
  const { selectedReport, selectedYear, selectedMonth } = useSelected();
  const readings: MeterReadings = selectedReport?.lastPayment
    .meterReadings as MeterReadings;
  const payAmount = selectedReport?.lastPayment.payAmount as PayAmount;

  return (
    <div className="meter-readings">
      {Object.keys(readings).map((meterName: string) => {
        const { monthValue, totalValue } =
          readings[meterName as keyof MeterReadings];
        const sum = payAmount[meterName as keyof MeterReadings];
        return (
          <MeterReading
            key={`${selectedMonth}-${selectedYear}-${meterName}-${totalValue}-${monthValue}`}
            name={meterName}
            monthValue={monthValue}
            paySum={sum}
          />
        );
      })}
      <div className="total">
        <p>total:</p>
        <p>{payAmount.total}</p>
      </div>
    </div>
  );
};

export default MeterReadingsDetails;

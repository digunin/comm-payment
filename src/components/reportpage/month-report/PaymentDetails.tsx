import React from "react";
import {
  MeterReadings,
  Payment,
} from "../../../store/payment/paymentReducer.utils";
import PaymentRow from "./PaymentRow";

type PDProps = {
  payment: Payment;
  selected: boolean;
  onclick: (date: number) => void;
};

const PaymentDetails = ({ payment, selected, onclick }: PDProps) => {
  const { meterReadings, payAmount } = payment;
  const classname = `payment${selected ? " selected" : ""}`;

  return (
    <div className={classname} onClick={() => onclick(payment.date)}>
      <h2>
        <span>Дата платежа: </span>
        <span>{new Date(payment.date).toLocaleString()}</span>
      </h2>
      {Object.keys(meterReadings).map((meterName: string) => {
        const { monthValue, totalValue } =
          meterReadings[meterName as keyof MeterReadings];
        const sum = payAmount[meterName as keyof MeterReadings];
        return (
          <PaymentRow
            key={`${meterName}-${totalValue}-${monthValue}`}
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

export default PaymentDetails;

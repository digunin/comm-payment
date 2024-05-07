import React from "react";
import { MeterReadings, Payment } from "../../../store/payment/types";
import PaymentRow from "./PaymentRow";

type PDProps = {
  payment: Payment;
  selected: boolean;
  onclick: (date: number) => void;
};

const PaymentDetails = ({ payment, selected, onclick }: PDProps) => {
  const { meterReadings, payAmount, price } = payment;
  const classname = `payment${selected ? " selected" : ""}`;

  return (
    <div className={classname} onClick={() => onclick(payment.date)}>
      <h2>
        <span>Дата платежа: </span>
        <span>{new Date(payment.date).toLocaleString()}</span>
      </h2>
      <PaymentRow
        name="Счетчик"
        totalValue="Всего"
        monthValue="За месяц"
        price="Цена"
        paySum="Сумма"
      />
      {Object.keys(meterReadings).map((meterName: string) => {
        const { monthValue, totalValue } =
          meterReadings[meterName as keyof MeterReadings];
        const sum = payAmount[meterName as keyof MeterReadings];
        const meterPrice = price[meterName as keyof MeterReadings];
        return (
          <PaymentRow
            key={`${meterName}-${totalValue}-${monthValue}`}
            name={meterName}
            totalValue={totalValue}
            monthValue={monthValue}
            price={meterPrice}
            paySum={sum}
          />
        );
      })}
      <div className="total">
        <p>total:</p>
        <p>{payAmount.total / 100}</p>
      </div>
    </div>
  );
};

export default PaymentDetails;

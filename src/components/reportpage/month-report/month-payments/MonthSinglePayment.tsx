import React from "react";
import { Payment } from "../../../../store/payment/paymentReducer.utils";

const MonthSinglePayment = ({ payment }: { payment: Payment }) => {
  return (
    <div className="single-month-payment">
      <div className="single-month-payment-row">
        <p>Date</p>
        <p>{new Date(payment.date).toLocaleDateString()}</p>
      </div>
      <div className="single-month-payment-row">
        <p>cold</p>
        <p>{payment.cold}</p>
      </div>
      <div className="single-month-payment-row">
        <p>hot</p>
        <p>{payment.hot}</p>
      </div>
      <div className="single-month-payment-row">
        <p>electricity</p>
        <p>{payment.electricity}</p>
      </div>
      <div className="single-month-payment-row">
        <p>waterWaste</p>
        <p>{payment.waterWaste}</p>
      </div>
      <div className="single-month-payment-row">
        <p>total</p>
        <p>{payment.total}</p>
      </div>
    </div>
  );
};

export default MonthSinglePayment;

import React from "react";

type MRProps = {
  name: string;
  totalValue: string | number;
  monthValue: string | number;
  price: string | number;
  paySum: string | number;
};

const PaymentRow = ({
  name,
  totalValue,
  monthValue,
  price,
  paySum,
}: MRProps) => {
  return (
    <div className={`meter ${name}-meter`}>
      <p>{name}</p>
      <p>{totalValue}</p>
      <p>{monthValue}</p>
      <p>{typeof price === "number" ? price / 100 : price}</p>
      <p>{typeof paySum === "number" ? paySum / 100 : paySum}</p>
    </div>
  );
};

export default PaymentRow;

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
      <p>{price}</p>
      <p>{paySum}</p>
    </div>
  );
};

export default PaymentRow;

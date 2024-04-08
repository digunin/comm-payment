import React from "react";

type MRProps = {
  name: string;
  monthValue: number;
  paySum: number;
};

const MeterReadingDetails = ({ name, monthValue, paySum }: MRProps) => {
  return (
    <div className={`meter ${name}-meter`}>
      <p>{name}</p>
      <p>{monthValue}</p>
      <p>{paySum}</p>
    </div>
  );
};

export default MeterReadingDetails;

import React from "react";

type MRProps = {
  name: string;
  monthValue: number;
};

const MeterReadingDetails = ({ name, monthValue }: MRProps) => {
  return (
    <div className={`meter ${name}-meter`}>
      <p>{name}</p>
      <p>{monthValue}</p>
    </div>
  );
};

export default MeterReadingDetails;

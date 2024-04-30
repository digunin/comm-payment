import React from "react";

const CompareBar = ({ diff }: { diff: number }) => {
  const [classname, message] =
    diff > 0
      ? ["negative", "нужно доплатить: "]
      : ["positive", "вы переплатили: "];
  return (
    <div className="compare-bar">
      <strong>Разница с выбранным платежом:</strong>
      <p className={classname}>
        {message}
        {Math.abs(diff) / 100}
      </p>
    </div>
  );
};

export default CompareBar;

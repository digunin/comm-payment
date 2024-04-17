import React from "react";

const CompareBar = ({ diff }: { diff: number }) => {
  const [classname, message] =
    diff > 0 ? ["neg", "нужно доплатить: "] : ["pos", "вы переплатили: "];
  return (
    <div className="compare-bar">
      <strong>Разница с выбранным платежом:</strong>
      <p className={classname}>
        {message}
        {Math.abs(diff)}
      </p>
    </div>
  );
};

export default CompareBar;

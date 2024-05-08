import React from "react";

type YBProps = {
  year: number;
  selected?: boolean;
  onclick: (year: number) => void;
};

const YearButton = ({ year, selected = false, onclick }: YBProps) => {
  return (
    <button
      onClick={() => onclick(year)}
      className={`button year-button year-${year}${
        selected ? " selected" : ""
      }`}
    >
      {year}
    </button>
  );
};

export default YearButton;

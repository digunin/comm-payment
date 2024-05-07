import React from "react";
import { CHeckBoxList } from "../../../hooks/form/useMultipleFix";
import { Months } from "../../../store/payment/types";
import CheckBoxYear from "./CheckBoxYear";

type CBLProps = {
  list: CHeckBoxList;
  onclick: (year: number, month: Months) => void;
};

const CheckBoxBlock = ({ list, onclick }: CBLProps) => {
  return (
    <div className="form checkbox-block">
      {Object.keys(list)
        .map((key) => Number(key))
        .map((year) => (
          <CheckBoxYear
            year={year}
            yearList={list[year]}
            onclick={onclick}
            key={`checkbox-block-${year}`}
          />
        ))}
    </div>
  );
};

export default CheckBoxBlock;

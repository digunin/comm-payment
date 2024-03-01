import React from "react";
import InputElement from "./InputElement";
import { InputFieldName } from "../../store/form/createMonthReportReducer";
import { usePriceForm } from "./usePriceForm";

const PriceForm = () => {
  const { data, onChangeHandler } = usePriceForm();

  return (
    <div className="form price-form">
      <h2>Цены</h2>
      {Object.keys(data).map((key) => {
        const meterName = key as InputFieldName;
        const { value, error } = data[meterName];
        return (
          <InputElement
            labelText={meterName}
            meterName={meterName}
            formName="price"
            onchange={(event) => onChangeHandler(event, meterName)}
            value={value}
            error={error}
            key={`price-form-input-${meterName}`}
          />
        );
      })}
    </div>
  );
};

export default PriceForm;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsValidForm,
  toggleCreateMode,
} from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "./MeterReadingsForm";
import SubmitBlock from "./SubmitBlock";
import PriceForm from "./PriceForm";
import MonthAndYearForm from "./MonthAndYearForm";
import { RootState } from "../../../store";
import { addNewRecord } from "../../../store/payment/paymentReducer";
import { Months } from "../../../store/payment/paymentReducer.utils";

const CreateMonthReport = () => {
  const dispatch = useDispatch();
  const isValidForm = useSelector(selectIsValidForm);

  const { metersInputFields, priceInputFields, monthAndYearInputFields } =
    useSelector((state: RootState) => state.createMonthReportState);

  const payload = {
    year: Number(monthAndYearInputFields.year.value),
    month: Number(monthAndYearInputFields.month.value) as Months,
    readings: {
      cold: Number(metersInputFields.cold.value),
      hot: Number(metersInputFields.hot.value),
      electricity: Number(metersInputFields.electricity.value),
      waterWaste: 0,
    },
    price: {
      cold: Number(priceInputFields.cold.value),
      hot: Number(priceInputFields.hot.value),
      electricity: Number(priceInputFields.electricity.value),
      waterWaste: Number(priceInputFields.waterWaste.value),
    },
  };

  const onSubmit = () => {
    dispatch(addNewRecord(payload));
    dispatch(toggleCreateMode());
  };

  return (
    <div className="create-month-report">
      <h1>Добавить новую запись</h1>
      <MonthAndYearForm />
      <MeterReadingsForm />
      <PriceForm />
      <SubmitBlock
        isValidForm={isValidForm}
        onSubmit={onSubmit}
        onCancel={() => dispatch(toggleCreateMode())}
      />
    </div>
  );
};

export default CreateMonthReport;

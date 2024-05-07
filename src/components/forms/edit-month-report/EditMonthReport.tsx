import React from "react";
import { useNavigate } from "react-router-dom";
import { selectIsValidForm } from "../../../store/form/createMonthReportReducer";
import MeterReadingsForm from "../MeterReadingsForm";
import SubmitBlock from "../SubmitBlock";
import PriceForm from "../PriceForm";
import { useFormPayload } from "../../../hooks/form/useFormPayload";
import { setPrice } from "../../../store/price/priceReducer";
import { setNeedSaving } from "../../../store/savingStatusReducer";
import { setPriceInputField } from "../../../store/form/createMonthReportReducer";
import { setMetersInputField } from "../../../store/form/createMonthReportReducer";
import { useSelected } from "../../../hooks/report-page/useSelected";
import { useLastRecord } from "../../../hooks/form/useLastRecord";
import { Months } from "../../../store/payment/types";
import {
  multiplePriceFix,
  recalcPayment,
} from "../../../store/payment/paymentReducer";
import { useMultipleFix } from "../../../hooks/form/useMultipleFix";
import CheckBoxBlock from "./CheckBoxBlock";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hoks";
import { pathNames } from "../../../utils/values";

const EditMonthReport = () => {
  const dispatch = useAppDispatch();
  const isValidForm = useAppSelector(selectIsValidForm);
  const payload = useFormPayload();
  const { checkboxList, isMultiChoice, onCheckBox, listOfChecked } =
    useMultipleFix();
  const navigate = useNavigate();

  const { selectedMonth, selectedYear } = useSelected();
  const { latestMonth, latestYear } = useLastRecord();
  const isPossibleChangeReadings =
    selectedYear === latestYear &&
    selectedMonth === latestMonth &&
    !isMultiChoice;

  const onSubmit = () => {
    if (!isValidForm) return;
    if (isMultiChoice) {
      dispatch(
        multiplePriceFix({ newPrice: payload.price, checked: listOfChecked })
      );
    } else {
      dispatch(recalcPayment(payload));
    }
    dispatch(setPrice(payload.price));
    dispatch(setNeedSaving(true));
    navigate(pathNames.home);
  };

  return (
    <div className="change-month-report">
      <h1>Изменение записи</h1>
      <h2>{`${Months[selectedMonth as Months]} ${selectedYear}`}</h2>
      <CheckBoxBlock list={checkboxList} onclick={onCheckBox} />
      {isPossibleChangeReadings && (
        <MeterReadingsForm reducer={setMetersInputField} />
      )}
      <PriceForm reducer={setPriceInputField} />
      <SubmitBlock isValidForm={isValidForm} onSubmit={onSubmit} />
    </div>
  );
};

export default EditMonthReport;

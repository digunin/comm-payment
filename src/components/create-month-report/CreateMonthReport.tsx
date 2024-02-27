import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsValidForm,
  toggleCreateMode,
} from "../../store/form/createMonthReportReducer";
import MeterReadingsForm from "./MeterReadingsForm";
import SubmitBlock from "./SubmitBlock";

const CreateMonthReport = () => {
  const dispatch = useDispatch();
  const isValidForm = useSelector(selectIsValidForm);

  return (
    <div className="create-month-report">
      <MeterReadingsForm />
      <SubmitBlock
        isValidForm={isValidForm}
        onSubmit={() => console.log("Submitted")}
        onCancel={() => dispatch(toggleCreateMode())}
      />
    </div>
  );
};

export default CreateMonthReport;

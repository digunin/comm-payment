import React from "react";
import { useDispatch } from "react-redux";
import { toggleCreateMode } from "../../store/form/createMonthReportReducer";
import { useMtersForm } from "./useMetersForm";
import MeterReadingsForm from "./MeterReadingsForm";

const CreateMonthReport = () => {
  const dispatch = useDispatch();
  const { isValidForm } = useMtersForm();

  return (
    <div className="create-month-report">
      <MeterReadingsForm />
      <div className="create-month-report submit-block">
        <button
          data-testid="btn-ok"
          disabled={!isValidForm}
          // onClick={() => console.log(data)}
        >
          OK
        </button>
        <button onClick={() => dispatch(toggleCreateMode())}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateMonthReport;

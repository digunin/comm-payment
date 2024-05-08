import React from "react";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../../utils/values";

type SBProps = {
  onSubmit: () => void;
  isValidForm: boolean;
};

const SubmitBlock = ({ onSubmit, isValidForm }: SBProps) => {
  const navigate = useNavigate();
  return (
    <div className="submit-block">
      <button
        data-testid="btn-ok"
        className="form-button"
        disabled={!isValidForm}
        onClick={() => {
          if (isValidForm) onSubmit();
        }}
      >
        OK
      </button>
      <button
        data-testid="btn-cancel"
        className="form-button"
        onClick={() => navigate(pathNames.home)}
      >
        Cancel
      </button>
    </div>
  );
};

export default SubmitBlock;

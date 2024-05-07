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
        disabled={!isValidForm}
        onClick={() => {
          if (isValidForm) onSubmit();
        }}
      >
        OK
      </button>
      <button data-testid="btn-cancel" onClick={() => navigate(pathNames.home)}>
        Cancel
      </button>
    </div>
  );
};

export default SubmitBlock;

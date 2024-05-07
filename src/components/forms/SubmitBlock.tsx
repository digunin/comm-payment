import React from "react";
import { pathNames } from "../../route-paths";
import { useNavigate } from "react-router-dom";

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

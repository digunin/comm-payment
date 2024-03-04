import React from "react";

type SBProps = {
  onSubmit: () => void;
  onCancel: () => void;
  isValidForm: boolean;
};

const SubmitBlock = ({ onSubmit, onCancel, isValidForm }: SBProps) => {
  return (
    <div className="create-month-report submit-block">
      <button
        data-testid="btn-ok"
        disabled={!isValidForm}
        onClick={() => {
          if (isValidForm) onSubmit();
        }}
      >
        OK
      </button>
      <button data-testid="btn-cancel" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default SubmitBlock;

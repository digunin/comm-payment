import React from "react";
import { CheckErrorOptions, InputChecker, Mutator } from "./errors";
import { IEProps } from "./create-month-report/InputElement";

export interface WithHandlingError extends IEProps {
  checkers: Array<InputChecker>;
  checkOptions: CheckErrorOptions;
  mutators?: Array<Mutator>;
}

const WithErrorHandling = <T extends WithHandlingError>(
  Child: React.ComponentType<T>
) => {
  return (props: T) => {
    const { onchange, checkers, mutators, checkOptions } = props;
    const newOnchange = (value: string, error: string | null) => {
      if (mutators) {
        mutators.forEach((mutator) => (value = mutator(value)));
      }
      for (const checker of checkers) {
        if (!checker.check(value, checkOptions)) {
          error = checker.text;
          break;
        }
      }
      onchange(value, error);
    };
    return <Child {...props} onchange={newOnchange} />;
  };
};

export default WithErrorHandling;

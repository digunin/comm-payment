import React from "react";
import { IEProps } from "./create-month-report/InputElement";

const WithErrorHandling = <T extends IEProps>(
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

import React from "react";
import { IEProps } from "./create-month-report/InputElement";

const WithErrorHandling = <T extends IEProps>(
  Child: React.ComponentType<T>
) => {
  return (props: T) => {
    const newOnchange = (value: string, error: string | null) => {
      console.log("WithErrorHandling here");
      props.onchange(value, error);
    };
    return <Child {...props} onchange={newOnchange} />;
  };
};

export default WithErrorHandling;

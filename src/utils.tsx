import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import React from "react";

export const renderWithProvider = (element: React.ReactElement) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  const wrapper = ({ children }: { children: React.ReactElement }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(element, { wrapper });
};

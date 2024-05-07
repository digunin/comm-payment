import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import rootReducer from "../store/rootReducer";
import { pathNames } from "./values";

export const renderWithProvider = (element: React.ReactElement) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  const wrapper = ({ children }: { children: React.ReactElement }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(element, { wrapper });
};

export const renderWithProviderAndRouter = (element: React.ReactElement) => {
  const store = configureStore({
    reducer: rootReducer,
  });
  window.history.pushState({}, "", pathNames.home);
  const wrapper = ({ children }: { children: React.ReactElement }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  };
  return render(element, { wrapper });
};

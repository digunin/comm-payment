import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

test("renders starting page", () => {
  const { container, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(container.getElementsByClassName("start-page").length).toBe(1);
  expect(container.getElementsByClassName("info-text").length).toBe(1);
  expect(container.getElementsByClassName("btn-add-starting").length).toBe(1);
  expect(container.getElementsByClassName("global-report").length).toBe(0);

  fireEvent.click(getByTestId("btn-add-starting"));

  expect(container.getElementsByClassName("start-page").length).toBe(0);
  expect(container.getElementsByClassName("info-text").length).toBe(0);
  expect(container.getElementsByClassName("btn-add-starting").length).toBe(0);
  expect(container.getElementsByClassName("global-report").length).toBe(1);
});

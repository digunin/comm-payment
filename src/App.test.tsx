import React from "react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { renderWithProvider } from "./utils";

describe("App test", () => {
  test("renders starting page", () => {
    const { container, getByTestId } = renderWithProvider(<App />);

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

  test("create new record", () => {
    const { container, getByTestId } = renderWithProvider(<App />);
    expect(container.getElementsByClassName("start-page").length).toBe(1);
    fireEvent.click(getByTestId("btn-add-testTotalReport"));
  });
});

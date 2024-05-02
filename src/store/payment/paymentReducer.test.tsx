import React from "react";
import { fireEvent } from "@testing-library/react";
import { selectStartReadings, addStartReadings } from "./paymentReducer";
import { renderWithProvider } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../AppHooks";

const App = () => {
  const dispatch = useAppDispatch();
  const startReadings = useAppSelector(selectStartReadings);

  return (
    <div className="App">
      <button
        data-testid="test-button-id"
        onClick={() =>
          dispatch(
            addStartReadings({
              hot: { totalValue: 111, monthValue: 11 },
              cold: { totalValue: 222, monthValue: 22 },
              electricity: { totalValue: 333, monthValue: 33 },
              waterWaste: { totalValue: 444, monthValue: 44 },
            })
          )
        }
      >
        Save
      </button>
      <div data-testid="test-div-hot">
        {startReadings?.hot.totalValue || "empty"}
      </div>
      <div data-testid="test-div-cold">
        {startReadings?.cold.totalValue || "empty"}
      </div>
      <div data-testid="test-div-el">
        {startReadings?.electricity.totalValue || "empty"}
      </div>
      <div data-testid="test-div-ww">
        {startReadings?.waterWaste.totalValue || "empty"}
      </div>
    </div>
  );
};

test("app render and startReadings adding", () => {
  const { getByTestId } = renderWithProvider(<App />);
  const div_hot = getByTestId("test-div-hot");
  const div_cold = getByTestId("test-div-cold");
  const div_el = getByTestId("test-div-el");
  const div_ww = getByTestId("test-div-ww");

  expect(div_hot.textContent).toBe("empty");
  expect(div_cold.textContent).toBe("empty");
  expect(div_el.textContent).toBe("empty");
  expect(div_ww.textContent).toBe("empty");

  fireEvent.click(getByTestId("test-button-id"));

  expect(div_hot.textContent).toBe("111");
  expect(div_cold.textContent).toBe("222");
  expect(div_el.textContent).toBe("333");
  expect(div_ww.textContent).toBe("444");
});

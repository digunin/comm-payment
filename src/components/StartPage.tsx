import React from "react";
import {
  addStartReadings,
  setPaymentsState,
} from "../store/payment/paymentReducer";
import {
  MeterReadings,
  testTotalReport,
  price,
} from "../store/payment/paymentReducer.utils";
import { setPriceState } from "../store/price/priceReducer";
import { setMode } from "../store/app-mode/appModeReducer";
import { useAppDispatch } from "../AppHooks";

export function StartPage() {
  const dispatch = useAppDispatch();
  return (
    <div className="start-page">
      <p className="info-text">
        Для начала нужно установить начальные значения счетчиков
      </p>
      <button
        className="btn-add-starting"
        data-testid="btn-add-starting"
        onClick={() => {
          dispatch(
            addStartReadings(testTotalReport.startReadings as MeterReadings)
          );
          dispatch(setMode("show-report"));
        }}
      >
        Добавить только стартовые показания счетчиков
      </button>
      <button
        className="btn-add-testTotalReport"
        data-testid="btn-add-testTotalReport"
        onClick={() => {
          dispatch(setPaymentsState(testTotalReport));
          dispatch(
            setPriceState({
              actualPrice: price,
              oldPrices: [],
            })
          );
          dispatch(setMode("show-report"));
        }}
      >
        Добавить тестовый totalReport
      </button>
    </div>
  );
}

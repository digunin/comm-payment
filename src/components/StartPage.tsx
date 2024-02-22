import React from "react";
import {
  addStartReadings,
  setPaymentsState,
} from "../store/payment/paymentReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  MeterReadings,
  testTotalReport,
} from "../store/payment/paymentReducer.utils";

export function StartPage() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="start-page">
      <p className="info-text">
        Для начала нужно установить начальные значения счетчиков
      </p>
      <button
        className="btn-add-starting"
        data-testid="btn-add-starting"
        onClick={() =>
          dispatch(
            addStartReadings(testTotalReport.startReadings as MeterReadings)
          )
        }
      >
        Добавить только стартовые показания счетчиков
      </button>
      <button
        className="btn-add-testTotalReport"
        data-testid="btn-add-testTotalReport"
        onClick={() => dispatch(setPaymentsState(testTotalReport))}
      >
        Добавить тестовый totalReport
      </button>
    </div>
  );
}

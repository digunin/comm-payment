import React from "react";
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
          dispatch(setMode("add-starting"));
        }}
      >
        Добавить стартовые показания счетчиков
      </button>
    </div>
  );
}

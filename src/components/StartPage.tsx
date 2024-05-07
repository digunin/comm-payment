import React from "react";
import { Link } from "react-router-dom";
import { pathNames } from "../route-paths";

export function StartPage() {
  return (
    <div className="start-page">
      <p className="info-text">
        Для начала нужно установить начальные значения счетчиков
      </p>
      <Link to={pathNames.addInitial}>
        <button className="btn-add-starting" data-testid="btn-add-starting">
          Добавить стартовые показания счетчиков
        </button>
      </Link>
    </div>
  );
}

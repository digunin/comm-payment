import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hoks";
import { setPaymentsState } from "../store/payment/paymentReducer";
import { isDifferentPrices, setPriceState } from "../store/price/priceReducer";
import { useNavigate } from "react-router-dom";
import { pathNames, zeroReadings } from "../utils/values";
import { useYearsList } from "../hooks/report-page/useYearsList";
import { setInitialValues } from "../store/form/createMonthReportReducer";
import { createFormInitialValue } from "../utils/form";

const DemoBlock = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const price = useAppSelector((state) => state.priceState.actualPrice);
  const paymentState = useAppSelector((state) => state.paymentState);

  const nullSelected = {
    selectedMonth: null,
    selectedYear: null,
  };
  const zeroPrice = {
    cold: 0,
    electricity: 0,
    hot: 0,
    waterWaste: 0,
  };

  const reportNotEmpty = paymentState.startReadings;
  const haveStartReadings = !!paymentState.startReadings;
  const haveNonZeroPrice = isDifferentPrices(price, zeroPrice);
  const atleastOneRecord = useYearsList().years.length > 0;

  const deleteAll = (
    needStartReadings: boolean = false,
    needPrice: boolean = false
  ) => {
    dispatch(
      setPaymentsState({
        selected: nullSelected,
        startReadings: needStartReadings ? paymentState.startReadings : null,
      })
    );
    dispatch(
      setPriceState({
        actualPrice: needPrice ? price : zeroPrice,
        oldPrices: [],
      })
    );
    dispatch(
      setInitialValues(
        createFormInitialValue(
          new Date().getMonth(),
          -1,
          zeroPrice,
          zeroReadings
        )
      )
    );
    navigate(pathNames.home);
  };

  if (!reportNotEmpty) return <></>;

  return (
    <div className="demo-block">
      <p>Эти кнопки отображаются только в демонстрационном режиме</p>

      <button onClick={() => deleteAll()}>Удалить все</button>

      {haveNonZeroPrice && (
        <button onClick={() => deleteAll(true)}>
          Удалить все кроме начальных значений счетчиков
        </button>
      )}
      {atleastOneRecord && (
        <button onClick={() => deleteAll(true, true)}>
          Удалить все кроме начальных значений счетчиков и цен
        </button>
      )}
    </div>
  );
};

export default DemoBlock;

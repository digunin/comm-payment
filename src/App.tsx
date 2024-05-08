import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateMonthReport from "./components/forms/create-month-report/CreateMonthReport";
import { setPaymentsState } from "./store/payment/paymentReducer";
import { setPriceState } from "./store/price/priceReducer";
import { setNeedSaving } from "./store/savingStatusReducer";
import { useAppDispatch, useAppSelector } from "./hooks/redux-hoks";
import { loadState, saveState } from "./store/app-storage/storageReducer";
import { SerializedState } from "./store/app-storage";
import AddInitialReadings from "./components/forms/add-initial-readings/AddInitialReadings";
import { pathNames } from "./utils/values";
import HomePage from "./components/HomePage";
import EditMonthReport from "./components/forms/edit-month-report/EditMonthReport";

function App({ testState }: { testState?: SerializedState }) {
  const dispatch = useAppDispatch();
  const paymentState = useAppSelector((state) => state.paymentState);
  const priceState = useAppSelector((state) => state.priceState);
  const navigate = useNavigate();
  const needSaving = useAppSelector((state) => state.savingStatusState);

  useEffect(() => {
    if (testState) {
      dispatch(setPaymentsState(testState.paymentState));
      dispatch(setPriceState(testState.priceState));
      navigate(pathNames.home);
    } else {
      dispatch(loadState())
        .unwrap()
        .then(({ paymentState, priceState }) => {
          dispatch(setPaymentsState(paymentState));
          dispatch(setPriceState(priceState));
          navigate(pathNames.home);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (needSaving && !testState) {
      dispatch(saveState({ paymentState, priceState }));
      dispatch(setNeedSaving(false));
    }
  }, [needSaving]);

  return (
    <div className="app">
      <Routes>
        <Route path={pathNames.home} element={<HomePage />} />
        <Route path={pathNames.create} element={<CreateMonthReport />} />
        <Route path={pathNames.edit} element={<EditMonthReport />} />
        <Route path={pathNames.addInitial} element={<AddInitialReadings />} />
      </Routes>
    </div>
  );
}

export default App;

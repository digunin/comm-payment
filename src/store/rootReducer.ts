import pricerReducer from "./price/priceReducer";
import paymentsReducer from "./payment/paymentReducer";
import formReducer from "./form";
import savingStatusReducer from "./savingStatusReducer";
import storageReducer from "./app-storage/storageReducer";

export default {
  priceState: pricerReducer,
  paymentState: paymentsReducer,
  ...formReducer,
  savingStatusState: savingStatusReducer,
  appStorageState: storageReducer,
};

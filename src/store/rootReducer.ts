import pricerReducer from "./price/priceReducer";
import paymentsReducer from "./payment/paymentReducer";
import formReducer from "./form";
import appModeReducer from "./app-mode/appModeReducer";
import storageReducer from "./app-storage/storageReducer";

export default {
  priceState: pricerReducer,
  paymentState: paymentsReducer,
  ...formReducer,
  appModeState: appModeReducer,
  appStorageState: storageReducer,
};

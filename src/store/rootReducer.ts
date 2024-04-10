import pricerReducer from "./price/priceReducer";
import paymentsReducer from "./payment/paymentReducer";
import formReducer from "./form";
import appModeReducer from "./app-mode/appModeReducer";

export default {
  priceState: pricerReducer,
  paymentState: paymentsReducer,
  ...formReducer,
  appModeState: appModeReducer,
};

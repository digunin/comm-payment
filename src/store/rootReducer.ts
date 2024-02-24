import pricerReducer from "./price/priceReducer";
import paymentsReducer from "./payment/paymentReducer";
import formReducer from "./form";

export default {
  priceState: pricerReducer,
  paymentState: paymentsReducer,
  ...formReducer,
};

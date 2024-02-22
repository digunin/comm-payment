import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PriceState {
  actualPrice: Price;
  oldPrices: Array<Price>;
}

const initialState: PriceState = {
  actualPrice: {
    cold: 0,
    hot: 0,
    electricity: 0,
    waterWaste: 0,
  },
  oldPrices: [],
};

export type Price = {
  cold: number;
  hot: number;
  electricity: number;
  waterWaste: number;
};

export function isNonzeroPrice(price: Price): boolean {
  if (
    price.cold === 0 ||
    price.hot === 0 ||
    price.electricity === 0 ||
    price.waterWaste === 0
  )
    return false;
  return true;
}

export function isDifferentPrices(price1: Price, price2: Price): boolean {
  return (
    price1.cold !== price2.cold ||
    price1.hot !== price2.hot ||
    price1.electricity !== price2.electricity ||
    price1.waterWaste !== price2.waterWaste
  );
}

export function isPriceInArray(array: Array<Price>, newPrice: Price): boolean {
  return (
    array.filter((price) => !isDifferentPrices(price, newPrice)).length > 0
  );
}

// const initialState: PriceState = {
//   status: "idle",
//   price: {
//     cold: 2404,
//     hot: 16793,
//     electricity: 505,
//     waterWaste: 5220,
//   },
// };

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<Price>) => {
      if (
        isNonzeroPrice(state.actualPrice) &&
        !isPriceInArray(state.oldPrices, action.payload)
      )
        state.oldPrices.push(state.actualPrice);
      state.actualPrice = action.payload;
    },
    setPriceState: (state, action: PayloadAction<PriceState>) => {
      return action.payload;
    },
  },
});

export const { setPrice, setPriceState } = priceSlice.actions;

export default priceSlice.reducer;

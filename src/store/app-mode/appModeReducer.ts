import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppMode =
  | "starting-page"
  | "add-starting"
  | "show-report"
  | "create-month-report"
  | "show-payments"
  | "change-month-price";

export interface AppModeState {
  mode: AppMode;
}

const initialState: AppModeState = {
  mode: "starting-page",
};

const appModeSlice = createSlice({
  name: "appMode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<AppMode>) => {
      state.mode = action.payload;
    },
  },
});

export const setMode = appModeSlice.actions.setMode;

export default appModeSlice.reducer;

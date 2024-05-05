import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppMode =
  | "starting-page"
  | "add-starting"
  | "show-report"
  | "create-month-report"
  | "show-payments"
  | "change-month-report";

export interface AppModeState {
  mode: AppMode;
  needSaving: boolean;
}

const initialState: AppModeState = {
  mode: "starting-page",
  needSaving: false,
};

const appModeSlice = createSlice({
  name: "appMode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<AppMode>) => {
      state.mode = action.payload;
    },
    setNeedSaving: (state, action: PayloadAction<boolean>) => {
      state.needSaving = action.payload;
    },
  },
});

export const { setMode, setNeedSaving } = appModeSlice.actions;

export default appModeSlice.reducer;

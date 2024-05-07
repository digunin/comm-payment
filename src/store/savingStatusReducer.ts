import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const savingStatusSlice = createSlice({
  name: "savingStatus",
  initialState,
  reducers: {
    setNeedSaving: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setNeedSaving } = savingStatusSlice.actions;

export default savingStatusSlice.reducer;

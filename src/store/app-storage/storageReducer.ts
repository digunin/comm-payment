import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SerializedState, storage } from ".";

export type StorageStatus = "idle" | "loading" | "saving" | "failed";
export interface StorageState {
  status: StorageStatus;
}

const initialState: StorageState = {
  status: "idle",
};

export const loadState = createAsyncThunk("storage/load", async () => {
  return await storage.load();
});

export const saveState = createAsyncThunk(
  "storage/save",
  async (savingState: SerializedState) => {
    return await storage.save(savingState);
  }
);

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadState.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loadState.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(loadState.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(saveState.pending, (state) => {
      state.status = "saving";
    });
    builder.addCase(saveState.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(saveState.fulfilled, (state) => {
      state.status = "idle";
    });
  },
});

export default storageSlice.reducer;

import { RootState } from "..";
import mockStorage from "./mockStorage";

export type SerializedState = Pick<RootState, "paymentState" | "priceState">;

export interface AppStorage {
  load: () => Promise<SerializedState>;
  save: (state: SerializedState) => Promise<void>;
}

export const storage = mockStorage;

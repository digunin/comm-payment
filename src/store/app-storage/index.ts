import { RootState } from "..";
import browserStorage from "./browserStorage";

export type SerializedState = Pick<RootState, "paymentState" | "priceState">;

export interface AppStorage {
  load: () => Promise<SerializedState>;
  save: (state: SerializedState) => Promise<void>;
}

export const storage = browserStorage;

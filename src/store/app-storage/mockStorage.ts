import { SerializedState } from "./index";
import { AppStorage } from ".";
import { testState } from "../../utils/values";

const MockStorage: AppStorage = {
  load: () =>
    new Promise<SerializedState>((res, rej) => {
      setTimeout(() => res(testState), 500);
    }),
  save: (state: SerializedState) => Promise.resolve(),
};
export default MockStorage;

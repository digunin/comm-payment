import { AppStorage } from ".";

export const BrowserStorage: AppStorage = {
  load: () => {
    const source = localStorage.getItem("state");
    if (source === null) return Promise.reject("Not found");
    return Promise.resolve(JSON.parse(source));
  },
  save: (state) => {
    try {
      localStorage.setItem("state", JSON.stringify(state));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject("Save failed");
    }
  },
};

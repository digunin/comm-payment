import { AppStorage } from ".";

const BrowserStorage: AppStorage = {
  load: () => {
    try {
      const source = localStorage.getItem("state");
      if (source === null) return Promise.reject();
      return Promise.resolve(JSON.parse(source));
    } catch {
      return Promise.reject();
    }
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

export default BrowserStorage;

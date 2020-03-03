import { Languages, initialLocale } from "./i18n";

export interface RootState {
  version: string;
  locale: Languages;
}

export function createInitialState(): RootState {
  return {
    version: "1.0.0",
    locale: initialLocale
  };
}

export default RootState;

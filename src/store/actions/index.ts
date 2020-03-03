import { Action, ActionTree } from "vuex";

import i18n, { localeStorageKey, Languages } from "@/i18n";
import { RootState } from "@/root.state";
import { Mutations } from "../mutations";

const changeLocale: Action<RootState, RootState> = async ({ commit }, payload: Languages) => {
  i18n.locale = payload;
  localStorage.setItem(localeStorageKey, payload);
  commit(Mutations.SET_LOCALE, payload);
};

export const actions: ActionTree<RootState, RootState> = {
  changeLocale
};

export default actions;

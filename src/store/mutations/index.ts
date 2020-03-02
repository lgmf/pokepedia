/* eslint-disable no-param-reassign */
import { Mutation, MutationTree } from "vuex";

import { Languages } from "@/i18n";
import { RootState } from "@/root.state";

const setLocale: Mutation<RootState> = (state, payload: Languages) => {
  state.locale = payload;
};

export enum Mutations {
  SET_LOCALE = "SET_LOCALE"
}

export const mutations: MutationTree<RootState> = {
  [Mutations.SET_LOCALE]: setLocale
};

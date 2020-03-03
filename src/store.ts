import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { RootState, createInitialState } from "./root.state";
import { actions } from "./store/actions";
import { mutations } from "./store/mutations";
import { effectivenessStore } from "./store/effectiveness";

Vue.use(Vuex);

const state = createInitialState();

const store: StoreOptions<RootState> = {
  state,
  actions,
  mutations,
  modules: {
    effectiveness: effectivenessStore
  }
};

export default new Vuex.Store<RootState>(store);

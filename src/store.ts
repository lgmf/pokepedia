import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './root.state';

import { effectivenessStore } from './store/effectiveness';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    effectiveness: effectivenessStore,
  },
};

export default new Vuex.Store<RootState>(store);

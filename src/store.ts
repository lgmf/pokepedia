import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './root.state';

import { effectivenesStore } from './store/effectiveness';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    effectiveness: effectivenesStore
  }
};

export default new Vuex.Store<RootState>(store);

import { RootState } from "@/root.state";
import { Module } from "vuex";
import { actions } from './actions';
import { getters } from './getters';
import { EffectivenessState, createInitialState } from "./models/effectiveness.state";
import { mutations } from './mutations';

const namespaced = true;

const state = createInitialState();

export const effectivenesStore: Module<EffectivenessState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters
};

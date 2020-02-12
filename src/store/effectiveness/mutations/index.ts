import { Pokemon } from '@/views/effectiveness/models/Pokemon';
import { Mutation, MutationTree } from 'vuex';
import { EffectivenessState } from '../models/effectiveness.state';

const setLoading: Mutation<EffectivenessState> = (state, payload: boolean) => {
  state.ui.loading = payload;
}

const setError: Mutation<EffectivenessState> = (state: EffectivenessState, payload: { error: boolean, errorMessage: string }) => {
  state.ui.error = payload.error;
  state.ui.errorMessage = payload.errorMessage;
}

const setPokemon: Mutation<EffectivenessState> = (state, payload: Pokemon) => {
  state.pokemon = payload;
}

const setViewMode: Mutation<EffectivenessState> = (state, payload: 'atk' | 'def') => {
  state.ui.viewMode = payload;
}

const setSearch: Mutation<EffectivenessState> = (state, payload: string) => {
  state.ui.search = payload;
}

export enum Mutations {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_POKEMON = 'SET_POKEMON',
  SET_VIEW_MODE = 'SET_VIEW_MODE',
  SET_SEARCH = 'SET_SEARCH'
}

export const mutations: MutationTree<EffectivenessState> = {
  [Mutations.SET_LOADING]: setLoading,
  [Mutations.SET_ERROR]: setError,
  [Mutations.SET_POKEMON]: setPokemon,
  [Mutations.SET_VIEW_MODE]: setViewMode,
  [Mutations.SET_SEARCH]: setSearch
}

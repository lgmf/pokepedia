/* eslint-disable no-param-reassign */
import { Pokemon } from "@/core/models/Pokemon";
import { Mutation, MutationTree } from "vuex";
import { EffectivenessState } from "../models/effectiveness.state";

interface SetErrorPayload {
  error: boolean;
  errorTitle: string;
  errorMessage: string;
}

const setLoading: Mutation<EffectivenessState> = (state, payload: boolean) => {
  state.ui.loading = payload;
};

const setError: Mutation<EffectivenessState> = (state: EffectivenessState, payload: SetErrorPayload) => {
  state.ui.error = payload.error;
  state.ui.errorTitle = payload.errorTitle;
  state.ui.errorMessage = payload.errorMessage;
};

const setViewMode: Mutation<EffectivenessState> = (state, payload: "atk" | "def") => {
  state.ui.viewMode = payload;
};

const setSearch: Mutation<EffectivenessState> = (state, payload: string) => {
  state.ui.search = payload;
};

const setLoadingSuggestions: Mutation<EffectivenessState> = (state, payload: boolean) => {
  state.ui.loadingSuggestions = payload;
};

const setPokemon: Mutation<EffectivenessState> = (state, payload: Pokemon) => {
  state.pokemon = payload;
};

const setPokemonSuggestions: Mutation<EffectivenessState> = (state, payload: string[]) => {
  state.pokemonSuggestions = payload;
};

export enum Mutations {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_VIEW_MODE = "SET_VIEW_MODE",
  SET_SEARCH = "SET_SEARCH",
  SET_LOADING_SUGGESTIONS = "SET_LOADING_SUGGESTIONS",
  SET_POKEMON = "SET_POKEMON",
  SET_POKEMON_SUGGESTIONS = "SET_POKEMON_SUGGESTIONS"
}

export const mutations: MutationTree<EffectivenessState> = {
  [Mutations.SET_LOADING]: setLoading,
  [Mutations.SET_ERROR]: setError,
  [Mutations.SET_VIEW_MODE]: setViewMode,
  [Mutations.SET_SEARCH]: setSearch,
  [Mutations.SET_LOADING_SUGGESTIONS]: setLoadingSuggestions,
  [Mutations.SET_POKEMON]: setPokemon,
  [Mutations.SET_POKEMON_SUGGESTIONS]: setPokemonSuggestions
};

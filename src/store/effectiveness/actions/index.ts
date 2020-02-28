import pokepediaFacadeService from "@/core/api/PokepediaFacadeService";
import { Pokemon } from "@/core/models";
import { RootState } from "@/root.state";
import { Action, ActionTree } from "vuex";
import { EffectivenessState } from "../models/effectiveness.state";
import { Mutations } from "../mutations";

const fetchPokemon: Action<EffectivenessState, RootState> = async ({ commit }, payload: string) => {
  commit(Mutations.SET_LOADING, true);

  try {
    const url = `pokemon?name=${payload.toLowerCase()}`;
    const pokemon = await pokepediaFacadeService.get<Pokemon>(url);
    commit(Mutations.SET_POKEMON, pokemon);
    commit(Mutations.SET_ERROR, { error: false, errorMessage: "" });
  } catch (error) {
    const errorPayload = {
      error: true,
      errorTitle: "We've got confused!",
      errorMessage: `We couldn't find any pokemon matching "${payload}"`
    };
    commit(Mutations.SET_POKEMON, null);
    commit(Mutations.SET_ERROR, errorPayload);
  } finally {
    commit(Mutations.SET_LOADING, false);
  }
};

const fetchPokemonSuggestions: Action<EffectivenessState, RootState> = async ({ commit, state }, payload: string) => {
  if (state.ui.search === payload) return;

  commit(Mutations.SET_LOADING_SUGGESTIONS, true);

  try {
    const url = `pokemonSuggestions?search=${payload.toLowerCase()}`;
    const suggestions = await pokepediaFacadeService.get<string[]>(url);
    commit(Mutations.SET_POKEMON_SUGGESTIONS, suggestions);
  } catch (error) {
    commit(Mutations.SET_POKEMON_SUGGESTIONS, []);
  } finally {
    commit(Mutations.SET_LOADING_SUGGESTIONS, false);
  }
};

export const actions: ActionTree<EffectivenessState, RootState> = {
  fetchPokemon,
  fetchPokemonSuggestions
};

export default actions;

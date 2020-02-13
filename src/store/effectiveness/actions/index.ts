import pokepediaFacadeService from '@/core/api/PokepediaFacadeService';
import { RootState } from '@/root.state';
import { Pokemon } from '@/views/effectiveness/models/Pokemon';
import { Action, ActionTree } from 'vuex';
import { EffectivenessState } from '../models/effectiveness.state';
import { Mutations } from '../mutations';

const fetchPokemon: Action<EffectivenessState, RootState> = async ({ commit }, payload: string) => {
  commit(Mutations.SET_LOADING, true);

  try {
    const url = `pokemon?name=${payload.toLowerCase()}`;
    const pokemon = await pokepediaFacadeService.get<Pokemon>(url);
    commit(Mutations.SET_POKEMON, pokemon);
  } catch (error) {
    commit(Mutations.SET_POKEMON, null);
    commit(Mutations.SET_ERROR, { error: true, errorMessage: 'Pokemon not found' });
  } finally {
    commit(Mutations.SET_LOADING, false);
  }
};

const fetchPokemonNameMap: Action<EffectivenessState, RootState> = async ({ commit }) => {
  commit(Mutations.SET_LOADING, true);

  try {
    const data = await pokepediaFacadeService.getPokemonNameMap();
    commit(Mutations.SET_POKEMON_NAME_MAP, data);
  } catch (error) {
    commit(Mutations.SET_POKEMON_NAME_MAP, {});
  } finally {
    commit(Mutations.SET_LOADING, false);
  }
};

export const actions: ActionTree<EffectivenessState, RootState> = {
  fetchPokemon,
  fetchPokemonNameMap,
};

export default actions;

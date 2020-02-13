import pokeApi from '@/core/api/PokeApi';
import { RootState } from '@/root.state';
import { createPokemon } from '@/views/effectiveness/models/Pokemon';
import { PokemonApiResponse } from '@/views/effectiveness/models/PokemonApiResponse';
import { Action, ActionTree } from 'vuex';
import { EffectivenessState } from '../models/effectiveness.state';
import { Mutations } from '../mutations';

const fetchPokemon: Action<EffectivenessState, RootState> = async ({ commit }, payload: string) => {
  commit(Mutations.SET_LOADING, true);

  try {
    const url = `pokemon/${payload.toLowerCase()}`;
    const data = await pokeApi.get<PokemonApiResponse>(url);
    const pokemonData = await createPokemon(data);
    commit(Mutations.SET_POKEMON, pokemonData);
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
    const data = await pokeApi.getPokemonNameMap();
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

import { Pokemon } from '@/core/models';
import { BaseState } from '@/store/base.state';

interface UI extends BaseState {
  viewMode: 'atk' | 'def';
  search: string;
  loadingSuggestions: boolean;
}

export interface EffectivenessState {
  ui: UI;
  pokemon: Pokemon | null;
  pokemonSuggestions: string[];
}

export function createInitialState(): EffectivenessState {
  return {
    ui: {
      loading: false,
      error: false,
      errorMessage: '',
      viewMode: 'def',
      search: '',
      loadingSuggestions: false,
    },
    pokemon: null,
    pokemonSuggestions: [],
  };
}

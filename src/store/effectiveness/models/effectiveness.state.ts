import { Pokemon } from "@/views/effectiveness/models/Pokemon";
import { BaseState } from '@/store/base.state';

interface UI extends BaseState {
  viewMode: "atk" | "def";
  search: string;
}

export interface EffectivenessState {
  ui: UI;
  pokemon: Pokemon | null;
}

export function createInitialState(): EffectivenessState {
  return {
    ui: {
      loading: false,
      error: false,
      errorMessage: '',
      viewMode: "def",
      search: "",
    },
    pokemon: null
  }
}

import { PokemonType } from '@/views/types/models';

export interface TypeSlot {
  slot: number;
  type: PokemonType;
}


export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: TypeSlot[];
}

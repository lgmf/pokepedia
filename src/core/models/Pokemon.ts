export interface PokemonType {
  name: string;
  url: string;
}

export interface TypeSlot {
  slot: number;
  type: PokemonType;
}

export interface TypeEffectiveness {
  quad: string[];
  double: string[];
  regular: string[];
  half: string[];
  quarter: string[];
  zero: string[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  image: string;
  typeSlots: TypeSlot[];
  attackEffectiveness: TypeEffectiveness;
  defenseEffectiveness: TypeEffectiveness;
}

export const initialState: Pokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  sprite: '',
  image: '',
  typeSlots: [],
  attackEffectiveness: {
    quad: [],
    double: [],
    regular: [],
    half: [],
    quarter: [],
    zero: [],
  },
  defenseEffectiveness: {
    quad: [],
    double: [],
    regular: [],
    half: [],
    quarter: [],
    zero: [],
  },
};

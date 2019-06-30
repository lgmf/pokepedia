import { PokemonType } from '@/views/types/models';
import effectivenessMatrix from './EffectivenessMatrix';
import { PokemonApiResponse, TypeSlot } from './PokemonApiResponse';
import { types } from './Types';

export interface TypeEffectiviness {
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
  typeSlots: TypeSlot[];
  attackEffectiviness: TypeEffectiviness;
  defenseEffectiviness: TypeEffectiviness;
}

export const initialState: Pokemon = {
  id: -1,
  name: '',
  height: -1,
  weight: -1,
  sprite: '',
  typeSlots: [],
  attackEffectiviness: {
    quad: [],
    double: [],
    regular: [],
    half: [],
    quarter: [],
    zero: [],
  },
  defenseEffectiviness: {
    quad: [],
    double: [],
    regular: [],
    half: [],
    quarter: [],
    zero: [],
  }
}

export async function createPokemon(data: PokemonApiResponse): Promise<Pokemon> {
  if (!data) {
    return initialState;
  }

  let pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    sprite: data.sprites.front_default,
    typeSlots: data.types,
    attackEffectiviness: initialState.attackEffectiviness,
    defenseEffectiviness: initialState.defenseEffectiviness
  };

  const types = data.types.map(typeSlot => typeSlot.type);
  pokemon.attackEffectiviness = getAtkEffectiveness(types) as TypeEffectiviness;
  pokemon.defenseEffectiviness = getDefEffectiveness(types) as TypeEffectiviness;

  return pokemon;
}

function getAtkEffectiveness(pokemonTypes: PokemonType[]) {
  const [primaryTypeIndex, secondaryTypeIndex] = pokemonTypes.map(type => {
    return types.findIndex(it => it === type.name);
  });

  const primaryType = effectivenessMatrix.getAtkEffectiveness(primaryTypeIndex);
  const secondaryType = effectivenessMatrix.getAtkEffectiveness(secondaryTypeIndex);

  return getTypeEffectivenessFrom(primaryType, secondaryType);
}

function getDefEffectiveness(pokemonTypes: PokemonType[]) {
  const [primaryTypeIndex, secondaryTypeIndex] = pokemonTypes.map(type => {
    return types.findIndex(it => it === type.name);
  });

  const primaryType = effectivenessMatrix.getDefEffectiveness(primaryTypeIndex);
  const secondaryType = effectivenessMatrix.getDefEffectiveness(secondaryTypeIndex);

  return getTypeEffectivenessFrom(primaryType, secondaryType);
}

function getTypeEffectivenessFrom(primaryType: number[], secondaryType: number[]): TypeEffectiviness {
  return primaryType.reduce((acc, curr, index) => {
    const type = types[index];
    const effectiveness = curr * secondaryType[index];
    const key = getTypeEffectivenessKey(effectiveness);

    return {
      ...acc,
      [key]: [
        ...acc[key],
        type
      ]
    }
  }, { ...initialState.defenseEffectiviness });
}

function getTypeEffectivenessKey(effectiveness: number): keyof TypeEffectiviness {
  switch (effectiveness) {
    case 4:
      return 'quad';
    case 2:
      return 'double';
    case 1:
      return 'regular';
    case 0.5:
      return 'half';
    case 0.25:
      return 'quarter';
    default:
      return 'zero';
  }
}

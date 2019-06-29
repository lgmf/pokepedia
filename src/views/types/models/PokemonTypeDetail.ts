import { PokemonType } from './PokemonType';

interface DamageRelation {
  title: string;
  data: PokemonType[];
}

export interface TypeDamageRelations {
  double_damage_from: PokemonType[];
  double_damage_to: PokemonType[];
  half_damage_from: PokemonType[];
  half_damage_to: PokemonType[];
  no_damage_from: PokemonType[];
  no_damage_to: PokemonType[];
}

export interface PokemonTypeDetail {
  name: string;
  strengths: DamageRelation[],
  weaknesses: DamageRelation[],
  damageRelations?: TypeDamageRelations;
}

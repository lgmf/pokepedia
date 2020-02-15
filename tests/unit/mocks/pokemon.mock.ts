/* eslint-disable max-len */
import { Pokemon } from '@/core/models';

const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  image: 'https://img.pokemondb.net/artwork/pikachu.jpg',
  typeSlots: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  attackEffectiveness: {
    quad: [],
    double: ['flying', 'water'],
    regular: ['normal', 'fighting', 'poison', 'rock', 'bug', 'ghost', 'steel', 'fire', 'psychic', 'ice', 'dark', 'fairy'],
    half: ['grass', 'electric', 'dragon'],
    quarter: [],
    zero: ['ground'],
  },
  defenseEffectiveness: {
    quad: [],
    double: ['ground'],
    regular: ['normal', 'fighting', 'poison', 'rock', 'bug', 'ghost', 'fire', 'water', 'grass', 'psychic', 'ice', 'dragon', 'dark', 'fairy'],
    half: ['flying', 'steel', 'electric'],
    quarter: [],
    zero: [],
  },
};

export default mockPokemon;

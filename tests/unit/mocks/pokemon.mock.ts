export default {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  typeSlots: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  attackEffectiviness: {
    quad: [],
    double: ['flying', 'water'],
    regular: ['normal', 'fighting', 'poison', 'rock', 'bug', 'ghost', 'steel', 'fire', 'psychic', 'ice', 'dark', 'fairy'],
    half: ['grass', 'electric', 'dragon'],
    quarter: [],
    zero: ['ground'],
  },
  defenseEffectiviness: {
    quad: [],
    double: ['ground'],
    regular: ['normal', 'fighting', 'poison', 'rock', 'bug', 'ghost', 'fire', 'water', 'grass', 'psychic', 'ice', 'dragon', 'dark', 'fairy'],
    half: ['flying', 'steel', 'electric'],
    quarter: [],
    zero: [],
  },
};

import { getters } from "@/store/effectiveness/getters"
import mockPokemon from '../../mocks/pokemon.mock';

const Getters = getters as any;

describe('effectiveness/getters', () => {
  describe('#pokemonTitle', () => {
    it('happy path', () => {
      const state = { pokemon: mockPokemon };
      expect(Getters.pokemonTitle(state)).toEqual('pikachu #25');
    });

    it('handle when there is no pokemon', () => {
      const state = { pokemon: null };
      expect(Getters.pokemonTitle(state)).toEqual('');
    });
  })

  describe('#defKeys', () => {
    it('happy path', () => {
      const state = { pokemon: mockPokemon };
      expect(Getters.defKeys(state)).toEqual(["double", "regular", "half"]);
    });

    it('handle when there is no pokemon', () => {
      const state = { pokemon: null };
      expect(Getters.defKeys(state)).toEqual([]);
    });
  });

  describe('#atkKeys', () => {
    it('happy path', () => {
      const state = { pokemon: mockPokemon };
      expect(Getters.atkKeys(state)).toEqual(["double", "regular", "half", "zero"]);
    });

    it('handle when there is no pokemon', () => {
      const state = { pokemon: null };
      expect(Getters.atkKeys(state)).toEqual([]);
    });
  });
});
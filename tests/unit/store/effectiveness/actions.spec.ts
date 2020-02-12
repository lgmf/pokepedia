import { actions } from '@/store/effectiveness/actions';
import { Mutations } from '@/store/effectiveness/mutations';
import PokeApi from '@/core/api/PokeApi';
import mockPokemon from '../../mocks/pokemon.mock';

const Actions = actions as any;

const mockCommit = jest.fn();

jest.mock('@/views/effectiveness/models/Pokemon', () => ({
  createPokemon: () => Promise.resolve(mockPokemon),
}));

describe('effectiveness/actions', () => {
  describe('#fetchPokemon', () => {
    const payload = 'pikachu';

    it('happy path', async (done) => {
      PokeApi.get = jest.fn();

      await Actions.fetchPokemon({ commit: mockCommit }, payload);

      expect(PokeApi.get).toHaveBeenCalledWith(`pokemon/${payload}`);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON, mockPokemon);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, false);
      done();
    });

    it('handle pokemon not found', async (done) => {
      PokeApi.get = jest.fn().mockImplementation(() => {
        throw new Error('');
      });

      await Actions.fetchPokemon({ commit: mockCommit }, payload);

      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON, null);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_ERROR, { error: true, errorMessage: 'Pokemon not found' });
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, false);
      done();
    });
  });
});

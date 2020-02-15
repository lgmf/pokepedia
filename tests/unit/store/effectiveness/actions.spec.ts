import { actions } from '@/store/effectiveness/actions';
import { Mutations } from '@/store/effectiveness/mutations';
import pokepediaFacadeService from '@/core/api/PokepediaFacadeService';
import mockPokemon from '../../mocks/pokemon.mock';

const Actions = actions as any;

const mockCommit = jest.fn();

describe('effectiveness/actions', () => {
  describe('#fetchPokemon', () => {
    const payload = 'pikachu';

    it('happy path', async (done) => {
      pokepediaFacadeService.get = jest.fn().mockReturnValue(mockPokemon);

      await Actions.fetchPokemon({ commit: mockCommit }, payload);

      expect(pokepediaFacadeService.get).toHaveBeenCalledWith(`pokemon?name=${payload}`);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON, mockPokemon);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_ERROR, { error: false, errorMessage: '' });
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, false);
      done();
    });

    it('handle pokemon not found', async (done) => {
      pokepediaFacadeService.get = jest.fn().mockImplementation(() => {
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

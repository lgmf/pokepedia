import { mutations, Mutations } from '@/store/effectiveness/mutations';
import { EffectivenessState } from '@/store/effectiveness/models/effectiveness.state';
import { initialState as pokemon } from '@/core/models';

describe('effectiveness/mutations', () => {
  let state: EffectivenessState;

  beforeEach(() => {
    state = {
      ui: {
        loading: false,
        error: false,
        errorMessage: '',
        search: '',
        viewMode: 'def',
        loadingSuggestions: false,
      },
      pokemon: null,
      pokemonSuggestions: [],
    };
  });

  it(Mutations.SET_LOADING, () => {
    mutations[Mutations.SET_LOADING](state, true);
    expect(state.ui.loading).toBeTruthy();

    mutations[Mutations.SET_LOADING](state, false);
    expect(state.ui.loading).toBeFalsy();
  });

  it(Mutations.SET_ERROR, () => {
    expect(state.ui.error).toBeFalsy();
    expect(state.ui.errorMessage).toEqual('');

    mutations[Mutations.SET_ERROR](state, { error: true, errorMessage: 'Something went wrong...' });
    expect(state.ui.error).toBeTruthy();
    expect(state.ui.errorMessage).toEqual('Something went wrong...');
  });

  it(Mutations.SET_SEARCH, () => {
    expect(state.ui.search).toEqual('');
    mutations[Mutations.SET_SEARCH](state, 'pikachu');
    expect(state.ui.search).toEqual('pikachu');
  });

  it(Mutations.SET_VIEW_MODE, () => {
    expect(state.ui.viewMode).toEqual('def');

    mutations[Mutations.SET_VIEW_MODE](state, 'atk');
    expect(state.ui.viewMode).toEqual('atk');

    mutations[Mutations.SET_VIEW_MODE](state, 'def');
    expect(state.ui.viewMode).toEqual('def');
  });

  it(Mutations.SET_POKEMON, () => {
    expect(state.pokemon).toBeNull();
    mutations[Mutations.SET_POKEMON](state, pokemon);
    expect(state.pokemon).toEqual(pokemon);
  });
});

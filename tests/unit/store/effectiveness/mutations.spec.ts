import { mutations, Mutations } from "@/store/effectiveness/mutations";
import { EffectivenessState } from "@/store/effectiveness/models/effectiveness.state";

import mockPokemon from "../../mocks/pokemon.mock";
import mockSuggestions from "../../mocks/pokemon-suggestions.mock";

describe("effectiveness/mutations", () => {
  let state: EffectivenessState;

  beforeEach(() => {
    state = {
      ui: {
        loading: false,
        error: false,
        errorMessage: "",
        search: "",
        viewMode: "def",
        loadingSuggestions: false
      },
      pokemon: null,
      pokemonSuggestions: []
    };
  });

  it(Mutations.SET_LOADING, () => {
    mutations[Mutations.SET_LOADING](state, true);
    expect(state.ui.loading).toEqual(true);

    mutations[Mutations.SET_LOADING](state, false);
    expect(state.ui.loading).toEqual(false);
  });

  it(Mutations.SET_ERROR, () => {
    expect(state.ui.error).toEqual(false);
    expect(state.ui.errorMessage).toEqual("");

    mutations[Mutations.SET_ERROR](state, { error: true, errorMessage: "Something went wrong..." });
    expect(state.ui.error).toEqual(true);
    expect(state.ui.errorMessage).toEqual("Something went wrong...");
  });

  it(Mutations.SET_SEARCH, () => {
    expect(state.ui.search).toEqual("");
    mutations[Mutations.SET_SEARCH](state, "pikachu");
    expect(state.ui.search).toEqual("pikachu");
  });

  it(Mutations.SET_LOADING_SUGGESTIONS, () => {
    expect(state.ui.loadingSuggestions).toEqual(false);
    mutations[Mutations.SET_LOADING_SUGGESTIONS](state, true);
    expect(state.ui.loadingSuggestions).toEqual(true);
  });

  it(Mutations.SET_VIEW_MODE, () => {
    expect(state.ui.viewMode).toEqual("def");

    mutations[Mutations.SET_VIEW_MODE](state, "atk");
    expect(state.ui.viewMode).toEqual("atk");

    mutations[Mutations.SET_VIEW_MODE](state, "def");
    expect(state.ui.viewMode).toEqual("def");
  });

  it(Mutations.SET_POKEMON, () => {
    expect(state.pokemon).toBeNull();
    mutations[Mutations.SET_POKEMON](state, mockPokemon);
    expect(state.pokemon).toEqual(mockPokemon);
  });

  it(Mutations.SET_POKEMON_SUGGESTIONS, () => {
    expect(state.pokemonSuggestions).toEqual([]);
    mutations[Mutations.SET_POKEMON_SUGGESTIONS](state, mockSuggestions);
    expect(state.pokemonSuggestions).toEqual(mockSuggestions);
  });
});

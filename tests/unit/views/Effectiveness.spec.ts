import { createLocalVue, Wrapper, shallowMount } from "@vue/test-utils";
import Vuex, { MutationTree, ActionTree, Store, Module } from "vuex";

import { EffectivenessState, createInitialState } from "@/store/effectiveness/models/effectiveness.state";
import { RootState } from "@/root.state";
import { Mutations } from "@/store/effectiveness/mutations";
import Effectiveness from "@/views/effectiveness/Effectiveness.vue";
import InputAutoComplete from "@/components/InputAutoComplete.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Effectiveness Page", () => {
  const state: EffectivenessState = createInitialState();

  const mutations: MutationTree<EffectivenessState> = {
    [Mutations.SET_SEARCH]: jest.fn()
  };

  const actions: ActionTree<EffectivenessState, RootState> = {
    fetchPokemon: jest.fn(),
    fetchPokemonSuggestions: jest.fn()
  };

  const effectivenessStore: Module<EffectivenessState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions
  };

  let store: Store<RootState>;

  let effectivenessComponent: Wrapper<Effectiveness>;

  let vm: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        effectiveness: effectivenessStore
      }
    });

    effectivenessComponent = shallowMount(Effectiveness, { store, localVue });
    // eslint-disable-next-line prefer-destructuring
    vm = effectivenessComponent.vm;
  });

  afterEach(jest.clearAllMocks);

  it("should map state to data correctly", () => {
    expect(vm.loading).toEqual(state.ui.loading);
    expect(vm.error).toEqual(state.ui.error);
    expect(vm.errorMessage).toEqual(state.ui.errorMessage);
    expect(vm.search).toEqual(state.ui.search);
    expect(vm.loadingSuggestions).toEqual(state.ui.loadingSuggestions);
    expect(vm.pokemon).toEqual(state.pokemon);
    expect(vm.pokemonSuggestions).toEqual(state.pokemonSuggestions);
  });

  it("should show pokemon suggestions", () => {
    const inputAutocompleteComponent = effectivenessComponent.find(InputAutoComplete);
    inputAutocompleteComponent.vm.$emit("on-type", "pikachu");
    expect(actions.fetchPokemonSuggestions).toHaveBeenCalled();
  });

  it("should search a pokemon", () => {
    const inputAutocompleteComponent = effectivenessComponent.find(InputAutoComplete);
    inputAutocompleteComponent.vm.$emit("on-option-selected", { search: "pikachu" });
    expect(mutations[Mutations.SET_SEARCH]).toHaveBeenCalled();
    expect(actions.fetchPokemon).toHaveBeenCalled();
  });

  it("should not search a pokemon when the input has no value", () => {
    const inputAutocompleteComponent = effectivenessComponent.find(InputAutoComplete);
    inputAutocompleteComponent.vm.$emit("on-option-selected", { search: null });
    expect(mutations[Mutations.SET_SEARCH]).not.toHaveBeenCalled();
    expect(actions.fetchPokemon).not.toHaveBeenCalled();
  });
});

import { createLocalVue, Wrapper, mount } from "@vue/test-utils";
import Vuex, { MutationTree, GetterTree, Store, Module } from "vuex";

import { EffectivenessState, createInitialState } from "@/store/effectiveness/models/effectiveness.state";
import { RootState } from "@/root.state";
import { Mutations } from "@/store/effectiveness/mutations";

import PokemonCardContainer from "@/views/effectiveness/components/PokemonCardContainer.vue";
import PokeTypeBadge from "@/components/PokemonTypeBadge.vue";

import mockPokemon from "../mocks/pokemon.mock";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("PokemonCardContainer", () => {
  const state: EffectivenessState = createInitialState();

  const mutations: MutationTree<EffectivenessState> = {
    [Mutations.SET_VIEW_MODE]: jest.fn()
  };

  const getters: GetterTree<EffectivenessState, RootState> = {
    defKeys: jest.fn(),
    atkKeys: jest.fn()
  };

  const effectivenessStore: Module<EffectivenessState, RootState> = {
    namespaced: true,
    state,
    mutations,
    getters
  };

  let store: Store<RootState>;

  let pokemonCardContainerComponent: Wrapper<PokemonCardContainer>;

  let vm: any;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        effectiveness: effectivenessStore
      }
    });

    pokemonCardContainerComponent = mount(PokemonCardContainer, { propsData: { pokemon: null }, store, localVue });
    // eslint-disable-next-line prefer-destructuring
    vm = pokemonCardContainerComponent.vm;
  });

  afterEach(jest.clearAllMocks);

  it("should map state to data correctly", () => {
    expect(vm.pokemon).toEqual(state.pokemon);
    expect(vm.viewMode).toEqual(state.ui.viewMode);
  });

  it("should render nothing", () => {
    expect(pokemonCardContainerComponent.html()).toBeUndefined();
  });

  describe("when the pokemon exists", () => {
    beforeEach(() => {
      pokemonCardContainerComponent.setProps({ pokemon: mockPokemon });
    });

    it("should render the pokemon card", () => {
      expect(pokemonCardContainerComponent.html()).not.toBeUndefined();
    });

    it("should render the pokemon name as the title", () => {
      const cardTitle = pokemonCardContainerComponent.find(".title");
      expect(cardTitle.text()).toEqual(mockPokemon.name);
    });

    it("should render the pokemon image", () => {
      const pokemonImageElement = pokemonCardContainerComponent.find(".pokemon-image").element as HTMLImageElement;
      expect(pokemonImageElement.src).toEqual(mockPokemon.image);
    });

    it("should render the pokemon types", () => {
      const pokemonTypes = pokemonCardContainerComponent.findAll(PokeTypeBadge);
      expect(pokemonTypes.length).toEqual(mockPokemon.typeSlots.length);
    });

    it("should be able to change the view mode", () => {
      const viewModeButtons = pokemonCardContainerComponent.findAll(".effectiveness-tabs > .tab");
      const [defButton, atkButton] = viewModeButtons.wrappers;

      expect(viewModeButtons.length).toEqual(2);

      defButton.trigger("click");
      expect(mutations[Mutations.SET_VIEW_MODE]).toHaveBeenCalledWith(expect.anything(), "def");

      atkButton.trigger("click");
      expect(mutations[Mutations.SET_VIEW_MODE]).toHaveBeenCalledWith(expect.anything(), "atk");
    });

    it("should be able to set the active button", () => {
      const viewModeButtons = pokemonCardContainerComponent.findAll(".effectiveness-tabs > .tab");
      const [defButton, atkButton] = viewModeButtons.wrappers;

      state.ui.viewMode = "def";
      expect(defButton.classes("-active")).toBeTruthy();

      state.ui.viewMode = "atk";
      expect(atkButton.classes("-active")).toBeTruthy();
    });

    it("should render the appropriate types (def | atk)", () => {
      state.ui.viewMode = "def";
      expect(getters.defKeys).toHaveBeenCalled();

      state.ui.viewMode = "atk";
      expect(getters.atkKeys).toHaveBeenCalled();
    });
  });
});

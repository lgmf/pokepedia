import { actions } from "@/store/effectiveness/actions";
import { Mutations } from "@/store/effectiveness/mutations";
import pokepediaFacadeService from "@/core/api/PokepediaFacadeService";
import mockPokemon from "../../mocks/pokemon.mock";
import mockSuggestions from "../../mocks/pokemon-suggestions.mock";

const Actions = actions as any;

const mockCommit = jest.fn();

describe("effectiveness/actions", () => {
  const payload = "pikachu";

  afterEach(jest.clearAllMocks);

  describe("#fetchPokemon", () => {
    it("happy path", async () => {
      pokepediaFacadeService.get = jest.fn().mockReturnValue(mockPokemon);

      await Actions.fetchPokemon({ commit: mockCommit }, payload);

      expect(pokepediaFacadeService.get).toHaveBeenCalledWith(`pokemon?name=${payload}`);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON, mockPokemon);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_ERROR, { error: false, errorMessage: "" });
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, false);
    });

    it("handle pokemon not found", async () => {
      const errorPayload = {
        error: true,
        errorTitle: "We've got confused!",
        errorMessage: "We couldn't find any pokemon matching \"pikachu\""
      };

      pokepediaFacadeService.get = jest.fn().mockImplementation(() => {
        throw new Error("");
      });

      await Actions.fetchPokemon({ commit: mockCommit }, payload);

      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON, null);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_ERROR, errorPayload);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING, false);
    });
  });

  describe("#fetchPokemonSuggestions", () => {
    const mockState = {
      ui: {
        search: ""
      }
    };

    it("happy path", async () => {
      pokepediaFacadeService.get = jest.fn().mockReturnValue(mockSuggestions);

      await Actions.fetchPokemonSuggestions({ commit: mockCommit, state: mockState }, payload);

      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING_SUGGESTIONS, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON_SUGGESTIONS, mockSuggestions);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING_SUGGESTIONS, false);
    });

    it("should do nothing when the search has not changed", async () => {
      pokepediaFacadeService.get = jest.fn().mockReturnValue(mockSuggestions);

      await Actions.fetchPokemonSuggestions({ commit: mockCommit, state: mockState }, mockState.ui.search);
      expect(mockCommit).not.toHaveBeenCalledWith();
    });

    it("should handle suggestions not found", async () => {
      pokepediaFacadeService.get = jest.fn().mockImplementation(() => {
        throw new Error("");
      });

      await Actions.fetchPokemonSuggestions({ commit: mockCommit, state: mockState }, payload);

      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING_SUGGESTIONS, true);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_POKEMON_SUGGESTIONS, []);
      expect(mockCommit).toHaveBeenCalledWith(Mutations.SET_LOADING_SUGGESTIONS, false);
    });
  });
});

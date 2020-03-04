import { LocaleMessages } from "vue-i18n";

import { PokemonTypes } from "@/core/models/Types";

const dictionary: LocaleMessages = {
  shared: {
    pokemonTypes: {
      [PokemonTypes.NORMAL]: "normal",
      [PokemonTypes.FIGHTING]: "fighting",
      [PokemonTypes.FLYING]: "flying",
      [PokemonTypes.POISON]: "poison",
      [PokemonTypes.GROUND]: "ground",
      [PokemonTypes.ROCK]: "rock",
      [PokemonTypes.BUG]: "bug",
      [PokemonTypes.GHOST]: "ghost",
      [PokemonTypes.STEEL]: "steel",
      [PokemonTypes.FIRE]: "fire",
      [PokemonTypes.WATER]: "water",
      [PokemonTypes.GRASS]: "grass",
      [PokemonTypes.ELECTRIC]: "electric",
      [PokemonTypes.PSYCHIC]: "psychic",
      [PokemonTypes.ICE]: "ice",
      [PokemonTypes.DRAGON]: "dragon",
      [PokemonTypes.DARK]: "dark",
      [PokemonTypes.FAIRY]: "fairy"
    }
  },
  header: {
    navbar: {
      firstNavItem: "effectiveness"
    },
    locale: {
      usaFlagAlternateText: "USA's flag",
      brazilFlagAlternateText: "Brazil's flag"
    }
  },
  effectivenessPage: {
    inputLabel: "pokemon name",
    inputPlaceholder: "search here...",
    loaderText: "loading...",
    errorState: {
      title: "We've got confused!",
      message: "We couldn't find any pokemon matching to \"{search}\"",
      alternateText: "confused psyduck"
    },
    emptyState: {
      title: "Waiting for your search!",
      message: "Search for pokémon’s effectiveness by entering its name above",
      alternateText: "sleeping snorlax"
    },
    pokemonCardContainer: {
      alternateText: "pokemon image",
      firstTabText: "takes damage",
      secondTabText: "deals damage"
    }
  }
};

export default dictionary;

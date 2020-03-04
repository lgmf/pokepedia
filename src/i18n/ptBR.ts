import { LocaleMessages } from "vue-i18n";

import { PokemonTypes } from "@/core/models/Types";

const dictionary: LocaleMessages = {
  shared: {
    pokemonTypes: {
      [PokemonTypes.NORMAL]: "normal",
      [PokemonTypes.FIGHTING]: "lutador",
      [PokemonTypes.FLYING]: "voador",
      [PokemonTypes.POISON]: "venenoso",
      [PokemonTypes.GROUND]: "terrestre",
      [PokemonTypes.ROCK]: "pedra",
      [PokemonTypes.BUG]: "inseto",
      [PokemonTypes.GHOST]: "fantasma",
      [PokemonTypes.STEEL]: "aço",
      [PokemonTypes.FIRE]: "fogo",
      [PokemonTypes.WATER]: "água",
      [PokemonTypes.GRASS]: "planta",
      [PokemonTypes.ELECTRIC]: "elétrico",
      [PokemonTypes.PSYCHIC]: "psíquico",
      [PokemonTypes.ICE]: "gelo",
      [PokemonTypes.DRAGON]: "dragão",
      [PokemonTypes.DARK]: "noturno",
      [PokemonTypes.FAIRY]: "fada"
    }
  },
  header: {
    navbar: {
      firstNavItem: "eficácia"
    },
    locale: {
      usaFlagAlternateText: "bandeira dos EUA",
      brazilFlagAlternateText: "bandeira do Brasil"
    }
  },
  effectivenessPage: {
    inputLabel: "nome do pokemon",
    inputPlaceholder: "busque aqui...",
    loaderText: "carregando...",
    errorState: {
      title: "Nós ficamos confusos!",
      message: "Não foi possível encontrar nenhum pokemon correspondente a \"{search}\"",
      alternateText: "psyduck confuso"
    },
    emptyState: {
      title: "Aguardando sua pesquisa!",
      message: "Pesquise a eficácia de um pokémon digitando seu nome acima",
      alternateText: "snorlax dormindo"
    },
    pokemonCardContainer: {
      alternateText: "imagem do pokemon",
      firstTabText: "leva dano",
      secondTabText: "causa dano"
    }
  }
};

export default dictionary;

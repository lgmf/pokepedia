import { LocaleMessages } from "vue-i18n";

const dictionary: LocaleMessages = {
  header: {
    navbar: {
      firstNavItem: "eficácia"
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

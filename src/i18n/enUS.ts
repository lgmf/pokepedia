import { LocaleMessages } from "vue-i18n";

const dictionary: LocaleMessages = {
  header: {
    navbar: {
      firstNavItem: "effectiveness"
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

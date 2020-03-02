<template>
  <div class="effectiveness-page">
    <div class="filters">
      <input-autocomplete
        :label="$t('effectivenessPage.inputLabel')"
        :suggestions="pokemonSuggestions"
        :loading="loadingSuggestions"
        :placeholder="$t('effectivenessPage.inputPlaceholder')"
        @on-type="fetchPokemonSuggestions($event)"
        @on-option-selected="onSearch($event)"
      ></input-autocomplete>
    </div>

    <v-loader v-if="loading" :text="$t('effectivenessPage.loaderText')"></v-loader>

    <info-message
      v-else-if="error"
      :title="$t(errorTitle)"
      :message="$t(errorMessage, { search })"
      imageSrc="/img/confused-psyduck.png"
      :imageAlternateText="$t('effectivenessPage.errorState.alternateText')"
    ></info-message>

    <pokemon-card-container v-else-if="pokemon" :pokemon="pokemon"></pokemon-card-container>

    <info-message
      v-else
      :title="$t('effectivenessPage.emptyState.title')"
      :message="$t('effectivenessPage.emptyState.message')"
      imageSrc="/img/sleeping-snorlax.png"
      :imageAlternateText="$t('effectivenessPage.emptyState.alternateText')"
    ></info-message>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { State, Action, Getter, namespace } from "vuex-class";

import { EffectivenessState } from "@/store/effectiveness/models/effectiveness.state";
import { Mutations } from "@/store/effectiveness/mutations";

import { Pokemon } from "@/core/models";

import InputAutoComplete from "@/components/InputAutoComplete.vue";

const effectivenessStore = namespace("effectiveness");

@Component({
  components: {
    "input-autocomplete": InputAutoComplete,
    "v-loader": () => import("@/components/VLoader.vue"),
    "info-message": () => import("@/components/InfoMessage.vue"),
    "pokemon-card-container": () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import("./components/PokemonCardContainer.vue")
  }
})
export default class Effectiveness extends Vue {
  @effectivenessStore.State((state: EffectivenessState) => state.ui.loading)
  loading!: boolean;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.error)
  error!: boolean;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.errorTitle)
  errorTitle!: string;

  @effectivenessStore.State(
    (state: EffectivenessState) => state.ui.errorMessage
  )
  errorMessage!: string;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.search)
  search!: string;

  @effectivenessStore.State(
    (state: EffectivenessState) => state.ui.loadingSuggestions
  )
  loadingSuggestions!: boolean;

  @effectivenessStore.State
  pokemon!: Pokemon;

  @effectivenessStore.State
  pokemonSuggestions!: string[];

  @effectivenessStore.Mutation(Mutations.SET_SEARCH)
  fillSearch!: Function;

  @effectivenessStore.Action
  fetchPokemon!: Function;

  @effectivenessStore.Action
  fetchPokemonSuggestions!: Function;

  onSearch({ search }: { search: string }) {
    if (!search) {
      return;
    }

    this.fillSearch(search);
    this.fetchPokemon(search);
  }
}
</script>

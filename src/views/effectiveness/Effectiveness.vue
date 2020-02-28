<template>
  <div class="effectiveness-page">
    <div class="filters">
      <input-autocomplete
        label="pokemon name"
        :suggestions="pokemonSuggestions"
        :loading="loadingSuggestions"
        @on-type="fetchPokemonSuggestions($event)"
        @on-option-selected="onSearch($event)"
      ></input-autocomplete>
    </div>

    <v-loader v-if="loading"></v-loader>

    <pokemon-not-found v-else-if="error" :title="errorTitle" :message="errorMessage"></pokemon-not-found>

    <pokemon-card-container v-else :pokemon="pokemon"></pokemon-card-container>
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
    "pokemon-card-container": () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      import("./components/PokemonCardContainer.vue"),
    "pokemon-not-found": () => import("./components/PokemonNotFound.vue")
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

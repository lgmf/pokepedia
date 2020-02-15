<template>
  <div class="effectiveness">
    <div class="filters">
      <input-autocomplete
         label="pokemon name"
        :suggestions="pokemonSuggestions"
        :loading="loadingSuggestions"
        @on-type="fetchPokemonSuggestions($event)"
        @on-option-selected="onSearch($event)"
      ></input-autocomplete>
    </div>

    <span v-if="loading" class="loading">Loading...</span>

    <span v-else-if="error">{{ errorMessage }}</span>

    <main v-else class="pokemon">
      <pokemon-card-container></pokemon-card-container>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import {
  State, Action, Getter, namespace,
} from 'vuex-class';

import { EffectivenessState } from '@/store/effectiveness/models/effectiveness.state';
import { Mutations } from '@/store/effectiveness/mutations';

import { Pokemon } from '@/core/models';

import InputAutoComplete from '@/components/InputAutoComplete.vue';

import PokemonCardContainer from './components/PokemonCardContainer.vue';
import damageLabel from './filters/DamageLabel';

const effectivenessStore = namespace('effectiveness');

@Component({
  components: {
    'input-autocomplete': InputAutoComplete,
    'pokemon-card-container': PokemonCardContainer,
  },
})
export default class Effectiveness extends Vue {
  @effectivenessStore.State((state: EffectivenessState) => state.ui.loading)
  loading!: boolean;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.error)
  error!: boolean;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.errorMessage)
  errorMessage!: string;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.search)
  search!: string;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.loadingSuggestions)
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

<style scoped lang="scss">
.effectiveness {
  display: grid;
  grid-gap: 44px;

  & > .filters {
    display: flex;
  }

  & > .loading {
    justify-self: center;
    align-self: center;
  }
}
</style>

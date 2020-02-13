<template>
  <div class="effectiveness">
    <form
      class="filters"
      @submit.prevent
    >
      <input-autocomplete
        :label="'pokemon name'"
        :suggestionMap="pokemonNameMap"
        @on-option-selected="onSearch($event)"
      ></input-autocomplete>

      <div
        v-if="!!pokemon"
        class="viewmode"
      >
        <label
          class="label"
          for="def"
        >Defense</label>
        <input
          id="def"
          type="radio"
          class="input"
          value="def"
          :checked="viewMode === 'def'"
          @change="changeViewMode('def')"
        />

        <label
          class="label"
          for="atk"
        >Offense</label>
        <input
          id="atk"
          type="radio"
          class="input"
          value="atk"
          :checked="viewMode === 'atk'"
          @change="changeViewMode('atk')"
        />
      </div>
    </form>

    <span
      v-if="loading"
      class="loading"
    >Loading...</span>

    <main
      v-else-if="!!pokemon"
      class="pokemon"
    >
      <header class="header">
        <h1 class="title">
          {{ pokemonTitle }}
          <div class="types">
            <poke-type-badge
              class="type"
              v-for="typeSlot in pokemon.typeSlots"
              :key="typeSlot.slot"
              :type="typeSlot.type.name"
            ></poke-type-badge>
          </div>
        </h1>
        <img
          class="sprite"
          :src="pokemon.sprite"
          alt="pokemon sprite"
        />
      </header>

      <div class="summary">
        <section
          v-if="viewMode === 'def'"
          class="section"
        >
          <v-card
            v-for="key in defKeys"
            :key="key"
            :title="key | damageLabel"
          >
            <div class="type-list">
              <poke-type-badge
                class="type"
                v-for="type in pokemon.defenseEffectiveness[key]"
                :key="type"
                :type="type"
              ></poke-type-badge>
            </div>
          </v-card>
        </section>

        <section
          v-else
          class="section"
        >
          <v-card
            v-for="key in atkKeys"
            :key="key"
            :title="key | damageLabel('atk')"
          >
            <div class="type-list">
              <poke-type-badge
                class="type"
                v-for="type in pokemon.attackEffectiveness[key]"
                :key="type"
                :type="type"
              ></poke-type-badge>
            </div>
          </v-card>
        </section>
      </div>
    </main>

    <span v-else-if="error">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  State, Action, Getter, namespace,
} from 'vuex-class';

import { Pokemon, initialState } from './models/Pokemon';

import { TypeDamageRelations, SuggestionMap } from '@/core/models';

import PokeTypeBadge from '@/components/PokemonTypeBadge.vue';

import pokeTypeColor from '@/components/directives/PokeTypeColor';

import VCard from '@/components/VCard.vue';
import InputAutoComplete from '@/components/InputAutoComplete.vue';

import damageLabel from './filters/DamageLabel';
import { EffectivenessState } from '../../store/effectiveness/models/effectiveness.state';
import { Mutations } from '../../store/effectiveness/mutations';

const effectivenessStore = namespace('effectiveness');

@Component({
  components: {
    VCard,
    PokeTypeBadge,
    'input-autocomplete': InputAutoComplete,
  },
  directives: {
    pokeTypeColor,
  },
  filters: {
    damageLabel,
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

  @effectivenessStore.State((state: EffectivenessState) => state.ui.viewMode)
  viewMode!: 'atk' | 'def';

  @effectivenessStore.State
  pokemon!: Pokemon;

  @effectivenessStore.State
  pokemonNameMap!: SuggestionMap;

  @effectivenessStore.Getter
  pokemonTitle!: string;

  @effectivenessStore.Getter
  defKeys!: string;

  @effectivenessStore.Getter
  atkKeys!: string;

  @effectivenessStore.Mutation(Mutations.SET_VIEW_MODE)
  changeViewMode!: Function;

  @effectivenessStore.Mutation(Mutations.SET_SEARCH)
  fillSearch!: Function;

  @effectivenessStore.Action
  fetchPokemon!: Function;

  @effectivenessStore.Action
  fetchPokemonNameMap!: Function;

  mounted() {
    this.fetchPokemonNameMap();
  }

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
    flex-direction: column;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    & > .viewmode {
      padding: 0 8px;
      margin-top: 16px;

      @media screen and (min-width: 768px) {
        flex-direction: row;
        align-items: center;
        margin-top: 0;
        margin-left: 16px;
      }

      & > .input {
        margin-right: 16px;
      }

      & > .label {
        color: #808080;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  & > .loading {
    justify-self: center;
    align-self: center;
  }

  & > .pokemon {
    display: grid;
    grid-gap: 40px;

    & > .header {
      display: flex;
      justify-content: space-between;

      @media screen and (min-width: 768px) {
        justify-content: flex-start;
      }

      & > .title {
        text-transform: uppercase;
        font-size: 28px;
        font-weight: 900;

        @media screen and (min-width: 768px) {
          font-size: 30px;
          margin-right: 32px;
        }

        & > .types {
          display: flex;
          margin-top: 32px;

          & > .type + .type {
            margin-left: 12px;
          }
        }
      }

      & > .sprite {
        height: 80px;
        width: 80px;
        margin: -28px;
        justify-self: end;
      }
    }

    & > .summary {
      display: grid;
      grid-gap: 32px;

      & > .section {
        display: grid;
        grid-gap: 32px;

        @media screen and (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (min-width: 1366px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (min-width: 1920px) {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    }
  }
}
</style>

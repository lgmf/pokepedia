<template>
  <div class="effectiveness">
    <input
      type="text"
      class="input-flex"
      placeholder="Search by a pokemon name"
      inputmode="search"
      autofocus
      :value="search"
      @input="onSearch($event)"
    />

    <span v-if="loading">Loading...</span>

    <main v-else-if="!!pokemon" class="pokemon">
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
        <img class="sprite" :src="pokemon.sprite" alt="pokemon sprite" />
      </header>

      <div class="summary">
        <div class="viewmode">
          <label class="label">
            Defense
            <input
              :checked="viewMode === 'def'"
              @change="changeViewMode('def')"
              type="radio"
              class="input-flex"
              value="def" />
          </label>
          <label class="label">
            Offense
            <input
              :checked="viewMode === 'atk'"
              @change="changeViewMode('atk')"
              type="radio"
              class="input-flex"
              value="atk" />
          </label>
        </div>

        <section v-if="viewMode === 'def'" class="section">
          <v-card v-for="key in defKeys" :key="key" :title="key | damageLabel">
            <div class="type-list">
              <poke-type-badge
                class="type"
                v-for="type in pokemon.defenseEffectiviness[key]"
                :key="type"
                :type="type"
              ></poke-type-badge>
            </div>
          </v-card>
        </section>

        <section v-else class="section">
          <v-card v-for="key in atkKeys" :key="key" :title="key | damageLabel('atk')">
            <div class="type-list">
              <poke-type-badge
                class="type"
                v-for="type in pokemon.attackEffectiviness[key]"
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  State, Action, Getter, namespace,
} from 'vuex-class';

import { Pokemon, createPokemon, initialState } from './models/Pokemon';
import { PokemonApiResponse } from './models/PokemonApiResponse';
import { TypeDamageRelations } from '../types/models';

import Debounce from '@/core/decorators/debounce';
import pokeApi from '@/core/api/PokeApi';
import PokeTypeDetail from '../types/components/PokemonTypeDetail.vue';
import PokeTypeBadge from '../types/components/PokemonTypeBadge.vue';
import pokeTypeColor from '../types/directives/PokeTypeColor';
import VCard from '@/components/VCard.vue';
import damageLabel from './filters/DamageLabel';
import { EffectivenessState } from '../../store/effectiveness/models/effectiveness.state';
import { Mutations } from '../../store/effectiveness/mutations';

const effectivenessStore = namespace('effectiveness');

@Component({
  components: {
    PokeTypeDetail,
    PokeTypeBadge,
    VCard,
  },
  directives: {
    pokeTypeColor,
  },
  filters: {
    damageLabel,
  },
})
export default class Effectiveness extends Vue {
  @effectivenessStore.State
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
  notFound!: boolean;

  @effectivenessStore.State
  pokemon!: Pokemon;

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

  @Debounce(800)
  onSearch(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (!value) {
      return;
    }

    this.fillSearch(value);
    this.fetchPokemon(value);
  }
}
</script>

<style scoped lang="scss">
.effectiveness {
  display: grid;
  grid-gap: 64px;

  & > .pokemon {
    display: grid;
    grid-gap: 64px;

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

      & > .viewmode {
        justify-self: center;

        & > .label {
          font-size: 20px;
          font-weight: 900;

          @media screen and (min-width: 768px) {
            font-size: 24px;
          }
        }

        & > .label + .label {
          margin-left: 20px;
        }
      }

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

<template>
  <v-card v-if="!!pokemon" class="card" :title="pokemon.name">
    <template v-slot:header>
      <img
        class="pokemon-image"
        :src="pokemon.image"
        alt="pokemon image"
      />

      <div class="pokemon-types">
        <poke-type-badge
          class="type"
          v-for="typeSlot in pokemon.typeSlots"
          :key="typeSlot.slot"
          :type="typeSlot.type.name"
        ></poke-type-badge>
      </div>

      <div class="tabs">
        <button
          class="tab"
          :class="{ '-active': viewMode === 'def'}"
          @click="changeViewMode('def')">takes damage</button>

        <button
          class="tab"
          :class="{ '-active': viewMode === 'atk'}"
          @click="changeViewMode('atk')">deals damage</button>
      </div>
    </template>

    <template v-if="viewMode === 'def'" v-slot:body>
      <poke-type-detail
          v-for="key in defKeys"
          class="type-detail"
        :key="key"
        :title="key | damageLabel"
        :data="pokemon.defenseEffectiveness[key]"></poke-type-detail>
    </template>

    <template v-else v-slot:body>
      <poke-type-detail
        v-for="key in atkKeys"
        class="type-detail"
      :key="key"
      :title="key | damageLabel"
      :data="pokemon.attackEffectiveness[key]"></poke-type-detail>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import {
  State, Action, Getter, namespace,
} from 'vuex-class';

import { EffectivenessState } from '@/store/effectiveness/models/effectiveness.state';
import { Mutations } from '@/store/effectiveness/mutations';

import { Pokemon } from '@/core/models';

import VCard from '@/components/VCard.vue';
import PokeTypeBadge from '@/components/PokemonTypeBadge.vue';
import PokeTypeDetail from '@/components/PokemonTypeDetail.vue';

import damageLabel from '../filters/DamageLabel';

const effectivenessStore = namespace('effectiveness');

@Component({
  components: {
    VCard,
    PokeTypeBadge,
    PokeTypeDetail,
  },
  filters: {
    damageLabel,
  },
})
export default class PokemonCardContainer extends Vue {
  @effectivenessStore.State
  pokemon!: Pokemon;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.viewMode)
  viewMode!: 'atk' | 'def';

  @effectivenessStore.Getter
  defKeys!: string;

  @effectivenessStore.Getter
  atkKeys!: string;

  @effectivenessStore.Mutation(Mutations.SET_VIEW_MODE)
  changeViewMode!: Function;
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: center;
  margin-top: baseline(3);

  & > .tab {
    font-size: 16px;
    text-transform: uppercase;
    padding: baseline(3) baseline(4);
    cursor: pointer;
    outline: none;
    font-weight: 900;
    border-radius: baseline(5);
    background-color: $background;
    color: $primary-300;
    border: 1px solid $primary-300;
    transition: box-shadow 0.1s linear;

    &:hover,
    &:focus {
      box-shadow: 0px 2px 12px $primary-600;
    }

    &.-active {
      border-color: $primary-600;
      background-color: $primary-300;
      color: $background;
    }
  }

  & > .tab + .tab {
    margin-left: baseline(5);
  }
}
</style>

<template>
  <v-card v-if="!!pokemon" class="card" :title="pokemon.name">
    <template v-slot:header>
      <img
        class="pokemon-image"
        :src="pokemon.image"
        :alt="$t('effectivenessPage.pokemonCardContainer.alternateText')"
      />

      <div class="pokemon-types">
        <poke-type-badge
          class="type"
          v-for="typeSlot in pokemon.typeSlots"
          :key="typeSlot.slot"
          :type="typeSlot.type.name"
        ></poke-type-badge>
      </div>

      <div class="effectiveness-tabs">
        <button
          class="tab"
          :class="{ '-active': viewMode === 'def'}"
          @click="changeViewMode('def')"
        >{{ $t('effectivenessPage.pokemonCardContainer.firstTabText') }}</button>

        <button
          class="tab"
          :class="{ '-active': viewMode === 'atk'}"
          @click="changeViewMode('atk')"
        >{{ $t('effectivenessPage.pokemonCardContainer.secondTabText') }}</button>
      </div>
    </template>

    <template v-if="viewMode === 'def'" v-slot:body>
      <poke-type-detail
        v-for="key in defKeys"
        class="type-detail"
        :key="key"
        :title="key | damageLabel"
        :data="pokemon.defenseEffectiveness[key]"
      ></poke-type-detail>
    </template>

    <template v-else v-slot:body>
      <poke-type-detail
        v-for="key in atkKeys"
        class="type-detail"
        :key="key"
        :title="key | damageLabel"
        :data="pokemon.attackEffectiveness[key]"
      ></poke-type-detail>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";

import { EffectivenessState } from "@/store/effectiveness/models/effectiveness.state";
import { Mutations } from "@/store/effectiveness/mutations";

import { Pokemon } from "@/core/models";

import VCard from "@/components/VCard.vue";
import PokeTypeBadge from "@/components/PokemonTypeBadge.vue";
import PokeTypeDetail from "@/components/PokemonTypeDetail.vue";

import damageLabel from "../filters/DamageLabel";

const effectivenessStore = namespace("effectiveness");

@Component({
  components: {
    VCard,
    PokeTypeBadge,
    PokeTypeDetail
  },
  filters: {
    damageLabel
  }
})
export default class PokemonCardContainer extends Vue {
  @Prop()
  pokemon!: Pokemon;

  @effectivenessStore.State((state: EffectivenessState) => state.ui.viewMode)
  viewMode!: "atk" | "def";

  @effectivenessStore.Getter
  defKeys!: string;

  @effectivenessStore.Getter
  atkKeys!: string;

  @effectivenessStore.Mutation(Mutations.SET_VIEW_MODE)
  changeViewMode!: Function;
}
</script>

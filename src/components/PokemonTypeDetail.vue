<template>
  <div class="poke-type-detail">
    <h5 class="title">{{ title }}</h5>
    <ul class="badges">
      <li v-if="!data.length">-</li>
      <poke-type-badge v-for="item in data" :key="item" :type="item"></poke-type-badge>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import PokeTypeBadge from "./PokemonTypeBadge.vue";

@Component({
  name: "poke-type-detail",
  components: {
    PokeTypeBadge
  }
})
export default class PokeTypeDetail extends Vue {
  @Prop()
  title!: string;

  @Prop()
  data!: string[];
}
</script>

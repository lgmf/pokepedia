<template>
  <span class="poke-type-badge" :class="[bgColor]">
    <span class="title">{{ translatedType }}</span>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "poke-type-badge"
})
export default class PokeTypeBadge extends Vue {
  @Prop()
  type!: string;

  get bgColor(): string {
    return `-${this.type}background`;
  }

  get translatedType(): string {
    return this.$t(`shared.pokemonTypes.${this.type}`).toString();
  }
}
</script>

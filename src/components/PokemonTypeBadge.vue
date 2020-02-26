<template>
  <span class="poke-type-badge" :style="{ backgroundColor: bgColor }">
    <span class="title" :class="{ '-centered': !closable }">{{ type }}</span>
    <button v-if="closable" class="close" @click="onClick()">&#10005;</button>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import getColorByType from "./helpers/getColorByType";

@Component({
  name: "poke-type-badge"
})
export default class PokeTypeBadge extends Vue {
  @Prop()
  type!: string;

  @Prop()
  closable!: boolean;

  get bgColor(): string {
    return getColorByType(this.type);
  }

  onClick() {
    if (!this.closable) {
      return;
    }

    this.$emit("clicked");
  }
}
</script>

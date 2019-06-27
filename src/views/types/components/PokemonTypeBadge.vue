<template>
  <span class="poke-type-badge" :style="{ backgroundColor: bgColor }">
    <span class="title" :class="{ '-centered': !closable }">{{ type }}</span>
    <button v-if="closable" class="close" @click="onClick()">&#10005;</button>
  </span>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import getColorByType from '../helpers/getColorByType';

@Component({
  name: 'poke-type-badge',
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

    this.$emit('clicked');
  }
}
</script>

<style lang="scss" scoped>
.poke-type-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  user-select: none;

  & > .title,
  & > .close {
    color: white;
    font-weight: bolder;
    text-transform: uppercase;
    text-shadow: 0 1px 0 black, 0 0 1px rgba(0, 0, 0, 0.6),
      0 0 2px rgba(0, 0, 0, 0.7), 0 0 3px rgba(0, 0, 0, 0.8),
      0 0 4px rgba(0, 0, 0, 0.9);
  }

  & > .title.-centered {
    flex: 1;
    text-align: center;
  }

  & > .close {
    border: none;
    outline: none;
    background: inherit;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>

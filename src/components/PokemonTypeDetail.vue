<template>
  <div class="poke-type-detail">
    <h5 class="title">{{ title }}</h5>
    <ul class="badges">
      <li v-if="!data.length">-</li>
      <poke-type-badge
        v-for="item in data"
        :key="item"
        :type="item"></poke-type-badge>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import PokeTypeBadge from './PokemonTypeBadge.vue';

@Component({
  name: 'poke-type-detail',
  components: {
    PokeTypeBadge,
  },
})
export default class PokeTypeDetail extends Vue {
  @Prop()
  title!: string;

  @Prop()
  data!: string[];
}
</script>

<style lang="scss" scoped>
.poke-type-detail {
  display: flex;
  align-items: center;

  & > .title {
    flex: 1;
    font-size: 18px;
    font-weight: bolder;
    line-height: 20px;

    @media screen and (min-width: 1024px) {
      margin-right: 32px;
    }
  }

  & > .badges {
    flex: 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 24px;
    column-gap: 16px;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1024px) {
      flex: 6;
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (min-width: 1360px) {
      flex: 8;
      grid-template-columns: repeat(6, 1fr);
    }

    @media screen and (min-width: 1920px) {
      flex: 10;
      grid-template-columns: repeat(10, 1fr);
    }
  }
}
</style>

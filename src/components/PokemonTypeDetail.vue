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
    line-height: baseline(5);
  }

  & > .badges {
    flex: 3;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 80px));
    row-gap: baseline(5);
    column-gap: baseline(2);

    @include respond-to('xs') {
      flex: 5;
    }

    @include respond-to('sm') {
      column-gap: baseline(4);
    }

    @include respond-to('md') {
      flex: 6;
    }

    @include respond-to('lg') {
      flex: 8;
    }

    @include respond-to('xl') {
      flex: 10;
    }
  }
}
</style>

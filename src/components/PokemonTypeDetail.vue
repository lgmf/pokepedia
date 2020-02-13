<template>
  <div class="poke-type-detail">
    <h5 class="title">{{ title }}</h5>
    <ul class="badges">
      <li v-if="!data.length">-</li>
      <poke-type-badge
        v-for="item in data"
        :key="item.url"
        :type="item.name"></poke-type-badge>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonType } from '@/core/models';
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
  data!: PokemonType[];
}
</script>

<style lang="scss" scoped>
.poke-type-detail {
  display: block;
  margin-bottom: 28px;

  & > .title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  & > .badges {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(2, 1fr);

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1360px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media screen and (min-width: 1440px) {
      grid-template-columns: repeat(10, 1fr);
    }
  }
}
</style>

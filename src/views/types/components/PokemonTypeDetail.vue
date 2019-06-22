<template>
  <div class="poke-type-detail">
    <h5 class="title">{{ title }}</h5>
    <ul class="list">
      <li v-if="!data.length">-</li>
      <li class="item" v-for="item in data" :key="item.url">
        <strong>{{ item.name }}</strong>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PokemonType } from '../models';

@Component({
  name: 'poke-type-detail',
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

  & > .list {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(2, 1fr);

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media screen and (min-width: 1440px) {
      grid-template-columns: repeat(6, 1fr);
    }

    & > .item {
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid lightseagreen;
      color: #000;
      user-select: none;
    }
  }
}
</style>

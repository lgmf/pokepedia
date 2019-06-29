<template>
  <div class="pokedex">
    Pokedex page
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Pokedex extends Vue { }
</script>

<style scoped lang="scss">
.pokedex {
  display: grid;
}
</style>

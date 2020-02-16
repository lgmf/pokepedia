<template>
  <div class="v-card">
    <header class="header">
      <h2 class="title">{{ title }}</h2>
      <slot name="header"></slot>
    </header>
    <main class="body">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'v-card',
})
export default class VCard extends Vue {
  @Prop()
  title!: string;
}
</script>

<style scoped lang="scss">
.v-card {
  display: grid;
  grid-row-gap: 60px;
  position: relative;
  background: $background;
  padding: 40px 12px;
  border-radius: 40px;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 425px) {
    padding: 40px 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 40px 60px;
  }

  @media screen and (min-width: 1024px) {
    padding: 68px 80px;
  }

  @media screen and (min-width: 1440px) {
    padding: 68px 120px;
  }

  @media screen and (min-width: 1920px) {
    padding: 68px 160px;
  }

  & > .header {
    display: grid;
    grid-row-gap: 24px;
    background-color: $background;

    & > .title {
      font-size: 48px;
      font-weight: 600;
      text-transform: capitalize;
      text-align: center;
    }
  }
}
</style>

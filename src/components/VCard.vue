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
  row-gap: baseline(15);
  position: relative;
  background: $background;
  padding: baseline(10) baseline(6);
  border-radius: baseline(10);
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.25);

  @include respond-to('sm') {
    padding: baseline(10) baseline(15);
  }

  @include respond-to('md') {
    padding: baseline(17) baseline(20);
  }

  @include respond-to('lg') {
    padding: baseline(17) baseline(30);
  }

  @include respond-to('xlg') {
    padding: baseline(17) baseline(40);
  }

  & > .header {
    display: grid;
    row-gap: baseline(6);
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

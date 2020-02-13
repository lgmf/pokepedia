<template>
  <div class="v-card">
    <h2
      class="title"
      :class="{ '-success': color === 'success', '-danger': color === 'danger'}"
    >{{ title }}</h2>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'v-card',
})
export default class VCard extends Vue {
  @Prop()
  title!: string;

  @Prop()
  color!: 'success' | 'danger' | 'default';
}
</script>

<style scoped lang="scss">
.v-card {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 40px;
  background: #fff;
  border-radius: 2px;
  padding: 36px;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  & > .title {
    text-transform: capitalize;
    font-size: 22px;
    font-weight: 600;

    &.-success {
      color: darkseagreen;
    }

    &.-danger {
      color: indianred;
    }
  }
}
</style>

<template>
  <button class="outline-button" @click="onClick()">
    <span class="title">
      <slot></slot>
    </span>
    <span class="close">&#10005;</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'outline-button',
})
export default class OutlineButton extends Vue {
  private active: boolean = false;

  onClick() {
    this.active = !this.active;
    this.$emit('clicked');
  }
}
</script>

<style scoped lang="scss">
.outline-button {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  border: 2px solid #59a295;
  border-radius: 8px;
  transition: background 0.35s ease-in-out;
  outline: none;
  text-transform: uppercase;
  font-size: 14px;
  background: darkseagreen;
  color: white;
}
</style>

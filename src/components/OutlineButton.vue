<template>
  <button class="outline-button" :class="{ '-active': active }" @click="onClick()">
    <slot></slot>
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
  justify-content: center;
  background: white;
  color: #000;
  padding: 20px 32px;
  cursor: pointer;
  border: 2px solid cornflowerblue;
  border-radius: 8px;
  transition: background 0.35s ease-in-out;
  outline: none;
  text-transform: uppercase;
  font-size: 18px;

  &:focus {
    border-color: darkslateblue;
  }

  &.-active {
    background: darkslateblue;
    color: white;
  }
}
</style>

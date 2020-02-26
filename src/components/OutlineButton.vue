<template>
  <button class="outline-button" @click="onClick()">
    <span class="title">
      <slot></slot>
    </span>
    <span class="close">&#10005;</span>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "outline-button"
})
export default class OutlineButton extends Vue {
  private active: boolean = false;

  onClick() {
    this.active = !this.active;
    this.$emit("clicked");
  }
}
</script>

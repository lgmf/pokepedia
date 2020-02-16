<template>
  <div class="inputautocomplete">
    <label for="search" class="label">{{ label }}</label>

    <input
      id="search"
      type="text"
      class="input"
      inputmode="search"
      list="suggestions"
      autocomplete="off"
      placeholder="search here..."
      @keyup="onType($event)"
      @change="onOptionSelected($event)"
      autofocus
    />

    <span class="icon -search"></span>

    <span v-show="loading" class="icon -loading"></span>

    <datalist id="suggestions">
      <option
        v-for="s in suggestions"
        :key="s"
        :value="s"
      >{{s}}</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Emit,
} from 'vue-property-decorator';

import Debounce from '@/core/decorators/Debounce';

@Component
export default class InputAutoComplete extends Vue {
  @Prop()
  label!: string;

  @Prop()
  suggestions!: string[];

  @Prop()
  loading!: boolean;

  get labelValue(): string {
    return this.label || '';
  }

  @Debounce(500)
  @Emit()
  onType(event: Event) {
    const target = event.target as HTMLInputElement;
    return target.value;
  }

  @Emit()
  onOptionSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    target.blur();
    return { search: target.value };
  }
}
</script>

<style scoped lang="scss">
.inputautocomplete {
  $left-spacing: 8px;
  $bottom-spacing: 12px;
  $icon-size: 16px;

  position: relative;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: auto;
  }

  & > .label {
    display: block;
    font-size: 12px;
    color: #21395a;
    font-weight: bold;
    transition: 0.35s ease-in-out;
    text-transform: capitalize;
    margin-bottom: 12px;
  }

  & > .input {
    width: 100%;
    font-size: 16px;
    padding: $left-spacing $left-spacing * 5;
    border: none;
    outline: none;
    border: 1px solid #3d69a4;
    border-radius: 8px;
    transition: box-shadow 0.35s ease;
    color: #21395a;

    &:hover {
      border-color: #21395a;
    }

    &:focus {
      box-shadow: 0px 2px 8px #21395a;
    }

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }

  & > .icon {
    width: $icon-size;
    height: $icon-size;
    position: absolute;
    left: calc(100% - #{$icon-size} - #{$left-spacing * 2});
    bottom: $bottom-spacing;
    background-repeat: no-repeat;

    &.-loading {
      background-image: url("../assets/spinner-solid.svg");
      animation: spinner;
      animation-duration: 0.75s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    &.-search {
      left: $left-spacing * 2;
      background-image: url("../assets/search-solid.svg");
    }
  }
}
</style>

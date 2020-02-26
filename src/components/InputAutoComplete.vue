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
      <option v-for="s in suggestions" :key="s" :value="s">{{s}}</option>
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
  $left-spacing: baseline(2);
  $icon-size: 14px;

  position: relative;
  width: 100%;

  @include respond-to('sm') {
    width: auto;
  }

  & > .label {
    display: block;
    font-size: 12px;
    color: $primary-600;
    font-weight: bold;
    transition: 0.35s ease-in-out;
    text-transform: capitalize;
    margin-bottom: baseline(3);
  }

  & > .input {
    width: 100%;
    font-size: 16px;
    padding: $left-spacing $left-spacing * 5;
    border: none;
    outline: none;
    border: 1px solid $primary-300;
    border-radius: baseline(2);
    transition: box-shadow 0.35s ease;
    color: $primary-600;

    &:hover {
      border-color: $primary-600;
    }

    &:focus {
      box-shadow: 0px 2px 8px $primary-600;
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
    bottom: 10px;
    background-repeat: no-repeat;

    &.-loading {
      background-image: url("../assets/spinner-solid.svg");
      animation: spinner;
      animation-duration: 0.75s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    &.-search {
      background-image: url("../assets/search-solid.svg");
      left: $left-spacing * 2;
    }
  }
}
</style>

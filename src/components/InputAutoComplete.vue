<template>
  <div class="inputautocomplete">
    <input
      id="search"
      type="text"
      class="input"
      inputmode="search"
      list="suggestions"
      autocomplete="off"
      v-model="value"
      @keyup="onKeyUp($event)"
      @change="onOptionSelected($event)"
      autofocus
    />

    <label
      for="search"
      class="label"
      :class="{ '-floating': !!value }"
    >{{label}}</label>

    <span class="searchicon"></span>

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
import { SuggestionMap } from '@/core/models';


@Component
export default class InputAutoComplete extends Vue {
  private suggestions: string[] = [];

  public value: string = '';

  @Prop()
  label!: string;

  @Prop()
  suggestionMap!: SuggestionMap;

  get labelValue(): string {
    return this.label || '';
  }

  @Debounce(500)
  onKeyUp(event: Event) {
    if (!this.suggestionMap) return;

    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    if (!value) return;

    const key = value[0];
    const list = this.suggestionMap[key] || [];
    this.suggestions = list.filter(item => new RegExp(value, 'g').test(item));
  }

  @Emit()
  onOptionSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    return { search: value };
  }
}
</script>

<style scoped lang="scss">
.inputautocomplete {
  $left-spacing: 8px;
  $bottom-spacing: 12px;
  $icon-size: 16px;

  position: relative;

  @media screen and (min-width: 1024px) {
    max-width: 50%;
  }

  @media screen and (min-width: 1440px) {
    max-width: 40%;
  }

  @media screen and (min-width: 1920px) {
    max-width: 40%;
  }

  & > .input {
    width: 100%;
    font-size: 18px;
    padding: 8px;
    border: none;
    outline: none;
    border-bottom: 1px solid #3d69a4;
    background: linear-gradient(to bottom, transparent 95%, #3d69a4 95%)
      no-repeat;
    background-size: 0 100%;
    transition: background-size 0.35s ease;

    &:hover,
    &:focus {
      background-size: 100% 100%;
    }

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }

  & > .label {
    position: absolute;
    left: $left-spacing;
    bottom: 100%;
    font-size: 12px;
    color: #808080;
    font-weight: bold;
    transition: 0.35s ease-in-out;
    text-transform: capitalize;

    @media screen and (min-width: 1024px) {
      font-size: 16px;
      bottom: $bottom-spacing;

      &.-floating {
        bottom: 100%;
        font-size: 12px;
      }
    }
  }

  & > .searchicon {
    width: $icon-size;
    height: $icon-size;
    position: absolute;
    left: calc(100% - #{$icon-size} - #{$left-spacing});
    bottom: $bottom-spacing;
    background-image: url("../assets/search-solid.svg");
    background-repeat: no-repeat;
  }
}
</style>

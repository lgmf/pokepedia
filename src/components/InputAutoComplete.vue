<template>
  <div class="input-autocomplete">
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import Debounce from "@/core/decorators/Debounce";

@Component
export default class InputAutoComplete extends Vue {
  @Prop()
  label!: string;

  @Prop()
  suggestions!: string[];

  @Prop()
  loading!: boolean;

  get labelValue(): string {
    return this.label || "";
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

<template>
  <input
    type="text"
    class="input-flex"
    placeholder="Search by a pokemon name"
    inputmode="search"
    autofocus
    :value="search"
    @input="onSearch($event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component, Prop, Emit,
} from 'vue-property-decorator';

@Component({
  name: 'input-autocomplete',
})
export default class InputAutoComplete extends Vue {
  @Prop()
  search: string = '';

  @Emit('option-selected')
  onSearch(event: Event) {
    const { value } = event.target as HTMLInputElement;
    if (!value) {
      return { search: '' };
    }

    return { search: value };
  }
}
</script>

<template>
  <select class="v-select" v-model="value">
    <option
      class="option"
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >{{ option.label }}</option>
  </select>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { Option } from '@/core/models';

@Component({
  name: 'v-select',
})
export default class VSelect extends Vue {
  @Prop()
  options!: Option[];

  private value: string = '';

  @Watch('value')
  onValueChanged(value: string, oldValue: string) {
    const option = this.getOptionByValue(value);
    this.$emit('optionSelected', option);
  }

  private getOptionByValue(value: string) {
    return this.options.find(option => option.value === value);
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  display: inline-block;
  padding: 8px;
  font-size: 16px;
  text-transform: capitalize;
  background: darkseagreen;
  color: #fff;
  border: none;
  border-radius: 4px;
  outline: none;

  &:hover,
  &:focus {
    border-color: #59a295;
  }

  & > .option {
    padding: 8px;

    &:hover {
      background: #59a295;
      color: #fff;
    }
  }
}
</style>

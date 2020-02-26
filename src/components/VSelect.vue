<template>
  <select class="v-select input-flex" v-model="value">
    <option class="option -placeholder" value disabled selected>Choose an option</option>
    <option
      class="option"
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >{{ option.label }}</option>
  </select>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Option } from "@/core/models";

@Component({
  name: "v-select"
})
export default class VSelect extends Vue {
  @Prop()
  options!: Option[];

  private value: string = "";

  @Watch("value")
  onValueChanged(value: string, oldValue: string) {
    const option = this.getOptionByValue(value);
    this.$emit("optionSelected", option);
  }

  private getOptionByValue(value: string) {
    return this.options.find(option => option.value === value);
  }
}
</script>

<template>
  <div class="v-card">
    <header class="header">
      <h2 class="title">{{ title }}</h2>
      <slot name="header"></slot>
    </header>
    <main class="body">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "v-card"
})
export default class VCard extends Vue {
  @Prop()
  title!: string;
}
</script>

<template>
  <div class="v-loader">
    <img
      class="icon"
      src="@/assets/pokeball.svg"
      alt="pokeball"
      @load="$event.target.classList.add('-spinner')"
    />
    <span class="text">Loading...</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class VLoader extends Vue {}
</script>

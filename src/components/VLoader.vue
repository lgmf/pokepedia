<template>
  <div class="v-loader">
    <img
      class="icon"
      src="@/assets/pokeball.svg"
      alt="pokeball"
      @load="$event.target.classList.add('-spinner')"
    />
    <span class="text">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class VLoader extends Vue {
  @Prop()
  text!: string;
}
</script>

<template>
  <div class="info-message">
    <img
      class="image"
      :src="imageSrc"
      :alt="imageAlternateText"
      @error="$event.target.classList.add('-error')"
      @load="$event.target.classList.add('-loaded')"
    />
    <h3 class="title">{{ title }}</h3>
    <p class="message">{{ message }}</p>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PokemonNotFound extends Vue {
  @Prop()
  title!: string;

  @Prop()
  message!: string;

  @Prop()
  imageSrc!: string;

  @Prop()
  imageAlternateText!: string;
}
</script>

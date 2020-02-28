<template>
  <div class="pokemon-not-found">
    <img
      class="image"
      src="@/assets/confused-psyduck.png"
      alt="sad pikachu"
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
}
</script>

<template>
  <div class="effectiveness">
    <input
      v-model="search"
      type="text"
      class="input-flex"
      placeholder="Search by a pokemon name"
      inputmode="search"
      autofocus
    />

    <span v-if="loading">Loading...</span>

    <main v-else-if="pokemon.id" class="pokemon">
      <header class="header">
        <h1 class="title">
          {{ pokemonTitle }}
          <div class="types">
            <poke-type-badge
              class="type"
              v-for="typeSlot in pokemon.typeSlots"
              :key="typeSlot.slot"
              :type="typeSlot.type.name"
            ></poke-type-badge>
          </div>
        </h1>
        <img class="sprite" :src="pokemon.sprite" alt="pokemon sprite" />
      </header>

      <div class="summary">
        <div class="viewmode">
          <label class="label">
            Defense
            <input v-model="view" type="radio" class="input-flex" value="def" />
          </label>
          <label class="label">
            Offense
            <input v-model="view" type="radio" class="input-flex" value="atk" />
          </label>
        </div>

        <section v-if="view === 'def'" class="section">
          <v-card v-for="key in defKeys" :key="key" :title="key | damageLabel">
            <div class="type-list">
              <poke-type-badge
                class="type"
                v-for="type in pokemon.defenseEffectiviness[key]"
                :key="type"
                :type="type"
              ></poke-type-badge>
            </div>
          </v-card>
        </section>

        <section v-else class="section">
          <v-card v-for="key in atkKeys" :key="key" :title="key | damageLabel('atk')">
            <div class="type-list">
              <poke-type-badge
                class="type"
                v-for="type in pokemon.attackEffectiviness[key]"
                :key="type"
                :type="type"
              ></poke-type-badge>
            </div>
          </v-card>
        </section>
      </div>
    </main>

    <span v-else-if="notFound">Pokemon not found</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Pokemon, createPokemon, initialState } from './models/Pokemon';
import { PokemonApiResponse } from './models/PokemonApiResponse';
import { TypeDamageRelations } from '../types/models';
import Debounce from '@/core/decorators/debounce';
import pokeApi from '@/core/api/PokeApi';
import PokeTypeDetail from '../types/components/PokemonTypeDetail.vue';
import PokeTypeBadge from '../types/components/PokemonTypeBadge.vue';
import pokeTypeColor from '../types/directives/PokeTypeColor';
import VCard from '@/components/VCard.vue';
import damageLabel from './filters/DamageLabel';

@Component({
  components: {
    PokeTypeDetail,
    PokeTypeBadge,
    VCard,
  },
  directives: {
    pokeTypeColor,
  },
  filters: {
    damageLabel,
  },
})
export default class Effectiveness extends Vue {
  private search: string = '';

  private view: 'atk' | 'def' = 'def';

  private loading: boolean = false;

  private notFound: boolean = false;

  private pokemonData: Pokemon = {} as Pokemon;

  get pokemon(): Pokemon {
    return this.pokemonData;
  }

  get pokemonTitle(): string {
    const { id, name } = this.pokemon;
    return `${name} #${id}`;
  }

  get defKeys() {
    const keys: string[] = [];
    Object.entries(this.pokemonData.defenseEffectiviness).forEach(
      ([key, value]) => {
        if (value.length) {
          keys.push(key);
        }
      },
    );
    return keys;
  }

  get atkKeys() {
    const keys: string[] = [];
    Object.entries(this.pokemonData.attackEffectiviness).forEach(
      ([key, value]) => {
        if (value.length) {
          keys.push(key);
        }
      },
    );
    return keys;
  }

  @Watch('search')
  @Debounce(800)
  async onSearch(value: string) {
    if (!value) {
      return;
    }

    this.loading = true;
    this.notFound = false;

    try {
      const url = `pokemon/${value.toLowerCase()}`;
      const data: PokemonApiResponse = await pokeApi.get(url);
      this.pokemonData = await createPokemon(data);
    } catch (error) {
      this.pokemonData = {} as Pokemon;
      this.notFound = true;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
.effectiveness {
  display: grid;
  grid-gap: 64px;

  & > .pokemon {
    display: grid;
    grid-gap: 64px;

    & > .header {
      display: flex;
      justify-content: space-between;

      @media screen and (min-width: 768px) {
        justify-content: flex-start;
      }

      & > .title {
        text-transform: uppercase;
        font-size: 28px;
        font-weight: 900;

        @media screen and (min-width: 768px) {
          font-size: 30px;
          margin-right: 32px;
        }

        & > .types {
          display: flex;
          margin-top: 32px;

          & > .type + .type {
            margin-left: 12px;
          }
        }
      }

      & > .sprite {
        height: 80px;
        width: 80px;
        margin: -28px;
        justify-self: end;
      }
    }

    & > .summary {
      display: grid;
      grid-gap: 32px;

      & > .viewmode {
        justify-self: center;

        & > .label {
          font-size: 20px;
          font-weight: 900;

          @media screen and (min-width: 768px) {
            font-size: 24px;
          }
        }

        & > .label + .label {
          margin-left: 20px;
        }
      }

      & > .section {
        display: grid;
        grid-gap: 32px;

        @media screen and (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media screen and (min-width: 1366px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (min-width: 1920px) {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    }
  }
}
</style>

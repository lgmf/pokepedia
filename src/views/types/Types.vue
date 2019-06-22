<template>
  <div class="types">
    <div class="btn-group">
      <outline-button
        class="btn"
        v-for="type in types"
        :key="type.url"
        @clicked="getTypeDetails(type)"
      >{{ type.name }}</outline-button>
    </div>

    <main class="details" v-for="selectedType in selectedTypes" :key="selectedType.name">
      <h1 class="title" v-poke-type-color="selectedType.name">{{ selectedType.name }}</h1>
      <div class="relations">
        <v-card title="Strengths" color="success">
          <poke-type-detail
            v-for="strength in selectedType.strengths"
            :key="strength.title"
            :title="strength.title"
            :data="strength.data"
          ></poke-type-detail>
        </v-card>

        <v-card title="Weaknesses" color="danger">
          <poke-type-detail
            v-for="weakness in selectedType.weaknesses"
            :key="weakness.title"
            :title="weakness.title"
            :data="weakness.data"
          ></poke-type-detail>
        </v-card>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PokemonType, PokemonTypeDetail } from './models';
import pokeTypeColor from './directives/PokeTypeColor';
import OutlineButton from '@/components/OutlineButton.vue';
import VCard from '@/components/VCard.vue';
import PokeTypeDetail from './components/PokemonTypeDetail.vue';

@Component({
  components: {
    OutlineButton,
    VCard,
    PokeTypeDetail,
  },
  directives: {
    pokeTypeColor,
  },
})
export default class Types extends Vue {
  title: string = 'Types';

  types: PokemonType[] = [];

  selectedTypes: PokemonTypeDetail[] = [];

  beforeMount() {
    console.log(this.$route);
    fetch('https://pokeapi.co/api/v2/type')
      .then(resp => resp.json())
      .then(({ results }) => {
        this.types = results;
      });
  }

  getTypeDetails({ name, url }: any) {
    const index = this.types.findIndex(t => t.name === name);
    const currentType = this.types[index];

    if (currentType.active) {
      currentType.active = false;
      this.selectedTypes = this.selectedTypes.filter(t => t.name !== name);
      return;
    }

    currentType.active = true;

    fetch(url)
      .then(resp => resp.json())
      .then((data) => {
        this.handleTypeDetail(name, data);
      });
  }

  isActiveType(name: string) {
    return !!this.selectedTypes.map(d => d.name).find(n => n === name);
  }

  private handleTypeDetail(typeName: string, data: any) {
    const damageRelations = data.damage_relations;
    const typeDetail: PokemonTypeDetail = {
      name: typeName,
      strengths: [
        {
          title: 'Deals Double Damage',
          data: damageRelations.double_damage_to,
        },
        {
          title: 'Suffer Half Damage',
          data: damageRelations.half_damage_from,
        },
        { title: 'Suffer No Damage', data: damageRelations.no_damage_from },
      ],
      weaknesses: [
        {
          title: 'Suffer Double Damage',
          data: damageRelations.double_damage_from,
        },
        {
          title: 'Deals Half Damage',
          data: damageRelations.half_damage_to,
        },
        { title: 'Deals No Damage', data: damageRelations.no_damage_to },
      ],
    };

    this.selectedTypes = [...this.selectedTypes, typeDetail];
  }
}
</script>


<style scoped lang="scss">
.types {
  display: grid;
  grid-gap: 64px;
}

.btn-group {
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1440px) {
    grid-template-columns: repeat(6, 1fr);
  }
}

.details {
  display: grid;
  grid-gap: 16px;

  & > .title {
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 900;
  }

  & > .relations {
    display: grid;
    grid-gap: 32px;

    @media screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      padding: 32px;
    }
  }
}
</style>

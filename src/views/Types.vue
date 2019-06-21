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
          <div class="type">
            <h5>Deals Double Damage</h5>
            <ul class="list">
              <li v-if="!selectedType.damageRelations.double_damage_to.length">-</li>
              <li
                class="item"
                v-for="item in selectedType.damageRelations.double_damage_to"
                :key="item.url"
              >
                <strong>{{ item.name }}</strong>
              </li>
            </ul>
          </div>
          <div class="type">
            <h5>Suffer Half Damage</h5>
            <ul class="list">
              <li v-if="!selectedType.damageRelations.half_damage_from.length">-</li>
              <li
                class="item"
                v-for="item in selectedType.damageRelations.half_damage_from"
                :key="item.url"
              >
                <strong>{{ item.name }}</strong>
              </li>
            </ul>
          </div>
          <div class="type">
            <h5>Suffer No Damage</h5>
            <ul class="list">
              <li v-if="!selectedType.damageRelations.no_damage_from.length">-</li>
              <li
                class="item"
                v-for="item in selectedType.damageRelations.no_damage_from"
                :key="item.url"
              >
                <strong>{{ item.name }}</strong>
              </li>
            </ul>
          </div>
        </v-card>
        <v-card title="Weaknesses" color="danger">
          <div class="type">
            <h5>Suffer Double Damage</h5>
            <ul class="list">
              <li v-if="!selectedType.damageRelations.double_damage_from.length">-</li>
              <li
                class="item"
                v-for="item in selectedType.damageRelations.double_damage_from"
                :key="item.url"
              >
                <strong>{{ item.name }}</strong>
              </li>
            </ul>
          </div>
          <div class="type">
            <h5>Deals Half Damage</h5>
            <ul class="list">
              <li v-if="!selectedType.damageRelations.half_damage_to.length">-</li>
              <li
                class="item"
                v-for="item in selectedType.damageRelations.half_damage_to"
                :key="item.url"
              >
                <strong>{{ item.name }}</strong>
              </li>
            </ul>
          </div>
          <div class="type">
            <h5>Deals No Damage</h5>
            <ul class="list">
              <li v-if="!selectedType.damageRelations.no_damage_to.length">-</li>
              <li
                class="item"
                v-for="item in selectedType.damageRelations.no_damage_to"
                :key="item.url"
              >
                <strong>{{ item.name }}</strong>
              </li>
            </ul>
          </div>
        </v-card>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OutlineButton from '../components/OutlineButton.vue';
import VCard from '../components/VCard.vue';
import getColorByType from './getColorByType';

@Component({
  components: {
    OutlineButton,
    VCard,
  },
  directives: {
    pokeTypeColor(el, name) {
      const color = getColorByType(name.value);
      el.style.setProperty('color', color);
    },
  },
})
export default class Types extends Vue {
  title: string = 'Types';

  types: { name: string; url: string; active: boolean }[] = [];

  selectedTypes: any[] = [];

  beforeMount() {
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
        this.selectedTypes.push({
          name,
          damageRelations: data.damage_relations,
        });
      });
  }

  isActiveType(name: string) {
    return !!this.selectedTypes.map(d => d.name).find(n => n === name);
  }
}
</script>


<style lang="scss">
.types {
  display: grid;
  grid-gap: 64px;
  padding: 0 60px 60px 60px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;

  & > .btn {
    flex: 1 0 20%;
    margin: 12px;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;

  & > .item {
    margin: 12px;
    padding: 12px 24px;
    cursor: pointer;
    border: 2px solid cornflowerblue;
    border-radius: 8px;
    color: cornflowerblue;

    &:hover {
      transform: scale(1);
    }

    &.-active {
      background: darkslateblue;
      color: white;
      transform: scale(1);
    }
  }
}

.details {
  display: grid;
  grid-gap: 32px;

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
      padding: 32px 64px;
    }
  }
}
</style>

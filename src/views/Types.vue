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
      <h1 class="title">{{ selectedType.name }}</h1>
      <div class="relations">
        <section class="card">
          <h2 class="title -success">Strengths</h2>
          <div class="body">
            <div class="type">
              <h5>Double Damage</h5>
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
              <h5>Half Damage</h5>
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
              <h5>No Damage</h5>
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
          </div>
        </section>
        <section class="card">
          <h2 class="title -danger">Weaknesses</h2>
          <div class="body">
            <div class="type">
              <h5>Double Damage</h5>
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
              <h5>Half Damage</h5>
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
              <h5>No Damage</h5>
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
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OutlineButton from '../components/OutlineButton.vue';

@Component({
  components: {
    OutlineButton,
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


<style scoped lang="scss">
.types {
  display: grid;
  grid-gap: 32px;
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
    grid-template-columns: 1fr 1fr;
      padding: 32px 64px;
  }
}

.card {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 40px;
  background: #fff;
  border-radius: 2px;
  padding: 36px;
  position: relative;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  & > .title {
    font-size: 24px;
    font-weight: 600;

    &.-success {
      color: darkseagreen;
    }

    &.-danger {
      color: indianred;
    }
  }
}
</style>

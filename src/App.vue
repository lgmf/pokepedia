<template>
  <div id="app">
    <header class="header">
      <div class="logo"></div>
      <nav class="nav">
        <router-link to="/types">Types</router-link>
      </nav>
    </header>
    <main class="content">
      <h1 class="pagetitle">{{ routeName }}</h1>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  get routeName(): string | undefined {
    return this.$route.name;
  }
}
</script>

<style lang="scss">
#app {
  display: grid;
  grid-gap: 20px;
  font-family: "Montserrat", sans-serif;

  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #42b983;

    & > .logo {
      width: 150px;
      height: 80px;
      background-image: url('assets/logo.svg');
      background-size: contain;
      background-repeat: no-repeat;
    }

    & > .nav {
      display: flex;

      a {
        padding: 20px;
        font-size: 20px;
        font-weight: bold;
        color: darkslateblue;
        text-decoration: none;

        &:hover,
        &.router-link-exact-active {
          text-decoration: underline;
          color: #fff;
        }
      }
    }
  }

  & > .content {
    padding: 0 30px 30px 30px;

    @media screen and (min-width: 768px) {
      padding: 0 60px 60px 60px;
    }

    & > .pagetitle {
      font-size: 32px;
      font-weight: 900;
      color: #42b983;
      text-transform: capitalize;
      margin-bottom: 32px;
    }
  }
}
</style>

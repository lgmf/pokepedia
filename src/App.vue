<template>
  <div id="app">
    <header class="header">
      <div class="logo"></div>
      <nav class="nav">
        <router-link to="/effectiveness">Effectiveness</router-link>
      </nav>
    </header>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  get routeName(): string | undefined {
    return this.$route.name;
  }
}
</script>

<style lang="scss">
#app {
  max-width: 1920px;
  margin: 0 auto;
  display: grid;
  row-gap: 20px;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;

  & > .header,
  & > .content {
    padding: 0 12px;

    @media screen and (min-width: 425px) {
      padding: 0 32px;
    }

    @media screen and (min-width: 768px) {
      padding: 0 75px;
    }

    @media screen and (min-width: 1024px) {
      padding: 0 100px;
    }

    @media screen and (min-width: 1366px) {
      padding: 0 160px;
    }
  }

  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $primary-300;

    & > .logo {
      width: 150px;
      height: 80px;
      background-image: url("assets/logo.svg");
      background-size: contain;
      background-repeat: no-repeat;
    }

    & > .nav {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      a {
        padding: 20px;
        font-size: 20px;
        font-weight: bold;
        color: $background;
        text-decoration: none;

        &:hover,
        &.router-link-exact-active {
          text-decoration: underline;
        }
      }
    }
  }

  & > .content {
    padding-bottom: 60px;

    & > .pagetitle {
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
        font-size: 36px;
        font-weight: 900;
        color: $primary-300;
        text-align: center;
        text-transform: capitalize;
        margin-bottom: 36px;
        text-align: center;
        line-height: normal;
      }

      @media screen and (min-width: 1024px) {
        text-align: left;
      }
    }
  }
}
</style>

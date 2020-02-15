<template>
  <div id="app">
    <header class="header">
      <div class="logo"></div>
      <nav class="nav">
        <router-link to="/effectiveness">Effectiveness</router-link>
      </nav>
    </header>
    <main class="content">
      <h1 class="pagetitle">{{ routeName }}</h1>
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
@import "./styles/main.scss";

#app {
  max-width: 1920px;
  margin: 0 auto;
  display: grid;
  row-gap: 40px;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;

  @media screen and (min-width: 768px) {
    row-gap: 20px;
  }

  & > .header,
  & > .content {
    padding: 0 25px;

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
    background: #3d69a4;

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
        color: #fff;
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
        color: #3d69a4;
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

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
  row-gap: baseline(5);
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;

  & > .header,
  & > .content {
    padding: 0 baseline(4);

    @include respond-to('xs') {
      padding: 0 baseline(8);
    }

    @include respond-to('sm') {
      padding: 0 baseline(19);
    }

    @include respond-to('md') {
      padding: 0 baseline(25);
    }

    @include respond-to('lg') {
      padding: 0 baseline(40);
    }
  }

  & > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $primary-300;

    & > .logo {
      width: 100%;
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
        padding: baseline(5);
        font-size: 16px;
        font-weight: bold;
        color: $background;
        text-decoration: none;

        @include respond-to('sm') {
          font-size: 20px;
        }

        &:hover,
        &.router-link-exact-active {
          text-decoration: underline;
        }
      }
    }
  }

  & > .content {
    display: flex;
    padding-bottom: baseline(12);
  }
}
</style>

<template>
  <div id="app">
    <div class="nav">
      <router-link to="/types">Types</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("assets/styles/main.scss");
#app {
  font-family: "Montserrat", sans-serif;
}
.nav {
  padding: 30px;
  a {
    font-size: 40px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

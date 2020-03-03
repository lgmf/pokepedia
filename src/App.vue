<template>
  <div id="app">
    <header class="header">
      <img class="logo" src="@/assets/logo.svg" alt="logo" />
      <nav class="nav">
        <router-link class="link" to="/effectiveness">{{ $t("header.navbar.firstNavItem") }}</router-link>
      </nav>
      <img
        class="locale"
        src="@/assets/usa.png"
        alt="locale"
        tabindex="0"
        @click="changeLocale('enUS')"
      />
      <img
        class="locale"
        src="@/assets/brazil.png"
        alt="locale"
        tabindex="0"
        @click="changeLocale('ptBR')"
      />
    </header>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

import { Languages } from "./i18n";

@Component
export default class App extends Vue {
  public langs: string[] = ["enUS", "ptBR"];

  @Action
  changeLocale!: Function;
}
</script>

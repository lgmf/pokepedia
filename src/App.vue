<template>
  <div id="app">
    <header class="header">
      <img class="logo" src="@/assets/logo.png" alt="logo" />
      <nav class="nav">
        <router-link class="link" to="/effectiveness">{{ $t("header.navbar.firstNavItem") }}</router-link>
      </nav>
      <section class="button-group locale">
        <button class="button button-image" @click="changeLocale('enUS')">
          <img class="image" src="@/assets/usa.png" :alt="$t('header.locale.usaFlagAlternateText')" />
        </button>
        <button class="button button-image" @click="changeLocale('ptBR')">
          <img
            class="image"
            src="@/assets/brazil.png"
            :alt="$t('header.locale.brazilFlagAlternateText')"
          />
        </button>
      </section>
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
  @Action
  changeLocale!: Function;
}
</script>

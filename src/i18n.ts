import Vue from "vue";
import VueI18n from "vue-i18n";

import enUS from "./i18n/enUS";
import ptBR from "./i18n/ptBR";

Vue.use(VueI18n);

const messages = {
  enUS,
  ptBR
};

export enum Languages {
  EN_US = "enUS",
  PT_BR = "ptBR"
}

export const localeStorageKey = "pokepedia-preferred-locale";

export const initialLocale = localStorage.getItem(localeStorageKey) as Languages || Languages.EN_US;

export default new VueI18n({
  locale: initialLocale,
  messages
});

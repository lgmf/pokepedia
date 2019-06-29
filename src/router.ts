import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pokedex',
      name: 'Pokedex',
      component: () => import('./views/pokedex/Pokedex.vue'),
    },
    {
      path: '/types',
      name: 'pokemon types',
      component: () => import('./views/types/Types.vue'),
    },
    {
      path: '**',
      redirect: '/pokedex',
    },
  ],
});

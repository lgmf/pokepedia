import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/effectiveness',
      name: 'pokemon effectiveness',
      component: () => import('./views/effectiveness/Effectiveness.vue'),
    },
    {
      path: '/types',
      name: 'pokemon types',
      component: () => import('./views/types/Types.vue'),
    },
    {
      path: '/',
      redirect: '/effectiveness',
    },
    {
      path: '',
      redirect: '/effectiveness',
    },
    {
      path: '**',
      redirect: '/effectiveness',
    },
  ],
});

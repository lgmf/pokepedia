import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/types',
      name: 'types',
      component: () => import('./views/Types.vue'),
    },
    {
      path: '**',
      redirect: '/types',
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';

import Games from './components/Games.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Games',
      component: Games
    }
  ]
});

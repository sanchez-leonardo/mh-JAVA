import Vue from 'vue';
import Router from 'vue-router';

import Games from './components/Games.vue';
import GameView from './components/GameView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Games',
      component: Games
    },
    {
      path: '/game_view/:id',
      name: 'GameView',
      component: GameView
    }
  ]
});

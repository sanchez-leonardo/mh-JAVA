import Vue from 'vue';
import Router from 'vue-router';

import Games from './components/Games.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
<<<<<<< HEAD
  routes: [{
    path: '/',
    name: 'Games',
    component: Games
  }]
});
=======
  routes: [
    {
      path: '/',
      name: 'Games',
      component: Games
    }
  ]
});
>>>>>>> a983de3add323fd1ae52dd849b328f04b11639d0

import Vue from 'vue';
import Router from 'vue-router';

import Games from './components/Games.vue'
import GameView from './components/GameView.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Games
        },
        {
            path: '/game_view',
            name: 'game_view',
            component: GameView
        }

    ]
});
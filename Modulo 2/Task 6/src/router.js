import Vue from 'vue';
import Router from 'vue-router';

import Home from './tabs/Home.vue';
import HouseMain from './tabs/HouseMain.vue';
import HouseAttendance from './tabs/HouseAttendance.vue';
import HouseLoyalty from './tabs/HouseLoyalty.vue';
import SenateMain from './tabs/SenateMain.vue';
import SenateAttendance from './tabs/SenateAttendance.vue';
import SenateLoyalty from './tabs/SenateLoyalty.vue';
import OpenStates from './tabs/OpenStatesTable.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/house',
      name: 'house',
      component: HouseMain
    },
    {
      path: '/house_attendance',
      name: 'house_attendance',
      component: HouseAttendance
    },
    {
      path: '/house_loyalty',
      name: 'house_loyalty',
      component: HouseLoyalty
    },
    {
      path: '/senate',
      name: 'senate',
      component: SenateMain
    },
    {
      path: '/senate_attendance',
      name: 'senate_attendance',
      component: SenateAttendance
    },
    {
      path: '/senate_loyalty',
      name: 'senate_loyalty',
      component: SenateLoyalty
    },
    {
      path: '/legislators',
      name: 'legislators',
      component: OpenStates
    }
  ]
});

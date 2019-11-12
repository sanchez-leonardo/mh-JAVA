import Vue from 'vue'
import App from './App.vue'
import Router from './router.js'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  Router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
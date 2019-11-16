import Vue from "vue"
import Vuex from "vuex";

import gamesModule from './modules/gamesModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        gamesModule
    }
})
export default {
    state: {
        games: {}
    },

    mutations: {
        setGamesInfo(state, payload) {
            state.games = payload
        }
    },

    actions: {
        GET_GAMES_INFO({
            commit
        }) {
            fetch('/api/games')
                .then(response => response.json())
                .then(data => commit('setGamesInfo', data)
                    .catch(err => console.log(err))
                }
        }
    }
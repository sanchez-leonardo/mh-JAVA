/* eslint-disable no-console */
import { SET_GAMES_INFO, SET_LEADERBOARD_INFO } from "../mutationTypes";

const state = {
  leaderboard: [],
  games: {}
};

const getters = {
  leaderboardInfo: state => {
    return state.leaderboard
      .sort((a, b) => b.scores.total - a.scores.total)
      .slice(0, 5);
  },
  currentGames: state => state.games.games,
  currentUser: state => state.games.currentUser
};

const mutations = {
  [SET_LEADERBOARD_INFO]: (state, leaderboardInfo) =>
    (state.leaderboard = [...leaderboardInfo]),
  [SET_GAMES_INFO]: (state, gamesInfo) => (state.games = { ...gamesInfo })
};

const actions = {
  getLeaderboardInfo({ commit }) {
    fetch("https://mh-battleship.herokuapp.com/api/leaderboard", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        commit(SET_LEADERBOARD_INFO, data);
      });
  },

  getGamesInfo({ commit }) {
    fetch("https://mh-battleship.herokuapp.com/api/games", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        commit(SET_GAMES_INFO, data);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

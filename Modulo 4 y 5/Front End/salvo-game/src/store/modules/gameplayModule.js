import {
  SET_GAME_STATE_INFO,
  SET_GAME_VIEW_INFO,
  CLEAR_GAME_VIEW_INFO
} from "../mutationTypes";

const state = {
  gameView: {},
  gameState: {}
};

const getters = {
  //State from game player
  gameViewState: ({ gameView }) => {
    return {
      game_state: gameView.game_state,
      game_turn: gameView.game_turn,
      game_player_state: gameView.game_player_state
    };
  },
  //Only player ships
  playerShips: ({ gameView }) =>
    gameView.ships ? gameView.ships.flatMap(ship => ship.locations) : null,
  //Only player salvoes
  playerSalvoes: ({ gameView }, getters) =>
    gameView.salvoes[getters.currentUser.id]
      ? Object.values(gameView.salvoes[getters.currentUser.id]).flatMap(
          salvo => salvo
        )
      : null,

  //Oponent salvoes
  opponentSalvoes: ({ gameView }, getters) =>
    gameView.salvoes[
      gameView.game_players
        .flatMap(gp => gp.player_detail.id)
        .filter(id => id !== getters.currentUser.id)
    ]
      ? Object.values(
          gameView.salvoes[
            gameView.game_players
              .flatMap(gp => gp.player_detail.id)
              .filter(id => id !== getters.currentUser.id)
          ]
        ).flatMap(salvo => salvo)
      : null,

  //Server's game state
  gameState: ({ gameState }) => gameState
};

const mutations = {
  [SET_GAME_STATE_INFO]: (state, gameStateInfo) =>
    (state.gameState = { ...gameStateInfo }),

  [SET_GAME_VIEW_INFO]: (state, gameViewData) =>
    (state.gameView = { ...gameViewData }),

  [CLEAR_GAME_VIEW_INFO]: state => {
    state.gameView = {};
    state.gameState = {};
  }
};

const actions = {
  getGameViewInfo({ commit }, gpId) {
    fetch("/api/game_view/" + gpId)
      .then(response => response.json())
      .then(data => commit(SET_GAME_VIEW_INFO, data));
  },

  getGameState({ commit }, gpId) {
    fetch("/api/game_state/" + gpId)
      .then(response => response.json())
      .then(data => commit(SET_GAME_STATE_INFO, data));
  },

  clearGameViewInfo({ commit }) {
    commit(CLEAR_GAME_VIEW_INFO);
  }
};

export default { state, getters, mutations, actions };

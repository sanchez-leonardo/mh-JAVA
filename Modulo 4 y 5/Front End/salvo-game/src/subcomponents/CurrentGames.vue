<template>
  <section>
    <h1>Current Games</h1>
    <table>
      <thead>
        <th>Id</th>
        <th>Player 1</th>
        <th>Player 2</th>
        <th>Created</th>
      </thead>

      <tbody v-if="!gamesCallData.currentUser">
        <tr v-for="(game, key) in gamesCallData.games" :key="key">
          <td>{{game.id}}</td>
          <td>{{player1(game.game_players)}}</td>
          <td>{{player2(game.game_players)}}</td>
          <td>{{game.created}}</td>
        </tr>
      </tbody>

      <tbody v-if="gamesCallData.currentUser">
        <tr v-for="(game, key) in gamesCallData.games" :key="key">
          <td>{{game.id}}</td>
          <td>{{player1(game.game_players)}}</td>
          <td>{{player2(game.game_players)}}</td>
          <td>{{game.created}}</td>
          <td>
            <game-status v-bind:user="gamesCallData.currentUser" v-bind:game="game" />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import GameStatusButton from "./GameStatusButton";

export default {
  name: "CurrentGames",
  components: {
    "game-status": GameStatusButton
  },

  props: { gamesCallData: Object },

  methods: {
    player1(array) {
      return array[0].player.email;
    },

    player2(array) {
      if (array[1]) {
        return array[1].player.email;
      } else {
        return "Waiting for player 2";
      }
    }
  }
};
</script>
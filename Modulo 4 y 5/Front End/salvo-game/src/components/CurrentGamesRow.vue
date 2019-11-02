<template>
  <tr>
    <td>{{game.id}}</td>
    <td>{{player1}}</td>
    <td>{{player2}}</td>
    <td>{{game.created}}</td>
    <td>
      <status-cell v-if="loggedUser" v-bind:content="statusCell" />
    </td>
  </tr>
</template>

<script>
import StatusCell from "./GameStatusCell";

export default {
  name: "CurrentGamesRow",

  components: {
    "status-cell": StatusCell
  },

  props: {
    game: Object,
    user: Object
  },

  computed: {
    loggedUser() {
      return this.user != null;
    },

    player1() {
      return this.game.game_players[0].player.email;
    },

    player2() {
      if (this.game.game_players.length == 2) {
        return this.game.game_players[1].player.email;
      } else {
        return "Waiting Player";
      }
    },

    userInGame() {
      return this.game.game_players
        .map(gp => gp.player.email)
        .includes(this.user.email);
    },

    statusCell() {
      let buttonContent = {};

      if (this.game.game_state == "over") {
        buttonContent = {
          tag: "span",
          content: "Game Over"
        };
      } else {
        if (this.game.game_players.length == 2) {
          if (!this.userInGame) {
            buttonContent = {
              tag: "span",
              content: "Game Full"
            };
          } else {
            buttonContent = {
              tag: "router-link",
              content: "Re-Join"
            };
          }
        } else if (this.game.game_players.length == 1) {
          if (!this.userInGame) {
            buttonContent = {
              tag: "router-link",
              content: "Join"
            };
          }
        }
      }

      return buttonContent;
    }
  }
};
</script>
<template>
  <tr>
    <td class="text-center">{{game.id}}</td>
    <td class="text-center">{{player1}}</td>
    <td class="text-center">{{player2}}</td>
    <td class="text-center">{{game.created}}</td>
    <status-cell v-bind:content="statusCell" v-if="loggedUser" />
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
          tag: "cell",
          content: "Game Over"
        };
      } else {
        if (this.game.game_players.length == 2) {
          if (!this.userInGame) {
            buttonContent = {
              tag: "cell",
              content: "Game Full"
            };
          } else {
            buttonContent = {
              tag: "btn",
              content: "Re-Join"
            };
          }
        } else if (this.game.game_players.length == 1) {
          if (!this.userInGame) {
            buttonContent = {
              tag: "btn",
              content: "Join"
            };
          } else {
            buttonContent = {
              tag: "btn",
              content: "Re-Join"
            };
          }
        }
      }

      return buttonContent;
    }
  }
};
</script>
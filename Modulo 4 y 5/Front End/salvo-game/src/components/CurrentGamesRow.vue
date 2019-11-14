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

    userGpId() {
      return this.game.game_players.filter(
        gp => gp.player.id === this.user.id
      )[0].id;
    },

    statusCell() {
      let buttonContent = {};

      if (this.game.game_state == "over") {
        buttonContent = {
          tag: "cell",
          type: "text",
          content: "Game Over",
          id: null
        };
      } else {
        if (this.game.game_players.length == 2) {
          if (!this.userInGame) {
            buttonContent = {
              tag: "cell",
              type: "text",
              content: "Game Full",
              id: null
            };
          } else {
            buttonContent = {
              tag: "btn",
              type: "rejoin",
              content: "Re-Join",
              id: this.userGpId.toString()
            };
          }
        } else if (this.game.game_players.length == 1) {
          if (!this.userInGame) {
            buttonContent = {
              tag: "btn",
              type: "join",
              content: "Join",
              id: this.game.id
            };
          } else {
            buttonContent = {
              tag: "btn",
              type: "rejoin",
              content: "Re-Join",
              id: this.userGpId.toString()
            };
          }
        }
      }

      return buttonContent;
    }
  }
};
</script>
<template>
  <v-row justify="center" tag="article">
    <v-col cols="8">
      <v-row justify="space-between">
        <v-col cols="auto">
          <h1 class="headline font-italic font-weight-medium text-left">Active Games</h1>
        </v-col>
        <v-col cols="auto" v-if="fullAndOverFilter">
          <v-checkbox v-model="fullAndOverFilter" label="Hide finished and full games" dense></v-checkbox>
        </v-col>
      </v-row>
      <v-simple-table>
        <thead>
          <th></th>
          <th class="title text-center">Player 1</th>
          <th class="title text-center">Player 2</th>
          <th class="title text-center">Created</th>
        </thead>

        <tbody>
          <TableRow v-for="game in filteredGames" :game="game" :key="game.id" />
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import TableRow from "./CurrentGamesRow";

export default {
  name: "CurrentGames",
  components: {
    TableRow
  },

  data() {
    return {
      fullAndOverFilter: false
    };
  },

  computed: {
    ...mapGetters(["currentGames", "currentUser"]),
    //Temporarily disabled
    filteredGames() {
      if (this.fullAndOverFilter) {
        return this.currentGames.filter(
          game =>
            (game.game_state != "over" && game.game_players.length === 1) ||
            (game.game_players.length === 2 && this.userInGame(game))
        );
      } else {
        return this.currentGames;
      }
    }
  },

  methods: {
    ...mapActions(["getGamesInfo"]),

    userInGame(game) {
      return game.game_players
        .map(gp => gp.player.id)
        .includes(this.currentUser.id);
    }
  },

  created() {
    this.getGamesInfo();
  }
};
</script>
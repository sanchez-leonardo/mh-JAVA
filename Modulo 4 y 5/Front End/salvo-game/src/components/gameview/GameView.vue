<template>
  <v-container fluid>
    <v-row justify="center" class="mb-4" no-gutters>
      <v-col cols="3">
        <v-btn block color="primary" id="back-to-games" @click="goToGames">Go Back</v-btn>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <Grid :gridName="playerGrid" :shipsOrSalvoes="shipsOrSalvoes" />
      <v-divider vertical v-if="shipsOrSalvoes === 'salvoes'"></v-divider>
      <Grid
        :gridName="salvoGrid"
        :shipsOrSalvoes="shipsOrSalvoes"
        v-if="shipsOrSalvoes === 'salvoes'"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Grid from "./Grid";

export default {
  name: "GameView",

  components: {
    Grid
  },

  data() {
    return {
      playerGrid: "player",
      salvoGrid: "salvo"
    };
  },

  computed: {
    ...mapGetters(["currentUser", "gameViewState"]),

    shipsOrSalvoes({ gameViewState }) {
      if (
        (gameViewState.game_state === "ship" ||
          gameViewState.game_state === "waiting_p2") &&
        gameViewState.game_player_state === "placing"
      ) {
        return "ships";
      } else {
        return "salvoes";
      }
    }
  },

  methods: {
    ...mapActions(["getGamesInfo", "getGameViewInfo", "clearGameViewInfo"]),

    goToGames() {
      this.$router.push("/");
    }
  },

  created() {
    if (!this.currentUser) {
      this.getGamesInfo();
    }
    this.getGameViewInfo(this.$route.params.id.toString());
  },

  beforeDestroy() {
    this.clearGameViewInfo();
  }
};
</script>

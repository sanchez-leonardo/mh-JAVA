<template>
  <v-container tag="section" fluid>
    <v-row justify="center" class="mb-4 mt-2" no-gutters>
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
      salvoGrid: "salvo",
      intervalId: ""
    };
  },

  computed: {
    ...mapGetters(["currentUser", "gameViewState", "gameState"]),

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
    ...mapActions([
      "getGamesInfo",
      "getGameViewInfo",
      "clearGameViewInfo",
      "getGameState"
    ]),

    goToGames() {
      this.$router.push("/");
    },

    removeDND() {
      if (this.gameViewState.game_state === "salvo") {
        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("drag", window.drag));

        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("dragstart", window.dragstart));

        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("dragend", window.dragend));

        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("dragover", window.dragover));

        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("dragenter", window.dragenter));

        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("dragleave", window.dragleave));

        document
          .querySelectorAll("*")
          .forEach(el => el.removeEventListener("drop", window.drop));
      }
    },

    checkForChanges() {
      let id = setInterval(this.changesChange, 10000);

      this.intervalId = id;
    },

    async changesChange() {
      await this.getGameState(this.$route.params.id.toString());

      if (
        this.gameViewState.game_state != this.gameState.game_state ||
        this.gameViewState.game_turn == this.gameState.game_turn + 1 ||
        this.gameViewState.game_player_state != this.gameState.game_player_state
      ) {
        this.getGameViewInfo(this.$route.params.id.toString());
      } else if (this.gameViewState.game_state == "over") {
        window.clearInterval(this.intervalId);
        this.intervalId = "";
      }
    }
  },

  created() {
    if (!this.currentUser) {
      this.getGamesInfo();
    }

    this.getGameViewInfo(this.$route.params.id.toString()).then(() =>
      this.checkForChanges()
    );
  },

  beforeDestroy() {
    this.clearGameViewInfo();

    if (this.gameState.game_state != "over") {
      window.clearInterval(this.intervalId);
    }

    window.salvoesForPost.length = 0;
  }
};
</script>

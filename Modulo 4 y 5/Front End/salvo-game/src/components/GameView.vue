<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="mb-4" no-gutters>
      <v-col cols="auto">
        <v-btn
          medium
          color="primary"
          type="button"
          id="back-to-games"
          v-on:click="goToGames"
        >Go Back</v-btn>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <grid v-bind:gpInfo="gpInfo" v-bind:type="playerGrid" v-bind:gpId="gpId" />
      <v-divider v-if="salvoState" vertical></v-divider>
      <grid v-bind:gpInfo="gpInfo" v-bind:type="salvoGrid" v-bind:gpId="gpId" v-if="salvoState" />
    </v-row>
  </v-container>
</template>

<script>
import { customFetch } from "../scripts/utilities_script";
import Grid from "./Grid";

export default {
  name: "GameView",
  components: {
    grid: Grid
  },

  data() {
    return {
      gpInfo: {},
      playerGrid: "player",
      salvoGrid: "salvo"
    };
  },

  computed: {
    shipState() {
      return (
        this.gpInfo.game_state === "ship" ||
        this.gpInfo.game_player_state === "waiting_p2"
      );
    },

    salvoState() {
      return (
        this.gpInfo.game_state === "salvo" ||
        this.gpInfo.game_player_state === "waiting"
      );
    },

    gpId() {
      return this.$route.params.id;
    }
  },

  methods: {
    goToGames() {
      this.$router.push("/");
    },

    getGameViewData() {
      customFetch("GET", "/api/game_view/" + this.$route.params.id)
        .then(response => response.json())
        .then(data => (this.gpInfo = data));
    }
  },

  created() {
    this.getGameViewData();
  }
  // ,
  // mounted() {
  //   require("../scripts/drag_and_drop");
  //     const dragAndDropScript = document.createElement("script");
  //     dragAndDropScript.setAttribute("src", "../src/scripts/drag_and_drop.js");
  //     dragAndDropScript.async = true;
  //     document.head.appendChild(dragAndDropScript);

  // }
};
</script>

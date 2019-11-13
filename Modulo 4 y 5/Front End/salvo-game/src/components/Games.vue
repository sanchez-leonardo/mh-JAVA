<template>
  <v-container tag="section">
    <leaderboard />
    <games-table v-bind:gamesCallData="gamesCallData" />
  </v-container>
</template>

<script>
import Leaderboard from "./LearderboardTable";
import GamesTable from "./CurrentGamesTable";

export default {
  name: "Games",

  components: {
    leaderboard: Leaderboard,
    "games-table": GamesTable
  },

  props: { gamesCallData: Object }
};
</script>
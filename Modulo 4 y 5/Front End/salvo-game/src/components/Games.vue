<template>
  <div>
    <leaderboard />
    <games-table v-bind:gamesCallData="gamesCallData" />
  </div>
</template>

<script>
import Leaderboard from "./Learderboard";
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
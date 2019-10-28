<template>
  <div>
    <leaderboard />
    <current-games v-bind:gamesCallData="gamesCallData" />
  </div>
</template>

<script>
import Leaderboard from "../subcomponents/Learderboard";
import CurrentGames from "../subcomponents/CurrentGames";

export default {
  name: "Games",

  components: {
    leaderboard: Leaderboard,
    "current-games": CurrentGames
  },

  props: { gamesCallData: Object }
};
</script>
<template>
  <div>
    <leaderboard />
    <current-games />
  </div>
</template>

<script>
import Leaderboard from "../subcomponents/Learderboard.vue";
import CurrentGames from "../subcomponents/CurrentGames.vue";

export default {
  name: "Games",

  components: {
    leaderboard: Leaderboard,
    "current-games": CurrentGames
  }
};
</script>
<template>
  <section>
    <h1>Current Games</h1>
    <table>
      <thead>
        <th>Id</th>
        <th>Player 1</th>
        <th>Player 2</th>
        <th>Created</th>
      </thead>

      <tbody>
        <table-row
          v-for="(game, key) in gamesCallData.games"
          v-bind:user="gamesCallData.currentUser"
          v-bind:game="game"
          v-bind:key="key"
        />
      </tbody>
    </table>
  </section>
</template>

<script>
import TableRow from "./CurrentGamesRow";

export default {
  name: "CurrentGames",
  components: {
    "table-row": TableRow
  },

  props: { gamesCallData: Object }
};
</script>
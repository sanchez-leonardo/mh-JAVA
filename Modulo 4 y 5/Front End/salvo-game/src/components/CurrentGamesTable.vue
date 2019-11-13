<template>
  <v-row justify="center" tag="article">
    <v-col cols="12">
      <h1 class="headline font-italic font-weight-medium text-left">Current Games</h1>
      <v-simple-table>
        <thead>
          <th></th>
          <th class="title text-center">Player 1</th>
          <th class="title text-center">Player 2</th>
          <th class="title text-center">Created</th>
        </thead>

        <tbody>
          <table-row
            v-for="(game, key) in gamesCallData.games"
            v-bind:user="gamesCallData.currentUser"
            v-bind:game="game"
            v-bind:key="key"
          />
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
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
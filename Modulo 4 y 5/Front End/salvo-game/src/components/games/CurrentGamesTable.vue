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
          <TableRow v-for="game in currentGames" :game="game" :key="game.id" />
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

  computed: mapGetters(["currentGames"]),

  methods: mapActions(["getGamesInfo"]),

  created() {
    this.getGamesInfo();
  }
};
</script>
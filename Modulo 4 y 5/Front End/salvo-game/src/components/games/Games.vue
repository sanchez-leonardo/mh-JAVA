<template>
  <v-container tag="section">
    <v-divider></v-divider>
    <Leaderboard />
    <GamesTable />
    <v-row justify="center">
      <v-col cols="3">
        <v-btn block color="primary" id="create-game" @click="createGame">Create Game</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { customFetch } from "../../scripts/utilities_script";

import Leaderboard from "./LearderboardTable";
import GamesTable from "./CurrentGamesTable";

export default {
  name: "Games",

  components: {
    Leaderboard,
    GamesTable
  },

  methods: {
    createGame() {
      customFetch("POST", "/api/games")
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.$router.push({
                name: "GameView",
                params: { id: data.gpId.toString() }
              })
            );
          } else {
            alert("Something went south, try again later");
          }
        })
        // eslint-disable-next-line no-console
        .catch(error => console.log(error));
    }
  }
};
</script>
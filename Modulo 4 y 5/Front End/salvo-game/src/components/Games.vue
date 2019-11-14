<template>
  <v-container tag="section">
    <log-forms
      v-on:logIn="userLogIn($event)"
      v-on:signUp="userSignUp($event)"
      v-on:logOut="userLogOut"
      v-bind:user="gamesCallData.currentUser"
    />
    <v-divider></v-divider>
    <leaderboard />
    <games-table v-bind:gamesCallData="gamesCallData" />
  </v-container>
</template>

<script>
import { customFetch } from "../scripts/utilities_script";
import LogForms from "./LogForms";
import Leaderboard from "./LearderboardTable";
import GamesTable from "./CurrentGamesTable";

export default {
  name: "Games",

  components: {
    "log-forms": LogForms,
    leaderboard: Leaderboard,
    "games-table": GamesTable
  },
  data() {
    return {
      gamesCallData: {}
    };
  },

  methods: {
    userLogIn(formData) {
      let formFields = new URLSearchParams(formData);
      customFetch(
        "POST",
        "/api/login",
        [{ "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }],
        formFields
      ).then(response => {
        if (response.ok) {
          this.gamesInfo();
        }
      });
    },

    userSignUp(formData) {
      let formFields = new URLSearchParams(formData);
      customFetch(
        "POST",
        "/api/players",
        [{ "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }],
        formFields
      ).then(response => {
        if (response.ok) {
          this.userLogIn(formFields);
        }
      });
    },

    userLogOut() {
      customFetch("POST", "/api/logout").then(() => this.gamesInfo());
    },

    gamesInfo() {
      customFetch("GET", "/api/games")
        .then(response => response.json())
        .then(data => {
          this.gamesCallData = data;
        })
        .catch(err => (this.data = err));
    }
  },

  created() {
    this.gamesInfo();
  }
};
</script>
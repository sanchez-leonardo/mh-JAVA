<template>
  <v-app>
    <app-header />
    <log-forms
      v-on:logIn="userLogIn($event)"
      v-on:signUp="userSignUp($event)"
      v-on:logOut="userLogOut"
      v-bind:user="gamesCallData.currentUser"
    />
    <v-content tag="main">
      <games-overview v-bind:gamesCallData="gamesCallData" />
      <router-view></router-view>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import { customFetch } from "./scripts/utilities_script";
import Header from "./components/Header.vue";
import LogForms from "./components/LogForms";
import Footer from "./components/Footer.vue";
import Games from "./components/Games";
// import GameView from "./components/GameView";

export default {
  name: "app",
  components: {
    "app-header": Header,
    "log-forms": LogForms,
    "app-footer": Footer,
    "games-overview": Games
    // ,    "game-view": GameView
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

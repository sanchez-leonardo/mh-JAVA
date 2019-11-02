<template>
  <div>
    <app-header />
    <log-forms
      v-on:logIn="userLogIn($event)"
      v-on:signUp="userSignUp($event)"
      v-on:logOut="userLogOut"
      v-bind:user="gamesCallData.currentUser"
    />
    <router-view />

    <app-footer />
  </div>
</template>

<script>
import { customFetch } from "../utilities_script";

import Header from "./components/Header.vue";
import LogForms from "./components/LogForms";
import Footer from "./components/Footer.vue";

export default {
  name: "app",

  components: {
    "app-header": Header,
    "log-forms": LogForms,
    "app-footer": Footer
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
          this.userLogIn(formFields).then(this.gamesInfo());
        }
      });
    },

    userLogOut() {
      customFetch("POST", "/api/logout").then(this.gamesInfo());
    },

    gamesInfo() {
      fetch("/api/games")
        .then(response => response.json())
        .then(data => {
          this.gamesCallData = data;
        });
    }
  },

  created() {
    this.gamesInfo();
  }
};
</script>
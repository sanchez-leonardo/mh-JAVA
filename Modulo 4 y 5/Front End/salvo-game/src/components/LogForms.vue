<template>
  <v-container>
    <v-form v-on:submit.prevent dense>
      <v-row justify="space-around" v-if="!currentUser">
        <v-col cols="4">
          <v-text-field
            id="userName"
            type="text"
            label="User Name"
            v-model="formData.userName"
            :rules="userNameRules"
          ></v-text-field>
        </v-col>

        <v-col cols="4">
          <v-text-field
            id="password"
            type="password"
            label="Password"
            v-model="formData.password"
            :rules="passwordRules"
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-btn block color="primary" id="log-in" @click.prevent="logIn">Log In!</v-btn>
        </v-col>

        <v-col cols="2">
          <v-btn block color="primary" id="sign-up" @click.prevent="signUp">Sign Up!</v-btn>
        </v-col>
      </v-row>

      <v-row justify="space-around" v-else>
        <v-col cols="8">
          <h2 class="text-center">Hello {{ currentUser.email }}</h2>
        </v-col>

        <v-col cols="2">
          <v-btn block color="primary" id="log-out" @click.prevent="logOut">Log Out!</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { emailIsValid, customFetch } from "../scripts/utilities_script";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LogForms",

  data() {
    return {
      valid: false,
      formData: {
        userName: "",
        password: ""
      },
      userNameRules: [
        userName => emailIsValid(userName) || "Please, use a valid email"
      ],
      passwordRules: [
        password => password.length > 2 || "Password must be 6 characters long"
      ]
    };
  },

  computed: mapGetters(["currentUser"]),

  methods: {
    ...mapActions(["getGamesInfo"]),

    logIn() {
      let formFields = new URLSearchParams(this.formData);

      customFetch(
        "POST",
        "/api/login",
        [{ "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }],
        formFields
      ).then(response => {
        if (response.ok) {
          this.getGamesInfo();
        }
      });
    },
    signUp() {
      let formFields = new URLSearchParams(this.formData);
      customFetch(
        "POST",
        "/api/players",
        [{ "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }],
        formFields
      ).then(response => {
        if (response.ok) {
          this.getGamesInfo();
        }
      });
    },
    logOut() {
      customFetch("POST", "/api/logout").then(response => {
        if (response.ok) {
          this.getGamesInfo();
          if (this.$route.path !== "/") {
            this.$router.push("/");
          }
        }
      });
    }
  }
};
</script>
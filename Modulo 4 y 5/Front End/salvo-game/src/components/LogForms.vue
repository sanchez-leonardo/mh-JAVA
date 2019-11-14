<template>
  <v-form v-on:submit.prevent dense>
    <v-row justify="space-around" v-if="!user">
      <v-col cols="5">
        <v-text-field
          id="userName"
          type="text"
          label="User Name"
          v-model="formData.userName"
          v-bind:rules="userNameRules"
        ></v-text-field>
      </v-col>

      <v-col cols="5">
        <v-text-field
          id="password"
          type="password"
          label="Password"
          v-model="formData.password"
          v-bind:rules="passwordRules"
        ></v-text-field>
      </v-col>

      <v-col cols="1">
        <v-btn small color="primary" type="submit" id="log-in" v-on:click="logIn">Log In!</v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn small color="primary" type="submit" id="sign-up" v-on:click="signUp">Sign Up!</v-btn>
      </v-col>
    </v-row>

    <v-row justify="space-around" v-if="user">
      <v-col cols="8">
        <h2 class="text-center">Hello {{ user.email }}</h2>
      </v-col>

      <v-col cols="4">
        <v-btn small color="primary" type="submit" id="log-out" v-on:click="logOut">Log Out!</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { emailIsValid } from "../scripts/utilities_script";

export default {
  name: "LogForms",

  props: {
    user: Object
  },

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

  methods: {
    logIn() {
      this.$emit("logIn", this.formData);
      this.formData.userName = "";
      this.formData.password = "";
    },

    signUp() {
      this.$emit("signUp", this.formData);
      this.formData.userName = "";
      this.formData.password = "";
    },

    logOut() {
      this.$emit("logOut");
    }
  }
};
</script>

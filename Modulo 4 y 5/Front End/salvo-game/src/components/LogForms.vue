<template>
  <div>
    <form v-on:submit.prevent v-if="!user">
      <label for="userName">E-Mail</label>
      <input id="userName" type="text" v-model="formData.userName" />

      <label for="password">E-Mail</label>
      <input id="password" type="password" v-model="formData.password" />

      <v-btn small color="primary" type="submit" id="log-in" v-on:click="logIn">
        Log In!
      </v-btn>

      <v-btn
        small
        color="primary"
        type="submit"
        id="sign-up"
        v-on:click="signUp"
      >
        Sign Up!
      </v-btn>
    </form>

    <div v-if="user">
      <h2>Hello {{ user.email }}</h2>

      <form v-on:submit.prevent>
        <button type="submit" id="log-out" v-on:click="logOut">Log Out!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogForms",

  props: {
    user: Object
  },

  data() {
    return {
      formData: {
        userName: "",
        password: ""
      }
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

<template>
  <v-app>
    <app-header />
    <v-content tag="main">
      <router-view></router-view>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-footer": Footer
  }
};
</script>

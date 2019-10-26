<template>
  <div>
    <main-header />
    <main>
      <log-forms />
      <!-- <router-view /> -->
    </main>
    <main-footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import LogForms from "./subcomponents/LogForms.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    "main-header": Header,
    "log-forms": LogForms,
    "main-footer": Footer
  }
};
</script>
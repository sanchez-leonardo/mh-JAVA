<template>
  <div>
    <the-header/>
    <the-nav/>
    <router-view/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from "./components/mainpage/TheHeader.vue";
import TheNavbar from "./components/mainpage/TheNavbar.vue";
import TheFooter from "./components/mainpage/TheFooter.vue";

export default {
  components: {
    "the-header": TheHeader,
    "the-nav": TheNavbar,
    "the-footer": TheFooter
  }
};
</script>

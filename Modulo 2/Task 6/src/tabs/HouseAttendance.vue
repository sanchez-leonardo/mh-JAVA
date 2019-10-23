<template>
  <house-engagement v-bind:members="members" v-bind:chamber="chamber"/>
</template>

<script>
import Engagement from "../components/statistics/PageEngagement.vue";
import * as utility from "../utility_script";

export default {
  name: "house-attendance",
  components: {
    "house-engagement": Engagement
  },
  data() {
    return {
      members: [],
      chamber: "Congress"
    };
  },
  //Pedido inicial de informacion + cache
  created() {
    utility
      .fetchAndCache(utility.proPublicaUrl.house, utility.proPublicaInit)
      .then(response => response.json())
      .then(obj => (this.members = obj.results[0].members));
  }
};
</script>
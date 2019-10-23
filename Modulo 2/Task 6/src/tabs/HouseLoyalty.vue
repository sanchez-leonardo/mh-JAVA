<template>
  <hou-loyalty v-bind:members="members" v-bind:chamber="chamber"/>
</template>

<script>
import Loyalty from "../components/statistics/PageLoyalty.vue";
import * as utility from "../utility_script";

export default {
  name: "house-loyalty",
  components: {
    "hou-loyalty": Loyalty
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
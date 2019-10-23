<template>
  <sen-loyalty v-bind:members="members" v-bind:chamber="chamber"/>
</template>

<script>
import Loyalty from "../components/statistics/PageLoyalty.vue";
import * as utility from "../utility_script";

export default {
  name: "senate-loyalty",
  components: {
    "sen-loyalty": Loyalty
  },
  data() {
    return {
      members: [],
      chamber: "Senate"
    };
  },
  //Pedido inicial de informacion + cache
  created() {
    utility
      .fetchAndCache(utility.proPublicaUrl.senate, utility.proPublicaInit)
      .then(response => response.json())
      .then(obj => (this.members = obj.results[0].members));
  }
};
</script>
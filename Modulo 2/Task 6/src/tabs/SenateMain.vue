<template>
  <main class="mt-3 mb-5">
    <article class="container col-10">
      <div class="container-fluid">
        <h2>Senators</h2>
        <p>First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House.</p>
      </div>

      <main-table v-bind:members="members"/>
    </article>
  </main>
</template>

<script>
import MainTable from "../components/chambers/ProPublicaTable.vue";
import * as utility from "../utility_script";

export default {
  name: "senate-main",

  components: {
    "main-table": MainTable
  },

  data() {
    return {
      members: []
    };
  },

  created() {
    utility
      .fetchAndCache(utility.proPublicaUrl.senate, utility.proPublicaInit)
      .then(response => response.json())
      .then(obj => (this.members = obj.results[0].members));
  }
};
</script>

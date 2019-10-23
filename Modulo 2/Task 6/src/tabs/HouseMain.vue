<template>
  <main class="mt-3 mb-5">
    <article class="container col-10">
      <div class="container-fluid">
        <h2>Congressmen</h2>
        <p>The major power of the House is to pass federal legislation that affects the entire country, although its bills must also be passed by the Senate and further agreed to by the U.S. President before becoming law (unless both the House and Senate re-pass the legislation with a two-thirds majority in each chamber). The House has some exclusive powers: the power to initiate revenue bills, to impeach officials (impeached officials are subsequently tried in the Senate), and to elect the U.S. President in case there is no majority in the Electoral College.</p>
        <p>Each U.S. state is represented in the House in proportion to its population as measured in the census, but every state is entitled to at least one representative.</p>
      </div>
      <main-table v-bind:members="members"/>
    </article>
  </main>
</template>

<script>
import MainTable from "../components/chambers/ProPublicaTable.vue";
import * as utility from "../utility_script";

export default {
  name: "house-main",

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
      .fetchAndCache(utility.proPublicaUrl.house, utility.proPublicaInit)
      .then(response => response.json())
      .then(obj => (this.members = obj.results[0].members));
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <grid v-bind:type="playerGrid" />
      <grid v-bind:type="salvoGrid" />
    </v-row>
  </v-container>
</template>

<script>
import Grid from "./Grid";
import { customFetch } from "../scripts/utilities_script";

export default {
  name: "GameView",
  components: {
    grid: Grid
  },
  props: {
    gpId: Number
  },
  data() {
    return {
      gpInfo: {},
      playerGrid: "player",
      salvoGrid: "salvo"
    };
  },

  created() {
    customFetch("GET", "/api/game_view/" + this.$route.params.id)
      .then(response => response.json())
      .then(data => (this.gpInfo = data));
  },

  mounted() {
    const dragAndDropScript = document.createElement("script");
    dragAndDropScript.setAttribute("src", "./scripts/drag_and_drop.js");
    dragAndDropScript.async = true;
    document.head.appendChild(dragAndDropScript);
  }
};
</script>

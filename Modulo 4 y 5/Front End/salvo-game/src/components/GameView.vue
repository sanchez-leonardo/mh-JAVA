<template>
  <div>
    <grid />
    <grid />
  </div>
</template>

<script>
import Grid from "./Grid";
import { customFetch } from "../../utilities_script";

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
      gpInfo: {}
    };
  },

  created() {
    customFetch("GET", "/api/game_view/" + this.gpId)
      .then(response => response.json())
      .then(data => (this.gpInfo = data));
  }
};
</script>
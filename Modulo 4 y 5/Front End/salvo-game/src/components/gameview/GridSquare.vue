<template>
  <v-col :class="['pa-0', {piece: hasShip}, {hit: hasHit}, {salvo: hasSalvo}]" v-html="contents"></v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: { gridType: String, letter: String, number: Number },

  computed: {
    ...mapGetters([
      "playerShipsLocations",
      "playerSalvoesLocations",
      "opponentSalvoesLocations"
    ]),

    id() {
      return this.$attrs.id.slice(1);
    },

    contents() {
      if (this.letter === "0" && this.number === 0) {
        return "";
      } else if (this.letter === "0") {
        return `<p>${this.number}</p>`;
      } else if (this.number === 0) {
        return `<p>${this.letter.toUpperCase()}</p>`;
      } else {
        return "";
      }
    },
    hasShip() {
      return (
        this.playerShipsLocations != null &&
        this.gridType === "p" &&
        this.playerShipsLocations.includes(this.id)
      );
    },
    hasHit() {
      return (
        this.opponentSalvoesLocations != null &&
        this.gridType === "p" &&
        this.opponentSalvoesLocations.includes(this.id)
      );
    },
    hasSalvo() {
      return (
        this.playerSalvoesLocations !== null &&
        this.gridType === "s" &&
        this.playerSalvoesLocations.includes(this.id)
      );
    }
  }
};
</script>

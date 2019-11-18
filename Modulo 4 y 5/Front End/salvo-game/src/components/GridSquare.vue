<template>
  <v-col :class="['pa-0', {piece: hasShip}, {hit: hasHit}, {salvo: hasSalvo}]" v-html="contents"></v-col>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";

export default {
  props: { gridType: String, letter: String, number: Number },

  computed: {
    ...mapGetters(["playerShips", "playerSalvoes", "opponentSalvoes"]),

    id() {
      return this.$attrs.id;
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
        this.playerShips.length != 0 &&
        this.gridType === "p" &&
        this.playerShips.flatMap(ship => ship.locations).includes(this.id)
      );
    },

    hasHit() {
      return (
        this.opponentSalvoes !== null &&
        Object.values(this.opponentSalvoes)
          .flatMap(salvo => salvo)
          .includes(this.id) &&
        this.gridType === "p"
      );
    },

    hasSalvo() {
      return (
        this.playerSalvoes !== null &&
        Object.values(this.playerSalvoes)
          .flatMap(salvo => salvo)
          .includes(this.id) &&
        this.letter === "s"
      );
    }
  }
};
</script>

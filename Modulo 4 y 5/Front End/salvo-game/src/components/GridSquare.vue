<template>
  <v-col
    :class="['pa-0'
  , {piece: hasShip}
  , {hit: hasHit}
  , {salvo: hasSalvo}
  ]"
    v-html="contents"
  ></v-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: { gridType: String, letter: String, number: Number },

  computed: {
    ...mapGetters(["playerShips", "playerSalvoes", "opponentSalvoes"]),

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
        this.playerShips != null &&
        this.gridType === "p" &&
        this.playerShips.includes(this.id)
      );
    },
    hasHit() {
      return (
        this.opponentSalvoes != null &&
        this.gridType === "p" &&
        this.opponentSalvoes.includes(this.id)
      );
    },
    hasSalvo() {
      return (
        this.playerSalvoes !== null &&
        this.gridType === "s" &&
        this.playerSalvoes.includes(this.id)
      );
    }
  }
};
</script>

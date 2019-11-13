<template>
  <v-row class="grid-line">
    <grid-square
      no-gutters
      v-for="(number, key) in 11"
      v-bind:key="key"
      v-bind:id="target + letter + (number - 1)"
      v-bind:class="squareClassManager(letter, number, target)"
      v-bind:letter="letter"
      v-bind:number="number"
    ></grid-square>
  </v-row>
</template>

<script>
import GridSquare from "./GridSquare";

export default {
  name: "GridLine",

  components: { "grid-square": GridSquare },

  props: {
    target: String,
    letter: String
  },

  methods: {
    squareClassManager(letter, number, target) {
      if (
        target + letter + (number - 1) == "s00" ||
        target + letter + (number - 1) == "p00"
      ) {
        return "grid-square blank";
      } else if (letter === "0") {
        return "grid-square column-name";
      } else if (number - 1 === 0) {
        return "grid-square column-num";
      } else if (target == "p" && number - 1 !== 0) {
        return "grid-square wah";
      } else if (target == "s" && number - 1 !== 0) {
        return "grid-square battle-square";
      }
    }
  }
};
</script>

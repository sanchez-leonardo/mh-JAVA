<template>
  <div class="grid-line">
    <div
      v-for="(number,key) in 11"
      v-bind:key="key"
      v-bind:id="target+letter+(number - 1)"
      v-bind:class="squareClassManager(letter, number, target)"
    >
      <p>{{returnLetterOrNumber(letter, number)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GridLine",
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
        return "blank";
      } else if (letter === "0") {
        return "column-name";
      } else if (number === 0) {
        return "column-num";
      } else if (target == "p") {
        return "wah";
      } else if (target == "s") {
        return "battle-square";
      }
    },

    returnLetterOrNumber(letter, number) {
      if (letter === "0") {
        return number;
      } else if (number === 0) {
        return letter.toUpperCase();
      } else {
        return "";
      }
    }
  }
};
</script>
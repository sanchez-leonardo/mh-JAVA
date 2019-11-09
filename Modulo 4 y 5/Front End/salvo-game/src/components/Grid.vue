<template>
  <article>
    <h1>{{type + ' grid' |capitalize}}</h1>
    <div v-bind:id="type+'-grid'">
      <grid-line
        v-for="(gridLetter, key) in gridLetters"
        v-bind:key="key"
        v-bind:letter="gridLetter"
        v-bind:target="target"
      />
    </div>
  </article>
</template>

<script>
import GridLine from "./GridLine";

export default {
  name: "Grid",

  components: {
    "grid-line": GridLine
  },

  props: { type: String },

  data() {
    return {
      gridLetters: ["0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    };
  },

  computed: {
    target() {
      if (this.type == "player") {
        return "p";
      } else {
        return "s";
      }
    }
  },

  filters: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
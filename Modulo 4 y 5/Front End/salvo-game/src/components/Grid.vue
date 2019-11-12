<template>
  <v-col>
    <h1>{{ (type + " grid") | capitalize }}</h1>
    <ships-container v-if="type === 'player'" />
    <div v-bind:id="type + '-grid'">
      <grid-line
        v-for="(gridLetter, key) in gridLetters"
        v-bind:key="key"
        v-bind:letter="gridLetter"
        v-bind:target="target"
      />
    </div>
  </v-col>
</template>

<script>
import GridLine from "./GridLine";
import ShipsContainer from "./ShipsContainer";

export default {
  name: "Grid",

  components: {
    "grid-line": GridLine,
    "ships-container": ShipsContainer
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

<style>
.blank {
  background-color: black;
}

.column-name,
.column-num {
  background-color: darkgrey;
  color: white;
}

.wah,
.battle-square {
  background-color: cadetblue;
}

.available-ships {
  display: flex;
  height: 30px;
}

.holder {
  float: left;
  position: relative;
}

.image {
  position: absolute;
  z-index: 2;
  left: 0;
}

.shadow {
  opacity: 0.5;
  position: relative;
  z-index: 0;
}

.holder .image {
  width: 100%;
}

.wah .image {
  height: 100%;
}

.space {
  background-color: darkgreen;
}

.noSpace {
  background-color: coral;
}

.rotate-btn {
  height: 50%;
  width: 50%;
  position: relative;
  z-index: 5;
  background-image: url("../assets/rotate.png");
}

.rotated {
  transform-origin: 10%;
  transform: rotate(90deg);
}
</style>

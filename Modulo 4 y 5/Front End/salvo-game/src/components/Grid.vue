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
/* Grid */
#player-grid,
#salvo-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(11, 1fr);
  width: 500px;
  height: 500px;
  margin: 0 auto;
  border: solid 2px black;
}

.grid-line {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
}

.grid-square {
  display: inline-block;
  position: relative;
  border: solid 1px black;
  background-color: cornflowerblue;
}

.grid-square > p {
  text-align: center;
  color: white;
}

.column-name,
.column-num {
  background-color: darkgray;
}

.blank {
  background-color: black;
}

.wah {
  background-color: cornflowerblue;
}

.piece {
  background-color: limegreen;
}

.salvo {
  background-color: slategrey;
}

.piece.hit {
  background-color: crimson;
}

.shot {
  background-color: darkblue;
}

/* Ship management */

#player {
  display: flex;
  flex-direction: column;
}

.available-ships {
  width: 500px;
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

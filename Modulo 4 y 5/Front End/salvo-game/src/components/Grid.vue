<template>
  <v-col cols="5" align-self="center">
    <h1
      class="headline font-italic font-weight-medium text-left ma-2"
    >{{ (gridName + " grid") | capitalize }}</h1>

    <ShipsContainer v-if="shipsOrSalvoes === 'ships'" class="ma-2 mx-auto" />

    <div :id="gridName + '-grid'" class="ma-2 mx-auto">
      <GridLine
        v-for="(gridLetter, key) in gridLetters"
        :key="key"
        :letter="gridLetter"
        :gridType="gridType"
      />
    </div>

    <v-row align="center" justify="center" class="ma-2" no-gutters>
      <v-col cols="auto" v-if="shipsOrSalvoes === 'ships' && gridType === 'p'">
        <v-btn medium color="primary" id="post-ships" @click.prevent="postShipList">Place Ships!</v-btn>
      </v-col>

      <v-col cols="auto" v-if="shipsOrSalvoes === 'salvoes' && gridType === 's'">
        <v-btn
          medium
          color="primary"
          type="button"
          id="post-salvo"
          @click.prevent="postSalvoesList"
        >Fire!</v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
/* eslint-disable no-console */
import { mapActions } from "vuex";
import { customFetch } from "../scripts/utilities_script";

import GridLine from "./GridLine";
import ShipsContainer from "./ShipsContainer";

export default {
  name: "Grid",

  components: {
    GridLine,
    ShipsContainer
  },

  props: { gridName: String, gpId: String, shipsOrSalvoes: String },

  data() {
    return {
      gridLetters: ["0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
    };
  },

  computed: {
    gridType() {
      if (this.gridName === "player") {
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
  },

  methods: {
    ...mapActions(["getGameViewInfo"]),

    postShipList() {
      if (window.shipsForPost.length === 5) {
        customFetch(
          "POST",
          "/api/games/players/" + this.gpId + "/ships",
          [
            {
              "Content-Type": "application/json;charset=UTF-8"
            }
          ],
          JSON.stringify(window.shipsForPost)
        )
          .then(response => {
            if (response.ok) {
              this.getGameViewInfo(this.gpId);
            }
          })
          .catch(error => console.log(error));
      } else {
        alert("Place all your ships to continue");
      }
    },

    postSalvoesList() {
      if (
        window.salvoesForPost.length != 0 &&
        window.salvoesForPost.length <= 5
      ) {
        customFetch(
          "POST",
          "/api/games/players/" + this.gpId + "/salvoes",
          [
            {
              "Content-Type": "application/json;charset=UTF-8"
            }
          ],
          JSON.stringify(window.salvoesForPost)
        )
          .then(response => {
            if (response.ok) {
              this.getGameViewInfo(this.gpId);
              window.salvoesForPost.length = 0;
            }
          })
          .catch(error => console.log(error));
      } else {
        alert("Could not send salvoes");
      }
    }
  },

  mounted() {
    if (this.gridType === "s") {
      window.salvoesListeners();
    }
  }
};
</script>

<style>
/* Grid */
#player-grid,
#salvo-grid {
  /* display: grid; */
  /* grid-template-columns: 1fr; */
  /* grid-template-rows: repeat(11, 1fr); */
  width: 500px;
  /* height: 500px; */
  /* margin: 0 auto; */
  /* border: solid 2px black; */
}

/*.grid-line {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
} */

.grid-square {
  display: inline-block;
  position: relative;
  border: solid 1px black;
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

.wah,
.battle-square {
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
  /* float: left; */
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
  display: inline-block;
  width: 50%;
  height: 50%;
  position: relative;
  z-index: 5;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.rotated {
  transform-origin: 10%;
  transform: rotate(90deg);
}
</style>

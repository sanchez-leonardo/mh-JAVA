<template>
  <v-col cols="auto" tag="article">
    <v-row>
      <h1 class="headline font-italic font-weight-medium text-left ma-2">{{ gridTitle }}</h1>
    </v-row>

    <ShipsContainer v-if="shipsOrSalvoes === 'ships'" class="ma-2 mx-auto" />
    <div :id="gridName + '-grid'" class="ma-2 mx-auto">
      <GridLine
        v-for="(gridLetter, key) in gridLetters"
        :key="key"
        :letter="gridLetter"
        :gridType="gridType"
      />
    </div>

    <v-row justify="space-around" class="ma-2" no-gutters>
      <v-col cols="auto" v-if="shipsOrSalvoes === 'ships' && gridType === 'p'">
        <v-btn medium color="primary" id="post-ships" @click.prevent="postShipList">Place Ships!</v-btn>
      </v-col>

      <v-col
        cols="auto"
        v-if="shipsOrSalvoes === 'salvoes' && gridType === 's'"
        justify-self="start"
      >
        <h2>Salvoes left: {{ salvoesLeft() }}</h2>
      </v-col>

      <v-col cols="auto" v-if="shipsOrSalvoes === 'salvoes' && gridType === 's'" justify-self="end">
        <v-btn medium color="primary" id="post-salvo" @click.prevent="postSalvoesList">Fire!</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="shipsOrSalvoes === 'salvoes'" align-content="stretch" justify="center">
      <v-col cols="auto">
        <FleetStatus :playerId="playerId()" />
      </v-col>
    </v-row>

    <v-overlay :value="overlay">
      <v-btn icon @click="overlay = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card>
        <v-card-title>Ooops!</v-card-title>
        <v-card-subtitle>Something went catastrophic</v-card-subtitle>
        <v-card-text>{{overlayMsg}}</v-card-text>
      </v-card>
    </v-overlay>
  </v-col>
</template>

<script>
/* eslint-disable no-console */
import { mapActions, mapGetters } from "vuex";
import { customFetch } from "../../scripts/utilities_script";

import ShipsContainer from "./ShipsContainer";
import GridLine from "./GridLine";
import FleetStatus from "./FleetStatusTable";

export default {
  name: "Grid",

  components: {
    GridLine,
    ShipsContainer,
    FleetStatus
  },

  props: { gridName: String, shipsOrSalvoes: String },

  data() {
    return {
      gridLetters: ["0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
      salvoes: window.salvoesForPost,
      overlay: false,
      overlayMsg: ""
    };
  },

  computed: {
    ...mapGetters(["currentUser", "gamePlayers", "opponentId"]),

    gridType() {
      if (this.gridName === "player") {
        return "p";
      } else {
        return "s";
      }
    },

    gpId() {
      return this.$route.params.id.toString();
    },

    gridTitle() {
      if (this.gridName === "player") {
        return "Your Grid";
      } else {
        if (this.gamePlayers.length === 2) {
          return (
            this.gamePlayers.filter(
              gp => gp.player_detail.id === this.opponentId
            )[0].player_detail.email + "'s Grid"
          );
        } else {
          return "Waiting for a worthy opponent";
        }
      }
    }
  },

  methods: {
    ...mapActions(["getGameViewInfo"]),

    playerId() {
      if (this.gridName === "player") {
        return this.currentUser.id;
      } else {
        return this.opponentId;
      }
    },

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
            } else {
              this.overlay = !this.overlay;
              this.overlayMsg = "Your ships were not received";
            }
          })
          .catch(error => console.log(error));
      } else {
        this.overlay = !this.overlay;
        this.overlayMsg = "Place all your ships to continue";
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
            } else {
              this.overlay = !this.overlay;
              this.overlayMsg = "You must wait for your opponent's move";
            }
          })
          .catch(error => console.log(error));
      } else {
        this.overlay = !this.overlay;
        this.overlayMsg = "Shoot something";
      }
    },

    salvoesLeft() {
      return 5 - this.salvoes.length;
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
  background-color: rgb(30, 190, 30);
}

.piece.hit {
  background-color: rgb(190, 30, 30);
}

.salvo {
  background-color: slategrey;
}

.salvo.impact {
  background-color: rgb(190, 30, 30);
}

.salvo.image {
  height: 100%;
  width: 100%;
}

.shot {
  background-color: rgb(110, 110, 26);
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
  background-color: greenyellow;
}

.noSpace {
  background-color: crimson;
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
  transform: rotate(90deg);
}

#carrier.rotated {
  transform-origin: 10% 60%;
}

#battleship.rotated {
  transform-origin: 13% 60%;
}
#destroyer.rotated {
  transform-origin: 17% 55%;
}
#submarine.rotated {
  transform-origin: 17% 60%;
}

#patrol_boat.rotated {
  transform-origin: 25% 55%;
}
</style>

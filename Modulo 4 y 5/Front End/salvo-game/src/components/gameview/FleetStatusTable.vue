<template>
  <v-simple-table>
    <thead>
      <th class="title text-center">Ship</th>
      <th class="title text-center">Damage</th>
    </thead>
    <tbody>
      <tr v-for="(ship, key) in fleet" :key="key">
        <td class="text-center">{{ship | shipName}}</td>
        <td class="text-center">{{shipDamage(ship)}}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FleetStatusTable",

  props: ["playerId"],

  data() {
    return {
      fleet: ["carrier", "battleship", "destroyer", "submarine", "patrol_boat"]
    };
  },

  computed: {
    ...mapGetters(["fleetStatus"]),

    fleetByTurn() {
      return this.fleetStatus[this.playerId] || [];
    }
  },

  methods: {
    shipDamage(type) {
      return this.fleetByTurn
        .flatMap(turn => turn.hits)
        .filter(obj => obj.ship === type)
        .flatMap(sub => sub.dmg).length;
    }
  },

  filters: {
    shipName(string) {
      return (string.charAt(0).toUpperCase() + string.slice(1)).replace(
        "_",
        " "
      );
    }
  }
};
</script>
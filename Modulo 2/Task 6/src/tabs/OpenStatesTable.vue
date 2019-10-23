<template>
  <main class="container mt-3 mb-5 col-10">
    <article id="mainTable">
      <div>
        <h2>Legislators</h2>
        <p>
          This site is powered by the simple and extense database of
          <a
            href="https://openstates.org/"
          >Open States</a>.
        </p>
        <p>Here, you may see the representatives of your state of choice.</p>
      </div>

      <div class="container">
        <form class="row">
          <fieldset class="col">
            <legend>State</legend>
            <label for="state">
              <select name="state" class="ml-2" v-model="filterOptions.stateSelect">
                <option value="none" selected disabled>Select a state</option>
                <option
                  v-for="(state, index) in states"
                  v-bind:key="index"
                  v-bind:value="state.id"
                >{{ state.name }}</option>
              </select>
            </label>
          </fieldset>
          <fieldset class="col">
            <legend>Chamber</legend>
            <label>
              <input type="checkbox" class="ml-2" value="upper" v-model="filterOptions.chamber">Upper
            </label>
            <label>
              <input type="checkbox" class="ml-2" value="lower" v-model="filterOptions.chamber">Lower
            </label>
          </fieldset>
        </form>

        <table class="container table table-borderless table-hover">
          <thead class="bg-info">
            <tr>
              <th v-on:click="sortTable('last_name', order)">Name</th>
              <th>Party</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in filteredLegislators" v-bind:key="index">
              <td>
                <a v-bind:href="member.url">{{ member.full_name }}</a>
              </td>
              <td>{{ member.party }}</td>
              <td>{{ memberTitle(member.chamber) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </main>
</template>

<script>
import * as utility from "../utility_script.js";

export default {
  name: "legislators",

  data() {
    return {
      //Array de estados provenientes de states metadata
      states: [],
      //Metadata de un estado seleccionado
      stateMeta: null,
      //Legisladores del estado seleccionado
      legislators: [],
      //opciones de seleccion de estado y filtro por camara
      filterOptions: {
        stateSelect: "none",
        chamber: []
      },
      order: false
    };
  },

  computed: {
    //Array de tabla con filtro segun chamber
    filteredLegislators() {
      if (this.filterOptions.chamber.length !== 0) {
        return this.legislators.filter(leg =>
          this.filterOptions.chamber.includes(leg.chamber)
        );
      } else {
        return this.legislators;
      }
    }
  },

  methods: {
    //Función para agregar query string al url de pedido para stateMeta
    addStateSlash(url, state) {
      return url + state + "/?" + utility.openStatesKey;
    },
    //Función parar agregar query string al url de pedido de legisladores
    addStateQuery(url, state) {
      return url + "?" + utility.openStatesKey + "&state=" + state;
    },
    //Función de pedido de metadata de estado
    stateMetaFetch(state) {
      utility
        .fetchAndCache(
          this.addStateSlash(utility.openStatesUrls.jurUrl, state),
          utility.openStatesInit
        )
        .then(response => response.json())
        .then(obj => (this.stateMeta = obj))
        .catch(error => "Metadata not available " + error);
    },
    //Función de pedido de legisladores del estado seleccionado
    legislatorsFetch(state) {
      utility
        .fetchAndCache(
          this.addStateQuery(utility.openStatesUrls.legUrl, state),
          utility.openStatesInit
        )
        .then(response => response.json())
        .then(obj => (this.legislators = obj))
        .catch(error => console.log("Could not fetch members " + error));
    },
    //Función englobadora de pedidos
    infoFetch(state) {
      this.stateMetaFetch(state);
      this.legislatorsFetch(state);
    },

    //Función de cambio de titulo según el estado
    memberTitle(title) {
      if (title === "upper") {
        return this.stateMeta.chambers.upper.title;
      } else if (title === "lower") {
        return this.stateMeta.chambers.lower.title;
      } else {
        return title;
      }
    },

    //Función de sorting
    sortTable(property, way) {
      this.filteredLegislators.sort(utility.switchingOrder(property, way));
      this.order = !this.order;
    }
  },

  //Watcher para el selector de estados
  watch: {
    "filterOptions.stateSelect"() {
      this.filterOptions.chamber.length = 0;
      this.infoFetch(this.filterOptions.stateSelect);
    }
  },

  //Fetch inicial de estados para selector
  created() {
    utility
      .fetchAndCache(
        utility.openStatesUrls.jurUrl + "?" + utility.openStatesKey,
        utility.openStatesInit
      )
      .then(response => response.json())
      .then(
        obj => (this.states = obj.sort(utility.switchingOrder("name", false)))
      )
      .catch(error => console.log("Could not fetch States Meta" + error));
  }
};
</script>
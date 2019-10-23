<template>
  <div id="mainTable" class="container">
    <form class="row" action="index.html" method="get">
      <fieldset class="col">
        <legend>Party</legend>
        <label>
          <input
            type="checkbox"
            class="ml-2"
            name="democrat"
            value="d"
            v-model="filterOptions.checkboxes"
          >Democrat
        </label>
        <label>
          <input
            type="checkbox"
            class="ml-2"
            name="republican"
            value="r"
            v-model="filterOptions.checkboxes"
          >Republican
        </label>
        <label>
          <input
            type="checkbox"
            class="ml-2"
            name="independent"
            value="i"
            v-model="filterOptions.checkboxes"
          >Independent
        </label>
      </fieldset>
      <fieldset class="col">
        <legend>State</legend>
        <label for="estate">
          <select name="state" class="ml-2" v-model="filterOptions.stateSelect">
            <option value="all" selected>All States</option>
            <option v-for="(state, index) in membersStates" v-bind:key="index">{{ state }}</option>
          </select>
        </label>
      </fieldset>
    </form>

    <table class="container table table-borderless table-hover house-data">
      <thead>
        <tr class="bg-info">
          <th v-on:click="sortTable('last_name', order)">Congressman</th>
          <th>Party</th>
          <th v-on:click="sortTable('state', order)">State</th>
          <th v-on:click="sortTable('seniority', order)">Seniority</th>
          <th v-on:click="sortTable('votes_with_party_pct', order)">Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in filteredTable" v-bind:key="index">
          <td>
            <a
              v-bind:href="member.url"
            >{{member.first_name}} {{member.middle_name}} {{member.last_name}}</a>
          </td>
          <td>{{member.party}}</td>
          <td>{{member.state}}</td>
          <td>{{member.seniority}}</td>
          <td>{{member.votes_with_party_pct}}&#37;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as utility from "../../utility_script";

export default {
  name: "pro-publica-table",

  props: {
    members: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      //selectores de filtro
      filterOptions: {
        checkboxes: [],
        stateSelect: "all"
      },
      order: false
    };
  },

  computed: {
    //array de estados para selector
    membersStates() {
      return Array.from(new Set(this.members.map(e => e.state))).sort();
    },

    filteredTable() {
      if (
        this.filterOptions.checkboxes.length == 0 &&
        this.filterOptions.stateSelect == "all"
      ) {
        return this.members;
      } else if (
        this.filterOptions.checkboxes.length !== 0 &&
        this.filterOptions.stateSelect == "all"
      ) {
        return this.members.filter(mem =>
          this.filterOptions.checkboxes.includes(mem.party.toLowerCase())
        );
      } else if (
        this.filterOptions.checkboxes.length == 0 &&
        this.filterOptions.stateSelect !== "all"
      ) {
        return this.members.filter(
          mem => mem.state == this.filterOptions.stateSelect
        );
      } else {
        return this.members.filter(
          mem =>
            this.filterOptions.checkboxes.includes(mem.party.toLowerCase()) &&
            mem.state == this.filterOptions.stateSelect
        );
      }
    }
  },

  methods: {
    //Función de sorting
    sortTable(property, way) {
      this.filteredTable.sort(utility.switchingOrder(property, way));
      this.order = !this.order;
    }
  }
};
</script>

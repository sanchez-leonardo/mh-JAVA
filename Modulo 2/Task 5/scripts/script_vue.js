const appMainTable = new Vue({

  el: '#mainTable',

  data: {
    //array de todos los miembros
    members: [],
    //selectores de filtro
    filterOptions: {
      checkboxes: [],
      stateSelect: 'all'
    }

  },

  computed: {
    //array de estados para selector
    membersStates() {
      return Array.from(new Set(this.members.map(e => e.state))).sort();
    },
    //array de datos filtrados
    filteredTable() {
      return this.members.filter(member =>
        (this.filterOptions.checkboxes.length == 0 ? true : this.filterOptions.checkboxes.includes(member.party.toLowerCase()))
        &&
        (this.filterOptions.stateSelect == 'all' ? true : member.state == this.filterOptions.stateSelect))
      }
  },
  //fetch inicial con cache
  created() {
    fetchAndCache(proPublicaUrl, proPublicaInit)
    .then(response => response.json())
    .then(obj => this.members = obj.results[0].members)
  }

})

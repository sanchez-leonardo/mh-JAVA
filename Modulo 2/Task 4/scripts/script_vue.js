var url = document.title.includes('Senate') ? 'https://api.propublica.org/congress/v1/113/senate/members.json' : 'https://api.propublica.org/congress/v1/113/house/members.json';

var init = {
  method: 'GET',
  headers: {
    'x-api-key': 'N4twLSHqhiMcbcmomYSqtLX4W70Ue4Gwia7u6919'
  }
};

const appMainTable = new Vue({

  el: '#mainTable',

  data: {

    members: [],

    filterOptions: {
      checkboxes: [],
      stateSelect: 'all'
    }

  },

  computed: {

    membersStates() {
      return Array.from(new Set(this.members.map(e => e.state))).sort();
    },

    filteredTable() {
      if (this.filterOptions.checkboxes.length == 0 && this.filterOptions.stateSelect == 'all') {
        return this.members
      } else {
        return this.members.filter(member =>
          (this.filterOptions.checkboxes.length == 0 ? true : this.filterOptions.checkboxes.includes(member.party.toLowerCase()))
          &&
          (this.filterOptions.stateSelect == 'all' ? true : member.state == this.filterOptions.stateSelect))
        };
      }

    },

    created() {
      fetch(url, init)
      .then(response => response.json())
      .then(obj => this.members = obj.results[0].members)
    }

  })

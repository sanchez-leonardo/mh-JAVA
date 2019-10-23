const statistics = new Vue({

  el: '#statistics',

  data: {
    //array de todos los miembros
    members: []

  },

  methods: {
    //Función para total de cada party
    getMembers(party) {
      return Array.from(this.members.filter(member => member.party.toLowerCase() == party));
    },

    //Función de promedio de porcentajes, recibe un Array
    pctVotesWithParty(partyArr) {
      return (partyArr.reduce((acc, member) => acc + member.votes_with_party_pct, 0)) / partyArr.length || 0;
    },

    //MasterFunction recibe por parámetro si se quiere los menores, mayores, lealtad o prescencia y el array que debe comparar y hace el calculo requerido
    getThe(operator, comparator, targetArr) {
      //creacion de array auxiliar para carga de datos, variable de porcentajes
      let auxArr = [];
      let arrPercentages;
      //segun comparator pasado por parametro (como string), modifica el array de porcentajes patron
      if (comparator == 'loyal') {
        arrPercentages = Array.from(new Set(this.members.map(e => e.votes_with_party_pct))).sort((a, b) => a - b);
      } else if (comparator == 'absent') {
        arrPercentages = Array.from(new Set(this.members.map(e => e.missed_votes_pct))).sort((a, b) => a - b);
      }
      // segun el operator pasado por parametro(como string), ejecuta la funcion adecuada
      switch (operator) {
        case 'least':
          arrPercentages.forEach(pct => {
            targetArr.forEach(member => {
              if ((auxArr.length <= (this.members.length * 0.1)) && (!auxArr.includes(member)) && ((comparator == 'loyal' ? member.votes_with_party_pct : member.missed_votes_pct) <= pct)) {
                auxArr.push(member)
              }
            })
          });
          break;

        case 'most':
          arrPercentages.reverse().forEach(pct => {
            targetArr.forEach(member => {
              if ((auxArr.length <= (this.members.length * 0.1)) && (!auxArr.includes(member)) && ((comparator == 'loyal' ? member.votes_with_party_pct : member.missed_votes_pct) >= pct)) {
                auxArr.push(member)
              }
            })
          });
          break;

        default:
          console.log(comparator + ' or ' + operator + ' are not valid parameters');
      };

      return auxArr;
    }
  },

  computed: {
//valores de estadística
    number_of_members() {
      return this.members.length;
    },

    number_of_democrats() {
      return (this.getMembers('d')).length;
    },

    number_of_republicans() {
      return (this.getMembers('r')).length;
    },

    number_of_independents() {
      return (this.getMembers('i')).length;
    },

    democrat_vote_pct() {
      return this.pctVotesWithParty(this.getMembers('d'))
    },

    republican_vote_pct() {
      return this.pctVotesWithParty(this.getMembers('r'))
    },

    independent_vote_pct() {
      return this.pctVotesWithParty(this.getMembers('i'))
    },

    least_loyal() {
      return this.getThe('least', 'loyal', this.members);
    },

    most_loyal() {
      return this.getThe('most', 'loyal', this.members);
    },

    least_engaged() {
      return this.getThe('most', 'absent', this.members);
    },

    most_engaged() {
      return this.getThe('least', 'absent', this.members);
    },

    totalVotesPct() {
      return (this.democrat_vote_pct + this.republican_vote_pct + this.independent_vote_pct) / 3;
    },

    //info de data general hecha de valores computados
    firstGlanceInfo() {
      return [{
          "party": "Democrats",
          "reps": this.number_of_democrats,
          "votes_pct": parseInt(this.democrat_vote_pct)
        },
        {
          "party": "Republicans",
          "reps": this.number_of_republicans,
          "votes_pct": parseInt(this.republican_vote_pct)
        },
        {
          "party": "Independent",
          "reps": this.number_of_independents,
          "votes_pct": parseInt(this.independent_vote_pct)
        },
        {
          "party": "Total",
          "reps": this.number_of_members,
          "votes_pct": parseInt((this.democrat_vote_pct + this.republican_vote_pct + this.independent_vote_pct) / 3)
        }]
    }

  },
//Pedido inicial de informacion + cache
  created() {
    fetchAndCache(proPublicaUrl, proPublicaInit)
      .then(response => response.json())
      .then(obj => this.members = obj.results[0].members)
  }


})
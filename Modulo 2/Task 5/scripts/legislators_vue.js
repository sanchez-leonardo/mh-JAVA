const legislatorsTable = new Vue({

  el: '#mainTable',

  data: {
    //Array de estados provenientes de states metadata
    states: [],
    //Metadata de un estado seleccionado
    stateMeta: null,
    //Legisladores del estado seleccionado
    legislators: [],
    //opciones de seleccion de estado y filtro por camara
    filterOptions: {
      stateSelect: 'none',
      chamber: []
    }

  },

  methods: {
    //Función para agregar query string al url de pedido para stateMeta
    addStateSlash(url, state) {
      return url + state + '/?' + openStatesKey;
    },
    //Función parar agregar query string al url de pedido de legisladores
    addStateQuery(url, state) {
      return url + '?' + openStatesKey + '&state=' + state;
    },
    //Función de pedido de metadata de estado
    stateMetaFetch(state) {
      fetchAndCache(this.addStateSlash(openStatesUrls.jurUrl, state), openStatesInit)
      .then(response => response.json())
      .then(obj => this.stateMeta = obj)
      .catch(error => 'Metadata not available ' + error);
    },
    //Función de pedido de legisladores del estado seleccionado
    legislatorsFetch(state, openStatesInit) {
      fetchAndCache(this.addStateQuery(openStatesUrls.legUrl, state), openStatesInit)
      .then(response => response.json())
      .then(obj => this.legislators = obj)
      .catch(error => console.log('Could not fetch members ' + error));
    },
    //Función englobadora de pedidos
    infoFetch(state) {
      this.stateMetaFetch(state);
      this.legislatorsFetch(state);
    },

    //Función de cambio de titulo según el estado
    memberTitle(title) {

      switch (title) {

        case 'upper':
        return this.stateMeta.chambers.upper.title
        break;

        case 'lower':
        return this.stateMeta.chambers.lower.title
        break;

        default:
        return title
      }
    }


  },
  //Watcher para el selector de estados
  watch: {

    'filterOptions.stateSelect'() {
      this.filterOptions.chamber.length = 0;
      this.legislators = this.infoFetch(this.filterOptions.stateSelect);
    }

  },

  computed: {
    //Array de tabla con filtro segun chamber
    filteredLegislators() {
      if (this.filterOptions.chamber.length !== 0 && this.filterOptions.stateSelect !== 'none') {
        return this.legislators.filter(leg => this.filterOptions.chamber.includes(leg.chamber))
      } else {
        return this.legislators
      }
    }

  },

  //Fetch inicial de estados para selector
  created() {

    fetchAndCache((openStatesUrls.jurUrl + '?' + openStatesKey), openStatesInit)
    .then(response => response.json())
    .then(obj => this.states = obj.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }))
    .catch(error => console.log('Could not fetch States Meta'));

  }

})

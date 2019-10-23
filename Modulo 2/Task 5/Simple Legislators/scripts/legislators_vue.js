const legislatorsTable = new Vue({

  el: '#mainTable',

  data: {
    
    states: null,

    stateMeta: null,

    legislators: null,

    filterOptions:{
      stateSelect: 'none',
      chamber: []
    },

    urls: {
      jurUrl: 'https://openstates.org/api/v1/metadata/',
      legUrl: 'https://openstates.org/api/v1/legislators/',
      apikey: 'apikey=1e13327e-05c6-4214-a3f3-e07e42225c7a'
    },

    init: {
      method: 'GET',
      mode: 'cors'
    }

  },

  methods: {

    addStateSlash(url, state){
      return url + state + '/?' + this.urls.apikey;
    },

    addStateQuery(url, state) {
      return url + '?' + this.urls.apikey + '&state=' + state;
    },

    fetchAndCache(url){

      let inCache = sessionStorage.getItem(url);

      if(inCache !== null){
        let response = new Response(new Blob([inCache]))
        return Promise.resolve(response);
      };

      return fetch(url, this.init)
      .then(response => {
        if(response.ok) {
          response.clone().text().then(info => sessionStorage.setItem(url, info))
        };
        return response
      })
    },

    stateMetaFetch(state){
      this.fetchAndCache(this.addStateSlash(this.urls.jurUrl, state))
      .then(response => response.json())
      .then(obj => this.stateMeta = obj)
      .catch(error => 'Metadata not available ' + error);
    },

    legislatorsFetch(state){
      this.fetchAndCache(this.addStateQuery(this.urls.legUrl, state))
      .then(response => response.json())
      .then(obj => this.legislators = obj)
      .catch(error => console.log('Could not fetch members ' + error));
    },

    infoFetch(state) {
      this.stateMetaFetch(state);
      this.legislatorsFetch(state);
    },

    memberTitle(title){

      switch (title) {

        case 'upper':
        return this.stateMeta.chambers.upper.title
        break;

        case 'lower':
        return this.stateMeta.chambers.lower.title
        break;

        default: return title
      }
    }

  },

  watch: {

    'filterOptions.stateSelect'(){
      this.filterOptions.chamber.length = 0;
      this.legislators = this.infoFetch(this.filterOptions.stateSelect);
    }

  },

  computed: {

    filteredLegislators(){
      if(this.filterOptions.chamber.length !== 0 && this.filterOptions.stateSelect !== 'none'){
        return this.legislators.filter(leg => this.filterOptions.chamber.includes(leg.chamber))
      } else {
        return this.legislators
      }
    }

  },

  created() {

    this.fetchAndCache(this.urls.jurUrl+'?'+this.urls.apikey)
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

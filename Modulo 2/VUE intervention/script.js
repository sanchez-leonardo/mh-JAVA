const app = new Vue({

  el: '#app',

  data: {
    people: [{
        'name': 'Raquel',
        'year': 1980
      }, {
        'name': 'Juan',
        'year': 1985
      }, {
        'name': 'Jazmin',
        'year': 1978
      },
      {
        'name': 'Lucas',
        'year': 1966
      }, {
        'name': 'Jhon',
        'year': 1999
      }, {
        'name': 'Hector',
        'year': 2005
      },
      {
        'name': 'Jimena',
        'year': 1994
      }, {
        'name': 'Arlene',
        'year': 2008
      }, {
        'name': 'Micaela',
        'year': 2010
      },
      {
        'name': 'Rodolfo',
        'year': 1973
      }]
  },

  methods: {

    randomNum: function () {
      return parseInt(Math.random() * (256 - 0))
    },

    randomColor: function () {
      return 'rgb(' + this.randomNum() + ',' + this.randomNum() + ',' + this.randomNum() + ')'
    },

    color: function (e) {
      e.target.parentElement.firstChild.style.color = this.randomColor();
    },

    orderByYear: function (a, b) {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    },


    age: function (year) {
      return 2018 - year
    }

  },

  computed: {

    orderedPeople: function () {
      return this.people.sort(this.orderByYear)
    }

  }

})
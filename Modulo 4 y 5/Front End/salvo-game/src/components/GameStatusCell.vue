<template>
  <td class="text-center">
    <v-btn v-if="isButton" v-on:click="btnMethod" block color="error">{{content.content}}</v-btn>
    <p v-if="!isButton">{{content.content}}</p>
  </td>
</template>


<script>
import { customFetch } from "../scripts/utilities_script";

export default {
  props: { content: Object },

  computed: {
    isButton() {
      return this.content.tag === "btn";
    }
  },

  methods: {
    async joinGame(gameId) {
      let gpId;
  await customFetch("POST", "/api/game/" + gameId + "/players")
    .then(response => {
      if (response.ok) {
        response.json().then(body => gpId = body.gpId
        );
        
      } else {
        alert("Yeah... couldn't. Try again some other time");
      }
    })

    return gpId
},

goToGameView(id){
  this.$router.push({name: "GameView", params:{id: id}})
},

btnMethod(){
  if (this.content.type === "join") {
    this.joinGame(this.content.id).then((id) => this.goToGameView(id))
  } else if(this.content.type === "rejoin"){
    this.goToGameView(this.content.id)
  }
}
  }
};
</script>
<script>
export default {
  props: {
    game: Object,
    user: Object
  },

  render(createElement) {
    if (this.game.game_state == "over") {
      return createElement("span", "Game Over");
    } else {
      return createElement("button", "things");
    }
  }
};
</script>
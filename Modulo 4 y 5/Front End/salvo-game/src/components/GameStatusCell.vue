<script>
export default {
  props: { content: Object },

  render(createElement) {
    // if (this.game.game_state == "over") {
    //   return createElement("span", "Game Over");
    // } else {
    //   return createElement("button", "things");
    // }
    return createElement(this.content.tag, this.content.content);
  }
};
</script>
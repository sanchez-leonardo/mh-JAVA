<template>
  <v-col v-html="renderContent"></v-col>
</template>

<script>
export default {
  props: { letter: String, number: Number },

  computed: {
    renderContent() {
      if (this.letter === "0" && this.number - 1 === 0) {
        return "";
      } else if (this.letter === "0") {
        return `<p>${this.number - 1}</p>`;
      } else if (this.number - 1 === 0) {
        return `<p>${this.letter.toUpperCase()}</p>`;
      } else {
        return "";
      }
    }
  }
};
</script>

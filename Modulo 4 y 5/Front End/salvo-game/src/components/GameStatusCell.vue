<template>
  <td class="text-center">
    <v-btn v-if="isButton" block color="error">{{content.content}}</v-btn>
    <p v-if="!isButton">{{content.content}}</p>
  </td>
</template>


<script>
export default {
  props: { content: Object },

  computed: {
    isButton() {
      return this.content.tag === "btn";
    }
  },

  methods: {}
};
</script>
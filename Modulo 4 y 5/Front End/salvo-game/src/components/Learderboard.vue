<template>
  <table>
    <thead>
      <th>Player</th>
      <th>Score</th>
      <th>Won</th>
      <th>Lost</th>
      <Th>Tied</Th>
    </thead>
    <tbody>
      <tr v-for="(user, key) in users" v-bind:key="key">
        <td>{{user.email}}</td>
        <td>{{user.scores.total}}</td>
        <td>{{user.scores.win}}</td>
        <td>{{user.scores.loose}}</td>
        <td>{{user.scores.tie}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Leaderboard",

  data() {
    return {
      leaderBoardData: []
    };
  },

  computed: {
    users() {
      return this.leaderBoardData
        .slice(0, 5)
        .sort((a, b) => b.scores.win - a.scores.win);
    }
  },

  created() {
    fetch("/api/leaderboard").then(response => {
      if (response.ok) {
        response.json().then(data => (this.leaderBoardData = data));
      }
    });
  }
};
</script>
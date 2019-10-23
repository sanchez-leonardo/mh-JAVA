<template>
  <div class="row">
    <section class="col">
      <h2>Least Loyal (Bottom 10% of Party)</h2>
      <table id="leastLoyal" class="table table-bordered table-hover text-center">
        <thead>
          <tr class="bg-info">
            <th>Name</th>
            <th>Party Votes</th>
            <th>&#37; of Party Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member,  index) in least_loyal" v-bind:key="index">
            <td>
              <a
                v-bind:href="member.url"
              >{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a>
            </td>
            <td>{{ parseInt((member.votes_with_party_pct * member.total_votes)/100) }}</td>
            <td>{{ member.votes_with_party_pct+ '%' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="col">
      <h2>Most Loyal (Top 10% of Party)</h2>
      <table id="mostLoyal" class="table table-bordered table-hover text-center">
        <thead>
          <tr class="bg-info">
            <td>Name</td>
            <td>Party Votes</td>
            <td>&#37; of Party Votes</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in most_loyal" v-bind:key="index">
            <td>
              <a
                v-bind:href="member.url"
              >{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a>
            </td>
            <td>{{ parseInt((member.votes_with_party_pct * member.total_votes)/100) }}</td>
            <td>{{ member.votes_with_party_pct+ '%' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "loyalty-tables",

  props: {
    least_loyal: {
      type: Array,
      required: true
    },
    most_loyal: {
      type: Array,
      required: true
    }
  }
};
</script>
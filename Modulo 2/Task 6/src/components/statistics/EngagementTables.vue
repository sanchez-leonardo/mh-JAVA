<template>
  <div class="row">
    <section class="col">
      <h2>Least Engaged (Bottom 10% Attendance)</h2>
      <table id="leastEngaged" class="table table-bordered table-hover text-center">
        <thead>
          <tr class="bg-info">
            <th>Name</th>
            <th>Missed Votes</th>
            <th>&#37; of Missed Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member,index) in least_engaged" v-bind:key="index">
            <td>
              <a
                v-bind:href="member.url"
              >{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a>
            </td>
            <td>{{ member.missed_votes }}</td>
            <td>{{ member.missed_votes_pct+ '%' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="col">
      <h2>Most Engaged (Top 10% Attendance)</h2>
      <table id="mostEngaged" class="table table-bordered table-hover text-center">
        <thead>
          <tr class="bg-info">
            <td>Name</td>
            <td>Missed Votes</td>
            <td>&#37; of Missed Votes</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in most_engaged" v-bind:key="index">
            <td>
              <a
                v-bind:href="member.url"
              >{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a>
            </td>
            <td>{{ member.missed_votes }}</td>
            <td>{{ member.missed_votes_pct + '%' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: "engagement-tables",

  props: {
    least_engaged: {
      type: Array,
      required: true
    },
    most_engaged: {
      type: Array,
      required: true
    }
  }
};
</script>

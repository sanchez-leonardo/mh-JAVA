<template>
  <section class="col">
    <slot></slot>
    <table id="firstGlance" class="table table-bordered table-hover text-center">
      <thead>
        <tr class="bg-info">
          <th>Party</th>
          <th>Number of Reps</th>
          <th>&#37; votes with Party</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in firstGlanceInfo" v-bind:key="index">
          <td>{{ data.party }}</td>
          <td>{{ data.reps }}</td>
          <td>{{ data.votes_pct+ '%' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "first-glance",

  props: {
    firstGlanceInfo: {
      type: Array,
      required: true
    }
  }
};
</script>
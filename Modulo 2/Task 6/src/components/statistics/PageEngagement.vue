<template>
  <main class="mt-3 mb-5">
    <article id="statistics" class="container col-10">
      <div class="row">
        <description-engagement/>
        <first-glance v-bind:firstGlanceInfo="firstGlanceInfo">
          <h2>{{ chamber }} at glance</h2>
        </first-glance>
      </div>
      <engagement-tables v-bind:least_engaged="least_engaged" v-bind:most_engaged="most_engaged"/>
    </article>
  </main>
</template>

<script>
import Description from "./DescriptionEngagement.vue";
import FirstGlance from "./FirstGlance.vue";
import Engagement from "./EngagementTables.vue";
import * as statistics from "../../statistics_script";

export default {
  name: "page-engagement",

  components: {
    "description-engagement": Description,
    "first-glance": FirstGlance,
    "engagement-tables": Engagement
  },

  props: {
    members: {
      type: Array,
      required: true
    },
    chamber: {
      type: String,
      required: true
    }
  },

  computed: {
    //valores de estadística
    number_of_members() {
      return this.members.length;
    },

    number_of_democrats() {
      return statistics.getMembers("d", this.members).length;
    },

    number_of_republicans() {
      return statistics.getMembers("r", this.members).length;
    },

    number_of_independents() {
      return statistics.getMembers("i", this.members).length;
    },

    democrat_vote_pct() {
      return statistics.pctVotesWithParty(
        statistics.getMembers("d", this.members)
      );
    },

    republican_vote_pct() {
      return statistics.pctVotesWithParty(
        statistics.getMembers("r", this.members)
      );
    },

    independent_vote_pct() {
      return statistics.pctVotesWithParty(
        statistics.getMembers("i", this.members)
      );
    },

    least_engaged() {
      return statistics.getThe("most", "absent", this.members);
    },

    most_engaged() {
      return statistics.getThe("least", "absent", this.members);
    },

    totalVotesPct() {
      return (
        (this.democrat_vote_pct +
          this.republican_vote_pct +
          this.independent_vote_pct) /
        3
      );
    },

    //info de data general hecha de valores computados
    firstGlanceInfo() {
      return [
        {
          party: "Democrats",
          reps: this.number_of_democrats,
          votes_pct: parseInt(this.democrat_vote_pct)
        },
        {
          party: "Republicans",
          reps: this.number_of_republicans,
          votes_pct: parseInt(this.republican_vote_pct)
        },
        {
          party: "Independent",
          reps: this.number_of_independents,
          votes_pct: parseInt(this.independent_vote_pct)
        },
        {
          party: "Total",
          reps: this.number_of_members,
          votes_pct: parseInt(
            (this.democrat_vote_pct +
              this.republican_vote_pct +
              this.independent_vote_pct) /
              3
          )
        }
      ];
    }
  }
};
</script>


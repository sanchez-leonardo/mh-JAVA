<template>
  <main class="mt-3 mb-5">
    <article id="statistics" class="container col-10">
      <div class="row">
        <description-loyalty/>
        <first-glance v-bind:firstGlanceInfo="firstGlanceInfo">
          <h2>{{ chamber }} at glance</h2>
        </first-glance>
      </div>
      <loyalty-tables v-bind:least_loyal="least_loyal" v-bind:most_loyal="most_loyal"/>
    </article>
  </main>
</template>

<script>
import Description from "./DescriptionLoyalty.vue";
import FirstGlance from "./FirstGlance.vue";
import LoyaltyTables from "./LoyaltyTables.vue";
import * as statistics from "../../statistics_script";

export default {
  name: "page-loyalty",

  components: {
    "description-loyalty": Description,
    "first-glance": FirstGlance,
    "loyalty-tables": LoyaltyTables
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

    least_loyal() {
      return statistics.getThe("least", "loyal", this.members);
    },

    most_loyal() {
      return statistics.getThe("most", "loyal", this.members);
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

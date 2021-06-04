<template>
  <div class="home">
    <h1>Tickets</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10">
          <Table :items="tickets"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Table,
  },
  computed: {
    ...mapState(["tickets"]),
  },
  methods: {
    ...mapActions(["setTickets"])
  },
  created() {
    this.setTickets();
  },
};
</script>

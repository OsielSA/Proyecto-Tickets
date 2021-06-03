<template>
  <div class="home">
    <h1>Personal</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10">
          <Table :items="personal"></Table>
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
    ...mapState(["personal"]),
  },
  methods: {
    ...mapActions(["setPersonal"]),
  },
  created() {
    this.setPersonal();
  },
};
</script>

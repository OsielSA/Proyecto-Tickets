<template>
  <div>
    <h1>Personal</h1>
    <hr />
    <div class="container">
      <div class="col-3">
        <b-button variant="primary" to="/personal/agregar">Agregar Persona <i class="fas fa-user-plus"></i></b-button>
      </div>

      <div class="row justify-content-center">
        <div class="col-10">
          <Table :items="personal"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Personal",
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

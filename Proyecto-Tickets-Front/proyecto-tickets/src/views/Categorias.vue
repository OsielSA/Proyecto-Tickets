<template>
  <div>
    <h1>Categorías</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <Table :items="categorias"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Categorias",
  components: {
    Table,
  },
  computed: {
    ...mapState(["categorias"]),
  },
  methods: {
    ...mapActions(["setCategorias"]),
  },
  created() {
    this.setCategorias();
  },
};
</script>

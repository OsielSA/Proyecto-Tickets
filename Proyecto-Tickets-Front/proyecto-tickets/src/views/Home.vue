<template>
  <div class="home">
    <h1>Inicio</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-10">
          <b-table striped hover :items="tickets" :fields="campos" :tbody-tr-class="ColorEstatus"></b-table>
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
  data(){
    return {
      campos: [
        {key: "nombre", nombre: "Nombre del Ticket"},
        {key: "categoriaID", nombre: "Categoría"},
        {key: "estatus"}
      ]
    }
  },
  computed: {
    ...mapState(["tickets"]),
  },
  methods: {
    ...mapActions(["setTickets"]),
    ColorEstatus(item, type) {
			if (!item || type !== "row") return;
			if (item.estatus === "ABT") return "rowRed";
			if (item.estatus === "ESP") return "rowGreen";
			if (item.estatus === "FIN") return "rowGrey";
		}
  },
  created() {
    this.setTickets();
  },
};
</script>

<style>
  .rowRed{
    background-color: #F77070;
  }
  .rowGreen{
    background-color: #A4BF8C;
  }
  .rowGrey{
    background-color: #C1C1C1;
  }
</style>

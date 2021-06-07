<template>
  <div class="home">
    <h1>Inicio</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <select v-model="categoriaSeleccionada" class="form-control">
            <option value="0" selected>Todas las categorías</option>
            <option v-for="categoria in categorias" :value="categoria.id" v-bind:key="categoria.id">{{categoria.nombre}}</option>
          </select>
        </div>
      </div><br>
      <div class="row justify-content-center">
        <div class="col-6">
          
          <Tarjeta v-for="t in ticketsFiltrados"
                   :key="t.id"
                   :nombre="t.nombre"
                   :descripcion="t.descripcion"
                   :categoria="t.nombreCategoria"
                   :estatus="t.estatus"
                   >
          </Tarjeta>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tarjeta from "../components/Tarjeta.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Tarjeta,
  },
  data () {
    return {
      categoriaSeleccionada: 0
    }
  },
  computed: {
    ...mapState(["tickets", "categorias"]),
    ticketsFiltrados() {
		  if (this.categoriaSeleccionada == 0) {
		    return this.tickets;
		  } else {
		    return this.tickets.filter(ticket =>{
		      return ticket.categoriaID == this.categoriaSeleccionada;
		    })
		  }
		}
  },
  methods: {
    ...mapActions(["setTickets", "setCategorias"])
  },
  created() {
    this.setTickets();
    this.setCategorias();
  },
};
</script>

<style>
</style>

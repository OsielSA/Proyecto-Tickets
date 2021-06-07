<template>
  <div>
    <h1>Editar Ticket: {{this.ticket.nombre}}</h1>
    <div class="container">
      <b-form @submit.prevent="guardarTicket()">
        <div class="row justify-content-center">
          <div class="col-6">
            <Input
              v-model="ticket.nombre"
              id="nombre"
              titulo="Nombre"
              placeholder="Ingrese el nombre"
              :error="erroresValidacion && !validacionNombre"
              mensajeError="El nombre es obligatorio"
              maxlength="50"
            />
          </div>
          <br/>
          <div class="col-6">
            <Input
              v-model="ticket.descripcion"
              id="descripcion"
              titulo="Descripción"
              placeholder="Ingrese la descripión"
              maxlength="100"
            />
          </div>
          <p></p>
          <div class="col-6">
            <select class="form-select" aria-label="Default select example"  v-model="ticket.prioridad">
              <option disabled selected hidden value="">Selecciona una prioridad</option>
              <option value="1">Baja</option>
              <option value="2">Media</option>
              <option value="3">Alta</option>
            </select>
          </div>
          <div class="col-6">
            <select class="form-select" aria-label="Default select example" v-model="ticket.personalID">
              <option disabled selected hidden value="">Selecciona el personal</option>
              <option v-for="persona in this.personal" :value="persona.id" v-bind:key="persona.id">{{persona.nombre + " " + persona.apellido}}</option>
            </select>
          </div>
          <br/>
          <p></p>

           <div class="col-6">
           <select class="form-select" aria-label="Default select example" v-model="ticket.categoriaID">
              <option disabled selected hidden value="">Selecciona la categoria</option>
              <option v-for="categoria in this.categorias" :value="categoria.id" v-bind:key="categoria.id">{{categoria.nombre}}</option>
            </select>
          </div>

          <div class="control">
            <b-button class="margen" type="submit" variant="success" id="btnGuardar">Guardar</b-button>
            <b-button variant="secondary" to="/Tickets">Cancelar</b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import Input from "@/components/Input";

export default {
  name: "EditarTickets",
  components: {
    Input,
  },
  data() {
    return {
      ticket: {
        nombre: "",
        descripcion: "",
        prioridad: "",
        personalID: "",
        categoriaID: "",
        estatus: ""
      },
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["personal","categorias"]),
    validacionNombre() {
      return (
        this.ticket.nombre !== undefined && this.ticket.nombre.trim() !== ""
      );
    },
    validacionPrioridad() {
      return (
        this.ticket.prioridad !== undefined &&
        this.ticket.prioridad !== ""
      );
    },
    validacionPersonalID() {
      return (
        this.ticket.personalID !== undefined &&
        this.ticket.personalID !== ""
      );
    },
    validacionCategoriaID() {
      return (
        this.ticket.categoriaID !== undefined &&
        this.ticket.categoriaID !== ""
      );
    },
  },
  methods: {
    ...mapActions(['obtenerTicket', 'editarTicket',"setPersonal","setCategorias"]),
    //Validar
    guardarTicket() {
      if (this.validacionNombre && this.validacionPrioridad && this.validacionPersonalID && this.validacionCategoriaID) {
        this.erroresValidacion = false;
        //Guardar
        this.editarTicket({
          id: this.$route.params.id,
          params: this.ticket,
          onComplete: (response) => {
            this.$swal.fire({
              icon: "success",
              text: response.data.mensaje,
            });
            this.$router.push({
              name: "Tickets"
            })
          },
          onError: (error) => {
            this.$swal.fire({
              icon: "error",
              text: error.response.data.mensaje,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
      }
    },
  },
  created() {
        console.log(this.$route.params.id)

    this.obtenerTicket({
      id: this.$route.params.id,
      onComplete: (response) => {
        console.log(response.data.data)
        Vue.set(this, 'ticket', response.data.data[0]);
      },
    });
  },mounted() {
    this.setPersonal();
    this.setCategorias();
  }
};
</script>

<style>
.control {
  text-align: right;
  padding: 15px;
}
.margen {
  margin-right: 15px;
}
</style>
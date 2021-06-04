<template>
  <div>
    <h1>Agregar Persona</h1>
    <div class="container">
      <b-form @submit.prevent="guardarPersona()">
        <div class="row justify-content-center">
          <div class="col-6">
            <Input
              v-model="persona.nombre"
              id="nombre"
              titulo="Nombre"
              placeholder="Ingrese el nombre"
              :error="erroresValidacion && !validacionNombre"
              mensajeError="El nombre es obligatorio"
              maxlength="50"
            />
          </div>
          <br />
          <div class="col-6">
            <Input
              v-model="persona.apellido"
              id="apellido"
              titulo="Apellido"
              placeholder="Ingrese el apellido"
              :error="erroresValidacion && !validacionApellido"
              mensajeError="El apellido es obligatorio"
              maxlength="80"
            />
          </div>
          <div class="col-6">
            <Input
              v-model="persona.telefono"
              id="telefono"
              titulo="Teléfono"
              placeholder="Ingrese el teléfono"
              maxlength="10"
            />
          </div>
          <div class="col-6">
            <Input
              v-model="persona.direccion"
              id="direccion"
              titulo="Dirección"
              placeholder="Ingrese la dirección"
              maxlength="150"
            />
          </div>
          <br />
          <b-button type="submit" variant="success" id="btnGuardar"
            >Guardar</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input";
import { mapActions } from "vuex";
export default {
  name: "AgregarPersona",
  components: {
    Input,
  },
  data() {
    return {
      persona: {
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.persona.nombre !== undefined && this.persona.nombre.trim() !== ""
      );
    },
    validacionApellido() {
      return (
        this.persona.apellido !== undefined &&
        this.persona.apellido.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearPersona"]),
    guardarPersona() {
      //Validar
      if (this.validacionNombre && this.validacionApellido) {
        this.erroresValidacion = false;

        //Guardar
        this.crearPersona({
          params: {
            nombre: this.persona.nombre,
            apellido: this.persona.apellido,
            telefono: this.persona.telefono,
            direccion: this.persona.direccion,
          },
          onComplete: (response) => {
            this.$swal.fire({
              icon: "success",
              text: response.data.mensaje,
            });
            this.$router.push({
              name: Personal
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
};
</script>

<style>
#btnGuardar {
  margin: 20px;
  width: 100px;
}
</style>
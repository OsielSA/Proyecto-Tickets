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
              :error="erroresValidacion"
              mensajeError="El nombre es obligatorio"
              maxlength="50"
            />
          </div><br>
          <div class="col-6">
            <Input
              v-model="persona.apellido"
              id="apellido"
              titulo="Apellido"
              placeholder="Ingrese el apellido"
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
          </div><br>
            <b-button type="submit" variant="success" id="btnGuardar">Guardar</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input";
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
      erroresValidacion: false
    };
  },
  methods: {
    guardarPersona() {
      console.log("GUARDAR");
    },
  },
};
</script>

<style>
  #btnGuardar{
    margin: 20px;
    width: 100px;
  }
</style>
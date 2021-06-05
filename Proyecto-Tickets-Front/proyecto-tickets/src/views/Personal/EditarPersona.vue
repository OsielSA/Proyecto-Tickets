<template>
  <div>
    <h1>Editar Persona</h1>
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
          <div class="control">
            <b-button
              class="margen"
              type="submit"
              variant="warning"
              id="btnGuardar"
              >Guardar</b-button
            >
            <b-button variant="secondary" to="/personal">Cancelar</b-button>
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
  name: "EditarPersona",
  components: {
    Input,
  },
  data() {
    return {
      persona: {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
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
    ...mapActions(['obtenerPersona', 'editarPersona']),
    guardarPersona() {
        if (this.validacionNombre && this.validacionApellido) {
        this.erroresValidacion = false;

        //Guardar
         this.editarPersona({
          id: this.$route.params.id,
          params: this.persona,
          onComplete: (response) => {
            if(response.data.error){
              this.$notify({
              type: 'error', 
              title: response.data.mensaje,
            });
            } else {
              console.log(response.data);
            this.$notify({
              type: 'success', 
              title: response.data.mensaje,
            });
            this.$router.push({
                name: 'Personal'
            })
            }
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: 'error', 
              title: error.response.data.mensaje,
            });
          }, 
        }); 
      } else {
        this.erroresValidacion = true;
      }
    }
},
  created() {
    this.obtenerPersona({
      id: this.$route.params.id,
      onComplete: (response) => {
        console.log(response.data.data)
        Vue.set(this, 'persona', response.data.data[0]);
      },
    });
  },
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
<template>
  <div>
    <h1>Agregar Categoría</h1>
    <div class="container">
      <b-form @submit.prevent="guardarCategoria()">
        <div class="row justify-content-center">
          <div class="col-6">
            <Input
              v-model="categoria.nombre"
              id="nombre"
              titulo="Nombre"
              placeholder="Ingrese el nombre"
              :error="erroresValidacion && !validacionNombre"
              mensajeError="El nombre es obligatorio"
              maxlength="50"
            />
          </div>
          <div id="divControl" class="col-12">
            <b-button
              class="margen"
              type="submit"
              variant="success"
              >Guardar</b-button
            >
            <b-button variant="secondary" to="/categorias">Cancelar</b-button>
          </div>
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
  data(){
    return {
      categoria: {
        nombre: ""
      },
      erroresValidacion: false,
    }
  },
  computed: {
    validacionNombre() {
      return (
        this.categoria.nombre !== undefined && this.categoria.nombre.trim() !== ""
      );
    }
  },
  methods: {
    ...mapActions(["crearCategoria"]),
    guardarCategoria(){
      //Validar
      if (this.validacionNombre) {
        this.erroresValidacion = false;

        //Guardar
        this.crearCategoria({
          params: {
            nombre: this.categoria.nombre
          },
          onComplete: (response) => {
            this.$swal.fire({
              icon: "success",
              text: response.data.mensaje,
            });
            this.$router.push({
              name: "Categorias"
            })
          },
          onError: (error) => {
            this.$swal.fire({
              icon: "error",
              text: error.response.data.mensaje,
            });
          },
        });
      }else{
        this.erroresValidacion = true;
      }
    }
  }
};
</script>

<style >
  #divControl{
    margin-top: 15px;
  }
</style>
<template>
  <div>
    <h1>Categorías</h1>
    <hr>
    <div class="container">
      <div class="col-3">
        <b-button variant="primary" to="/categorias/agregar">Agregar Categoría <i class="fas fa-plus"></i></b-button>
      </div>
      <div class="row justify-content-center">
        <div class="col-6">
          <Table :items="categorias" :fields="campos">
            <template slot="actions" slot-scope="{ item }">
              <b-button class="me-1" variant="danger" @click="onEliminar(item)"><i class="far fa-trash-alt"></i></b-button>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Categorias",
  components: {
    Table,
  },
  data(){
    return {
      campos: [
        { key: "nombre"},
        { key: "actions", label: "Acciones" }
      ]
    }
  },
  computed: {
    ...mapState(["categorias"]),
  },
  methods: {
    ...mapActions(["setCategorias", "eliminarCategoria"]),

    onEliminar(item){
      this.$swal.fire({
      title: 'Eliminar Categoría',
      text: '¿Seguro de eliminar a esta categoría?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarCategoria({
            id: item.item.id,
            onComplete: (response) => {
              this.$swal.fire({
                icon: "success",
                text: response.data.mensaje,
                timer: 2000,
                confirmButtonText: `Ok`,
              }).then((result) => {
                this.setCategorias()
              })
            },
            onError: (response) => {
              this.$swal.fire(response.data.mensaje, '', 'error')
            },
          });
        }
      })
    }



  },
  created() {
    this.setCategorias();
  },
};
</script>

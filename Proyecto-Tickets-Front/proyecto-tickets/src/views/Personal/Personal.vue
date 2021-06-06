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
          <Table :items="personal" :fields="campos">
            <template slot="actions" slot-scope="{ item }">
              <b-button class="me-1" variant="warning" @click="onEditar(item)"><i class="fas fa-edit"></i></b-button>
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
  name: "Personal",
  components: {
    Table,
  },
  data(){
    return {
      campos: [
        { key: "id", label: "Clave"},
        { key: "nombre"},
        { key: "apellido"},
        { key: "telefono", 
          label: "Teléfono",
          formatter: (value) => {
              return value || "Sin teléfono";
          }
        },
        { key: "direccion", 
          label: "Dirección",
          formatter: (value) => {
              return value || "Sin dirección";
          }
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(['personal']),
  },
  methods: {
    ...mapActions(['setPersonal', 'eliminarPersona']),
    onEditar(item){
      this.$router.push({
        name: "EditarPersona",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item){
      this.$swal.fire({
      title: 'Eliminar Persona',
      text: '¿Seguro de eliminar a esta persona?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarPersona({
            id: item.item.id,
            onComplete: (response) => {
              this.$swal.fire({
                icon: "success",
                text: response.data.mensaje,
                timer: 2000,
                confirmButtonText: `Ok`,
              }).then((result) => {
                this.setPersonal()
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
  mounted() {
    this.setPersonal();
  },
};
</script>

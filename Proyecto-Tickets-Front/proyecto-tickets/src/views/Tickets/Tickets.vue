<template>
  <div class="home">
    <h1>Tickets</h1>
    <hr />
    <div class="container">
      <div class="col-3">
        <b-button variant="primary" to="/tickets/agregar">Agregar Ticket <i class="fas fa-plus"></i></b-button>
      </div>
      <div class="row justify-content-center">
        <div class="col-10">
          <Table :items="tickets" :fields="campos">
            <template slot="actions" slot-scope="{ item }">
              <b-button class="me-1" variant="warning" @click="onEditar(item)"><i class="fas fa-edit"></i></b-button>
              <b-button class="me-1" variant="danger" @click="onEliminar(item)"><i class="far fa-trash-alt"></i></b-button>
              <b-button class="me-1" variant="outline-primary" @click="modalShow = !modalShow"><i class="fas fa-edit"></i>Editar Estatus</b-button>
            </template>
          </Table>
          <div>
            <b-modal v-model="modalShow">Hello From Modal!</b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Tickets",
  components: {
    Table,
  },
data(){
    return {
      modalShow: false,
      campos: [
        { key: "id", label: "Clave"},
        { key: "nombre"},
        { key: "descripcion", 
          label: "Descripción",
            formatter: (value) => {
              return value || "Sin descripción";
            }
          },
        { key: "prioridad"},
        { key: "estatus"},
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(['tickets']),
  },
  methods: {
    ...mapActions(['setTickets', 'eliminarTicket']),
    onEditar(item){
      this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item){
      this.$swal.fire({
      title: 'Eliminar Ticket',
      text: '¿Seguro de eliminar este Ticket?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarTicket({
            id: item.item.id,
            onComplete: (response) => {
              this.$swal.fire({
                icon: "success",
                text: response.data.mensaje,
                timer: 2000,
                confirmButtonText: `Ok`,
              }).then((result) => {
                this.setTickets()
              })
            },
            onError: (response) => {
              this.$swal.fire(response.data.mensaje, '', 'error')
            },
          });
        }
      })
    },
    onEstatus(item){
      
    }
  },
  mounted() {
    this.setTickets();
  },
};
</script>

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
          <Table :items="tickets" :fields="campos" ref="table">
            <template slot="actions" slot-scope="{ item }">
              <b-button class="me-1" variant="warning"  @click="onEditar(item)"><i class="fas fa-edit"></i></b-button>
              <b-button class="me-1" variant="danger" @click="onEliminar(item)"><i class="far fa-trash-alt"></i></b-button>
              <b-button id="show-btn" variant="outline-primary" @click="showModal(item)" v-model="idRow">Editar Estatus</b-button>            
             </template>
          </Table>

        </div>  
      </div>
    </div>
    
                    <b-modal ref="my-modal" hide-footer title="Editar Estatus" >
                      <div class="d-block text-center">
                      <h3>Ticket: {{this.idRow}}</h3>
                      <select class="form-control" id="prioridad" name="prioridad" required v-model="estatusSelect">
                        <option disabled selected hidden value="">Cambiar estatus</option>
                        <option value="ABT">Abierto</option>
                        <option value="ESP">En espera</option>
                        <option value="FIN">Finalizado</option>
                      </select>
                      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancelar</b-button>
                      <b-button class="mt-3" variant="outline-warning" block @click="onEstatus()">Guardar</b-button>
                      </div>
                    </b-modal>
                     
   
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
      estatusSelect:"",
      idRow:"",
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
    ...mapActions(['setTickets', 'eliminarTicket','editarTicket','editarTicketEstatus']),
    onEditar(item){
      this.$router.push({
        name: "EditarTickets",
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
    showModal(item) {
        this.$refs['my-modal'].show()
        this.idRow = item.item.id
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      onEstatus() {
        this.editarTicketEstatus({
            id: this.idRow,
          params: {
            estatus: this.estatusSelect,
          },
          onComplete: (response) => {
            this.$refs['my-modal'].hide()
            this.$swal.fire({
              icon: "success",
              text: response.data.mensaje,
            }).then((result) => {
              if(result) {
                this.setTickets();
              }
            })
          },
          onError: (error) => {
           this.$refs['my-modal'].hide()
            this.$swal.fire({
              icon: "error",
              text: error.response.data.mensaje,
            });
          },
        })
      

      }
    
  },
  mounted() {
    this.setTickets();
  }
};
</script>

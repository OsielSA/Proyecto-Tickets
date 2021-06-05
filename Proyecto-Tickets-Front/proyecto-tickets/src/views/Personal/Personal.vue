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
    ...mapActions(['setPersonal']),
    onEditar(item){
      this.$router.push({
        name: "EditarPersona",
        params: {
          id: item.item.id,
        },
      });
    }
  },
  created() {
    this.setPersonal();
  },
};
</script>

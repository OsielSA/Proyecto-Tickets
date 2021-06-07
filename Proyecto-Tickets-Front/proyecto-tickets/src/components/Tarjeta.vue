<template>
  <div class="container">
    <div class="card">
      <div v-bind:class="['card-body', estatus]">
        <div>
          <span class="titulo">{{ nombre }}</span>
          <br><hr>
          {{ descripcion }}
          <br><hr>
          {{ categoria }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tarjeta",
  props: {
    id: [String, Number],
    nombre: String,
    categoria: String,
    descripcion: String,
    estatus: String
  }
};
</script>

<style>
  .titulo{
    font-weight: bold;
  }
  .card{
    margin-bottom: 30px;
  }
  .link-verde{
    color: #42B983;
  }



  .ABT{
    background-color: #F77070;
  }
  .ESP{
    background-color: #A4BF8C;
  }
  .FIN{
    background-color: #C1C1C1;
  }
</style>

<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
  export default {
  }
</script>


<script>
export default {
  name: "Table",
  props: {
    items: Array
  }
};
</script>

<style>

</style>

<template>
  <Navbar />

  <Table />
  <notifications position="bottom left"/>

</template>

<script>
import Navbar from './layout/Navbar.vue'
import Table from './components/Table.vue'


export default {
  name: 'App',
  components: {
    Navbar,
    Table
  }
}
</script>

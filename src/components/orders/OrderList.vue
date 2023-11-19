<template>
  <v-container>
    <h1 class="text-center">Orders List</h1>
  </v-container>
</template>
<script>
import OrdersRepository from "@/repositories/OrdersRepository";

export default {
  data() {
    return {
      orders: []
    }
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      OrdersRepository.getAll()
          .then((response) => {
            this.orders = response;
          });
    }
  }
}
</script>
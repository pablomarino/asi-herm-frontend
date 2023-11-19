<template>
  <v-container>
    <h1 class="text-center">Inventory List</h1>
  </v-container>
</template>
<script>
import ItemsRepository from "@/repositories/ItemsRepository";

export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      ItemsRepository.getAll()
          .then((response) => {
            this.items = response;
          });
    }
  }
}
</script>
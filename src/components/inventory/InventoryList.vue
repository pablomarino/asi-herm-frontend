<template>
  <v-container>
    <h1 class="text-center" :style="{ fontSize: '50px' }">Inventario</h1>
    <ul>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
                <th>Nombre</th>
                <th>Nº de referencia</th>
                <th>Descripción</th>
                <th>Precio de compra</th>
                <th>Precio de venta</th>
                <th>Nº total de piezas</th>
              </tr>
            </thead>
            <tbody>
              <tr class="trSelect" v-for="(item) in items" :key="item._id" @click="handleClick(item.reference)">
                <td>{{ item.name }}</td>
                <td>{{ item.reference }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.purchasePrice }}</td>
                <td>{{ item.salePrice }}</td>
                <td>{{ item.numTotalItems }}</td>
              </tr>
            </tbody>
        </table>
      </div>
    </ul>
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
            this.items = response.data;
          });
    },
    handleClick(reference) {
      window.location.href = `items/${reference}`;
    },
  }
}
</script>
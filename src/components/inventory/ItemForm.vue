<template>
  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Pieza con número de referencia {{ item.reference }}</h2>

      <div class="divider"/>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Nombre pieza</h2>
        </div>
        <div class="column">
          <input type="text" v-model="item.name" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Descripción</h2>
        </div>
        <div class="column">
          <input type="text" v-model="item.description" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Número total de piezas</h2>
        </div>
        <div class="column">
          <input type="text" v-model="item.numTotalItems" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Precio de compra</h2>
        </div>
        <div class="column">
          <input type="text" v-model="item.purchasePrice" class="input input-bordered w-full max-w-xs" /> €
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Precio de venta</h2>
        </div>
        <div class="column">
          <input type="text" v-model="item.salePrice" class="input input-bordered w-full max-w-xs" /> €
        </div>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-outline flex items-center" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>
<script>
import ItemsRepository from "@/repositories/ItemsRepository";

export default {
  data() {
    return {
      item: null,
      loading: false,
    };
  },
  created() {
    if (this.$route.params.id) this.getItem(this.$route.params.id);
  },
  methods: {
    getItem(id) {
      this.loading = true;
      return ItemsRepository.get(id)
        .then((response) => (this.item = response.data))
        .finally(() => (this.loading = false));
    },
    async save() {
      if (this.$route.params.id) {
        this.loading = true;
        console.log(this.item);
        ItemsRepository.save(this.item)
            .then(() =>
                this.$router.push({
                  name: "Inventory Detail",
                  params: {
                    id: this.item.reference
                  },
                })
            )
            .finally(() => (this.loading = false));
      }
    },
  }
}
</script>
<style>
.column {
  float: left;
  width: 50%;
}

.row {
  margin: 1em 0;
}
</style>
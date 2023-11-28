<template>
  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Pieza con número de referencia {{ item.reference }}</h2>

      <div class="divider"/>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Nombre pieza</h2>
        </div>
        <div class="column">
          <p>{{ item.name }}</p>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Descripción</h2>
        </div>
        <div class="column">
          <p>{{ item.description }}</p>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Número total de piezas</h2>
        </div>
        <div class="column">
          <p>{{ item.numTotalItems }}</p>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Precio de compra</h2>
        </div>
        <div class="column">
          <p>{{ item.purchasePrice }} €</p>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Precio de venta</h2>
        </div>
        <div class="column">
          <p>{{ item.salePrice }} €</p>
        </div>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-outline flex items-center" @click="edit">Edit</button>
      </div>
    </div>
  </div>

  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Cajas que contienen la pieza con número de referencia {{ item.reference }}</h2>

      <div class="divider"/>
      <div v-for="(box, index) in boxes" :key="index" class="card card-compact w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Caja {{ box.reference }}</h2>

          <div class="row">
            <div class="column">
              <h2 style="font-weight: bold">Localización</h2>
            </div>
            <div class="column">
              <p>{{ box.location }}</p>
            </div>
          </div>

          <div class="row">
            <div class="column">
              <h2 style="font-weight: bold">Tamaño</h2>
            </div>
            <div class="column">
              <p>{{ box.size }}</p>
            </div>
          </div>

          <div class="row">
            <div class="column">
              <h2 style="font-weight: bold">Nº de piezas tipo {{ box.itemReference }}</h2>
            </div>
            <div class="column">
              <p>{{ box.numItems }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ItemsRepository from "@/repositories/ItemsRepository";
import BoxesRepository from "@/repositories/BoxesRepository";

export default {
  data() {
    return {
      item: null,
      boxes: [],
      loading: false,
    };
  },
  created() {
    this.getItems(this.$route.params.id);
  },
  methods: {
    getItems(id) {
      this.loading = true;
      return ItemsRepository.get(id)
        .then((response) => (this.item = response.data))
        .finally(() => {
          this.getBoxes();
        });
    },
    getBoxes() {
      this.loading = true;
      const options = {
        referenceItem: this.item.id,
      }
      return BoxesRepository.getAll(options)
        .then((response) => (this.boxes = response.data))
        .finally(() => (this.loading = false));
    },
    edit() {
      this.$router.push({
        name: "Edit Item Form",
        params: { id: this.item.reference },
      });
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
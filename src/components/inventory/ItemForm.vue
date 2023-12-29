<template>
  <!-- Modal -->
  <dialog ref="item_modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ modal_title }}</h3>
      <p class="py-4">{{ modal_content }}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Pieza con número de referencia {{ item.reference }}</h2>

      <div class="divider"/>
      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Nombre pieza</h2>
        </div>
        <div class="column">
          <input type="text" required v-model="item.name" class="input input-bordered w-full max-w-xs" />
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Descripción</h2>
        </div>
        <div class="column">
          <textarea type="text" required class="textarea textarea-bordered w-full max-w-xs" v-model="item.description"></textarea>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Precio de compra</h2>
        </div>
        <div class="column">
          <input type="text" required v-model="item.purchasePrice" class="input input-bordered w-full max-w-xs" /> €
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold; margin-top: 15px">Precio de venta</h2>
        </div>
        <div class="column">
          <input type="text" required v-model="item.salePrice" class="input input-bordered w-full max-w-xs"/> €
        </div>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-outline flex items-center" @click="save">Save</button>
      </div>
    </div>
  </div>

  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Cajas que contienen la pieza con número de referencia {{ item.reference }}</h2>

      <div class="divider"/>
      <div class="displayer">
        <div v-for="(box, index) in boxes" :key="index" class="card card-compact w-96 bg-base-100 shadow-xl mx-3">
          <div class="card-body">
            <h2 class="card-title">Caja {{ box.reference }}</h2>

            <div class="row">
              <div class="column">
                <h2 style="font-weight: bold">Nº de piezas tipo {{ box.itemReference }}</h2>
              </div>
              <div class="column">
                <input class="w-10 mr-6" type="number" min="0" v-model="box.numItems" required />
              </div>
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
      modal_title: "",
      modal_content: "",
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
        .finally(() => (this.getBoxes()));
    },
    getBoxes() {
      this.loading = true;
      const options = {
        params: {
          itemReference: this.item.reference,
        }
      }
      return BoxesRepository.getAll(options)
          .then((response) => (this.boxes = response.data))
          .finally(() => (this.loading = false));
    },
    async save() {
      if (this.$route.params.id) {

        // Validate form
        if (!this.isValidTextInput('name')) {
          this.showModal("Error", "Please check the form. Name must not be empty.");
          return;
        }

        if (!this.isValidTextInput('description')) {
          this.showModal("Error", "Please check the form. Description must not be empty.");
          return;
        }

        if (!this.isValidPriceValue('purchasePrice') || !this.isValidPriceValue('salePrice')) {
          this.showModal("Error", "Please check the form. Price must be a positive number.");
          return;
        }

        // Save item
        this.loading = true;
        ItemsRepository.save(this.item)
          .then(() => this.saveBoxes())
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
    saveBoxes() {
      this.boxes.forEach((box) => {
        BoxesRepository.save(box);
      })
    },
    showModal(title, content) {
      this.modal_title = title;
      this.modal_content = content;
      this.$refs.item_modal.showModal();
    },
    isValidTextInput(propertyName) {
      return this.item[propertyName].trim() !== '';
    },
    isValidPriceValue(propertyName) {
      const value = parseFloat(this.item[propertyName]);
      return !isNaN(value) && value >= 0;
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
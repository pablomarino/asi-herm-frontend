<template>
  <div class="flex flex-col items-center justify-center h-screen bg-white">
    <img src="../assets/logo.webp" alt="Logo" class="mx-auto mb-8" />

    <p class="font-size-title mb-10">Hermenegildo e hijos, S.L</p>

    <div class="flex justify-center container-buttons gap-16">

      <button @click="goToItems" class="btn btn-outline btn-square flex items-center">
        <div>
          <img src="../assets/inventario.svg" class="images-size" alt="Inventory"/>
          <span class="color-text">Inventario</span>
        </div>
      </button>

      <button @click="goToOrders" class="btn btn-outline btn-square flex items-center btn-black">
        <div>
          <img src="../assets/pedidos.svg" alt="Orders"  class="images-size"/>
          <span class="color-text">Pedidos</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  methods: {
    goToItems() {
      this.$router.push('/items');
    },
    goToOrders() {
      this.$router.push('/orders');
    }
  }
}
</script>

<style>
.btn-square {
  border-radius: 0.5rem;
  width: 15vw !important;
  height: 14vh !important;
}

.images-size {
  height: 9vh;
}

.btn-square:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.container-buttons {
  height: 50vh;
}

.color-text {
  color: black;
}

.font-size-title {
  font-size: 3rem;
}
</style>

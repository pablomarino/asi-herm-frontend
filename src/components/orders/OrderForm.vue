// FIXME: Update order not working
<template>
  <v-container>
    <!-- Modal -->
    <dialog ref="order_modal" class="modal">
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


    <!-- FORM -->
    <h1 class="text-center text-5xl p-10">Formulario pedido {{ this.$route.params.id  }}</h1>
    <div class="mx-20 pt-5">
      <div class="bg-base-200 shadow-xl p-10">
        <form class="text-xl" @submit.prevent="submitForm">
          <!--
          <p class="text-4xl pb-4">Order info:</p>
          <hr class="pb-4">
          <div class="flex">
          <div class="text-xl w-1/3 p-4">
            <p class="mr-10 mb-4" for="reference">Reference:</p>
            <p class="mr-10 mb-4" for="date">Date:</p>
            <p class="mr-10 mb-4" for="state">State:</p>
          </div>
          <div class="text-xl w-2/3 p-4">
            <input class="text-left w-full mb-4" type="number" min="0" v-model="reference" required :disabled="isEditMode"/><br>
            <input class="text-left w-full mb-4" type="date" v-model="date" required :disabled="isEditMode"/><br>
            <input class="text-left w-full mb-4" type="text" v-model="state" readonly disabled/><br>
          </div>
        </div>
      -->
          <!-- Order info -->

          

          
          <p class="text-4xl pb-4">Detalles del pedido:</p>
          <hr class="pb-6">
          <div class="flex justify-between pb-2">
            <label class="mr-10 font-semibold w-1/2" for="reference">Nº de referencia:</label>
            <input class="w-full text-left w-1/2" type="number" min="0" v-model="reference" required  :disabled="isEditMode"/>
          </div>

          <div class="flex justify-between pb-2">
            <label class="mr-10 font-semibold w-1/2" for="date">Fecha:</label>
            <input class="w-full text-left w-1/2" type="date" v-model="date" required :disabled="isEditMode"/>
          </div>

          <div class="flex justify-between pb-2">
            <label class="mr-10 font-semibold w-1/2" for="state">Estado:</label>
            <input class="w-full text-left w-1/2" type="text" v-model="state" readonly disabled/>
          </div>
          
          <!-- Order Items -->

          <p class="text-4xl pt-4 pb-2">Piezas del pedido:</p>
          <hr class="pb-6">
          <ul class="text-lg">
            <li class="flex justify-between p-2 mb-2 bg-base-100 rounded" v-for="(item, index) in items" :key="index">
              <div>
                <label class="mr-4 font-semibold" for="itemReference">Nº referencia de pieza:</label>
                <input class="w-10 mr-6" type="number" min="0" v-model="item.itemReference" required />
              </div>

              <div>
                <label class="mr-4 font-semibold" for="numberItems">Nº de pieza:</label>
                <input class="w-10 mr-6" type="number" min="0" v-model="item.numberItems" required />
              </div>

              <button class="btn btn-sm btn-error" type="button" @click="removeItem(index)">
                Eliminar pieza
              </button>
            </li>
          </ul>

          <!-- Add Item Button -->

          <ul class="flex justify-end">
            <li>
              <button type="button" class="btn btn-sm btn-success mr-2" @click="addItem()">
                Añadir pieza
              </button>
            </li>
          </ul>


          <!-- Submit Buttons -->
          <div class="flex justify-between">
            
            <button class="btn btn-primary mt-10" type="button" @click="backToOrders()">
              Cancelar
            </button>
            <button class="btn btn-primary mt-10" type="submit">Crear</button>
          </div>
        </form>
      </div>
    </div>
  </v-container>
</template>

<script>
import OrdersRepository from "@/repositories/OrdersRepository";

export default {

  data() {
    return {
      id: "",
      reference: 0,
      date: "",
      state: "PENDING",
      itemReference: 0,
      numberItems: 0,
      items: [],
      modal_title: "",
      modal_content: "",
      isEditMode: this.$route.params.id != undefined,
    };
  },

  created() {
    if (this.isEditMode) {
      OrdersRepository.get(this.$route.params.id)
        .then((response) => {
          this.id = response.data.id;
          this.reference = response.data.reference;
          const [day, month, year] = response.data.date.split("-");
          const date = new Date(year, month - 1, day);
          this.date = date.toISOString().substr(0, 10);
          this.state = response.data.state;
          this.items = response.data.items;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.date = new Date().toISOString().substr(0, 10);
      this.items = [{ itemReference: 0, numberItems: 0 }];
    }
  },

  methods: {
    showModal(title, content) {
      this.modal_title = title;
      this.modal_content = content;
      this.$refs.order_modal.showModal();
    },
    addItem() {
      this.items.push({ itemReference: 0, numberItems: 0 });
    },
    removeItem(index) {
      if (this.items.length <= 1) {
        this.showModal("Error","There must be at least one item in the order.");
        return;
      }
      this.items.splice(index, 1);
    }, 
    backToOrders() {
      window.location.href="/orders";
    },
    async submitForm() {

      // Validate form
      if (!this.isValidReference()) {
        this.showModal("Error","Please check the form. Reference must be greater than 0.");
        return;
      }

      if (!this.isValidItems()) {
        this.showModal("Error","Please check the items. For each item, item reference and number of items must be greater than 0.");
        return;
      }

      //Check duplicate items and combine them
      this.combineItems();

      // convert reference to string
      this.reference=String(this.reference);

      // convert itemReference to string
      this.items.forEach(item => {
        item.itemReference = String(item.itemReference);
      });

      // Setup entity
      const entity = 
      {
        //id: this.id,
        reference: this.reference,
        date: this.date,
        state: "PENDING", 
        items: this.items,
      };
      
      // Submit
      try {
        const result = await OrdersRepository.save(entity);
        // Save is successful
        this.showModal("Success","Order #" + this.reference + " saved successfully. ");
        console.log("Save successful:", result);
        this.backToOrders();
      } catch (error) {
        this.showModal("Success","Save failed. Please try again.");
        console.error("Save failed:", error);
      }
    },
    isValidReference(){
      return this.reference > 0;
    },
    isValidItems(){
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].itemReference == 0 || this.items[i].numberItems == 0) {
          return false;
        }
      }
      return true;
    },

    combineItems(){
      //let combined = false;
      let tmpItems = {}
      this.items.forEach((item) => {
        if(tmpItems[item.itemReference]){
          tmpItems[item.itemReference] += item.numberItems
          //combined = true;
        }else{
          tmpItems[item.itemReference] = item.numberItems
        } 
        this.items = [];
        for (let i in tmpItems){
          this.items.push({itemReference: i, numberItems: tmpItems[i]});
        }
      });
      /*
      if(combined){
        this.showModal("Info","Duplicate items found. They have been combined.");
      }
      */
    },
  },
};
</script>

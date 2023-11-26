// TODO: Add validation to the form 
// TODO: Load the order data if in edit mode
// TODO: remove Items with 0 quantity
// FIXME: Error saving ITEMS
<template>
  <v-container>
    <h1 class="text-center text-5xl p-10">Order Form</h1>
    <div class="flex items-center justify-center pt-5">
      <div class="bg-base-200 shadow-xl p-10">
        <form @submit.prevent="submitForm">
          <p class="text-2xl pb-4">Order:</p>
          <div class="flex justify-between pb-2">
            <label class="mr-10" for="reference">Reference:</label>
            <input class="w-30 text-right" type="number" min="0" v-model="reference" required />
          </div>

          <div class="flex justify-between pb-2">
            <label class="mr-10" for="date">Date:</label>
            <input class="w-100" type="date" v-model="date" required />
          </div>

          <div class="flex justify-between pb-2">
            <label class="mr-10" for="state">State:</label>
            <input class="w-30 text-right" disabled type="text" v-model="state" readonly />
          </div>

          <p class="text-2xl pt-4 pb-4">Items:</p>

          <ul class="table-zebra">
            <li class="flex justify-between pb-4" v-for="(item, index) in items" :key="index">
              <div>
                <label class="mr-4" for="itemReference">Item Reference:</label>
                <input class="w-10 mr-6" type="number" min="0" v-model="item.itemReference" required />
              </div>

              <div>
                <label class="mr-4" for="numberItems">Number of Items:</label>
                <input class="w-10 mr-6" type="number" min="0" v-model="item.numberItems" required />
              </div>

              <button class="btn btn-xs btn-error" @click="removeItem(index)">
                Remove Item
              </button>
            </li>
          </ul>

          <ul class="flex justify-end">
            <li>
              <button type="button" class="btn btn-sm btn-success" @click="addItem()">
                Add Item
              </button>
            </li>
          </ul>

          <div class="flex justify-between">
            <button class="btn btn-primary mt-10" type="button" @click="backToOrders()">
              Cancel
            </button>
            <button class="btn btn-primary mt-10" type="submit">Submit</button>
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
      itemReference: "0",
      numberItems: 0,
      items: [],
      isEditMode: null, // Flag to determine if in edit mode4
    };
  },
  
  beforeRouteEnter(to, from, next) {
    // Determine if the route is for editing or creating a new order
    const isEditMode = to.name === "Edit Order Form" && to.params.id !== undefined;
    
    next((vm) => {
      // Pass the isEditMode flag to the component instance
      vm.isEditMode = isEditMode;
      console.log("isEditMode_before_route: " + isEditMode+" "+vm.isEditMode);
    });
  },

  created() {
    console.log("isEditMode_created: " + this.isEditMode);
    if (this.isEditMode) {
      this.getOrder();
    } else {
      this.id = "";
      this.date = new Date().toISOString().substr(0, 10);
      this.items = [{ itemReference: "0", numberItems: 0 }];
    }
  },
  
  methods: {
    addItem() {
      this.items.push({ itemReference: "0", numberItems: 0 });
    },
    removeItem(index) {
      if (this.items.length > 1) {
        this.items.splice(index, 1);
      }
    }, backToOrders() {
      this.$router.push("/orders/");
    },
  }, async getOrder() {
    OrdersRepository.getOne(this.$route.params.id)
      .then((response) => {
        this.id = response.data.id;
        this.reference = response.data.reference;
        this.date = response.data.date;
        this.state = response.data.state;
        this.items = response.data.items;
        console.log("---------------" + response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async submitForm() {
    const entity = JSON.stringify({
      id: this.id,
      reference: this.reference,
      date: this.date,
      state: "DONE", //this.state,
      items: this.items,//JSON.stringify(this.items).split("\\").join(""), //
    }).split("\\").join("");
    console.log("Form data:", entity);

    try {
      const result = await OrdersRepository.save(entity);
      // If save is successful, do something with the result
      alert("Order #" + this.reference + " saved successfully. ");
      console.log("Save successful:", result);
      this.backToOrders();
      // Call another method or update the state as needed
    } catch (error) {
      // If there's an error, alert it
      console.error("Save failed:", error);
      alert("Save failed. Please try again.");
    }
  },
};
</script>

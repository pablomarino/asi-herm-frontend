// FIXME: Update order not working
<template>
  <v-container>
    <h1 class="text-center text-5xl p-10">Order {{ this.$route.params.id  }} Form</h1>
    <div class="flex items-center justify-center pt-5">
      <div class="bg-base-200 shadow-xl p-10">
        <form @submit.prevent="submitForm">
          <p class="text-2xl pb-4">Order:</p>
          <div class="flex justify-between pb-2">
            <label class="mr-10" for="reference">Reference:</label>
            <input class="w-30 text-right" type="number" min="0" v-model="reference" required  :disabled="isEditMode"/>
          </div>

          <div class="flex justify-between pb-2">
            <label class="mr-10" for="date">Date:</label>
            <input class="w-100" type="date" v-model="date" required :disabled="isEditMode"/>
          </div>

          <div class="flex justify-between pb-2">
            <label class="mr-10" for="state">State:</label>
            <input class="w-30 text-right" type="text" v-model="state" readonly disabled/>
          </div>

          <p class="text-2xl pt-4 pb-2">Items:</p>

          <ul>
            <li class="flex justify-between p-2 mb-2 bg-base-100 rounded" v-for="(item, index) in items" :key="index">
              <div>
                <label class="mr-4" for="itemReference">Item Reference:</label>
                <input class="w-10 mr-6" type="number" min="0" v-model="item.itemReference" required />
              </div>

              <div>
                <label class="mr-4" for="numberItems">Number of Items:</label>
                <input class="w-10 mr-6" type="number" min="0" v-model="item.numberItems" required />
              </div>

              <button class="btn btn-xs btn-error" type="button" @click="removeItem(index)">
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
      itemReference: 0,
      numberItems: 0,
      items: [],
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
    addItem() {
      this.items.push({ itemReference: 0, numberItems: 0 });
    },
    removeItem(index) {
      if (this.items.length <= 1) {
        alert("There must be at least one item in the order.");
        return;
      }
      this.items.splice(index, 1);
    }, 
    backToOrders() {
      this.$router.push("/orders/");
    },
    async submitForm() {
      //Check duplicate items and combine them
      this.combineItems();

      // Validate form
      if (!this.isValidReference()) {
        alert("Please check the form. Reference must be greater than 0.");
        return;
      }

      if (!this.isValidItems()) {
        alert("Please check the items. For each item, item reference and number of items must be greater than 0.");
        return;
      }

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
        state: "DONE", 
        items: this.items,
      };
      
      // Submit
      try {
        const result = await OrdersRepository.save(entity);
        // Save is successful
        alert("Order #" + this.reference + " saved successfully. ");
        console.log("Save successful:", result);
        this.backToOrders();
      } catch (error) {
        // Save error
        alert("Save failed. Please try again.");
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
      let combined = false;
      let tmpItems = {}
      this.items.forEach((item) => {
        if(tmpItems[item.itemReference]){
          tmpItems[item.itemReference] += item.numberItems
          combined = true;
        }else{
          tmpItems[item.itemReference] = item.numberItems
        } 
        this.items = [];
        for (let i in tmpItems){
          this.items.push({itemReference: i, numberItems: tmpItems[i]});
        }
      });
      if(combined){
        alert("Duplicate items found. They have been combined.");
      }
    },
  },
};
</script>

<template>
  <v-container>
    <h1 class="text-center text-5xl p-10">Order Form</h1>
    <div class="flex items-center justify-center pt-5">
      <div class="card card-side bg-base-100 shadow-xl p-10">
        <form @submit.prevent="submitForm">
          <p class="text-2xl pb-4">Order:</p>
          <div>
            <label for="reference">Reference:</label>
            <input type="number" v-model="reference" required />
          </div>

          <div>
            <label for="date">Date:</label>
            <input type="date" v-model="date" required />
          </div>

          <div>
            <label for="state">State:</label>
            <input disabled type="text" v-model="state" readonly />
          </div>

          <p class="text-2xl pt-4">Items:</p>

          <ul>
            <li v-for="(item, index) in items" :key="index">
              <div>
                <label for="itemReference">Item Reference:</label>
                <input type="number" v-model="itemReference" required />
              </div>

              <div>
                <label for="numberItems">Number of Items:</label>
                <input type="number" v-model="numberItems" required />
              </div>

              <button class="btn btn-sm" @click="removeItem(index)">
                Remove Item
              </button>
            </li>
          </ul>

          <ul class="flex justify-end">
            <li>
              <button type="button" class="btn btn-sm" @click="addItem">
                Add Item
              </button>
            </li>
          </ul>

          <div class="flex justify-end">
            <button class="btn btn-primary mt-10" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      reference: 0,
      date: "",
      state: "pending",
      itemReference: 0,
      numberItems: 0,
      items: [],
    };
  },
  methods: {
    addItem() {
      if (this.itemReference && this.numberItems) {
        this.items.push({
          itemReference: this.itemReference,
          numberItems: this.numberItems,
        });

        // Clear input fields after adding an item
        this.itemReference = 0;
        this.numberItems = 0;
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    submitForm() {
      // You can perform additional actions here before submitting the form
      console.log("Form submitted!");
      console.log("Form data:", {
        reference: this.reference,
        date: this.date,
        state: this.state,
        items: this.items,
      });
    },
  },
};
</script>

<template>
  <v-container>
    <h1 class="text-center"  :style="{ fontSize: '50px' }">Order {{ $route.params.id }}</h1>
	<ul>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>

                <th>Reference</th>
				<th>Date</th>
				<th>Price</th>
				<th>State</th>

            </tr>
            </thead>
            <tbody>
			<tr>
 
                <td>{{ this.order.reference }}</td>
				<td>{{ this.order.date }}</td>
				<td>{{ this.order.price }}</td>
				<td>{{ this.order.state }}</td>
                
			</tr>
            </tbody>
        </table>
      </div>
    </ul>
	<hr>
	<br>
	<h1 class="text-center"  :style="{ fontSize: '25px' }">Items</h1>
	<ul>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>

                <th>Reference</th>
				<th>Quantity</th>

            </tr>
            </thead>
            <tbody>
			<tr v-for="(item) in order.items" :key="item.itemReference">
 
                <td>{{ item.itemReference }}</td>
				<td>{{ item.numberItems }}</td>

                
			</tr>
            </tbody>
        </table>
      </div>
    </ul>
  </v-container>
</template>
<script>
import OrdersRepository from "@/repositories/OrdersRepository";

export default {
  data() {
    return { 
      order: []
    }
  },
  created() {
    this.getOrder(this.$route.params.id);
  },
  methods: {
    getOrder(id) {
      OrdersRepository.get(id)
          .then((response) => {
            this.order = response.data;
          });
    },
  }
}
</script>
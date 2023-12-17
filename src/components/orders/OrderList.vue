<template>
  <v-container>
    <h1 class="text-center"  :style="{ fontSize: '50px' }">Pedidos</h1>
	<ul>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>

                <th>Nª de referencia</th>
				<th>Fecha</th>
				<th>Precio</th>
				<th>Estado</th>

              </tr>
            </thead>
            <tbody>
              <tr class="trSelect" v-for="(order) in orders" :key="order._id" @click="handleClick(order.reference)" >
 
                <td >{{ order.reference }}</td>
				<td>{{ order.date }}</td>
				<td>{{ order.price }}</td>
				<td>{{ order.state }}</td>
                
              </tr>
            </tbody>
        </table>
      </div>
    </ul>
	<div class="flexbox-align">
		<a class="btn lightButton text-xl" href="orders/new"> + </a>
	</div>
  </v-container>
</template>
<script>
import OrdersRepository from "@/repositories/OrdersRepository";

export default {
  data() {
    return { 
      orders: []
    }
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      OrdersRepository.getAll()
          .then((response) => {
            this.orders = response.data;
          });
    },
	handleClick(reference) {
      window.location.href = `orders/${reference}`;
    },
  }
}
</script>
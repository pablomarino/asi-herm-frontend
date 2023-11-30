<template>
  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Order con número de referencia {{ order.reference }}</h2>

      <div class="divider"/>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Data</h2>
        </div>
        <div class="column">
          <p>{{ order.date }}</p>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <h2 style="font-weight: bold">Estado</h2>
        </div>
        <div class="column">
          <p>{{ order.state }}</p>
        </div>
      </div>

    </div>
  </div>

  <div class="card" v-if="!loading">
    <div class="card-body">
      <h2 class="card-title">Piezas incluidas en la order</h2>

      <div class="divider"/>
		<div class="displayer">
		  <div v-for="item in items" :key="item.itemReference" class="card displayed card-compact w-96 bg-base-100 shadow-xl">
			<div class="card-body ">
			  <h2 class="card-title">{{item.name}}</h2>

			  <div class="row displayed">
				<div class="column">
				  <h2 style="font-weight: bold">Referencia</h2>
				</div>
				<div class="column">
				  <p>{{ item.reference }}</p>
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
				  <h2 style="font-weight: bold">Cantidad</h2>
				</div>
				<div class="column">
				  <p>{{ item.number}}</p>
				</div>
			  </div>
			  
			</div>
		  </div>
		</div>
    </div>
  </div>
</template>
<script>

import OrdersRepository from "@/repositories/OrdersRepository";
import ItemsRepository from "@/repositories/ItemsRepository";

export default {
  data() {
    return { 
		order: [],
		actualItem:[],
		items: [],
    }
  },
  created() {
    this.getOrder(this.$route.params.id).then(
	);
  },
  methods: {
    async getOrder(id) {
      await OrdersRepository.get(id)
          .then((response) => {
            this.order = response.data;})	
		this.order.items?.map((value) => {
		this.getActualItem(value);
		})
    },
	async getActualItem(element) {
      await ItemsRepository.get(element.itemReference)
        .then((response) => (this.actualItem=(response.data)));
		this.actualItem.number=element.numberItems;
		this.items.push(this.actualItem);
		
    },
	getItem(id){
		this.getActualItem(id);
		this.items.push(this.actualItem)
		return this.actualItem.name;
	},
  }
}
</script>
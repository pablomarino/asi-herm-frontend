import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import NotFound from "@/views/NotFoundPage.vue";

import OrderForm from "@/components/orders/OrderForm.vue";
import OrderList from "@/components/orders/OrderList.vue";
import OrderDetail from "@/components/orders/OrderDetail.vue";

import InventoryList from "@/components/inventory/InventoryList.vue";
import ItemDetail from "@/components/inventory/ItemDetail.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        props: true,
    },
    {
        path: "/orders",
        name: "Order List",
        component: OrderList,
    },
    {
        path: "/orders/:id(\\d+)",
        name: "Order Detail",
        component: OrderDetail,
    },
    {
        path: "/orders/:id/edit",
        name: "Edit Order Form",
        component: OrderForm,
    },
    {
        path: "/orders/new",
        name: "Create Order Form",
        component: OrderForm,
    },
    {
        path: "/items",
        name: "Inventory List",
        component: InventoryList,
    },
    {
        path: "/items/:id(\\d+)",
        name: "Inventory Detail",
        component: ItemDetail,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
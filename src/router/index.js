import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerView from "@/views/CustomerView.vue";
import ProductView from "@/views/ProductView.vue";
import CatalogView from "@/views/CatalogView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/customer',
        component: CustomerView,
        children: [
            {
                path: '/account',
                name: 'customer-account',
                component: HomeView
            },
            {
                path: '/orders',
                name: 'customer-orders',
                component: HomeView
            },
            {
                path: '/reviews',
                name: 'customer-reviews',
                component: HomeView
            },
            {
                path: '/bonus-program',
                name: 'customer-bonus',
                component: HomeView
            }
        ]
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ProductView
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: CatalogView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

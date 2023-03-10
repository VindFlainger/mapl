import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerView from "@/views/CustomerView.vue";
import ProductView from "@/views/ProductView.vue";
import CatalogView from "@/views/CatalogView.vue";
import AccountDashboard from "@/components/Specialized/Account/Dashboard/AccountDashboard.vue";
import AccountBonuses from "@/components/Specialized/Account/Bonuses/AccountBonuses.vue";
import AccountNewsletter from "@/components/Specialized/Account/Newsletter/AccountNewsletter.vue";
import AccountReviews from "@/components/Specialized/Account/Reviews/AccountReviews.vue";
import AccountOrders from "@/components/Specialized/Account/Orders/AccountOrders.vue";
import AccountWishlist from "@/components/Specialized/Account/Wishlist/AccountWishlist.vue";
import AccountAddresses from "@/components/Specialized/Account/Shipping/AccountShipping.vue";

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
                path: '/dashboard',
                name: 'customer-dashboard',
                component: AccountDashboard
            },
            {
                path: '/orders',
                name: 'customer-orders',
                component: AccountOrders
            },
            {
                path: '/wishlist',
                name: 'customer-wishlist',
                component: AccountWishlist
            },
            {
                path: '/reviews',
                name: 'customer-reviews',
                component: AccountReviews
            },
            {
                path: '/bonuses',
                name: 'customer-bonuses',
                component: AccountBonuses
            },
            {
                path: '/newsletter',
                name: 'customer-newsletter',
                component: AccountNewsletter
            },
            {
                path: '/shipping',
                name: 'customer-shipping',
                component: AccountAddresses
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

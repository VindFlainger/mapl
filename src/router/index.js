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
import TestView from "@/views/TestView.vue";
import AccountPayment from "@/components/Specialized/Account/Payment/AccountPayment.vue";
import CartView from "@/views/CartView.vue";
import OrderView from "@/views/OrderView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/customer',
        component: CustomerView,
        meta: {
            needAuth: true
        },
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
            },
            {
                path: '/payment',
                name: 'customer-payment',
                component: AccountPayment
            }
        ]
    },
    {
        path: '/test',
        name: 'test-view',
        component: TestView
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ProductView
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
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView
    },
    {
        path: '/order',
        name: 'order',
        component: OrderView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.find(route => route.meta.needAuth)) {
        if (!localStorage.getItem('refreshToken')) {
            next({
                name: 'home',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router

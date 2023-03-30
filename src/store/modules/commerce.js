import {SET_CART_ID, SET_CART_ITEMS} from "@/store/mutation-types";
import {axiosBase, axiosPipeline} from "../../../utils/axiosMiddlaware";

export default {
    state: {
        cartId: null,
        cartItems: []
    },
    getters: {
        getCartId: state => state.cartId,
        getCartItems: state => state.cartItems,
        getCartItemsCount: state => {
            return state.cartItems.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)
        }
    },
    mutations: {
        [SET_CART_ID](state, cartId) {
            state.cartId = cartId
            if (cartId) localStorage.setItem('cart_id', cartId)
            else localStorage.removeItem('cart_id')
        },
        [SET_CART_ITEMS](state, items) {
            state.cartItems = items
        },
    },
    actions: {
        async noRegister({commit, getters, dispatch}) {
            if (!getters.getCartId) {
                const resp = await axiosBase.post('/commerce/initCart')
                commit(SET_CART_ID, resp.data)
            }

            await dispatch('updateCart')
        },
        async updateCart({commit, dispatch, getters}) {
            try {
                const resp = await axiosPipeline.get('/commerce/getCartItems', {
                    params: {
                        cartId: getters.getCartId
                    }
                })
                commit(SET_CART_ITEMS, resp.data)
            } catch (err) {
                dispatch('addError', err.message)
            }
        },
        async mergeCarts({commit, dispatch, getters}, cartId) {
            try {
                commit(SET_CART_ID, cartId)
                const resp = await axiosPipeline.get('/commerce/mergeCarts', {
                    params: {
                        aCartId: cartId,
                        bCartId: getters.getCartId
                    }
                })
                commit(SET_CART_ITEMS, resp.data)
            } catch (err) {
                dispatch('addError', err.message)
            }
        },
        async delCartItem({state, dispatch, commit}, {skuId, size}) {
            try {
                const resp = await axiosPipeline.get('/commerce/delCartItem', {
                    params: {
                        cartId: state.cartId,
                        skuId,
                        size
                    }
                })

                commit(SET_CART_ITEMS, resp.data)
            } catch (err) {
                dispatch('addError', err.message)
            }
        },
        async editCartItem({state, dispatch, commit}, {skuId, size, quantity}) {
            try {
                const resp = await axiosPipeline.post('/commerce/editCartItem',
                    {
                        cartId: state.cartId,
                        skuId,
                        size,
                        quantity
                    })

                commit(SET_CART_ITEMS, resp.data)
            } catch (err) {
                dispatch('addError', err.message)
            }
        }
    }
}
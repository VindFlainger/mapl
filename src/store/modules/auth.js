import {
    CLEAR_AUTH_DATA, SET_CART_ID,
    SET_EXPIRES_IN,
    SET_LOGIN,
    SET_REFRESH_TOKEN,
    SET_SESSION_REFRESHING, SET_USER_ID
} from "@/store/mutation-types";
import app from "@/main";
import {axiosPipeline} from "../../../utils/axiosMiddlaware";


export default {
    state: {
        refreshToken: null,
        login: null,
        userId: null,
        expiresIn: 0,
        sessionRefreshing: false
    },
    getters: {
        getRefreshToken: state => state.refreshToken,
        isSessionActive: state => !!(state.expiresIn && Date.now() < state.expiresIn),
        isSessionRefreshing: state => state.sessionRefreshing,
        isLogin: state => !!state.login && !!state.refreshToken,
        getUserId: state => state.userId
    },
    mutations: {
        [SET_REFRESH_TOKEN](state, refreshToken) {
            state.refreshToken = refreshToken
            if (refreshToken) localStorage.setItem('refresh_token', refreshToken)
            else localStorage.removeItem('refresh_token')
        },
        [SET_LOGIN](state, login) {
            state.login = login
            if (login) localStorage.setItem('login', login)
            else localStorage.removeItem('login')
        },
        [SET_USER_ID](state, userId) {
            state.userId = userId
            if (userId) localStorage.setItem('user_id', userId)
            else localStorage.removeItem('user_id')
        },
        [SET_EXPIRES_IN](state, time) {
            state.expiresIn = time
        },
        [SET_SESSION_REFRESHING](state, isRefreshing) {
            state.sessionRefreshing = isRefreshing
        },
        [CLEAR_AUTH_DATA](state) {
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('login')
            state.refreshToken = null
            state.accessToken = null
            state.login = null
        }
    },
    actions: {
        async login({commit, dispatch}, {refreshToken, login, expires, id}) {
            commit(SET_LOGIN, login)
            commit(SET_REFRESH_TOKEN, refreshToken)
            commit(SET_USER_ID, id)
            commit(SET_EXPIRES_IN, Date.now() + expires - expires / 5)

            await dispatch('authed')
        },
        async authed({dispatch, commit, getters}) {
            const resp = await axiosPipeline.get('/customer/account/getCustomerData', {needAuth: true})

            if (getters.getCartId) {
                commit(SET_CART_ID, resp.data.cartId)
                await dispatch('updateCart')
            } else {
                await dispatch("mergeCarts", resp.data.cartId)
            }
        },
        logout({commit}) {
            app.config.globalProperties.$router.push({name: 'home'})
            commit(CLEAR_AUTH_DATA)
        }
    }
}
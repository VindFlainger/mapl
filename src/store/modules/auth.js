import {
    CLEAR_AUTH_DATA,
    SET_EXPIRES_IN,
    SET_LOGIN,
    SET_REFRESH_TOKEN,
    SET_SESSION_REFRESHING, SET_USER_ID
} from "@/store/mutation-types";
import app from "@/main";


export default {
    state: {
        refreshToken: localStorage.getItem('refreshToken'),
        login: localStorage.getItem('login'),
        userId: localStorage.getItem('id'),
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
            localStorage.setItem('refreshToken', refreshToken)
            state.refreshToken = refreshToken
        },
        [SET_LOGIN](state, login) {
            localStorage.setItem('login', login)
            state.login = login
        },
        [SET_USER_ID](state, id){
            localStorage.setItem('id', id)
            state.userId = id
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
        login({commit}, {refreshToken, login, expires, id}) {
            commit(SET_LOGIN, login)
            commit(SET_REFRESH_TOKEN, refreshToken)
            commit(SET_USER_ID, id)
            commit(SET_EXPIRES_IN, Date.now() + expires - expires / 5)
        },
        logout({commit}) {
            app.config.globalProperties.$router.push({name: 'home'})
            commit(CLEAR_AUTH_DATA)
        }
    }
}
import store from "@/store";
import {
    CLEAR_AUTH_DATA,
    SET_EXPIRES_IN, SET_REFRESH_TOKEN,
    SET_SESSION_REFRESHING
} from "@/store/mutation-types";
import app from "@/main";

const axios = require('axios')

export const axiosPipeline = axios.create({
    // TODO: ONLY FOR DEV
    withCredentials: true,
    baseURL: process.env.VUE_APP_HOST
})

export const axiosBase = axios.create({
    // TODO: ONLY FOR DEV
    withCredentials: true,
    baseURL: process.env.VUE_APP_HOST
})

axiosPipeline.interceptors.request.use(async config => {
    return new Promise((resolve, reject) => {
        if (config.needAuth && !store.getters.isSessionActive) {
            if (store.getters.isSessionRefreshing) {
                const callback = () => {
                    if (!store.getters.isSessionRefreshing) {
                        if (store.getters.isSessionActive) resolve(config)
                        else reject()
                    } else {
                        setTimeout(callback, 100)
                    }
                }
                setTimeout(callback, 100)
            } else {
                store.commit(SET_SESSION_REFRESHING, true)

                axiosBase.post('/auth/refresh', {
                    refreshToken: store.getters.getRefreshToken,
                    device: window.navigator.userAgent
                })
                    .then(resp => {
                        store.commit(SET_EXPIRES_IN, Date.now() + resp.data.expiresIn * 0.8)
                        store.commit(SET_REFRESH_TOKEN, resp.data.refreshToken)
                        resolve(config)
                    })
                    .catch(err => reject(err))
                    .finally(() => store.commit(SET_SESSION_REFRESHING, false))
            }
        } else {
            resolve(config)
        }
    })
        .catch((err) => {
            if (err?.response) {
                if (err.response.data.code === 104) {
                    store.commit(CLEAR_AUTH_DATA)
                    if (!app.config.globalProperties.$route.query.redirect) app.config.globalProperties.$router.push({
                        name: 'home',
                        query: {redirect: app.config.globalProperties.$route.fullPath}
                    })
                } else {
                    /* store.dispatch(addAlert, {
                         type: 'request',
                         ignoreMute: true,
                         content: {
                             type: 'error',
                             error: {
                                 code: err.response.data.code,
                                 message: err.response.data.message
                             }
                         }
                     })*/
                }
            }
        })
})



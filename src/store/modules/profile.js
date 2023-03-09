import { SET_CURRENCY, SET_GENDER, SET_LANGUAGE, SET_LOCATION, SET_NAME} from "@/store/mutation-types";
import {axiosPipeline} from "../../../utils/axiosMiddlaware";
import app from "@/main";

export default {
    state: {
        name: null,
        gender: null,
        language: localStorage.getItem('language') || 'en',
        currency: localStorage.getItem('currency') || 'byn',
        location: localStorage.getItem('location') || 'minsk',
        currencies: ['BYN', 'EUR', 'USD'],
        languages: ['RU', 'EN']
    },
    getters: {
        getName: state => state.name,
        getGender: state => state.gender,
        getLocation: state => state.location,
        getLanguage: state => state.language,
        getCurrency: state => state.currency,
        getCurrencies: state => state.currencies,
        getLanguages: state => state.languages
    },
    mutations: {
        [SET_NAME](state, name) {
            state.name = name
        },
        [SET_GENDER](state, gender) {
            state.gender = gender
        },
        [SET_LANGUAGE](state, language) {
            if (language) {
                localStorage.setItem('language', language)
                state.language = language
                app.config.globalProperties.$i18n = language
            }
        },
        [SET_CURRENCY](state, currency) {
            if (currency) {
                localStorage.setItem('currency', currency)
                state.currency = currency
            }
        },
        [SET_LOCATION](state, location) {
            localStorage.setItem('location', location)
            state.location = location
        }
    },
    actions: {
        authed({commit}) {
            axiosPipeline.get('/customer/account/shortData', {needAuth: true})
                .then(resp => {
                    commit(SET_NAME, resp.data.name)
                    commit(SET_GENDER, resp.data.gender)
                    commit(SET_LANGUAGE, resp.data.localization.language)
                    commit(SET_CURRENCY, resp.data.localization.currency)
                    commit(SET_LOCATION, resp.data.localization.location)
                })
                .catch(() => {

                })
        }
    }
}
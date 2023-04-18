import { SET_CURRENCY, SET_GENDER, SET_LANGUAGE, SET_LOCATION, SET_NAME} from "@/store/mutation-types";
import app from "@/main";

export default {
    state: {
        name: null,
        gender: null,
        language: null,
        currency: null,
        location: null,
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
            state.language = language || 'en'
            if (language) localStorage.setItem('language', language)
            else localStorage.removeItem('language')
            app.config.globalProperties.$i18n.locale = state.language
        },
        [SET_CURRENCY](state, currency) {
            state.currency = currency || 'byn'
            if (currency) localStorage.setItem('currency', currency)
            else localStorage.removeItem('currency')
        },
        [SET_LOCATION](state, location) {
            state.location = location || 'minsk'
            if (location) localStorage.setItem('location', location)
            else localStorage.removeItem('location')
        }
    }
}
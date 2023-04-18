import { createStore } from 'vuex'
import auth from "@/store/modules/auth";
import profile from "@/store/modules/profile";
import events from "@/store/modules/events";
import commerce from "@/store/modules/commerce";
import {
  SET_CART_ID,
  SET_CURRENCY,
  SET_LANGUAGE, SET_LOCATION,
  SET_LOGIN,
  SET_REFRESH_TOKEN,
  SET_USER_ID
} from "@/store/mutation-types";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    initStore({commit}){
      commit(SET_CART_ID, localStorage.getItem('cart_id'))
      commit(SET_REFRESH_TOKEN, localStorage.getItem('refresh_token'))
      commit(SET_LOGIN, localStorage.getItem('login'))
      commit(SET_USER_ID, localStorage.getItem('id'))
      commit(SET_LANGUAGE, localStorage.getItem('language'))
      commit(SET_CURRENCY, localStorage.getItem('currency'))
      commit(SET_LOCATION, localStorage.getItem('location'))
    }
  },
  modules: {
    auth,
    profile,
    events,
    commerce
  }
})

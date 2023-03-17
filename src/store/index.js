import { createStore } from 'vuex'
import auth from "@/store/modules/auth";
import profile from "@/store/modules/profile";
import events from "@/store/modules/events";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    profile,
    events
  }
})

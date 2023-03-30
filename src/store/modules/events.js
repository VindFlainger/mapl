import {ADD_NOTIFICATION, ADD_LOADING, DEL_NOTIFICATION, DEL_LOADING} from "@/store/mutation-types";

export default {
    state: {
        loading: 0,
        notifications: []
    },
    getters: {
        isLoading: state => !!state.loading,
        getNotifications: state => state.notifications
    },
    mutations: {
        [ADD_LOADING](state) {
            state.loading++
        },
        [DEL_LOADING](state) {
            state.loading--
        },
        [ADD_NOTIFICATION](state, notification) {
            state.notifications.push(notification)
        },
        [DEL_NOTIFICATION](state, id) {
            state.notifications = state.notifications.filter(notification => notification.id !== id)
        }
    },
    actions: {
        addNotification({commit}, notification) {
            const id = Date.now()
            notification.id = id
            commit(ADD_NOTIFICATION, notification)
            setTimeout(() => {
                commit(DEL_NOTIFICATION, id)
            }, notification.timeout || 3000)
        },
        addError({dispatch}, message) {
            dispatch('addNotification', {
                type: 'error',
                message: message
            })
        }
    }
}
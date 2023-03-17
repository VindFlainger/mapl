import {createMachine} from "xstate";
import {computed, ref} from "vue";
import {useMachine} from "@xstate/vue";
import {useStore} from "vuex";

const initMachine = name => createMachine({
    id: name,
    initial: 'waiting',
    predictableActionArguments: true,
    states: {
        'waiting': {
            on: {
                FETCH: 'fetching'
            }
        },
        'fetching': {
            on: {
                RESOLVE: 'resolved',
                REJECT: 'rejected'
            }
        },
        'rejected': {
            on: {
                FETCH: 'fetching'
            }
        },
        'resolved': {
            on: {
                FETCH: 'fetching'
            }
        },
    }
})

export function useFetching(name) {
    const {send, state} = useMachine(initMachine(name))
    const resolvedFirst = ref(false)
    const store = useStore()

    const fetch = () => {
        send('FETCH')
    }
    const reject = () => {
        send('REJECT')
    }
    const resolve = (options = {}) => {
        resolvedFirst.value = true
        send('RESOLVE')
        if (options.notification) {
            store.dispatch('addNotification', {
                message: options.notification,
                type: 'success'
            })
        }
    }

    const fetching = computed(() => state.value.value === 'fetching')
    const rejected = computed(() => state.value.value === 'rejected')
    const resolved = computed(() => state.value.value === 'resolved')

    return {
        fetching,
        rejected,
        resolved,
        fetch,
        reject,
        resolve,
        resolvedFirst
    }
}
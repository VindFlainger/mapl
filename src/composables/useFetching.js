import {createMachine} from "xstate";
import {useMachine} from "@xstate/vue";

const config = {
    id: 'fetching',
    initial: 'waiting',
    type: 'parallel'
}

const getParallelState = process => ({
    initial: 'waiting',
    states: {
        waiting: {
            on: {
                [`${process.toUpperCase()}_FETCH`]: 'fetching'
            }
        },
        fetching: {
            on: {
                [`${process.toUpperCase()}_RESOLVE`]: 'resolved',
                [`${process.toUpperCase()}_REJECT`]: 'rejected'
            }
        },
        rejected: {
            on: {
                [`${process.toUpperCase()}_FETCH`]: 'fetching'
            }
        },
        resolved: {
            on: {
                [`${process.toUpperCase()}_FETCH`]: 'fetching'
            }
        }
    }
})

export default function (processes) {
    const states = {}

    processes.forEach(process => {
        states[process] = getParallelState(process)
    })

    const machine = createMachine({...config, states: states})

    const {send, state} = useMachine(machine)

    return {
        send,
        state
    }
}
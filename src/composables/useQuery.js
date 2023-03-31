import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

export function useQuery(name, init) {
    const route = useRoute()
    const router = useRouter()

    const reactive = ref(init)

    for (const [key, value] of Object.entries(route.query)) {
        if (key === name) {
            reactive.value = value
        } else if (key.includes(`_${name}_`)) {
            const prop = key.slice(key.lastIndexOf('_') + 1)
            reactive.value[prop] = value
        }
    }

    watch(reactive, (newValue) => {
        const query = {}
        if (typeof newValue === "object" && !Array.isArray(newValue)) {
            for (const [key, value] of Object.entries(newValue)) {
                query['_' + name + '_' + key] = value
            }
        } else {
            query[name] = newValue
        }

        router.push({name: route.name, params: route.params, query: {...route.query, ...query}})
    }, {
        deep: true
    })

    return reactive
}
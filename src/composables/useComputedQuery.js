import {watch} from "vue";
import {useRoute, useRouter} from "vue-router";

export function useComputedQuery(name, computed) {
    const route = useRoute()
    const router = useRouter()

    let parsedValue = null

    for (const [key, value] of Object.entries(route.query)) {
        if (key === name) {
            parsedValue = value
        } else if (key.includes(`_${name}_`)) {
            const prop = key.slice(key.lastIndexOf('_') + 1)
            parsedValue[prop] = value
        }
    }


    watch(computed, (newValue) => {
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

    return parsedValue
}
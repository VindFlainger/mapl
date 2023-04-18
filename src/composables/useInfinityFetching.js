import {computed, ref} from "vue";
import {useFetching} from "@/composables/useFetching";

export function useInfinityFetching(options) {
    const offset = ref(options.offset || 0)
    const limit = ref(options.limit || 30)
    const totalCount = ref(1)

    const isAllLoaded = computed(() => {
        return totalCount.value <= offset.value
    })

    const {
        resolve: $resolve,
        rejected,
        fetching,
        fetch,
        reject,
        resolved,
        resolvedFirst
    } = useFetching(options.name || 'machine')

    const resolve = (data, options = {}) => {
        offset.value = data.nextOffset
        totalCount.value = data.totalCount
        $resolve(options)
    }

    const correct = v => {
        offset.value += v
        totalCount.value += v
    }

    return {
        offset,
        limit,
        isAllLoaded,
        resolve,
        rejected,
        fetching,
        fetch,
        reject,
        resolved,
        resolvedFirst,
        correct
    }
}

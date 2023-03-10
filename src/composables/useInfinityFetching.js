import {computed, ref} from "vue";
import {useFetching} from "@/composables/useFetching";

export function useInfinityFetching(options) {
    const offset = ref(options.offset || 0)
    const limit = ref(options.limit || 0)
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

    const resolve = data => {
        offset.value = data.nextOffset
        totalCount.value = data.totalCount
        $resolve()
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
        resolvedFirst
    }
}

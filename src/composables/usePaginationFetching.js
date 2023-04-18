import {useFetching} from "@/composables/useFetching";
import {computed, ref} from "vue";

export function usePaginationFetching(options) {
    const offset = ref(0)
    const limit = ref(options.onPage || 30)
    const totalCount = ref(1)

    const totalPages = computed(() => Math.ceil(totalCount.value / limit.value))
    const page = computed(() => Math.ceil((offset.value + limit.value) / limit.value ))

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
        totalCount.value = data.totalCount
        $resolve(options)
    }

    const changePage = page => {
        offset.value = (page - 1) * limit.value
    }

    return {
        limit,
        totalPages,
        page,
        resolve,
        rejected,
        fetching,
        fetch,
        reject,
        resolved,
        resolvedFirst,
        changePage,
        offset
    }
}
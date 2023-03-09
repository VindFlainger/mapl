export default {
    computed: {
        viewport() {
            return this.$vuetify.breakpoint.name
        }
    },
    methods: {
        viewportHook(hooks) {
            hooks.xs = hooks.base
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    return hooks.xs
                case "sm":
                    return hooks.sm ?? hooks.xs
                case "md":
                    return hooks.md ?? hooks.sm ?? hooks.xs
                case "lg":
                    return hooks.lg ?? hooks.md ?? hooks.sm ?? hooks.xs
                case "xl":
                    return hooks.xl ?? hooks.lg ?? hooks.md ?? hooks.sm ?? hooks.xs
            }
        }
    }
}
import dayjs from "dayjs";
export default {
    install: (app) => {
        app.config.globalProperties.$day = dayjs
    }
}
import validator from 'validator'
export default {
    install: (app) => {
        app.config.globalProperties.$vl = validator
    }
}
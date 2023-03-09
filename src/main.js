import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import validator from './plugins/validator'
import responsiveness from "@/mixins/responsiveness";
import store from './store'

const app = createApp(App).use(store)


app.use(validator)
app.use(vuetify)
app.use(i18n)
app.use(router)

app.mixin(responsiveness)


app.mount('#app')

export default app



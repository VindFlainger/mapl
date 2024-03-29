import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import validator from './plugins/validator'
import day from './plugins/dayjs'
import responsiveness from "@/mixins/responsiveness";
import store from './store'
import {createMetaManager} from "vue-meta";

const app = createApp(App).use(store)


app.use(validator)
app.use(vuetify)
app.use(i18n)
app.use(router)
app.use(day)
app.use(createMetaManager())

app.mixin(responsiveness)

export default app

app.mount('#app')





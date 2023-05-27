import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import App from './Mobile.vue'
const app = createApp(App)
app.use(ViewUIPlus)
app.mount('#app')

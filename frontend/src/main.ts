/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { useSocket } from './composables/socket'

const { connect } = useSocket();
const app = createApp(App)

connect()
registerPlugins(app)

app.mount('#app')

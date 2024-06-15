/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { registerServices } from '@/services'

import './styles/settings.scss'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
registerServices()

import { useChatStore } from '@/stores'
await useChatStore().init()

app.mount('#app')

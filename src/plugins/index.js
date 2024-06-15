/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import { initI18n } from './i18'
import { initRouter } from './router'
import { initPinia } from './pinia'

export const registerPlugins = app => {
  const i18n = initI18n(app)
  const router = initRouter(app)
  const pinia = initPinia(app, router, i18n)

  app.use(vuetify)
  app.use(i18n)
  app.use(pinia)
  app.use(router)
}

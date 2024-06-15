import router from '@/router'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
  store.i18n = markRaw(i18n)
})

export const initPinia = (app, router, i18n) => {
  const pinia = createPinia()

  pinia.use(({ store }) => {
    store.router = markRaw(router)
    store.i18n = markRaw(i18n)
  })

  return pinia
}

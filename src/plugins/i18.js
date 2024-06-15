import messages from '@/locales'
import { createI18n } from 'vue-i18n'

const DEFAULT_LOCALE = 'en'

export const initI18n = () => {
  return createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    messages,
  })
}

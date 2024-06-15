<script setup>
import { useMessageStore } from '@/stores/'
import { useI18n } from 'vue-i18n'

defineProps({ class: String })

const messageStore = useMessageStore()
const { t, te } = useI18n()

const error = computed(() => (te(messageStore?.getError) ? t(messageStore?.getError) : messageStore?.getError))
const success = computed(() =>
  te(messageStore?.getIsSuccess) ? t(messageStore?.getIsSuccess) : messageStore?.getIsSuccess,
)
</script>

<template>
  <VAlert
    v-if="error"
    color="error"
    :class
    v-html="error"
  />

  <VAlert
    v-if="success"
    color="success"
    :class
    v-html="success"
  />
</template>

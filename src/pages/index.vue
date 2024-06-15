<template>
  <VContainer>
    <VRow>
      <VCol
        v-for="page in pages"
        :key="page"
        cols="4"
      >
        <VCard :title="page.toUpperCase()">
          <VList>
            <VListItem
              v-for="item in chatStore.getChatsByPage({ page, limit: 10 })"
              :to="`/${page}?id=${item.id}`"
            >
              <VListItemTitle
                :key="item.id"
                v-text="item.title"
              />
            </VListItem>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script setup>
import CONSTANTS from '@/CONSTANTS'
import { useChatStore } from '@/stores'

const chatStore = useChatStore()
const pages = Object.keys(CONSTANTS.pages)
</script>

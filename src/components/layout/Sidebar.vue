<template>
  <VNavigationDrawer
    class="bg-deep-purple"
    theme="dark"
    permanent
  >
    <VList>
      <VListItem
        v-for="link in menuLinks"
        :key="link.title"
        @click="router.push(link.to)"
        :prepend-icon="link.icon"
        :to="link.to"
        :title="link.title"
        link
      />
      <VListItem
        v-if="currentPage !== ''"
        @click="newChat"
        prepend-icon="mdi-plus"
        title="New Chat"
      />
      <VContainer
        class="messages"
        v-if="currentPage !== ''"
      >
        <RouterLink
          v-for="title in titles"
          :to="`/${currentPage}?id=${title.id}`"
          :class="{ active: chatId === title.id }"
        >
          {{ title.title }}
        </RouterLink>
      </VContainer>
    </VList>

    <template v-slot:append>
      <div class="pa-2 text-center">Vue ChatGPT AI</div>
    </template>
  </VNavigationDrawer>
</template>

<script setup>
import { useChatStore } from '@/stores'
const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()

const menuLinks = computed(() => {
  const ids = ['text', 'image', 'audio'].reduce(
    (acc, page) => ({
      ...acc,
      [page]: chatStore.getLastTitleId(page) ? `${page}?id=${chatStore.getLastTitleId(page)}` : page,
    }),
    {},
  )

  return [
    { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
    { icon: 'mdi-text', title: 'Text', to: ids?.text },
    { icon: 'mdi-image', title: 'Image', to: ids?.image },
    { icon: 'mdi-microphone', title: 'Audio', to: ids?.audio },
  ]
})

const currentPage = computed(() => route?.name?.replace('/', ''))
const chatId = computed(() => route?.query?.id)

const titles = computed(() => chatStore.getTitlesByPage({ page: currentPage.value }))

const newChat = () => {
  const id = chatStore.createTitle({ page: currentPage.value })

  router.push(`${route.path}?id=${id}`)
}
</script>

<style scoped lang="scss">
.messages {
  a {
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    display: block;

    &:before {
      content: '•';
      margin-right: 10px;
    }

    &.active {
      color: white;
    }
  }
}
</style>

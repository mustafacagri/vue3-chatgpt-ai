<template>
  <audio
    v-if="audio"
    class="d-block mt-3"
    :src="audio"
    controls
  ></audio>
</template>

<script setup>
import { fetchFile } from '@/services/firebase'
const props = defineProps({
  fileName: String,
})

const audio = ref()

onMounted(() => {
  fetchFile({ fileName: props.fileName }).then(res => (audio.value = res))
})
</script>

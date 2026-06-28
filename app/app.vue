<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { fetchUser } = useAuth()

onMounted(() => {
  fetchUser()
})

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
    class: "light",
  },
  bodyAttrs: {
    class: "bg-surface text-on-surface",
  },
});

const title = "Job Nova — Premium Career Portal";
const description =
  "Find your dream government or private job with AI-powered candidate profiling.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

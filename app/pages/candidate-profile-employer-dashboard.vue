<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
router.replace('/applicants-tracking-employer-dashboard')
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { user, profile, fetchUser, logout } = useAuth()
const isMobileMenuOpen = ref(false)

const hideHeader = computed(() => route.meta.hideHeader === true)

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'jobseeker') {
    router.push('/login')
  }
})

const navLinks = [
  { to: '/jobseeker-dashboard', label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
  { to: '/job-search', label: 'Find Jobs', icon: 'i-lucide-search' },
  { to: '/my-profile-dashboard', label: 'My Profile', icon: 'i-lucide-user' },
  { to: '/applied-jobs-dashboard', label: 'Applied Jobs', icon: 'i-lucide-history' },
  { to: '/job-agent', label: 'AI Job Agent', icon: 'i-lucide-bot' }
]
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Desktop SideNavBar -->
    <aside class="hidden md:flex h-screen w-64 fixed left-0 top-0 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] bg-surface flex-col py-6 border-r border-outline-variant/30 z-50">
      <!-- Brand/Profile -->
      <div class="px-gutter mb-xl flex flex-col items-center text-center">
        <div class="w-20 h-20 rounded-full mb-md overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-[28px] shadow-sm relative">
          <img v-if="profile?.photo_url" :src="profile.photo_url" class="w-full h-full object-cover" alt="Profile" />
          <span v-else>{{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}</span>
        </div>
        <h2 class="font-headline-md text-headline-md font-bold text-primary truncate max-w-full px-2">
          {{ profile?.full_name || 'Anonymous' }}
        </h2>
        <p class="font-label-md text-label-md text-on-surface-variant mt-xs">
          {{ profile?.sector || 'Jobseeker' }}
        </p>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 flex flex-col gap-sm">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-6 py-3 font-body-md text-body-md transition-all rounded-r-xl mr-4 text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
          active-class="!text-primary !bg-secondary-container/10 border-l-4 border-primary font-bold"
        >
          <UIcon :name="link.icon" class="text-[18px]" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Footer Links -->
      <div class="mt-auto flex flex-col gap-sm border-t border-outline-variant/30 pt-md">
        <NuxtLink
          class="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all"
          to="/"
        >
          <UIcon name="i-lucide-home" class="text-[18px]" />
          <span class="font-body-md text-body-md">Back to Home</span>
        </NuxtLink>
        <button
          class="w-full flex items-center gap-3 px-6 py-3 text-error hover:bg-error-container/20 transition-all font-body-md text-body-md"
          @click="logout"
        >
          <UIcon name="i-lucide-log-out" class="text-[18px]" />
          <span class="text-left font-semibold">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Mobile Drawer Sidebar overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-50 md:hidden"
      @click="isMobileMenuOpen = false"
    >
      <aside
        class="h-screen w-64 bg-surface flex flex-col py-6 border-r border-outline-variant/30 relative"
        @click.stop
      >
        <!-- Close button -->
        <button
          @click="isMobileMenuOpen = false"
          class="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
        >
          <UIcon name="i-lucide-x" class="text-[20px]" />
        </button>

        <!-- Brand/Profile -->
        <div class="px-gutter mb-xl flex flex-col items-center text-center mt-4">
          <div class="w-16 h-16 rounded-full mb-md overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-[24px] shadow-sm relative">
            <img v-if="profile?.photo_url" :src="profile.photo_url" class="w-full h-full object-cover" alt="Profile" />
            <span v-else>{{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}</span>
          </div>
          <h2 class="font-headline-md text-headline-sm font-bold text-primary truncate max-w-full px-2">
            {{ profile?.full_name || 'Anonymous' }}
          </h2>
          <p class="font-label-sm text-label-sm text-on-surface-variant mt-xs">
            {{ profile?.sector || 'Jobseeker' }}
          </p>
        </div>

        <!-- Navigation Links -->
        <nav class="flex-1 flex flex-col gap-sm">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 px-6 py-3 font-body-md text-body-md transition-all rounded-r-xl mr-4 text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
            active-class="!text-primary !bg-secondary-container/10 border-l-4 border-primary font-bold"
            @click="isMobileMenuOpen = false"
          >
            <UIcon :name="link.icon" class="text-[18px]" />
            <span>{{ link.label }}</span>
          </NuxtLink>
        </nav>

        <!-- Footer Links -->
        <div class="mt-auto flex flex-col gap-sm border-t border-outline-variant/30 pt-md">
          <NuxtLink
            class="flex items-center gap-3 px-6 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all"
            to="/"
            @click="isMobileMenuOpen = false"
          >
            <UIcon name="i-lucide-home" class="text-[18px]" />
            <span class="font-body-md text-body-md">Back to Home</span>
          </NuxtLink>
          <button
            class="w-full flex items-center gap-3 px-6 py-3 text-error hover:bg-error-container/20 transition-all font-body-md text-body-md"
            @click="logout"
          >
            <UIcon name="i-lucide-log-out" class="text-[18px]" />
            <span class="text-left font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </div>

    <!-- Top Header Bar -->
    <header v-if="!hideHeader" class="bg-surface/80 backdrop-blur-md fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 z-40 flex justify-between items-center px-gutter border-b border-outline-variant/30 transition-all">
      <!-- Mobile hamburger + brand -->
      <div class="flex items-center gap-sm md:hidden">
        <button
          @click="isMobileMenuOpen = true"
          class="p-2 text-on-surface-variant hover:text-primary rounded-lg"
        >
          <UIcon name="i-lucide-menu" class="text-[20px]" />
        </button>
        <span class="font-headline-md text-headline-sm font-bold text-primary">Job Nova</span>
      </div>

      <!-- Welcome info (Left-aligned on desktop) -->
      <div class="hidden md:flex items-center gap-4">
        <span v-if="profile" class="font-label-md text-on-surface-variant">Welcome, <span class="text-primary font-bold">{{ profile.full_name }}</span></span>
      </div>

      <div class="flex items-center gap-md ml-auto">
        <!-- Bell Icon / notifications -->
        <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all relative">
          <UIcon name="i-lucide-bell" class="text-[18px]" />
        </button>
        <NuxtLink to="/my-profile-dashboard" class="flex items-center gap-sm">
          <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm overflow-hidden relative">
            <img v-if="profile?.photo_url" :src="profile.photo_url" class="w-full h-full object-cover" alt="Profile" />
            <span v-else>{{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}</span>
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant hidden sm:inline-block font-semibold">
            {{ profile?.full_name || 'Anonymous' }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content Slot -->
    <div :class="['flex-1 md:pl-64 transition-all min-h-screen flex flex-col', hideHeader ? '' : 'pt-16']">
      <slot />
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: var(--color-surface);
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Hanken Grotesk", sans-serif;
}
</style>

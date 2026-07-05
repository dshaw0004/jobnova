<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { user, fetchUser, logout } = useAuth()
const isMobileMenuOpen = ref(false)

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'employer') {
    router.push('/login')
  }
})

const navLinks = [
  { to: '/employer-dashboard-2', label: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
  { to: '/company-profile-employer-dashboard', label: 'Company Profile', icon: 'i-lucide-building' },
  { to: '/post-a-new-job-employer-dashboard', label: 'Post Job', icon: 'i-lucide-plus' },
  { to: '/manage-jobs-employer-dashboard', label: 'Manage Jobs', icon: 'i-lucide-briefcase' },
  { to: '/applicants-tracking-employer-dashboard', label: 'Applicants', icon: 'i-lucide-users' }
]
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Desktop SideNavBar -->
    <aside class="hidden md:flex h-screen w-64 fixed left-0 top-0 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] bg-surface flex-col py-6 border-r border-outline-variant/30 z-50">
      <!-- Brand -->
      <div class="px-6 mb-8 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm shrink-0">
          <UIcon name="i-lucide-briefcase" class="text-[20px]" />
        </div>
        <div>
          <h1 class="font-headline-md text-headline-md font-bold text-primary leading-tight">Job Nova</h1>
          <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider opacity-80">Employer Portal</p>
        </div>
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

      <!-- Footer / Actions -->
      <div class="mt-auto flex flex-col gap-sm border-t border-outline-variant/30 pt-md px-4">
        <NuxtLink to="/post-a-new-job-employer-dashboard" class="w-full bg-primary text-on-primary py-2.5 rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
          <UIcon name="i-lucide-plus" class="text-[18px]" />
          <span>Post New Job</span>
        </NuxtLink>
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 transition-all font-body-md text-body-md rounded-lg"
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

        <!-- Brand -->
        <div class="px-6 mb-8 flex items-center gap-3 mt-4">
          <div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm shrink-0">
            <UIcon name="i-lucide-briefcase" class="text-[20px]" />
          </div>
          <div>
            <h1 class="font-headline-md text-headline-md font-bold text-primary leading-tight">Job Nova</h1>
            <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider opacity-80">Employer Portal</p>
          </div>
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
        <div class="mt-auto flex flex-col gap-sm border-t border-outline-variant/30 pt-md px-4">
          <NuxtLink to="/post-a-new-job-employer-dashboard" class="w-full bg-primary text-on-primary py-2.5 rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm" @click="isMobileMenuOpen = false">
            <UIcon name="i-lucide-plus" class="text-[18px]" />
            <span>Post New Job</span>
          </NuxtLink>
          <button
            class="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 transition-all font-body-md text-body-md rounded-lg"
            @click="logout"
          >
            <UIcon name="i-lucide-log-out" class="text-[18px]" />
            <span class="text-left font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </div>

    <!-- Top Header Bar -->
    <header class="bg-surface/80 backdrop-blur-md fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 z-40 flex justify-between items-center px-gutter border-b border-outline-variant/30 transition-all">
      <!-- Mobile hamburger + brand -->
      <div class="flex items-center gap-sm md:hidden ml-4">
        <button
          @click="isMobileMenuOpen = true"
          class="p-2 text-on-surface-variant hover:text-primary rounded-lg"
        >
          <UIcon name="i-lucide-menu" class="text-[20px]" />
        </button>
        <span class="font-headline-md text-headline-sm font-bold text-primary">Job Nova</span>
      </div>

      <!-- Left aligned page title/welcome info slot -->
      <div class="hidden md:flex items-center gap-4 pl-4">
        <span class="font-label-md text-on-surface-variant">Employer Console</span>
      </div>

      <div class="flex items-center gap-md ml-auto pr-4">
        <!-- Bell Icon / notifications -->
        <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all relative">
          <UIcon name="i-lucide-bell" class="text-[18px]" />
        </button>
        <div class="flex items-center gap-sm">
          <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            E
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant hidden sm:inline-block font-semibold">
            Employer
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content Slot -->
    <div class="flex-1 md:pl-64 transition-all min-h-screen flex flex-col pt-16">
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
h4 {
  font-family: "Hanken Grotesk", sans-serif;
}
</style>

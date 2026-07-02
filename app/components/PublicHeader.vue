<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, logout } = useAuth()
</script>

<template>
  <nav class="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border-b border-outline-variant/30">
    <div class="flex justify-between items-center px-gutter py-4 max-w-7xl mx-auto">
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="flex items-center text-primary">
          <AppLogo class="h-8 w-auto text-primary" />
        </NuxtLink>
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            active-class="text-primary font-bold border-b-2 border-primary pb-1"
            to="/"
            exact
            >Home</NuxtLink
          >
          <NuxtLink
            class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            active-class="text-primary font-bold border-b-2 border-primary pb-1"
            to="/government-jobs"
            >Govt Jobs</NuxtLink
          >
          <NuxtLink
            class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            active-class="text-primary font-bold border-b-2 border-primary pb-1"
            to="/private-jobs"
            >Private Jobs</NuxtLink
          >
          <NuxtLink
            class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            active-class="text-primary font-bold border-b-2 border-primary pb-1"
            to="/job-search"
            >Companies</NuxtLink
          >
          <NuxtLink
            class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            active-class="text-primary font-bold border-b-2 border-primary pb-1"
            to="/my-career-hub"
            >Resources</NuxtLink
          >
        </div>
      </div>
      <div class="flex items-center gap-4">
        <template v-if="user">
          <NuxtLink
            v-if="user.role === 'employer'"
            class="hidden sm:block font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            to="/employer-dashboard-2"
            >Dashboard</NuxtLink
          >
          <NuxtLink
            v-else
            class="hidden sm:block font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            to="/jobseeker-dashboard"
            >Dashboard</NuxtLink
          >
          <button
            @click="logout"
            class="hidden sm:block font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            >Logout</button
          >
        </template>
        <template v-else>
          <NuxtLink
            class="hidden sm:block font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all"
            to="/login"
            >Login / Register</NuxtLink
          >
        </template>
        <NuxtLink
          v-if="user?.role === 'employer'"
          to="/post-a-new-job-employer-dashboard"
          class="bg-primary-container text-on-primary-container font-Inter text-label-md px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Post a Job
        </NuxtLink>
        <NuxtLink
          v-else
          to="/register-employer-step-1"
          class="bg-primary-container text-on-primary-container font-Inter text-label-md px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Post a Job
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

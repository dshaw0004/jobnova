<script setup lang="ts">
definePageMeta({
  layout: false
})

import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Nova - Applied Jobs"
})

const router = useRouter()
const { user, fetchUser } = useAuth()

const applications = ref<any[]>([])
const summary = reactive({
  total: 0,
  applied: 0,
  shortlisted: 0,
  rejected: 0
})

const filters = reactive({
  search: '',
  status: ''
})

const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'jobseeker') {
    router.push('/login')
  } else {
    await loadApplications()
  }
})

async function loadApplications() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ success: boolean; applications: any[]; summary: any }>('/api/jobs/applications', {
      query: {
        search: filters.search,
        status: filters.status
      }
    })
    applications.value = res.applications
    if (res.summary) {
      summary.total = res.summary.total
      summary.applied = res.summary.applied
      summary.shortlisted = res.summary.shortlisted
      summary.rejected = res.summary.rejected
    }
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to load applications.'
  } finally {
    loading.value = false
  }
}

// Watch filters
watch(() => filters.status, () => {
  loadApplications()
})

let searchTimeout: any = null
function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadApplications()
  }, 300)
}

function formatDate(dateStr: string) {
  if (!dateStr) return '--'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col md:flex-row">
    <!-- SideNavBar -->
    <nav class="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex-col py-lg px-md z-50 border-r border-outline-variant/30">
      <div class="mb-xl flex items-center gap-sm px-sm">
        <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md shadow-sm">
          JN
        </div>
        <div>
          <h1 class="font-headline-md text-headline-md font-bold text-primary leading-tight">Job Nova</h1>
          <p class="font-label-sm text-label-sm text-on-surface-variant">Premium Career Hub</p>
        </div>
      </div>
      <div class="flex-1 space-y-sm">
        <NuxtLink class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md text-label-md group" to="/job-search">
          <UIcon name="i-lucide-search" class="text-[20px] group-hover:text-primary transition-colors" />
          Find Jobs
        </NuxtLink>
        <NuxtLink class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md text-label-md group" to="/my-profile-dashboard">
          <UIcon name="i-lucide-user" class="text-[20px] group-hover:text-primary transition-colors" />
          My Profile
        </NuxtLink>
        <NuxtLink class="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-fixed/20 scale-98 transition-transform duration-200 font-label-md text-label-md" to="/applied-jobs-dashboard">
          <UIcon name="i-lucide-history" class="text-[20px]" />
          Applied Jobs
        </NuxtLink>
      </div>
      <div class="mt-auto space-y-sm pt-md border-t border-outline-variant/30">
        <NuxtLink class="flex items-center gap-md px-md py-sm rounded-lg text-error hover:bg-error-container/50 transition-colors font-label-md text-label-md group mt-sm" to="/login">
          <UIcon name="i-lucide-log-out" class="text-[20px]" />
          Logout
        </NuxtLink>
      </div>
    </nav>

    <!-- TopAppBar -->
    <header class="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 z-40 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30 flex justify-between items-center px-lg transition-all">
      <div class="flex items-center gap-4">
        <span v-if="user" class="font-label-md text-on-surface-variant">Welcome, Asif</span>
      </div>
      <div class="flex items-center gap-sm">
        <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors relative">
          <UIcon name="i-lucide-bell" />
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="pt-24 pb-xl px-md md:px-lg md:ml-64 max-w-7xl mx-auto min-h-screen w-full space-y-8">
      <!-- Page Header -->
      <div>
        <h2 class="font-headline-lg text-headline-lg text-on-background mb-xs">Applied Jobs</h2>
        <p class="font-body-md text-body-md text-on-surface-variant">Track all jobs you have applied for.</p>
      </div>

      <!-- Application Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
        <!-- Total -->
        <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow">
          <div class="flex items-center justify-between mb-sm">
            <span class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <UIcon name="i-lucide-briefcase" class="text-[18px]" />
            </span>
          </div>
          <div>
            <p class="font-display-lg text-display-lg text-on-background">{{ summary.total }}</p>
            <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Total Applications</p>
          </div>
        </div>
        <!-- Under Review / Applied -->
        <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
          <div class="flex items-center justify-between mb-sm relative">
            <span class="w-8 h-8 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary">
              <UIcon name="i-lucide-clock" class="text-[18px]" />
            </span>
          </div>
          <div class="relative">
            <p class="font-display-lg text-display-lg text-on-background">{{ summary.applied }}</p>
            <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Applied / Under Review</p>
          </div>
        </div>
        <!-- Shortlisted -->
        <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
          <div class="flex items-center justify-between mb-sm relative">
            <span class="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <UIcon name="i-lucide-check-circle" class="text-[18px]" />
            </span>
          </div>
          <div class="relative">
            <p class="font-display-lg text-display-lg text-on-background">{{ summary.shortlisted }}</p>
            <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Shortlisted</p>
          </div>
        </div>
        <!-- Rejected -->
        <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
          <div class="flex items-center justify-between mb-sm relative">
            <span class="w-8 h-8 rounded-lg bg-error-container/50 flex items-center justify-center text-on-error-container">
              <UIcon name="i-lucide-x-circle" class="text-[18px]" />
            </span>
          </div>
          <div class="relative">
            <p class="font-display-lg text-display-lg text-on-background">{{ summary.rejected }}</p>
            <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Rejected</p>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="flex flex-col md:flex-row gap-md bg-surface-container-lowest p-sm rounded-xl shadow-sm border border-outline-variant/20">
        <div class="flex-1 relative group">
          <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            v-model="filters.search"
            class="w-full h-11 pl-12 pr-4 rounded-lg bg-surface border border-transparent focus:border-primary/50 focus:bg-surface-container-lowest outline-none transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70"
            placeholder="Search applied jobs by title or company..."
            type="text"
            @input="handleSearch"
          />
        </div>
        <div class="flex gap-sm">
          <select
            v-model="filters.status"
            class="h-11 px-4 rounded-lg bg-surface border border-outline-variant/50 hover:border-outline outline-none cursor-pointer text-body-md font-body-md text-on-surface min-w-[150px]"
          >
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <!-- Loader / Error States -->
      <div v-if="loading" class="py-20 flex justify-center">
        <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
      </div>

      <!-- Applied Jobs List -->
      <div v-else class="space-y-sm">
        <div v-if="applications.length === 0" class="py-16 text-center space-y-4 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
          <UIcon name="i-lucide-briefcase" class="text-[48px] text-outline/40" />
          <p class="font-body-lg text-on-surface-variant">You haven't applied to any jobs matching the filters.</p>
        </div>

        <div
          v-for="app in applications"
          :key="app.application_id"
          class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center gap-md group relative overflow-hidden"
        >
          <!-- Status Bar Indicator -->
          <div
            :class="[
              'absolute left-0 top-0 bottom-0 w-1',
              app.application_status === 'shortlisted' ? 'bg-success' : app.application_status === 'rejected' ? 'bg-error' : 'bg-primary'
            ]"
          ></div>

          <!-- Logo -->
          <div class="w-12 h-12 rounded-lg border border-surface-variant bg-surface flex items-center justify-center shrink-0 p-xs ml-sm">
            <UIcon name="i-lucide-building" class="text-primary text-[24px]" />
          </div>

          <!-- Job Info -->
          <div class="flex-grow">
            <div class="flex flex-wrap items-center gap-xs mb-xs">
              <h3 class="font-headline-md text-headline-md text-on-background text-[18px] group-hover:text-primary transition-colors cursor-pointer">
                {{ app.job_title }}
              </h3>
              <!-- Badge -->
              <span
                :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm ml-sm uppercase tracking-wider',
                  app.application_status === 'shortlisted' ? 'bg-success/10 text-success' : app.application_status === 'rejected' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                ]"
              >
                {{ app.application_status }}
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-[14px]">
              <span class="flex items-center gap-xs"><UIcon name="i-lucide-building" class="text-[16px]" /> {{ app.company_name || 'Verified Employer' }}</span>
              <span class="hidden md:inline text-outline-variant">•</span>
              <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> {{ app.job_city ? `${app.job_city}, ${app.job_state || ''}` : 'Remote' }}</span>
              <span class="hidden md:inline text-outline-variant">•</span>
              <span class="flex items-center gap-xs"><UIcon name="i-lucide-calendar" class="text-[16px]" /> Applied {{ formatDate(app.applied_at) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-row md:flex-col gap-sm w-full md:w-auto mt-sm md:mt-0">
            <NuxtLink
              class="flex-grow md:flex-none px-md py-2 rounded-lg border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors text-center"
              to="/job-search"
            >
              View Jobs
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
select, input {
  outline: none;
}
</style>

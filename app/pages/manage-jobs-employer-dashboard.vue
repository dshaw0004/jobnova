<script setup lang="ts">
definePageMeta({
  layout: 'employer'
})

import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Nova - Manage Jobs"
})

const router = useRouter()
const { user, fetchUser, logout } = useAuth()

const jobs = ref<any[]>([])
const summary = reactive({
  active: 0,
  draft: 0,
  expired: 0,
  total: 0
})

const filters = reactive({
  status: 'all',
  search: '',
  sort: 'newest'
})

const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'employer') {
    router.push('/login')
  } else {
    await loadJobs()
  }
})

// Fetch jobs from backend
async function loadJobs() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ success: boolean; jobs: any[]; summary: any }>('/api/jobs/list', {
      query: {
        status: filters.status,
        search: filters.search,
        sort: filters.sort
      }
    })
    jobs.value = res.jobs
    if (res.summary) {
      summary.active = res.summary.active
      summary.draft = res.summary.draft
      summary.expired = res.summary.expired
      summary.total = res.summary.total
    }
  }
  catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to load jobs list.'
  }
  finally {
    loading.value = false
  }
}

// Watch filters to trigger reloading automatically
watch(() => [filters.status, filters.sort], () => {
  loadJobs()
})

// Debounce search filter input
let searchTimeout: any = null
function handleSearchInput() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadJobs()
  }, 300)
}

// Delete job handler
async function handleDeleteJob(id: number) {
  if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
    return
  }

  try {
    await $fetch('/api/jobs/delete', {
      method: 'POST',
      body: { id }
    })
    await loadJobs()
  }
  catch (err: any) {
    alert(err.data?.message || 'Failed to delete job.')
  }
}

// Edit job handler
function handleEditJob(id: number) {
  router.push(`/post-a-new-job-employer-dashboard?id=${id}`)
}

// Clone/Duplicate job handler
function handleCloneJob(id: number) {
  router.push(`/post-a-new-job-employer-dashboard?cloneId=${id}`)
}

// Expire job handler
async function handleExpireJob(id: number) {
  if (!confirm('Are you sure you want to close/expire this job posting?')) {
    return
  }
  try {
    await $fetch('/api/jobs/status', {
      method: 'POST',
      body: { id, status: 'expired' }
    })
    await loadJobs()
  } catch (err: any) {
    alert(err.data?.message || 'Failed to close job.')
  }
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
  <main class="p-8 max-w-[1280px] mx-auto w-full space-y-8">
        <!-- Page Header -->
        <div class="flex justify-between items-end">
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-2">Manage Jobs</h1>
            <p class="font-body-md text-body-md text-on-surface-variant">View, track and manage all your job postings.</p>
          </div>
          <button
            class="bg-primary hover:bg-secondary text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md flex items-center gap-2 transition-transform scale-98 active:scale-95"
            @click="router.push('/post-a-new-job-employer-dashboard')"
          >
            <UIcon name="i-lucide-plus" class="text-[20px]" />
            Post a New Job
          </button>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Active Jobs -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex items-start justify-between border border-outline-variant/30">
            <div>
              <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Active Jobs</p>
              <h2 class="font-display-lg text-display-lg text-on-surface">{{ summary.active }}</h2>
            </div>
            <div class="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-primary">
              <UIcon name="i-lucide-check-circle" class="text-[28px]" />
            </div>
          </div>
          <!-- Draft Jobs -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex items-start justify-between border border-outline-variant/30">
            <div>
              <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Draft Jobs</p>
              <h2 class="font-display-lg text-display-lg text-on-surface">{{ summary.draft }}</h2>
            </div>
            <div class="w-12 h-12 rounded-xl bg-surface-container-highest/50 flex items-center justify-center text-on-surface-variant">
              <UIcon name="i-lucide-pencil-line" class="text-[28px]" />
            </div>
          </div>
          <!-- Expired Jobs -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex items-start justify-between border border-outline-variant/30">
            <div>
              <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Expired Jobs</p>
              <h2 class="font-display-lg text-display-lg text-on-surface">{{ summary.expired }}</h2>
            </div>
            <div class="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
              <UIcon name="i-lucide-calendar-x" class="text-[28px]" />
            </div>
          </div>
          <!-- Total Postings -->
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex items-start justify-between border border-outline-variant/30">
            <div>
              <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Total Jobs</p>
              <h2 class="font-display-lg text-display-lg text-on-surface">{{ summary.total }}</h2>
            </div>
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <UIcon name="i-lucide-briefcase" class="text-[28px]" />
            </div>
          </div>
        </div>

        <!-- Main Panel: Filters & Table -->
        <div class="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 overflow-hidden">
          <!-- Filters Row -->
          <div class="p-6 border-b border-outline-variant/40 flex flex-col md:flex-row gap-4 justify-between items-center bg-surface/30">
            <div class="relative w-full md:w-[400px]">
              <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                v-model="filters.search"
                class="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-container-highest/40 border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant"
                placeholder="Search by job title..."
                type="text"
                @input="handleSearchInput"
              />
            </div>
            <div class="flex gap-4 w-full md:w-auto">
              <select
                v-model="filters.status"
                class="h-12 px-4 rounded-xl bg-surface-container-highest/40 border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all font-body-md text-body-md text-on-surface cursor-pointer min-w-[140px]"
              >
                <option value="all">Status: All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
              </select>
              <select
                v-model="filters.sort"
                class="h-12 px-4 rounded-xl bg-surface-container-highest/40 border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all font-body-md text-body-md text-on-surface cursor-pointer min-w-[140px]"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
              </select>
            </div>
          </div>

          <!-- Loader / Error States -->
          <div v-if="loading" class="py-20 flex flex-col items-center justify-center gap-md">
            <UIcon name="i-lucide-loader-circle" class="animate-spin text-[40px] text-primary" />
            <p class="font-body-md text-on-surface-variant">Loading job postings...</p>
          </div>

          <div v-else-if="errorMsg" class="py-20 text-center space-y-md">
            <UIcon name="i-lucide-alert-triangle" class="text-[48px] text-error" />
            <p class="font-headline-md text-on-surface">{{ errorMsg }}</p>
            <button class="bg-primary text-on-primary px-4 py-2 rounded-lg" @click="loadJobs">Try Again</button>
          </div>

          <!-- Empty State -->
          <div v-else-if="jobs.length === 0" class="flex flex-col items-center justify-center py-20 bg-surface-container-lowest border-dashed text-center">
            <div class="w-24 h-24 mb-6 bg-surface-container rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-briefcase" class="text-[48px] text-primary/40" />
            </div>
            <h3 class="font-headline-md text-headline-md text-on-surface mb-2">No jobs posted yet</h3>
            <p class="font-body-md text-body-md text-on-surface-variant mb-6 max-w-md">
              Your active, draft, and past job postings will appear here. Get started by posting your first opportunity.
            </p>
            <button
              class="bg-primary hover:bg-secondary text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md flex items-center gap-2 transition-transform scale-98 active:scale-95 shadow-md"
              @click="router.push('/post-a-new-job-employer-dashboard')"
            >
              <UIcon name="i-lucide-plus" class="text-[20px]" />
              Post Your First Job
            </button>
          </div>

          <!-- Job List Table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-outline-variant/40 bg-surface-container-lowest">
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Job Title</th>
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Location</th>
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Vacancies</th>
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Applicants</th>
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Posted Date</th>
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold">Status</th>
                  <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/20">
                <tr v-for="job in jobs" :key="job.id" class="hover:bg-surface-container-low transition-colors group">
                  <td class="py-4 px-6">
                    <p class="font-headline-md text-[16px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                      {{ job.title }}
                    </p>
                    <p class="font-body-md text-[13px] text-on-surface-variant mt-1">
                      {{ job.functional_area }} • {{ job.industry }}
                    </p>
                  </td>
                  <td class="py-4 px-6 font-body-md text-body-md text-on-surface">
                    {{ job.city ? `${job.city}, ${job.state || ''}` : 'Remote' }}
                  </td>
                  <td class="py-4 px-6 font-body-md text-body-md text-on-surface">
                    {{ job.vacancies }}
                  </td>
                  <td class="py-4 px-6">
                    <NuxtLink
                      class="inline-flex items-center justify-center bg-primary/10 text-primary font-label-md text-label-md px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                      to="/applicants-tracking-employer-dashboard"
                    >
                      {{ job.applicantsCount }}
                      <UIcon name="i-lucide-arrow-up-right" class="text-[14px] ml-1" />
                    </NuxtLink>
                  </td>
                  <td class="py-4 px-6 font-body-md text-body-md text-on-surface">
                    {{ formatDate(job.created_at) }}
                  </td>
                  <td class="py-4 px-6">
                    <span
                      v-if="job.status === 'active'"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-success/10 text-success border border-success/20"
                    >
                      Active
                    </span>
                    <span
                      v-else-if="job.status === 'draft'"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant border border-outline-variant/50"
                    >
                      Draft
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-error/10 text-error border border-error/20"
                    >
                      Expired
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Edit Job"
                        type="button"
                        @click="handleEditJob(job.id)"
                      >
                        <UIcon name="i-lucide-pencil" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                        title="Duplicate/Clone Job"
                        type="button"
                        @click="handleCloneJob(job.id)"
                      >
                        <UIcon name="i-lucide-copy" class="text-[20px]" />
                      </button>
                      <button
                        v-if="job.status !== 'expired'"
                        class="p-2 text-on-surface-variant hover:text-warning hover:bg-warning/10 rounded-lg transition-colors"
                        title="Close/Expire Job"
                        type="button"
                        @click="handleExpireJob(job.id)"
                      >
                        <UIcon name="i-lucide-calendar-x" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                        title="Delete Job"
                        type="button"
                        @click="handleDeleteJob(job.id)"
                      >
                        <UIcon name="i-lucide-trash" class="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  </main>
</template>

<style scoped>
select, input {
  outline: none;
}
</style>

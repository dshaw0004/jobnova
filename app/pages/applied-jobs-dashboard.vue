<script setup lang="ts">
definePageMeta({
  layout: 'jobseeker'
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
  rejected: 0,
  offered: 0
})

const filters = reactive({
  search: '',
  status: ''
})

const loading = ref(false)
const errorMsg = ref('')
const withdrawingId = ref<number | null>(null)
const expandedCoverLetter = ref<number | null>(null)

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
      summary.offered = res.summary.offered
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

function formatExperience(min: any, max: any) {
  if (min !== null && max !== null) {
    return `${min}-${max} Yrs`
  }
  if (min !== null) {
    return `${min}+ Yrs`
  }
  return '0-5 Yrs'
}

function formatSalary(min: any, max: any) {
  if (min !== null && max !== null) {
    return `₹${min}-${max} LPA`
  }
  if (min !== null) {
    return `₹${min}+ LPA`
  }
  return 'Not Disclosed'
}

function getTrackLineWidth(status: string) {
  if (status === 'shortlisted') return 'width: 25%; background-color: var(--color-primary);'
  if (status === 'offered') return 'width: 90%; background-color: var(--color-primary);'
  if (status === 'rejected') return 'width: 25%; background-color: #ef4444;'
  return 'width: 0%; background-color: var(--color-primary);'
}

async function handleWithdraw(applicationId: number) {
  if (!confirm('Are you sure you want to withdraw this application? This cannot be undone.')) return
  withdrawingId.value = applicationId
  try {
    await $fetch('/api/jobs/withdraw', {
      method: 'POST',
      body: { applicationId }
    })
    await loadApplications()
  } catch (err: any) {
    alert(err.data?.message || 'Failed to withdraw application.')
  } finally {
    withdrawingId.value = null
  }
}

function toggleCoverLetter(id: number) {
  expandedCoverLetter.value = expandedCoverLetter.value === id ? null : id
}

function formatDeadline(dateStr: string | null) {
  if (!dateStr) return null
  try {
    const deadline = new Date(dateStr)
    const now = new Date()
    const isPast = now > new Date(dateStr + 'T23:59:59')
    return {
      label: deadline.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      isPast
    }
  } catch {
    return null
  }
}
</script>

<template>
  <main class="pt-8 pb-xl px-md md:px-lg max-w-7xl mx-auto min-h-screen w-full space-y-8">
    <!-- Page Header -->
    <div>
      <h2 class="font-headline-lg text-headline-lg text-on-background mb-xs">Applied Jobs</h2>
      <p class="font-body-md text-body-md text-on-surface-variant">Track all jobs you have applied for and their status.</p>
    </div>

    <!-- Application Summary Cards -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-md">
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
      <!-- Offer Received -->
      <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
        <div class="flex items-center justify-between mb-sm relative">
          <span class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
            <UIcon name="i-lucide-party-popper" class="text-[18px] icon-fill" />
          </span>
        </div>
        <div class="relative">
          <p class="font-display-lg text-display-lg text-on-background">{{ summary.offered }}</p>
          <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Offer Received</p>
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
      <div class="flex-grow relative group">
        <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          v-model="filters.search"
          class="w-full h-11 pl-12 pr-4 rounded-lg bg-surface border border-transparent focus:border-primary/50 focus:bg-surface-container-lowest outline-none transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70"
          placeholder="Search applied jobs by title or company..."
          type="text"
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-outline-variant mb-lg overflow-x-auto scrollbar-hide">
      <div class="flex gap-lg min-w-max px-sm">
        <button
          @click="filters.status = ''"
          class="pb-sm font-label-md text-label-md transition-all border-b-2"
          :class="filters.status === '' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'"
        >
          All Applications ({{ summary.total }})
        </button>
        <button
          @click="filters.status = 'applied'"
          class="pb-sm font-label-md text-label-md transition-all border-b-2"
          :class="filters.status === 'applied' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'"
        >
          Applied ({{ summary.applied }})
        </button>
        <button
          @click="filters.status = 'shortlisted'"
          class="pb-sm font-label-md text-label-md transition-all border-b-2"
          :class="filters.status === 'shortlisted' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'"
        >
          Shortlisted ({{ summary.shortlisted }})
        </button>
        <button
          @click="filters.status = 'offered'"
          class="pb-sm font-label-md text-label-md transition-all border-b-2"
          :class="filters.status === 'offered' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'"
        >
          Offer Received ({{ summary.offered }})
        </button>
        <button
          @click="filters.status = 'rejected'"
          class="pb-sm font-label-md text-label-md transition-all border-b-2"
          :class="filters.status === 'rejected' ? 'text-primary border-primary font-bold' : 'text-on-surface-variant hover:text-primary border-transparent'"
        >
          Rejected ({{ summary.rejected }})
        </button>
      </div>
    </div>

    <!-- Loader / Error States -->
    <div v-if="loading" class="py-20 flex justify-center">
      <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
    </div>

    <!-- Applied Jobs List -->
    <div v-else class="space-y-lg">
      <div v-if="applications.length === 0" class="py-16 text-center space-y-4 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
        <UIcon name="i-lucide-briefcase" class="text-[48px] text-outline/40" />
        <p class="font-body-lg text-on-surface-variant">You haven't applied to any jobs matching this filter.</p>
        <NuxtLink to="/job-search" class="inline-flex h-10 px-5 bg-primary text-on-primary rounded-lg items-center text-sm font-semibold hover:scale-98 transition-transform">
          Browse Jobs
        </NuxtLink>
      </div>

      <div
        v-for="app in applications"
        :key="app.application_id"
        class="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex flex-col gap-lg group relative overflow-hidden"
      >
        <!-- Status Bar Indicator -->
        <div
          :class="[
            'absolute left-0 top-0 bottom-0 w-1.5',
            app.application_status === 'shortlisted' ? 'bg-secondary' : app.application_status === 'rejected' ? 'bg-error' : app.application_status === 'offered' ? 'bg-success' : 'bg-primary'
          ]"
        ></div>

        <!-- Upper Info Row -->
        <div class="flex flex-col md:flex-row gap-md md:items-start justify-between border-b border-outline-variant/30 pb-md">
          <div class="flex gap-md">
            <div class="w-12 h-12 rounded-lg border border-outline-variant/30 flex items-center justify-center bg-surface overflow-hidden shrink-0">
              <UIcon name="i-lucide-building" class="text-primary text-[24px]" />
            </div>
            <div>
              <div class="flex items-center gap-sm mb-xs flex-wrap">
                <h3 class="font-headline-md text-body-lg font-bold text-on-background group-hover:text-primary transition-colors">
                  {{ app.job_title }}
                </h3>
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-full font-label-sm text-[10px] uppercase tracking-wider font-bold',
                    app.application_status === 'shortlisted' ? 'bg-secondary-container/20 text-secondary' :
                    app.application_status === 'rejected' ? 'bg-error-container/30 text-error' :
                    app.application_status === 'offered' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                  ]"
                >
                  {{ app.application_status === 'offered' ? 'Offer Received' : app.application_status }}
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-sm">
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-building" class="text-[16px]" />
                  {{ app.company_name || 'Verified Employer' }}
                </span>
                <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-map-pin" class="text-[16px]" />
                  {{ app.job_city ? `${app.job_city}, ${app.job_state || ''}` : 'Remote' }}
                </span>
                <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-banknote" class="text-[16px]" />
                  {{ formatSalary(app.job_sal_min, app.job_sal_max) }}
                </span>
                <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
                <span class="flex items-center gap-1">
                  <UIcon name="i-lucide-briefcase" class="text-[16px]" />
                  {{ formatExperience(app.job_exp_min, app.job_exp_max) }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-sm mt-sm md:mt-0 items-center">
            <!-- Deadline badge -->
            <template v-if="formatDeadline(app.application_deadline)">
              <span
                :class="[
                  'inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] border',
                  formatDeadline(app.application_deadline)!.isPast
                    ? 'bg-error/10 text-error border-error/20'
                    : 'bg-surface-container text-on-surface-variant border-outline-variant/40'
                ]"
              >
                <UIcon name="i-lucide-clock" class="text-[13px]" />
                {{ formatDeadline(app.application_deadline)!.isPast ? 'Deadline passed' : 'Deadline: ' + formatDeadline(app.application_deadline)!.label }}
              </span>
            </template>
            <NuxtLink
              :to="`/job-search`"
              class="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-lowest hover:border-primary hover:text-primary transition-all active:scale-[0.98] flex items-center justify-center"
            >
              View Job
            </NuxtLink>
            <button
              v-if="app.application_status === 'applied'"
              class="px-md py-sm rounded-lg border border-error/40 text-error font-label-md text-label-md hover:bg-error/10 transition-colors active:scale-[0.98] flex items-center gap-1 disabled:opacity-50"
              :disabled="withdrawingId === app.application_id"
              @click="handleWithdraw(app.application_id)"
            >
              <UIcon v-if="withdrawingId === app.application_id" name="i-lucide-loader-circle" class="animate-spin text-[16px]" />
              <UIcon v-else name="i-lucide-x-circle" class="text-[16px]" />
              Withdraw
            </button>
            <button
              v-if="app.cover_letter"
              class="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:border-primary hover:text-primary transition-all active:scale-[0.98] flex items-center gap-1"
              @click="toggleCoverLetter(app.application_id)"
            >
              <UIcon name="i-lucide-file-text" class="text-[16px]" />
              {{ expandedCoverLetter === app.application_id ? 'Hide' : 'Cover Letter' }}
            </button>
          </div>
        </div>

        <!-- Dynamic Timeline Visualization -->
        <div class="pt-sm px-sm md:px-lg">
          <div class="relative flex justify-between items-center w-full">
            <!-- Track Line Base -->
            <div class="absolute left-[5%] right-[5%] top-[14px] h-[2px] bg-surface-container-high -z-10"></div>
            <!-- Active Track Line -->
            <div class="absolute left-[5%] top-[14px] h-[2px] -z-10 transition-all duration-500" :style="getTrackLineWidth(app.application_status)"></div>

            <!-- Stage 1: Applied -->
            <div class="flex flex-col items-center gap-sm z-10 w-20">
              <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                <UIcon name="i-lucide-check" class="text-[16px] icon-fill" />
              </div>
              <span class="font-label-sm text-[11px] text-center text-on-surface-variant">
                Applied<br />
                <span class="text-outline font-normal">{{ formatDate(app.applied_at) }}</span>
              </span>
            </div>

            <!-- Stage 2: Shortlisted -->
            <div class="flex flex-col items-center gap-sm z-10 w-20" :class="{ 'opacity-50': app.application_status === 'applied' }">
              <!-- If rejected -->
              <div v-if="app.application_status === 'rejected'" class="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-sm">
                <UIcon name="i-lucide-x" class="text-[16px]" />
              </div>
              <!-- If shortlisted / offered -->
              <div v-else-if="app.application_status === 'shortlisted' || app.application_status === 'offered'" class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                <UIcon name="i-lucide-check" class="text-[16px] icon-fill" />
              </div>
              <!-- If applied (pending) -->
              <div v-else class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
                <UIcon name="i-lucide-check-circle" class="text-[16px]" />
              </div>
              <span class="font-label-sm text-[11px] text-center" :class="app.application_status === 'rejected' ? 'text-red-500 font-bold' : (app.application_status === 'shortlisted' ? 'text-primary font-bold' : 'text-on-surface-variant')">
                {{ app.application_status === 'rejected' ? 'Rejected' : 'Shortlisted' }}
              </span>
            </div>

            <!-- Stage 3: Interview -->
            <div class="flex flex-col items-center gap-sm z-10 w-20" :class="{ 'opacity-50': app.application_status === 'applied' || app.application_status === 'rejected' }">
              <!-- If offered -->
              <div v-if="app.application_status === 'offered'" class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                <UIcon name="i-lucide-check" class="text-[16px] icon-fill" />
              </div>
              <!-- If shortlisted -->
              <div v-else-if="app.application_status === 'shortlisted'" class="w-7 h-7 rounded-full bg-surface-container-lowest border-2 border-primary text-primary flex items-center justify-center shadow-sm relative">
                <div class="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute"></div>
                <div class="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <!-- Pending -->
              <div v-else class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
                <UIcon name="i-lucide-calendar" class="text-[16px]" />
              </div>
              <span class="font-label-sm text-[11px] text-center" :class="app.application_status === 'shortlisted' ? 'text-primary font-bold' : 'text-on-surface-variant'">
                Interview
              </span>
            </div>

            <!-- Stage 4: Selected -->
            <div class="flex flex-col items-center gap-sm z-10 w-20" :class="{ 'opacity-50': app.application_status !== 'offered' }">
              <div v-if="app.application_status === 'offered'" class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
                <UIcon name="i-lucide-check" class="text-[16px] icon-fill" />
              </div>
              <div v-else class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
                <UIcon name="i-lucide-task-alt" class="text-[16px]" />
              </div>
              <span class="font-label-sm text-[11px] text-center text-on-surface-variant">
                Selected
              </span>
            </div>

            <!-- Stage 5: Offer -->
            <div class="flex flex-col items-center gap-sm z-10 w-20" :class="{ 'opacity-50': app.application_status !== 'offered' }">
              <div v-if="app.application_status === 'offered'" class="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center shadow-sm">
                <UIcon name="i-lucide-party-popper" class="text-[16px]" />
              </div>
              <div v-else class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
                <UIcon name="i-lucide-award" class="text-[16px]" />
              </div>
              <span class="font-label-sm text-[11px] text-center" :class="app.application_status === 'offered' ? 'text-green-600 font-bold' : 'text-on-surface-variant'">
                Offer
              </span>
            </div>
          </div>
        </div>

        <!-- Cover Letter Panel -->
        <div
          v-if="app.cover_letter && expandedCoverLetter === app.application_id"
          class="bg-surface-container-low/60 rounded-xl p-md border border-outline-variant/30 text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap"
        >
          <p class="font-label-md text-label-md text-on-surface font-semibold mb-2 flex items-center gap-1">
            <UIcon name="i-lucide-file-text" class="text-primary" /> Cover Letter
          </p>
          {{ app.cover_letter }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.icon-fill {
  font-variation-settings: 'FILL' 1;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

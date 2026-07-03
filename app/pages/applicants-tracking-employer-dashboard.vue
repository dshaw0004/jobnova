<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false
})

useHead({
  title: "Applicants Tracking - Job Nova"
})

const router = useRouter()
const { user, fetchUser, logout } = useAuth()

// State
const applications = ref<any[]>([])
const jobs = ref<any[]>([])
const summary = reactive({
  total: 0,
  applied: 0,
  shortlisted: 0,
  rejected: 0
})

const filters = reactive({
  search: '',
  jobId: '',
  status: ''
})

const loading = ref(false)
const actionLoading = ref<number | null>(null) // Tracks app ID being updated
const errorMsg = ref('')

// Modal state
const selectedApp = ref<any | null>(null)
const isModalOpen = ref(false)

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'employer') {
    router.push('/login')
  } else {
    await loadData()
  }
})

async function loadData() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ success: boolean; applications: any[]; summary: any; jobs: any[] }>('/api/employer/applications', {
      query: {
        search: filters.search,
        status: filters.status,
        jobId: filters.jobId || undefined
      }
    })
    applications.value = res.applications
    jobs.value = res.jobs
    if (res.summary) {
      summary.total = res.summary.total
      summary.applied = res.summary.applied
      summary.shortlisted = res.summary.shortlisted
      summary.rejected = res.summary.rejected
    }
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to load applications data.'
  } finally {
    loading.value = false
  }
}

// Watch filters
watch([() => filters.status, () => filters.jobId], () => {
  loadData()
})

let searchTimeout: any = null
function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadData()
  }, 300)
}

async function updateStatus(applicationId: number, status: string) {
  actionLoading.value = applicationId
  try {
    await $fetch('/api/employer/status', {
      method: 'POST',
      body: { applicationId, status }
    })
    // Reload dashboard state
    await loadData()
    // If modal is open for this application, update local state
    if (selectedApp.value && selectedApp.value.application_id === applicationId) {
      selectedApp.value.application_status = status
    }
  } catch (err: any) {
    alert(err.data?.message || 'Failed to update application status.')
  } finally {
    actionLoading.value = null
  }
}

function viewProfile(app: any) {
  selectedApp.value = app
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedApp.value = null
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

function safeParseJson(jsonStr: string | null, fallback: any[] = []) {
  if (!jsonStr) return fallback
  try {
    return typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr
  } catch {
    return fallback
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface flex">
    <!-- SideNavBar -->
    <aside class="h-screen w-64 fixed left-0 top-0 bg-surface shadow-sm z-50 flex flex-col py-lg px-md border-r border-outline-variant/30">
      <!-- Brand -->
      <div class="flex items-center gap-3 mb-xl px-2">
        <div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-soft">
          <UIcon name="i-lucide-briefcase" class="text-[20px]" />
        </div>
        <div>
          <div class="text-headline-md font-headline-md text-primary font-bold tracking-tight">Job Nova</div>
          <div class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider opacity-80 mt-1">Employer Console</div>
        </div>
      </div>
      <!-- Navigation -->
      <nav class="flex-1 space-y-2">
        <NuxtLink class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md" to="/employer-dashboard-2">
          <UIcon name="i-lucide-layout-dashboard" />
          Dashboard
        </NuxtLink>
        <NuxtLink class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md" to="/company-profile-employer-dashboard">
          <UIcon name="i-lucide-building-2" />
          Company Profile
        </NuxtLink>
        <NuxtLink class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md" to="/post-a-new-job-employer-dashboard">
          <UIcon name="i-lucide-file-plus" />
          Post Job
        </NuxtLink>
        <NuxtLink class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md" to="/manage-jobs-employer-dashboard">
          <UIcon name="i-lucide-history" />
          Manage Jobs
        </NuxtLink>
        <NuxtLink class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold bg-primary-container/10 transition-colors font-body-md text-body-md" to="/applicants-tracking-employer-dashboard">
          <UIcon name="i-lucide-users" />
          Applicants
        </NuxtLink>
      </nav>
      <!-- CTA & Footer -->
      <div class="mt-auto space-y-4">
        <NuxtLink to="/post-a-new-job-employer-dashboard" class="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
          <UIcon name="i-lucide-plus" class="text-[20px]" />
          Post New Job
        </NuxtLink>
        <div class="pt-4 border-t border-surface-variant">
          <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors font-body-md text-body-md">
            <UIcon name="i-lucide-log-out" />
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
      <!-- TopAppBar -->
      <header class="fixed top-0 right-0 w-[calc(100%-256px)] z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center h-16 px-lg border-b border-outline-variant/30">
        <div class="flex items-center gap-4">
          <span class="font-headline-md text-headline-sm font-bold text-primary">Applicants Manager</span>
        </div>
        <!-- Right: Actions & Profile -->
        <div class="flex items-center gap-4">
          <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors relative">
            <UIcon name="i-lucide-bell" />
          </button>
          <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors">
            <UIcon name="i-lucide-settings" />
          </button>
          <div class="h-8 w-px bg-surface-variant mx-2"></div>
          <div class="flex items-center gap-sm">
            <div class="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              E
            </div>
            <span class="font-label-md text-label-md text-on-surface-variant font-semibold">Employer Console</span>
          </div>
        </div>
      </header>

      <!-- Main Scrollable Canvas -->
      <main class="flex-1 overflow-y-auto pt-24 pb-12 px-xl">
        <div class="max-w-7xl mx-auto space-y-xl">
          <!-- Page Header -->
          <div>
            <h1 class="text-headline-lg font-headline-lg text-on-surface font-bold">Applicants Tracking</h1>
            <p class="text-body-md font-body-md text-on-surface-variant mt-2">Review and manage candidate applications received across your active job postings.</p>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            <!-- Total -->
            <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
                <UIcon name="i-lucide-users" class="text-[28px]" />
              </div>
              <div>
                <div class="text-label-md font-label-md text-on-surface-variant mb-1">Total Applicants</div>
                <div class="text-headline-md font-headline-md text-on-surface font-bold">{{ summary.total }}</div>
              </div>
            </div>
            <!-- New -->
            <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <UIcon name="i-lucide-clock" class="text-[28px]" />
              </div>
              <div>
                <div class="text-label-md font-label-md text-on-surface-variant mb-1">New Applications</div>
                <div class="text-headline-md font-headline-md text-primary font-bold">{{ summary.applied }}</div>
              </div>
            </div>
            <!-- Shortlisted -->
            <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary">
                <UIcon name="i-lucide-check-circle" class="text-[28px]" />
              </div>
              <div>
                <div class="text-label-md font-label-md text-on-surface-variant mb-1">Shortlisted</div>
                <div class="text-headline-md font-headline-md text-on-surface font-bold">{{ summary.shortlisted }}</div>
              </div>
            </div>
            <!-- Rejected -->
            <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-error-container/20 flex items-center justify-center text-error">
                <UIcon name="i-lucide-x-circle" class="text-[28px]" />
              </div>
              <div>
                <div class="text-label-md font-label-md text-on-surface-variant mb-1">Rejected</div>
                <div class="text-headline-md font-headline-md text-on-surface font-bold">{{ summary.rejected }}</div>
              </div>
            </div>
          </div>

          <!-- Filter Bar -->
          <div class="bg-surface-container-lowest rounded-xl p-3 shadow-soft border border-surface-container-low flex flex-wrap items-center gap-3">
            <!-- Search -->
            <div class="flex-1 min-w-[250px] relative">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                v-model="filters.search"
                class="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-lg pl-10 pr-4 py-2 text-body-md font-body-md text-on-surface placeholder:text-outline-variant transition-colors h-11"
                placeholder="Search candidate by name or job title..."
                type="text"
                @input="handleSearch"
              />
            </div>
            <!-- Dropdowns -->
            <select
              v-model="filters.jobId"
              class="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-label-md font-label-md text-on-surface h-11 focus:border-primary focus:ring-0 cursor-pointer min-w-[180px]"
            >
              <option value="">All Job Postings</option>
              <option v-for="job in jobs" :key="job.id" :value="job.id">
                {{ job.title }}
              </option>
            </select>
            <select
              v-model="filters.status"
              class="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-label-md font-label-md text-on-surface h-11 focus:border-primary focus:ring-0 cursor-pointer min-w-[150px]"
            >
              <option value="">All Statuses</option>
              <option value="applied">Applied / New</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-20 flex justify-center">
            <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
          </div>

          <!-- Empty State -->
          <div v-else-if="applications.length === 0" class="py-16 text-center space-y-4 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant shadow-soft">
            <UIcon name="i-lucide-users" class="text-[48px] text-outline/40" />
            <p class="font-body-lg text-on-surface-variant">No candidate applications found matching the selected filters.</p>
          </div>

          <!-- Table Card -->
          <div v-else class="bg-surface-container-lowest rounded-xl shadow-soft border border-surface-container-low overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr class="bg-surface-container-low/50 border-b border-surface-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    <th class="py-4 px-6 font-semibold">Candidate</th>
                    <th class="py-4 px-6 font-semibold">Applied Position</th>
                    <th class="py-4 px-6 font-semibold">Target Sector</th>
                    <th class="py-4 px-6 font-semibold">Location</th>
                    <th class="py-4 px-6 font-semibold">Applied Date</th>
                    <th class="py-4 px-6 font-semibold">Status</th>
                    <th class="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-surface-variant text-body-md font-body-md text-on-surface">
                  <tr
                    v-for="app in applications"
                    :key="app.application_id"
                    class="hover:bg-surface-container-low/30 transition-colors group"
                  >
                    <!-- Candidate info -->
                    <td class="py-3 px-6">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {{ app.candidate_name ? app.candidate_name.charAt(0).toUpperCase() : 'U' }}
                        </div>
                        <div class="flex flex-col">
                          <span class="font-semibold">{{ app.candidate_name || 'Anonymous Candidate' }}</span>
                          <span class="text-label-sm text-on-surface-variant/80">{{ app.candidate_email }}</span>
                        </div>
                      </div>
                    </td>
                    <!-- Job title -->
                    <td class="py-3 px-6 text-on-surface-variant font-medium">
                      {{ app.job_title }}
                    </td>
                    <!-- Sector -->
                    <td class="py-3 px-6 text-on-surface-variant">
                      {{ app.candidate_sector || 'General Seekers' }}
                    </td>
                    <!-- Location -->
                    <td class="py-3 px-6 text-on-surface-variant">
                      {{ app.candidate_location || 'Not Specified' }}
                    </td>
                    <!-- Date -->
                    <td class="py-3 px-6 text-on-surface-variant">
                      {{ formatDate(app.applied_at) }}
                    </td>
                    <!-- Status -->
                    <td class="py-3 px-6">
                      <span
                        :class="[
                          'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider',
                          app.application_status === 'shortlisted' ? 'bg-secondary-container/20 text-secondary' :
                          app.application_status === 'rejected' ? 'bg-error-container/30 text-error' :
                          app.application_status === 'offered' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                        ]"
                      >
                        {{ app.application_status === 'offered' ? 'Offer Extended' : app.application_status }}
                      </span>
                    </td>
                    <!-- Actions -->
                    <td class="py-3 px-6 text-right">
                      <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <button
                          @click="viewProfile(app)"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors"
                          title="View Full Profile"
                        >
                          <UIcon name="i-lucide-eye" class="text-[18px]" />
                        </button>
                        
                        <button
                          v-if="app.application_status !== 'shortlisted' && app.application_status !== 'offered'"
                          @click="updateStatus(app.application_id, 'shortlisted')"
                          :disabled="actionLoading === app.application_id"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-secondary hover:bg-secondary-container/20 transition-colors disabled:opacity-50"
                          title="Shortlist Candidate"
                        >
                          <UIcon name="i-lucide-thumbs-up" class="text-[18px]" />
                        </button>

                        <button
                          v-if="app.application_status !== 'offered'"
                          @click="updateStatus(app.application_id, 'offered')"
                          :disabled="actionLoading === app.application_id"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                          title="Extend Job Offer"
                        >
                          <UIcon name="i-lucide-award" class="text-[18px]" />
                        </button>

                        <button
                          v-if="app.application_status !== 'rejected'"
                          @click="updateStatus(app.application_id, 'rejected')"
                          :disabled="actionLoading === app.application_id"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container transition-colors disabled:opacity-50"
                          title="Reject Candidate"
                        >
                          <UIcon name="i-lucide-thumbs-down" class="text-[18px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination Footer -->
            <div class="px-6 py-4 border-t border-surface-variant flex items-center justify-between text-body-md font-body-md text-on-surface-variant bg-surface-container-lowest">
              <div>Showing {{ applications.length }} applicant(s)</div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Candidate Detailed Profile Modal -->
    <div
      v-if="isModalOpen && selectedApp"
      class="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/60 backdrop-blur-sm transition-all"
      @click="closeModal"
    >
      <div
        class="bg-surface-container-lowest rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-outline-variant shadow-2xl flex flex-col"
        @click.stop
      >
        <!-- Modal Header -->
        <header class="sticky top-0 bg-surface-container-lowest px-lg py-md border-b border-outline-variant/30 flex justify-between items-center z-10">
          <div class="flex items-center gap-sm">
            <UIcon name="i-lucide-user" class="text-primary text-[24px]" />
            <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Candidate Detailed Profile</h3>
          </div>
          <button @click="closeModal" class="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container-low">
            <UIcon name="i-lucide-x" class="text-[20px]" />
          </button>
        </header>

        <!-- Modal Body Content -->
        <div class="p-lg space-y-lg flex-1">
          <!-- Profile Header Card -->
          <div class="flex flex-col md:flex-row gap-lg items-start border-b border-outline-variant/30 pb-lg">
            <div class="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-headline-lg shrink-0">
              {{ selectedApp.candidate_name ? selectedApp.candidate_name.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div class="flex-grow space-y-2">
              <div class="flex flex-wrap items-center justify-between gap-sm">
                <div>
                  <h4 class="font-headline-md text-headline-md font-bold text-on-surface">{{ selectedApp.candidate_name || 'Anonymous Candidate' }}</h4>
                  <p class="font-body-md text-body-md text-on-surface-variant">{{ selectedApp.candidate_sector || 'General Field' }}</p>
                </div>
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-label-sm font-label-sm font-bold uppercase tracking-wider',
                    selectedApp.application_status === 'shortlisted' ? 'bg-secondary-container/20 text-secondary' :
                    selectedApp.application_status === 'rejected' ? 'bg-error-container/30 text-error' :
                    selectedApp.application_status === 'offered' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                  ]"
                >
                  {{ selectedApp.application_status === 'offered' ? 'Job Offered' : selectedApp.application_status }}
                </span>
              </div>

              <!-- Contact & Location Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-xs pt-xs">
                <span class="flex items-center gap-xs text-on-surface-variant font-body-md text-sm">
                  <UIcon name="i-lucide-mail" class="text-outline" />
                  {{ selectedApp.candidate_email }}
                </span>
                <span class="flex items-center gap-xs text-on-surface-variant font-body-md text-sm">
                  <UIcon name="i-lucide-map-pin" class="text-outline" />
                  {{ selectedApp.candidate_location || 'Not Specified' }}
                </span>
                <span class="flex items-center gap-xs text-on-surface-variant font-body-md text-sm">
                  <UIcon name="i-lucide-calendar" class="text-outline" />
                  Applied on {{ formatDate(selectedApp.applied_at) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Professional Summary / About Me -->
          <section class="space-y-sm">
            <h5 class="font-headline-md text-body-lg font-bold text-on-surface border-l-4 border-primary pl-xs">Professional Summary</h5>
            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {{ selectedApp.candidate_professional_info || selectedApp.about_self || 'No detailed professional summary provided.' }}
            </p>
          </section>

          <!-- Work Experience -->
          <section class="space-y-sm">
            <h5 class="font-headline-md text-body-lg font-bold text-on-surface border-l-4 border-primary pl-xs">Work Experience</h5>
            <div
              v-if="safeParseJson(selectedApp.candidate_professional).length > 0"
              class="space-y-md border-l border-outline-variant/50 ml-xs pl-md pt-xs"
            >
              <div
                v-for="(exp, index) in safeParseJson(selectedApp.candidate_professional)"
                :key="index"
                class="space-y-xs relative"
              >
                <div class="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-outline-variant border-2 border-surface-container-lowest"></div>
                <div class="flex flex-wrap justify-between items-center gap-xs">
                  <h6 class="font-semibold text-on-surface">{{ exp.role }} at {{ exp.company }}</h6>
                  <span class="text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">{{ exp.duration }}</span>
                </div>
                <p class="text-sm text-on-surface-variant leading-relaxed">{{ exp.description }}</p>
              </div>
            </div>
            <p v-else class="font-body-md text-body-md text-on-surface-variant/80 italic">No professional work experience details recorded.</p>
          </section>

          <!-- Academic History -->
          <section class="space-y-sm">
            <h5 class="font-headline-md text-body-lg font-bold text-on-surface border-l-4 border-primary pl-xs">Academic History</h5>
            <div
              v-if="safeParseJson(selectedApp.candidate_academic).length > 0"
              class="space-y-md border-l border-outline-variant/50 ml-xs pl-md pt-xs"
            >
              <div
                v-for="(edu, index) in safeParseJson(selectedApp.candidate_academic)"
                :key="index"
                class="space-y-xs relative"
              >
                <div class="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-outline-variant border-2 border-surface-container-lowest"></div>
                <div class="flex flex-wrap justify-between items-center gap-xs">
                  <h6 class="font-semibold text-on-surface">{{ edu.degree }}</h6>
                  <span class="text-xs text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">{{ edu.year }}</span>
                </div>
                <p class="text-sm text-on-surface-variant">{{ edu.institution }} <span v-if="edu.grade">· Grade: {{ edu.grade }}</span></p>
              </div>
            </div>
            <p v-else class="font-body-md text-body-md text-on-surface-variant/80 italic">No academic history details recorded.</p>
          </section>
        </div>

        <!-- Sticky Actions Footer inside Modal -->
        <footer class="sticky bottom-0 bg-surface-container-low px-lg py-md border-t border-outline-variant/30 flex flex-wrap justify-end gap-sm">
          <button
            v-if="selectedApp.application_status !== 'shortlisted' && selectedApp.application_status !== 'offered'"
            @click="updateStatus(selectedApp.application_id, 'shortlisted')"
            :disabled="actionLoading === selectedApp.application_id"
            class="px-md py-2.5 rounded-lg bg-surface-container-lowest border border-primary text-primary font-semibold text-sm hover:bg-primary/10 transition-colors flex items-center gap-xs disabled:opacity-50"
          >
            <UIcon name="i-lucide-thumbs-up" />
            Shortlist Candidate
          </button>
          
          <button
            v-if="selectedApp.application_status !== 'offered'"
            @click="updateStatus(selectedApp.application_id, 'offered')"
            :disabled="actionLoading === selectedApp.application_id"
            class="px-md py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-xs disabled:opacity-50"
          >
            <UIcon name="i-lucide-award" />
            Extend Job Offer
          </button>

          <button
            v-if="selectedApp.application_status !== 'rejected'"
            @click="updateStatus(selectedApp.application_id, 'rejected')"
            :disabled="actionLoading === selectedApp.application_id"
            class="px-md py-2.5 rounded-lg bg-transparent text-error border border-error hover:bg-error-container/20 font-semibold text-sm transition-colors flex items-center gap-xs disabled:opacity-50"
          >
            <UIcon name="i-lucide-thumbs-down" />
            Reject Application
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
</style>

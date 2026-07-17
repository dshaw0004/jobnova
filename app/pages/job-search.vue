<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Search | Job Nova"
})

const router = useRouter()
const { user, fetchUser } = useAuth()

const jobs = ref<any[]>([])
const selectedJob = ref<any>(null)
const loading = ref(false)
const applyLoading = ref(false)
const errorMsg = ref('')

// Cover letter modal state
const applyModal = reactive({
  open: false,
  jobId: null as number | null,
  jobTitle: '' as string,
  coverLetter: ''
})

const filters = reactive({
  search: '',
  location: '',
  experience: 'Experience',
  industry: '',
  isMsme: undefined as boolean | undefined
})

onMounted(async () => {
  await fetchUser()
  await loadJobs()
})

async function loadJobs() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ success: boolean; jobs: any[] }>('/api/jobs/public-list', {
      query: {
        search: filters.search,
        location: filters.location,
        experience: filters.experience,
        industry: filters.industry,
        isMsme: filters.isMsme !== undefined ? (filters.isMsme ? 1 : 0) : undefined
      }
    })
    jobs.value = res.jobs
    if (jobs.value.length > 0) {
      selectedJob.value = jobs.value[0]
    } else {
      selectedJob.value = null
    }
  } catch (err: any) {
    errorMsg.value = 'Failed to load jobs list.'
  } finally {
    loading.value = false
  }
}

// Select a job to preview
function selectJob(job: any) {
  selectedJob.value = job
}

// Handle applying to a job — opens cover letter modal first
function applyToJob(jobId: number) {
  if (!user.value) {
    router.push(`/login?redirect=/job-search`)
    return
  }

  if (user.value.role !== 'jobseeker') {
    alert('Only jobseeker accounts can apply for jobs.')
    return
  }

  const job = jobs.value.find(j => j.id === jobId) || selectedJob.value
  applyModal.jobId = jobId
  applyModal.jobTitle = job?.title || 'this job'
  applyModal.coverLetter = ''
  applyModal.open = true
}

function closeApplyModal() {
  applyModal.open = false
  applyModal.jobId = null
  applyModal.coverLetter = ''
}

async function submitApplication() {
  if (!applyModal.jobId) return
  applyLoading.value = true
  try {
    const res = await $fetch<{ success: boolean; message: string; aiScreeningRequired?: boolean }>('/api/jobs/apply', {
      method: 'POST',
      body: { jobId: applyModal.jobId, coverLetter: applyModal.coverLetter || undefined }
    })
    if (res.success) {
      const job = jobs.value.find(j => j.id === applyModal.jobId)
      if (job) job.hasApplied = true
      if (selectedJob.value?.id === applyModal.jobId) {
        selectedJob.value.hasApplied = true
      }
      const targetJobId = applyModal.jobId
      closeApplyModal()

      if (res.aiScreeningRequired) {
        alert("This application requires a brief AI screening interview. Redirecting you to the interview room...")
        router.push(`/job-screening-chat?jobId=${targetJobId}`)
      } else {
        alert(res.message)
      }
    }
  } catch (err: any) {
    alert(err.data?.message || 'Failed to submit application.')
  } finally {
    applyLoading.value = false
  }
}

// Quick filter helper
function setQuickFilter(type: string) {
  if (type === 'government') {
    filters.industry = 'Government'
  } else if (type === 'private') {
    filters.industry = 'Information Technology'
  } else if (type === 'remote') {
    filters.location = 'Remote'
  } else if (type === 'msme') {
    filters.isMsme = true
  }
  loadJobs()
}

function clearFilters() {
  filters.search = ''
  filters.location = ''
  filters.experience = 'Experience'
  filters.industry = ''
  filters.isMsme = undefined
  loadJobs()
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

function formatDate(dateStr: string) {
  if (!dateStr) return 'Recently'
  try {
    const date = new Date(dateStr)
    const diffTime = Math.abs(new Date().getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays <= 1) return 'Today'
    if (diffDays === 2) return '1 day ago'
    return `${diffDays - 1} days ago`
  } catch {
    return 'Recently'
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <main class="mt-16 max-w-7xl mx-auto px-lg py-xl flex flex-col gap-xl w-full">
      <!-- Search Section -->
      <section class="w-full">
        <form class="bg-surface-container-lowest p-md rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-wrap lg:flex-nowrap items-center gap-base border border-outline-variant/30" @submit.prevent="loadJobs">
          <div class="flex-grow min-w-[200px] flex items-center gap-sm px-md border-b lg:border-b-0 lg:border-r border-outline-variant/30">
            <UIcon name="i-lucide-search" class="text-outline" />
            <input
              v-model="filters.search"
              class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md outline-none text-on-surface placeholder:text-outline/60"
              placeholder="Job Title, Skills, or Company"
              type="text"
            />
          </div>
          <div class="flex-grow min-w-[150px] flex items-center gap-sm px-md border-b lg:border-b-0 lg:border-r border-outline-variant/30">
            <UIcon name="i-lucide-map-pin" class="text-outline" />
            <input
              v-model="filters.location"
              class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md outline-none text-on-surface placeholder:text-outline/60"
              placeholder="City, State, or 'Remote'"
              type="text"
            />
          </div>
          <div class="flex-grow min-w-[120px] flex items-center gap-sm px-md border-b lg:border-b-0 lg:border-r border-outline-variant/30">
            <UIcon name="i-lucide-award" class="text-outline" />
            <select
              v-model="filters.experience"
              class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md cursor-pointer outline-none text-on-surface"
            >
              <option value="Experience">Experience (All)</option>
              <option value="Fresher">Fresher (0 Yrs)</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full lg:w-auto bg-primary text-on-primary px-xl py-md rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Find Jobs
          </button>
        </form>
      </section>

      <!-- Main Content Area -->
      <div class="grid grid-cols-12 gap-lg items-start">
        <!-- Left Sidebar: Filters -->
        <aside class="hidden lg:flex col-span-3 flex-col gap-md sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-sm">
          <div class="flex items-center justify-between mb-sm">
            <h3 class="font-headline-md text-headline-md text-on-surface">Filters</h3>
            <button class="text-primary font-label-md text-label-md hover:underline" @click="clearFilters">Clear All</button>
          </div>
          <!-- Filter Category -->
          <div class="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm">
            <h4 class="font-label-md text-label-md text-on-surface font-bold">Industry</h4>
            <div class="flex flex-col gap-xs mt-xs space-y-2">
              <label
                v-for="ind in ['Information Technology', 'Finance & Banking', 'Healthcare', 'Education']"
                :key="ind"
                class="flex items-center gap-sm cursor-pointer group"
              >
                <input
                  v-model="filters.industry"
                  type="radio"
                  name="industry-filter"
                  :value="ind"
                  class="text-primary focus:ring-primary h-4 w-4"
                  @change="loadJobs"
                />
                <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{{ ind }}</span>
              </label>
            </div>
          </div>
          <!-- Filter Sector (MSME) -->
          <div class="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm">
            <h4 class="font-label-md text-label-md text-on-surface font-bold">Sector / Type</h4>
            <div class="flex flex-col gap-xs mt-xs space-y-2">
              <label class="flex items-center gap-sm cursor-pointer group">
                <input
                  v-model="filters.isMsme"
                  type="radio"
                  name="sector-filter"
                  :value="undefined"
                  class="text-primary focus:ring-primary h-4 w-4"
                  @change="loadJobs"
                />
                <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">All Sectors</span>
              </label>
              <label class="flex items-center gap-sm cursor-pointer group">
                <input
                  v-model="filters.isMsme"
                  type="radio"
                  name="sector-filter"
                  :value="false"
                  class="text-primary focus:ring-primary h-4 w-4"
                  @change="loadJobs"
                />
                <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Non-MSME Private Jobs</span>
              </label>
              <label class="flex items-center gap-sm cursor-pointer group">
                <input
                  v-model="filters.isMsme"
                  type="radio"
                  name="sector-filter"
                  :value="true"
                  class="text-primary focus:ring-primary h-4 w-4"
                  @change="loadJobs"
                />
                <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors flex items-center gap-1">MSME <span class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">Highlight</span></span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Center Listing Area -->
        <section class="col-span-12 lg:col-span-5 flex flex-col gap-lg">
          <div>
            <h1 class="font-display-lg text-display-lg text-on-surface">Find Your Next Opportunity</h1>
            <p class="text-body-lg text-on-surface-variant mt-xs">Search and filter through active job openings.</p>
          </div>

          <!-- Quick Filters -->
          <div class="flex items-center gap-sm overflow-x-auto pb-sm no-scrollbar">
            <button class="whitespace-nowrap px-md py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all" @click="setQuickFilter('remote')">Remote Jobs</button>
            <button class="whitespace-nowrap px-md py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all" @click="setQuickFilter('private')">IT / Tech Jobs</button>
            <button class="whitespace-nowrap px-md py-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 rounded-full font-label-md text-label-md hover:bg-amber-500 hover:text-white transition-all flex items-center gap-1.5 shadow-sm" @click="setQuickFilter('msme')">
              <UIcon name="i-lucide-sparkles" class="text-xs" />
              MSME Jobs
            </button>
          </div>

          <!-- Results Header -->
          <div class="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
            <span class="font-label-md text-label-md text-on-surface-variant">
              Showing <span class="font-bold text-on-surface">{{ jobs.length }}</span> results
            </span>
          </div>

          <!-- Loader -->
          <div v-if="loading" class="py-12 flex justify-center">
            <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
          </div>

          <!-- Job Listing Cards -->
          <div v-else class="flex flex-col gap-md">
            <div v-if="jobs.length === 0" class="py-16 text-center space-y-4 bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant">
              <UIcon name="i-lucide-briefcase" class="text-[48px] text-outline/40" />
              <p class="font-body-lg text-on-surface-variant">No active jobs match your filters.</p>
              <button class="text-primary hover:underline font-label-md" @click="clearFilters">Clear filters</button>
            </div>

            <article
              v-for="job in jobs"
              :key="job.id"
              :class="[
                'p-md rounded-xl shadow-sm border transition-all group relative overflow-hidden cursor-pointer',
                selectedJob?.id === job.id 
                  ? (job.is_msme === 1 ? 'border-amber-500 bg-amber-50' : 'border-primary bg-primary/5') 
                  : (job.is_msme === 1 ? 'border-amber-200 bg-white hover:border-amber-400' : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/50 hover:shadow-md')
              ]"
              @click="selectJob(job)"
            >
              <div v-if="job.is_msme === 1" class="absolute -top-3 -right-6 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-[9px] font-bold px-8 py-1 rotate-45 shadow-sm tracking-wider z-0">
                MSME
              </div>
              <div class="flex justify-between items-start mb-sm relative z-10">
                <div class="flex gap-md">
                  <div 
                    class="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border"
                    :class="job.is_msme === 1 ? 'bg-amber-100 border-amber-200 text-amber-600' : 'bg-primary/10 border-transparent text-primary'"
                  >
                    <UIcon :name="job.is_msme === 1 ? 'i-lucide-store' : 'i-lucide-building'" class="text-[24px]" />
                  </div>
                  <div>
                    <h3 
                      class="font-headline-md text-headline-md text-on-surface transition-colors"
                      :class="job.is_msme === 1 ? 'group-hover:text-amber-600' : 'group-hover:text-primary'"
                    >
                      {{ job.title }}
                    </h3>
                    <div class="flex items-center gap-sm mt-xs flex-wrap">
                      <NuxtLink 
                        v-if="job.employer_id" 
                        :to="`/company-profile?id=${job.employer_id}`" 
                        class="font-label-md text-label-md font-semibold hover:underline"
                        :class="job.is_msme === 1 ? 'text-amber-600' : 'text-primary'"
                        @click.stop
                      >
                        {{ job.company_name }}
                      </NuxtLink>
                      <span v-else class="font-label-md text-label-md text-on-surface font-semibold">
                        {{ job.company_name || 'Verified Employer' }}
                      </span>
                      <span class="w-1 h-1 bg-outline rounded-full"></span>
                      <span class="text-body-sm text-on-surface-variant">
                        {{ job.city ? `${job.city}, ${job.state || ''}` : 'Remote' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Skills tags -->
              <div class="flex flex-wrap gap-xs mb-md">
                <span
                  v-for="(skill, index) in job.skills"
                  :key="index"
                  class="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded text-[11px] font-medium"
                >
                  {{ skill }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-sm mb-lg">
                <div class="flex items-center gap-xs text-on-surface-variant">
                  <UIcon name="i-lucide-banknote" class="text-[18px]" />
                  <span class="text-body-sm">{{ formatSalary(job.sal_min, job.sal_max) }}</span>
                </div>
                <div class="flex items-center gap-xs text-on-surface-variant">
                  <UIcon name="i-lucide-briefcase" class="text-[18px]" />
                  <span class="text-body-sm">{{ formatExperience(job.exp_min, job.exp_max) }}</span>
                </div>
                <div class="flex items-center gap-xs text-on-surface-variant">
                  <UIcon name="i-lucide-graduation-cap" class="text-[18px]" />
                  <span class="text-body-sm">{{ job.ug_qualification || 'Any Graduate' }}</span>
                </div>
                <div class="flex items-center gap-xs text-on-surface-variant">
                  <UIcon name="i-lucide-clock" class="text-[18px]" />
                  <span class="text-body-sm">{{ formatDate(job.created_at) }}</span>
                </div>
              </div>

              <div class="flex items-center gap-sm pt-md border-t border-outline-variant/20">
                <button
                  class="flex-1 bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
                  :disabled="job.hasApplied || applyLoading"
                  @click.stop="applyToJob(job.id)"
                >
                  {{ job.hasApplied ? 'Applied' : 'Apply Now' }}
                </button>
                <button
                  class="px-lg py-sm border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container transition-all"
                  @click.stop="selectJob(job)"
                >
                  View Details
                </button>
              </div>
            </article>
          </div>
        </section>

        <!-- Right Preview Panel (Desktop Only) -->
        <aside class="hidden lg:flex col-span-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto bg-surface-container-lowest border border-outline-variant/30 rounded-2xl flex-col p-lg shadow-sm">
          <div v-if="selectedJob" class="flex flex-col gap-lg">
            <div class="flex items-center justify-between">
              <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <UIcon name="i-lucide-building" class="text-primary text-[36px]" />
              </div>
            </div>
            <div>
              <h2 class="font-display-lg text-[24px] text-on-surface leading-tight">
                {{ selectedJob.title }}
              </h2>
              <div class="flex items-center gap-sm mt-xs">
                <NuxtLink 
                  v-if="selectedJob.employer_id" 
                  :to="`/company-profile?id=${selectedJob.employer_id}`" 
                  class="font-headline-md text-headline-md text-primary hover:underline font-bold"
                >
                  {{ selectedJob.company_name }}
                </NuxtLink>
                <span v-else class="font-headline-md text-headline-md text-on-surface font-bold">
                  {{ selectedJob.company_name || 'Verified Employer' }}
                </span>
                <span class="text-body-md text-on-surface-variant">• {{ selectedJob.city ? `${selectedJob.city}, ${selectedJob.state || ''}` : 'Remote' }}</span>
              </div>
            </div>

            <div class="flex items-center gap-md">
              <button
                class="flex-1 bg-primary text-on-primary font-headline-md text-headline-md py-md rounded-xl hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                :disabled="selectedJob.hasApplied || applyLoading"
                @click="applyToJob(selectedJob.id)"
              >
                {{ selectedJob.hasApplied ? 'Applied' : 'Apply Now' }}
              </button>
            </div>

            <div class="space-y-md border-t border-outline-variant/20 pt-lg">
              <h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Job Description</h4>
              <p class="text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                {{ selectedJob.description }}
              </p>
            </div>

            <div v-if="selectedJob.skills?.length > 0" class="space-y-md">
              <h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Required Skills</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(skill, index) in selectedJob.skills"
                  :key="index"
                  class="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-sm font-medium"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="space-y-md">
              <h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Salary &amp; Benefits</h4>
              <div class="grid grid-cols-2 gap-md">
                <div class="p-sm bg-surface-container-low rounded-lg">
                  <span class="block text-body-xs text-outline mb-xs">Compensation</span>
                  <span class="font-bold text-on-surface">{{ formatSalary(selectedJob.sal_min, selectedJob.sal_max) }}</span>
                </div>
                <div class="p-sm bg-surface-container-low rounded-lg">
                  <span class="block text-body-xs text-outline mb-xs">Experience</span>
                  <span class="font-bold text-on-surface">{{ formatExperience(selectedJob.exp_min, selectedJob.exp_max) }}</span>
                </div>
              </div>
            </div>

            <div class="p-md bg-green-500/10 text-green-700 rounded-xl flex items-center gap-md border border-green-500/20">
              <UIcon name="i-lucide-check-circle" class="text-[32px] text-green-600" />
              <div>
                <p class="font-bold text-label-md">Verified Employer</p>
                <p class="text-body-sm opacity-80">This company has been vetted by our safety team.</p>
              </div>
            </div>
          </div>

          <div v-else class="flex-grow flex flex-col items-center justify-center py-20 text-center text-on-surface-variant/40">
            <UIcon name="i-lucide-eye-off" class="text-[48px] mb-4" />
            <p class="font-body-md">Select a job to view details</p>
          </div>
        </aside>
      </div>
    </main>
  </div>

  <!-- Cover Letter Apply Modal -->
  <div
    v-if="applyModal.open"
    class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    @click.self="closeApplyModal"
  >
    <div class="bg-surface-container-lowest rounded-2xl w-full max-w-lg shadow-2xl border border-outline-variant overflow-hidden">
      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
        <div>
          <h3 class="font-headline-md text-headline-md font-bold text-on-surface">Apply for Position</h3>
          <p class="font-body-sm text-on-surface-variant mt-0.5 text-sm truncate max-w-xs">{{ applyModal.jobTitle }}</p>
        </div>
        <button
          class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
          @click="closeApplyModal"
        >
          <UIcon name="i-lucide-x" class="text-[20px]" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-4">
        <div>
          <label class="block font-label-md text-label-md text-on-surface mb-1">
            Cover Letter <span class="text-on-surface-variant font-normal">(optional)</span>
          </label>
          <p class="font-body-sm text-sm text-on-surface-variant mb-2">
            Introduce yourself and explain why you're a great fit for this role.
          </p>
          <textarea
            v-model="applyModal.coverLetter"
            class="w-full px-4 py-3 bg-surface-container-highest border border-outline-variant/50 rounded-xl focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-on-surface resize-y transition-colors"
            placeholder="Dear Hiring Manager, I am excited to apply for this position because..."
            rows="6"
          ></textarea>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-outline-variant/30 flex justify-end gap-3 bg-surface-container-low/50">
        <button
          class="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors"
          @click="closeApplyModal"
        >
          Cancel
        </button>
        <button
          class="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity shadow-md flex items-center gap-2 disabled:opacity-60"
          :disabled="applyLoading"
          @click="submitApplication"
        >
          <UIcon v-if="applyLoading" name="i-lucide-loader-circle" class="animate-spin text-[18px]" />
          <UIcon v-else name="i-lucide-send" class="text-[18px]" />
          Submit Application
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "MSME Jobs | Job Nova"
})

const router = useRouter()
const { user, fetchUser } = useAuth()

const jobs = ref<any[]>([])
const loading = ref(false)
const applyLoading = ref(false)
const sortBy = ref('Latest')

const filters = reactive({
  search: '',
  company: '',
  location: '',
  experience: '',
  workMode: '',
  industry: 'All Industries',
  salary: 200000 // default max range
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 6

onMounted(async () => {
  await fetchUser()
  await loadJobs()
})

async function loadJobs() {
  loading.value = true
  currentPage.value = 1 // Reset to first page on search
  try {
    const res = await $fetch<{ success: boolean; jobs: any[] }>('/api/jobs/public-list', {
      query: {
        search: filters.search,
        location: filters.location,
        experience: filters.experience || undefined,
        industry: filters.industry === 'All Industries' ? undefined : filters.industry,
        isMsme: 1
      }
    })
    jobs.value = res.jobs
  } catch (err) {
    console.error('Failed to load jobs:', err)
  } finally {
    loading.value = false
  }
}

// Client-side computed filtering & sorting
const displayedJobs = computed(() => {
  let list = jobs.value

  // Filter by company name on client-side if input
  if (filters.company.trim()) {
    const comp = filters.company.toLowerCase().trim()
    list = list.filter(j => j.company_name?.toLowerCase().includes(comp))
  }

  // Work Mode filter
  if (filters.workMode === 'Remote') {
    list = list.filter(j => 
      j.city?.toLowerCase().includes('remote') || 
      j.title?.toLowerCase().includes('remote') ||
      j.description?.toLowerCase().includes('remote')
    )
  } else if (filters.workMode === 'Hybrid') {
    list = list.filter(j => 
      j.city?.toLowerCase().includes('hybrid') || 
      j.title?.toLowerCase().includes('hybrid') ||
      j.description?.toLowerCase().includes('hybrid')
    )
  } else if (filters.workMode === 'Onsite') {
    list = list.filter(j => 
      !j.city?.toLowerCase().includes('remote') && 
      !j.city?.toLowerCase().includes('hybrid')
    )
  }

  // Salary filter (monthly salary converted to LPA)
  if (filters.salary) {
    const annualLakhs = (filters.salary * 12) / 100000
    list = list.filter(j => {
      if (j.sal_max) {
        return j.sal_max <= annualLakhs
      }
      return true
    })
  }

  // Sort
  if (sortBy.value === 'Highest Salary') {
    list = [...list].sort((a, b) => (b.sal_max || 0) - (a.sal_max || 0))
  } else if (sortBy.value === 'Experience (Low to High)') {
    list = [...list].sort((a, b) => (a.exp_min || 0) - (b.exp_min || 0))
  } else {
    list = [...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return list
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return displayedJobs.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(displayedJobs.value.length / itemsPerPage))

// Stats computed
const stats = computed(() => {
  const activeCount = jobs.value.length
  const companies = new Set(jobs.value.map(j => j.company_name).filter(Boolean))
  const remoteCount = jobs.value.filter(j => 
    j.city?.toLowerCase().includes('remote') || 
    j.title?.toLowerCase().includes('remote')
  ).length
  const fresherCount = jobs.value.filter(j => j.exp_min === null || j.exp_min === 0).length

  return {
    active: activeCount,
    companies: companies.size,
    remote: remoteCount,
    fresher: fresherCount
  }
})

// Top Hiring Companies computed
const topCompanies = computed(() => {
  const counts: Record<string, number> = {}
  jobs.value.forEach(j => {
    if (j.company_name) {
      counts[j.company_name] = (counts[j.company_name] || 0) + 1
    }
  })
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
})

function setQuickTag(tag: string) {
  if (tag === 'Remote') {
    filters.location = 'Remote'
  } else {
    filters.industry = tag
  }
  loadJobs()
}

function clearFilters() {
  filters.search = ''
  filters.company = ''
  filters.location = ''
  filters.experience = ''
  filters.workMode = ''
  filters.industry = 'All Industries'
  filters.salary = 200000
  loadJobs()
}

async function applyToJob(jobId: number) {
  if (!user.value) {
    router.push(`/login?redirect=/private-jobs`)
    return
  }

  if (user.value.role !== 'jobseeker') {
    alert('Only jobseeker accounts can apply for jobs.')
    return
  }

  applyLoading.value = true
  try {
    const res = await $fetch<{ success: boolean; message: string; aiScreeningRequired?: boolean }>('/api/jobs/apply', {
      method: 'POST',
      body: { jobId }
    })
    if (res.success) {
      if (res.aiScreeningRequired) {
        alert("This application requires a brief AI screening interview. Redirecting you to the interview room...")
        router.push(`/job-screening-chat?jobId=${jobId}`)
      } else {
        alert(res.message)
        // Update local state
        const job = jobs.value.find(j => j.id === jobId)
        if (job) job.hasApplied = true
      }
    }
  } catch (err: any) {
    alert(err.data?.message || 'Failed to submit application.')
  } finally {
    applyLoading.value = false
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
  <div>
    <main class="pt-24 pb-xl px-4 max-w-7xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-xs text-on-surface-variant mb-md font-label-md">
        <a class="hover:text-primary" href="/">Home</a>
        <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
        <span class="text-primary font-semibold">Private Jobs</span>
      </nav>

      <!-- Hero Section -->
      <section class="mb-xl">
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Private Jobs</h1>
        <p class="text-on-surface-variant font-body-lg max-w-2xl">
          Discover opportunities from startups, MNCs and leading companies across India. Your next career milestone starts here.
        </p>
      </section>

      <!-- Stats Grid -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-lg mb-xl">
        <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
          <span class="text-primary text-headline-md font-bold">{{ stats.active }}</span>
          <span class="text-on-surface-variant font-label-md">Active Jobs</span>
        </div>
        <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
          <span class="text-primary text-headline-md font-bold">{{ stats.companies }}</span>
          <span class="text-on-surface-variant font-label-md">Companies Hiring</span>
        </div>
        <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
          <span class="text-primary text-headline-md font-bold">{{ stats.remote }}</span>
          <span class="text-on-surface-variant font-label-md">Remote Jobs</span>
        </div>
        <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
          <span class="text-primary text-headline-md font-bold">{{ stats.fresher }}</span>
          <span class="text-on-surface-variant font-label-md">Freshers Jobs</span>
        </div>
      </section>

      <!-- Search Section -->
      <section class="bg-surface p-md rounded-2xl job-card-shadow mb-xl border border-surface-container">
        <div class="flex flex-col md:flex-row gap-base md:items-center">
          <div class="flex-1 flex items-center px-md border-r border-outline-variant/30">
            <UIcon name="i-lucide-search" class="text-outline mr-2" />
            <input v-model="filters.search" class="w-full border-none focus:ring-0 font-body-md placeholder:text-outline/70 bg-transparent outline-none" placeholder="Job Title or Keyword" type="text" @keyup.enter="loadJobs">
          </div>
          <div class="flex-1 flex items-center px-md border-r border-outline-variant/30">
            <UIcon name="i-lucide-building" class="text-outline mr-2" />
            <input v-model="filters.company" class="w-full border-none focus:ring-0 font-body-md placeholder:text-outline/70 bg-transparent outline-none" placeholder="Company Name" type="text">
          </div>
          <div class="flex-1 flex items-center px-md">
            <UIcon name="i-lucide-map-pin" class="text-outline mr-2" />
            <input v-model="filters.location" class="w-full border-none focus:ring-0 font-body-md placeholder:text-outline/70 bg-transparent outline-none" placeholder="Location" type="text" @keyup.enter="loadJobs">
          </div>
          <button class="bg-primary text-on-primary font-label-md px-xl py-md rounded-xl hover:bg-primary-container transition-colors shadow-md cursor-pointer" @click="loadJobs">Search Jobs</button>
        </div>
        <div class="mt-md flex flex-wrap items-center gap-sm px-sm">
          <span class="text-label-sm text-on-surface-variant mr-xs">Quick tags:</span>
          <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors cursor-pointer" @click="setQuickTag('Information Technology')">IT</button>
          <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors cursor-pointer" @click="setQuickTag('Marketing')">Marketing</button>
          <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors cursor-pointer" @click="setQuickTag('Finance & Banking')">Finance</button>
          <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors cursor-pointer" @click="setQuickTag('Human Resources')">HR</button>
          <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors cursor-pointer" @click="setQuickTag('Remote')">Remote</button>
        </div>
      </section>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-xl">
        <!-- Left Filter Sidebar -->
        <aside class="md:col-span-3 space-y-lg">
          <div class="bg-surface p-lg rounded-xl border border-surface-container-high shadow-sm">
            <div class="flex justify-between items-center mb-lg">
              <h3 class="font-headline-md text-[18px]">Filters</h3>
              <button class="text-primary font-label-sm hover:underline cursor-pointer" @click="clearFilters">Clear Filters</button>
            </div>
            <!-- Filter Section: Experience -->
            <div class="mb-lg">
              <h4 class="font-label-md mb-md">Experience</h4>
              <div class="space-y-sm">
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.experience" value="" class="rounded text-primary focus:ring-primary border-outline-variant" type="radio" name="exp" @change="loadJobs">
                  <span class="text-body-md">All Experiences</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.experience" value="Fresher" class="rounded text-primary focus:ring-primary border-outline-variant" type="radio" name="exp" @change="loadJobs">
                  <span class="text-body-md">Fresher</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.experience" value="1-3 Years" class="rounded text-primary focus:ring-primary border-outline-variant" type="radio" name="exp" @change="loadJobs">
                  <span class="text-body-md">1-3 Years</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.experience" value="3-5 Years" class="rounded text-primary focus:ring-primary border-outline-variant" type="radio" name="exp" @change="loadJobs">
                  <span class="text-body-md">3-5 Years</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.experience" value="5+ Years" class="rounded text-primary focus:ring-primary border-outline-variant" type="radio" name="exp" @change="loadJobs">
                  <span class="text-body-md">5+ Years</span>
                </label>
              </div>
            </div>
            <!-- Filter Section: Work Mode -->
            <div class="mb-lg">
              <h4 class="font-label-md mb-md">Work Mode</h4>
              <div class="space-y-sm">
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.workMode" value="" class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
                  <span class="text-body-md">All Modes</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.workMode" value="Remote" class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
                  <span class="text-body-md">Remote</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.workMode" value="Hybrid" class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
                  <span class="text-body-md">Hybrid</span>
                </label>
                <label class="flex items-center gap-sm cursor-pointer">
                  <input v-model="filters.workMode" value="Onsite" class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
                  <span class="text-body-md">Onsite</span>
                </label>
              </div>
            </div>

            <!-- Filter Section: Industry -->
            <div class="mb-lg">
              <h4 class="font-label-md mb-md">Industry</h4>
              <select v-model="filters.industry" class="w-full bg-surface-container-low border-none rounded-xl font-body-md focus:ring-primary py-2 px-3 outline-none cursor-pointer" @change="loadJobs">
                <option value="All Industries">All Industries</option>
                <option value="Information Technology">IT &amp; Tech</option>
                <option value="Finance & Banking">Finance &amp; Banking</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <!-- Filter Section: Salary -->
            <div class="mb-lg">
              <h4 class="font-label-md mb-md">Monthly Salary (₹)</h4>
              <input v-model.number="filters.salary" class="w-full accent-primary cursor-pointer" type="range" min="20000" max="200000" step="10000">
              <div class="flex justify-between text-label-sm text-on-surface-variant mt-sm">
                <span>20k</span>
                <span class="font-semibold text-primary">Up to ₹{{ (filters.salary / 1000).toFixed(0) }}k</span>
                <span>2L+</span>
              </div>
            </div>
          </div>

          <!-- Career Resource Promo -->
          <div class="bg-primary p-lg rounded-xl text-on-primary relative overflow-hidden group">
            <div class="relative z-10">
              <h4 class="font-headline-md text-[20px] mb-sm leading-tight">Elevate Your Career</h4>
              <p class="text-label-md mb-lg opacity-90">Get expert advice on resume building and interviews.</p>
              <button class="bg-surface-container-lowest text-primary font-label-md px-md py-sm rounded-xl hover:bg-surface-container transition-colors cursor-pointer">Read Articles</button>
            </div>
            <UIcon name="i-lucide-graduation-cap" class="absolute -right-4 -bottom-4 text-[100px] opacity-10 group-hover:scale-110 transition-transform" />
          </div>
        </aside>

        <!-- Center Job Listings -->
        <section class="md:col-span-6">
          <div class="flex justify-between items-center mb-lg">
            <h2 class="font-headline-md text-headline-md">Latest MSME Jobs</h2>
            <div class="flex items-center gap-sm">
              <span class="text-label-sm text-on-surface-variant">Sort by:</span>
              <select v-model="sortBy" class="bg-transparent border-none text-label-md font-semibold text-primary focus:ring-0 p-0 pr-lg cursor-pointer outline-none">
                <option value="Latest">Latest</option>
                <option value="Highest Salary">Highest Salary</option>
                <option value="Experience (Low to High)">Experience (Low to High)</option>
              </select>
            </div>
          </div>

          <!-- Loader -->
          <div v-if="loading" class="py-12 flex justify-center">
            <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
          </div>

          <!-- Jobs Feed -->
          <div v-else class="space-y-md">
            <div v-if="paginatedJobs.length === 0" class="py-16 text-center space-y-4 bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant">
              <UIcon name="i-lucide-briefcase" class="text-[48px] text-outline/40" />
              <p class="font-body-lg text-on-surface-variant">No active MSME jobs match your filters.</p>
              <button class="text-primary hover:underline font-label-md cursor-pointer" @click="clearFilters">Clear filters</button>
            </div>

            <div v-for="job in paginatedJobs" :key="job.id" class="bg-surface p-lg rounded-2xl border border-surface-container job-card-shadow transition-all hover:border-amber-500 hover:-translate-y-1">
              <div class="flex gap-md">
                <div class="w-16 h-16 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-200">
                  <UIcon name="i-lucide-store" class="text-amber-600 text-[36px]" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <div class="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center overflow-hidden shrink-0 border border-amber-200">
                      <UIcon name="i-lucide-store" class="text-amber-600 text-[24px]" />
                    </div>
                    <div>
                      <h3 class="font-headline-md text-headline-md text-on-surface group-hover:text-amber-600 transition-colors">
                        {{ job.title }}
                      </h3>
                      <div class="flex items-center gap-sm mt-xs flex-wrap">
                        <NuxtLink 
                          v-if="job.employer_id" 
                          :to="`/company-profile?id=${job.employer_id}`" 
                          class="font-label-md text-label-md text-amber-600 font-semibold hover:underline"
                        >
                          {{ job.company_name || 'Verified Employer' }}
                        </NuxtLink>
                      </div>
                    </div>
                    <button class="text-outline hover:text-primary transition-colors cursor-pointer">
                      <UIcon name="i-lucide-bookmark" />
                    </button>
                  </div>
                  <div class="grid grid-cols-2 gap-y-sm mt-md">
                    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
                      <UIcon name="i-lucide-banknote" class="text-[18px]" />
                      {{ formatSalary(job.sal_min, job.sal_max) }}
                    </div>
                    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
                      <UIcon name="i-lucide-map-pin" class="text-[18px]" />
                      {{ job.city ? `${job.city}, ${job.state || ''}` : 'Remote' }}
                    </div>
                    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
                      <UIcon name="i-lucide-briefcase" class="text-[18px]" />
                      {{ formatExperience(job.exp_min, job.exp_max) }}
                    </div>
                    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
                      <UIcon name="i-lucide-clock" class="text-[18px]" />
                      Posted {{ formatDate(job.created_at) }}
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-sm mt-md pt-md border-t border-surface-container">
                    <span v-if="job.sal_min && job.sal_min >= 15" class="bg-primary/10 text-primary px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Premium</span>
                    <span v-if="job.exp_min === 0" class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Entry Level</span>
                    <div class="ml-auto flex gap-sm">
                      <button 
                        class="bg-amber-600 text-white text-label-md px-lg py-1.5 rounded-lg hover:bg-amber-700 transition-all disabled:opacity-60 cursor-pointer"
                        :disabled="job.hasApplied || applyLoading"
                        @click="applyToJob(job.id)"
                      >
                        {{ job.hasApplied ? 'Applied' : 'Apply Now' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center items-center gap-sm pt-xl">
            <button 
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:border-primary disabled:opacity-50 transition-colors cursor-pointer"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <UIcon name="i-lucide-chevron-left" />
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page" 
              :class="[
                'w-10 h-10 flex items-center justify-center rounded-xl font-label-md cursor-pointer transition-all',
                currentPage === page ? 'bg-amber-600 text-white' : 'bg-surface border border-surface-container text-on-surface-variant hover:border-amber-600'
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button 
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:border-primary disabled:opacity-50 transition-colors cursor-pointer"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              <UIcon name="i-lucide-chevron-right" />
            </button>
          </div>
        </section>

        <!-- Right Sidebar -->
        <aside class="md:col-span-3 space-y-lg">
          <!-- Top Hiring Companies -->
          <div class="bg-surface p-lg rounded-xl border border-surface-container-high shadow-sm">
            <h3 class="font-headline-md text-[18px] mb-lg">Top Hiring Companies</h3>
            <div class="space-y-md">
              <div v-for="comp in topCompanies" :key="comp.name" class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors" @click="filters.company = comp.name">
                <div class="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center text-primary font-bold">
                  {{ comp.name.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-label-md">{{ comp.name }}</h4>
                  <p class="text-[12px] text-on-surface-variant">{{ comp.count }} Openings</p>
                </div>
              </div>
              <div v-if="topCompanies.length === 0" class="text-center py-sm text-on-surface-variant/60 font-body-sm">
                No active postings.
              </div>
            </div>
            <button class="w-full mt-lg text-primary font-label-md text-sm border border-primary/20 py-2 rounded-lg hover:bg-primary-fixed transition-colors cursor-pointer" @click="filters.company = ''">Reset Company Filter</button>
          </div>

          <!-- Trending Skills -->
          <div class="bg-surface p-lg rounded-xl border border-surface-container-high shadow-sm">
            <h3 class="font-headline-md text-[18px] mb-lg">Trending Skills</h3>
            <div class="flex flex-wrap gap-xs">
              <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors" @click="filters.search = 'Python'; loadJobs()">Python</span>
              <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors" @click="filters.search = 'React'; loadJobs()">React</span>
              <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors" @click="filters.search = 'AWS'; loadJobs()">AWS</span>
              <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors" @click="filters.search = 'SEO'; loadJobs()">SEO</span>
              <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors" @click="filters.search = 'Figma'; loadJobs()">Figma</span>
              <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors" @click="filters.search = 'Data Analysis'; loadJobs()">Data Analysis</span>
            </div>
          </div>

          <!-- Career Resources Card -->
          <div class="bg-surface-container-lowest p-lg rounded-xl border-2 border-dashed border-primary/20">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-md">
              <UIcon name="i-lucide-sparkles" class="text-primary" />
            </div>
            <h3 class="font-label-md mb-sm">AI Resume Builder</h3>
            <p class="text-on-surface-variant text-label-sm mb-md">Build a recruiter-friendly resume in minutes with our AI tool.</p>
            <a class="text-primary font-bold text-label-md flex items-center gap-xs group" href="/register-choose-account-type">
              Get Started
              <UIcon name="i-lucide-arrow-right" class="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
.job-card-shadow {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
</style>

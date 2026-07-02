<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({
  title: "Government Jobs - Job Nova"
})

interface GovtJob {
  id: number
  issued_date: string
  organisation: string
  post: string
  method: string
  last_date: string
  scraped_at: string
}

// Reactive Search & Filters
const searchQuery = ref('')
const deptQuery = ref('')
const locationQuery = ref('')
const selectedCategory = ref('All') // 'All', 'Central', 'State', 'Bank'
const selectedQualification = ref('Select Level')
const selectedStatus = ref('All') // 'All', 'Open', 'Closing'
const sortBy = ref('Latest') // 'Latest', 'Closing'

const jobs = ref<GovtJob[]>([])
const isLoading = ref(true)

// Fetch jobs from D1 API endpoint
const fetchJobs = async () => {
  isLoading.value = true
  try {
    const response = await $fetch<{ success: boolean; jobs: GovtJob[] }>('/api/jobs/govt-list', {
      query: {
        search: searchQuery.value,
        organisation: deptQuery.value
      }
    })
    
    if (response.success) {
      // Local client-side filters for Category, Qualification, etc.
      let filteredJobs = response.jobs

      // Category filter
      if (selectedCategory.value !== 'All') {
        const cat = selectedCategory.value.toLowerCase()
        filteredJobs = filteredJobs.filter(j => 
          j.organisation.toLowerCase().includes(cat) || 
          j.post.toLowerCase().includes(cat) ||
          (selectedCategory.value === 'Bank' && j.organisation.toLowerCase().match(/(bank|rbi|sbi|ibps)/))
        )
      }

      // Status filter
      if (selectedStatus.value === 'Closing') {
        // Assume closing soon if last_date is within next few days or explicitly checked
        filteredJobs = filteredJobs.filter(j => j.last_date && !j.last_date.includes('Expired'))
      }

      // Sort
      if (sortBy.value === 'Closing') {
        filteredJobs.sort((a, b) => a.last_date.localeCompare(b.last_date))
      } else {
        filteredJobs.sort((a, b) => b.scraped_at.localeCompare(a.scraped_at))
      }

      jobs.value = filteredJobs
    }
  } catch (error) {
    console.error('Failed to fetch govt jobs:', error)
  } finally {
    isLoading.value = false
  }
}

// Popular tag search helper
const searchPopular = (term: string) => {
  searchQuery.value = term
  fetchJobs()
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  deptQuery.value = ''
  locationQuery.value = ''
  selectedCategory.value = 'All'
  selectedQualification.value = 'Select Level'
  selectedStatus.value = 'All'
  sortBy.value = 'Latest'
  fetchJobs()
}

// Determine dynamic icon based on organisation
const getOrgIcon = (org: string): string => {
  const o = org.toLowerCase()
  if (o.includes('railway') || o.includes('rrb')) return 'i-lucide-train'
  if (o.includes('defence') || o.includes('sainik') || o.includes('military') || o.includes('aerospace')) return 'i-lucide-shield'
  if (o.includes('bank') || o.includes('rbi') || o.includes('sbi') || o.includes('cooperative')) return 'i-lucide-landmark'
  if (o.includes('audit') || o.includes('account') || o.includes('finance')) return 'i-lucide-landmark'
  if (o.includes('forest') || o.includes('envir') || o.includes('krishi') || o.includes('kvk')) return 'i-lucide-trees'
  if (o.includes('research') || o.includes('science') || o.includes('nihr') || o.includes('icmr') || o.includes('power')) return 'i-lucide-flask-conical'
  return 'i-lucide-building-2'
}

onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <div>
    <main class="max-w-7xl mx-auto px-lg py-xl">
      <!-- Hero Section -->
      <section class="mb-xl">
        <nav class="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md mb-md">
          <NuxtLink class="hover:text-primary transition-colors" to="/">Home</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
          <span class="text-primary font-bold">Government Jobs</span>
        </nav>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
          <div>
            <h1 class="font-display-lg text-display-lg text-on-surface mb-sm">Government Jobs</h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Find the latest government recruitment opportunities, notifications, admit cards and results across India.</p>
          </div>
          <!-- Stats Bento -->
          <div class="grid grid-cols-2 gap-md">
            <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
              <p class="font-display-lg text-headline-lg text-primary">{{ jobs.length }}+</p>
              <p class="font-label-md text-label-md text-on-surface-variant">Active Jobs</p>
            </div>
            <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
              <p class="font-display-lg text-headline-lg text-secondary">45</p>
              <p class="font-label-md text-label-md text-on-surface-variant">Upcoming Exams</p>
            </div>
            <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
              <p class="font-display-lg text-headline-lg text-tertiary">12</p>
              <p class="font-label-md text-label-md text-on-surface-variant">Results Out</p>
            </div>
            <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
              <p class="font-display-lg text-headline-lg text-primary">89</p>
              <p class="font-label-md text-label-md text-on-surface-variant">Notifications</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Search & Filter Bar -->
      <section class="mb-xl">
        <div class="bg-surface p-md lg:p-lg rounded-2xl shadow-soft border border-outline-variant/20">
          <div class="flex flex-col lg:flex-row gap-md">
            <div class="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-md">
              <UIcon name="i-lucide-search" class="text-outline mr-sm text-lg" />
              <input v-model="searchQuery" class="w-full bg-transparent border-none focus:ring-0 font-body-md py-md outline-none" placeholder="Job Title or Keyword" type="text" @keyup.enter="fetchJobs">
            </div>
            <div class="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-md">
              <UIcon name="i-lucide-building" class="text-outline mr-sm text-lg" />
              <input v-model="deptQuery" class="w-full bg-transparent border-none focus:ring-0 font-body-md py-md outline-none" placeholder="Department (e.g. UPSC)" type="text" @keyup.enter="fetchJobs">
            </div>
            <div class="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-md">
              <UIcon name="i-lucide-map-pin" class="text-outline mr-sm text-lg" />
              <input v-model="locationQuery" class="w-full bg-transparent border-none focus:ring-0 font-body-md py-md outline-none" placeholder="Location" type="text" @keyup.enter="fetchJobs">
            </div>
            <button class="bg-primary text-on-primary px-xl py-md rounded-xl font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all" @click="fetchJobs">Search Jobs</button>
          </div>
          <div class="mt-md flex flex-wrap gap-sm">
            <span class="font-label-md text-label-md text-on-surface-variant self-center mr-sm">Popular:</span>
            <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed hover:text-primary transition-colors" @click="searchPopular('Aerospace')">Aerospace</button>
            <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed hover:text-primary transition-colors" @click="searchPopular('ICMR')">ICMR</button>
            <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed hover:text-primary transition-colors" @click="searchPopular('National')">National</button>
            <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed hover:text-primary transition-colors" @click="searchPopular('Sainik School')">Sainik School</button>
            <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed hover:text-primary transition-colors" @click="searchPopular('Research')">Research</button>
          </div>
        </div>
      </section>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <!-- Left Sidebar: Filters -->
        <aside class="lg:col-span-3 space-y-lg">
          <div class="bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm sticky top-24">
            <div class="flex justify-between items-center mb-md pb-sm border-b border-outline-variant/20">
              <h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Filters</h3>
              <button class="text-primary font-label-sm text-label-sm hover:underline" @click="clearFilters">Clear All</button>
            </div>
            <div class="space-y-md overflow-y-auto max-h-[716px] pr-sm custom-scrollbar">
              <!-- Category -->
              <div>
                <p class="font-label-md text-label-md text-on-surface-variant mb-sm">Category</p>
                <div class="space-y-sm">
                  <label class="flex items-center gap-sm cursor-pointer group">
                    <input v-model="selectedCategory" type="radio" value="All" name="category" class="w-4 h-4 text-primary focus:ring-primary" @change="fetchJobs">
                    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">All Govt Jobs</span>
                  </label>
                  <label class="flex items-center gap-sm cursor-pointer group">
                    <input v-model="selectedCategory" type="radio" value="National" name="category" class="w-4 h-4 text-primary focus:ring-primary" @change="fetchJobs">
                    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">National / Central</span>
                  </label>
                  <label class="flex items-center gap-sm cursor-pointer group">
                    <input v-model="selectedCategory" type="radio" value="Sainik" name="category" class="w-4 h-4 text-primary focus:ring-primary" @change="fetchJobs">
                    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">School / Education</span>
                  </label>
                  <label class="flex items-center gap-sm cursor-pointer group">
                    <input v-model="selectedCategory" type="radio" value="Bank" name="category" class="w-4 h-4 text-primary focus:ring-primary" @change="fetchJobs">
                    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">Bank / Cooperative</span>
                  </label>
                </div>
              </div>
              <!-- Qualification -->
              <div>
                <p class="font-label-md text-label-md text-on-surface-variant mb-sm">Qualification</p>
                <select v-model="selectedQualification" class="w-full bg-surface-container-low border-outline-variant rounded-lg p-sm font-body-md outline-none">
                  <option>Select Level</option>
                  <option>Research/Academic</option>
                  <option>Technical / Operator</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                </select>
              </div>
              <!-- Status -->
              <div>
                <p class="font-label-md text-label-md text-on-surface-variant mb-sm">Status</p>
                <div class="space-y-sm">
                  <label class="flex items-center gap-sm cursor-pointer">
                    <input v-model="selectedStatus" type="radio" value="All" name="status" class="w-4 h-4 text-primary" @change="fetchJobs">
                    <span class="font-body-md text-body-md">All Open Jobs</span>
                  </label>
                  <label class="flex items-center gap-sm cursor-pointer">
                    <input v-model="selectedStatus" type="radio" value="Closing" name="status" class="w-4 h-4 text-primary" @change="fetchJobs">
                    <span class="font-body-md text-body-md">Active Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Center Content: Job Listings -->
        <section class="lg:col-span-6 space-y-md">
          <div class="flex justify-between items-center mb-md">
            <h2 class="font-headline-md text-headline-md text-on-surface">Latest Government Jobs</h2>
            <div class="flex items-center gap-sm">
              <span class="font-label-md text-label-md text-on-surface-variant">Sort by:</span>
              <select v-model="sortBy" class="bg-transparent border-none font-bold text-primary focus:ring-0 cursor-pointer outline-none" @change="fetchJobs">
                <option value="Latest">Latest</option>
                <option value="Closing">Closing Date</option>
              </select>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="isLoading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p class="text-on-surface-variant mt-sm">Fetching live listings...</p>
          </div>

          <!-- Empty state -->
          <div v-else-if="jobs.length === 0" class="text-center py-20 bg-surface rounded-2xl border border-outline-variant/30 shadow-soft">
            <UIcon name="i-lucide-briefcase" class="text-4xl text-outline mb-sm" />
            <h3 class="font-headline-md text-on-surface">No jobs found</h3>
            <p class="text-on-surface-variant">Try refining your search terms or filters.</p>
          </div>

          <!-- Job Card Grid -->
          <div v-else class="grid grid-cols-1 gap-md">
            <div v-for="job in jobs" :key="job.id" class="bg-surface p-md rounded-2xl shadow-soft border border-outline-variant/20 hover:border-primary/40 transition-all group">
              <div class="flex items-start gap-md">
                <div class="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                  <UIcon :name="getOrgIcon(job.organisation)" class="text-primary text-3xl" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <div class="flex items-center gap-sm mb-xs">
                        <h3 class="font-headline-md text-[18px] text-on-surface group-hover:text-primary transition-colors font-bold">{{ job.post }}</h3>
                        <span class="bg-green-100 text-green-700 px-sm py-[2px] rounded-full text-[10px] font-bold uppercase tracking-wider">Scraped</span>
                      </div>
                      <p class="font-body-md text-on-surface-variant font-medium">{{ job.organisation }}</p>
                    </div>
                    <button class="text-outline hover:text-primary transition-colors">
                      <UIcon name="i-lucide-bookmark" class="text-lg" />
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-y-sm mt-md">
                    <div class="flex items-center gap-xs">
                      <UIcon name="i-lucide-settings" class="text-outline text-lg" />
                      <span class="font-label-sm text-on-surface-variant">{{ job.method }}</span>
                    </div>
                    <div class="flex items-center gap-xs">
                      <UIcon name="i-lucide-calendar" class="text-outline text-lg" />
                      <span class="font-label-sm text-on-surface-variant">Last Date: {{ job.last_date }}</span>
                    </div>
                    <div class="flex items-center gap-xs">
                      <UIcon name="i-lucide-clock" class="text-outline text-lg" />
                      <span class="font-label-sm text-on-surface-variant">Issued: {{ job.issued_date }}</span>
                    </div>
                  </div>

                  <div class="mt-md pt-md border-t border-outline-variant/10 flex justify-between items-center">
                    <p class="font-label-sm text-outline">Sync: {{ job.scraped_at.split(' ')[0] }}</p>
                    <div class="flex gap-sm">
                      <button class="px-lg py-sm border border-primary text-primary rounded-lg font-label-sm hover:bg-primary-container/10 transition-colors">Save Notification</button>
                      <a href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All" target="_blank" class="px-lg py-sm bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 active:scale-95 transition-all text-center inline-block">Apply Portal</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Right Sidebar: Widgets -->
        <aside class="lg:col-span-3 space-y-lg">
          <!-- Trending Notifications -->
          <div class="bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm">
            <div class="flex items-center gap-sm mb-md border-b border-outline-variant/20 pb-sm">
              <UIcon name="i-lucide-bell-ring" class="text-primary text-lg" />
              <h3 class="font-headline-md text-[18px] font-bold">Trending Alerts</h3>
            </div>
            <ul class="space-y-md">
              <li class="group cursor-pointer">
                <p class="font-label-md text-primary group-hover:underline">UPSC Prelims 2025 Calendar Released</p>
                <p class="font-label-sm text-outline mt-xs">2 hours ago</p>
              </li>
              <li class="group cursor-pointer">
                <p class="font-label-md text-on-surface group-hover:text-primary">SSC CHSL Tier 1 Cut-off marks declared</p>
                <p class="font-label-sm text-outline mt-xs">5 hours ago</p>
              </li>
              <li class="group cursor-pointer">
                <p class="font-label-md text-on-surface group-hover:text-primary">IBPS Clerk Main Exam admit card link</p>
                <p class="font-label-sm text-outline mt-xs">1 day ago</p>
              </li>
            </ul>
            <button class="w-full mt-md py-sm text-primary font-bold text-label-sm hover:bg-primary-container/10 rounded-lg transition-colors">View All Notifications</button>
          </div>

          <!-- Latest Results -->
          <div class="bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm">
            <div class="flex items-center gap-sm mb-md border-b border-outline-variant/20 pb-sm">
              <UIcon name="i-lucide-award" class="text-tertiary text-lg" />
              <h3 class="font-headline-md text-[18px] font-bold">Latest Results</h3>
            </div>
            <ul class="space-y-sm">
              <li class="p-sm bg-surface-container-low rounded-lg hover:bg-tertiary-fixed transition-colors cursor-pointer flex justify-between items-center">
                <span class="font-body-md text-[14px]">RBI Grade B Results</span>
                <UIcon name="i-lucide-download" class="text-[16px] text-outline" />
              </li>
              <li class="p-sm bg-surface-container-low rounded-lg hover:bg-tertiary-fixed transition-colors cursor-pointer flex justify-between items-center">
                <span class="font-body-md text-[14px]">UPPSC PCS 2023 Finals</span>
                <UIcon name="i-lucide-download" class="text-[16px] text-outline" />
              </li>
              <li class="p-sm bg-surface-container-low rounded-lg hover:bg-tertiary-fixed transition-colors cursor-pointer flex justify-between items-center">
                <span class="font-body-md text-[14px]">CTET Aug 2024 Scores</span>
                <UIcon name="i-lucide-download" class="text-[16px] text-outline" />
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>

  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; }
.shadow-soft { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-outline-variant); border-radius: 10px; }
</style>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'employer'
})

useHead({
  title: "Employer Dashboard - Job Nova"
})

const router = useRouter()
const { user, fetchUser, logout } = useAuth()

// State
const stats = reactive({
  activeJobs: 0,
  totalApplicants: 0,
  shortlisted: 0,
  pending: 0
})
const recentJobs = ref<any[]>([])
const recentApplicants = ref<any[]>([])
const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'employer') {
    router.push('/login')
  } else {
    await loadDashboardData()
  }
})

async function loadDashboardData() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ success: boolean; stats: any; recentJobs: any[]; recentApplicants: any[] }>('/api/employer/dashboard')
    if (res.success) {
      stats.activeJobs = res.stats.activeJobs
      stats.totalApplicants = res.stats.totalApplicants
      stats.shortlisted = res.stats.shortlisted
      stats.pending = res.stats.pending
      recentJobs.value = res.recentJobs
      recentApplicants.value = res.recentApplicants
    }
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to load dashboard metrics.'
  } finally {
    loading.value = false
  }
}

function formatRelativeTime(dateStr: string) {
  if (!dateStr) return '--'
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  } catch {
    return dateStr
  }
}
</script>

<template>
  <main class="flex-grow p-md md:p-xl overflow-y-auto w-full max-w-7xl mx-auto">
          <!-- Welcome Section -->
          <section class="mb-xl">
            <div class="relative bg-primary-container text-on-primary-container rounded-2xl p-lg md:p-xl overflow-hidden ambient-shadow flex flex-col justify-center min-h-[160px]">
              <!-- Decorative background element -->
              <div class="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              <div class="absolute right-1/4 bottom-0 w-48 h-48 bg-tertiary-container/10 rounded-full blur-2xl translate-y-1/2"></div>
              <div class="relative z-10 max-w-2xl">
                <h2 class="font-headline-lg text-headline-lg mb-2 font-bold">Welcome Back</h2>
                <p class="font-body-lg text-body-lg opacity-90">Manage your jobs, review candidates and grow your hiring pipeline.</p>
              </div>
            </div>
          </section>

          <!-- Loader -->
          <div v-if="loading" class="py-12 flex justify-center">
            <UIcon name="i-lucide-loader-2" class="animate-spin text-primary text-[36px]" />
          </div>

          <!-- Error Alert -->
          <div v-else-if="errorMsg" class="p-4 bg-error-container/30 text-error rounded-xl mb-6">
            {{ errorMsg }}
          </div>

          <div v-else class="space-y-xl">
            <!-- Overview Statistics -->
            <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
              <!-- Active Jobs -->
              <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
                <div>
                  <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Active Jobs</p>
                  <h3 class="font-display-lg text-display-lg text-primary font-bold">{{ stats.activeJobs }}</h3>
                </div>
                <div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-briefcase" />
                </div>
              </div>
              <!-- Total Applicants -->
              <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
                <div>
                  <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Applicants</p>
                  <h3 class="font-display-lg text-display-lg text-on-surface font-bold">{{ stats.totalApplicants }}</h3>
                </div>
                <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-users" />
                </div>
              </div>
              <!-- Shortlisted -->
              <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
                <div>
                  <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Shortlisted</p>
                  <h3 class="font-display-lg text-display-lg text-on-surface font-bold">{{ stats.shortlisted }}</h3>
                </div>
                <div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-user-check" />
                </div>
              </div>
              <!-- Pending Reviews -->
              <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
                <div>
                  <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Pending Reviews</p>
                  <h3 class="font-display-lg text-display-lg text-on-surface font-bold">{{ stats.pending }}</h3>
                </div>
                <div class="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-clock" />
                </div>
              </div>
            </section>

            <!-- Bento Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
              <!-- Left Column: Quick Actions -->
              <section class="lg:col-span-1 flex flex-col gap-md">
                <div class="mb-2">
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Quick Actions</h3>
                </div>
                <NuxtLink class="bg-surface-container-lowest p-md rounded-xl ambient-shadow flex items-start gap-md border border-outline-variant/20 group" to="/post-a-new-job-employer-dashboard">
                  <div class="w-10 h-10 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <UIcon name="i-lucide-file-plus" />
                  </div>
                  <div>
                    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Post New Job</h4>
                    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Create a new listing in seconds.</p>
                  </div>
                </NuxtLink>
                <NuxtLink class="bg-surface-container-lowest p-md rounded-xl ambient-shadow flex items-start gap-md border border-outline-variant/20 group" to="/manage-jobs-employer-dashboard">
                  <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <UIcon name="i-lucide-history" />
                  </div>
                  <div>
                    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Manage Jobs</h4>
                    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Edit, close or view active jobs.</p>
                  </div>
                </NuxtLink>
                <NuxtLink class="bg-surface-container-lowest p-md rounded-xl ambient-shadow flex items-start gap-md border border-outline-variant/20 group" to="/applicants-tracking-employer-dashboard">
                  <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <UIcon name="i-lucide-users" />
                  </div>
                  <div>
                    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Review Applicants</h4>
                    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Process pending applications.</p>
                  </div>
                </NuxtLink>
              </section>

              <!-- Right Column: Recently Posted Jobs -->
              <section class="lg:col-span-2 flex flex-col">
                <div class="flex items-center justify-between mb-md">
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Recently Posted Jobs</h3>
                  <NuxtLink class="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1" to="/manage-jobs-employer-dashboard">
                    View All <UIcon name="i-lucide-arrow-right" class="text-sm" />
                  </NuxtLink>
                </div>
                <div class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/20 overflow-hidden flex-grow">
                  <div v-if="recentJobs.length === 0" class="p-8 text-center text-on-surface-variant italic">
                    No jobs posted yet.
                  </div>
                  <div v-else class="divide-y divide-outline-variant/20">
                    <div
                      v-for="job in recentJobs"
                      :key="job.id"
                      class="p-md hover:bg-surface-container-low/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-md group"
                    >
                      <div class="flex items-start gap-md">
                        <div class="w-12 h-12 rounded-lg border border-outline-variant/20 bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
                          <UIcon name="i-lucide-briefcase" />
                        </div>
                        <div>
                          <h4 class="font-label-md text-[16px] text-on-surface font-bold group-hover:text-primary transition-colors">
                            {{ job.title }}
                          </h4>
                          <div class="flex items-center gap-3 mt-1 text-on-surface-variant font-body-md text-[13px]">
                            <span class="flex items-center gap-1">
                              <UIcon name="i-lucide-map-pin" class="text-[16px]" />
                              {{ job.city ? `${job.city}, ${job.state || ''}` : 'Remote' }}
                            </span>
                            <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
                            <span class="flex items-center gap-1">
                              <UIcon name="i-lucide-user" class="text-[16px]" />
                              {{ job.vacancies }} Vacancy
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between sm:justify-end gap-md sm:w-auto w-full pt-2 sm:pt-0">
                        <div class="text-center sm:text-right px-sm">
                          <p class="font-label-sm text-label-sm text-on-surface-variant">Applicants</p>
                          <p class="font-label-md text-[16px] text-on-surface font-bold">{{ job.applicant_count }}</p>
                        </div>
                        <span
                          :class="[
                            'px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wide border',
                            job.status === 'active' ? 'bg-primary-fixed/20 text-on-primary-fixed-variant border-primary-fixed' : 'bg-surface-container-highest text-on-surface-variant border-outline-variant/50'
                          ]"
                        >
                          {{ job.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- Bottom: Recent Applicants -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl">
              <section class="flex flex-col lg:col-span-2">
                <div class="flex items-center justify-between mb-md">
                  <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Recent Applicants</h3>
                  <NuxtLink class="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1" to="/applicants-tracking-employer-dashboard">
                    View All <UIcon name="i-lucide-arrow-right" class="text-sm" />
                  </NuxtLink>
                </div>
                <div class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/20 overflow-hidden">
                  <div v-if="recentApplicants.length === 0" class="p-8 text-center text-on-surface-variant italic">
                    No job applications received yet.
                  </div>
                  <ul v-else class="divide-y divide-outline-variant/20">
                    <li
                      v-for="app in recentApplicants"
                      :key="app.application_id"
                      class="p-md hover:bg-surface-container-low/20 transition-colors flex items-center justify-between gap-sm cursor-pointer group"
                      @click="router.push('/applicants-tracking-employer-dashboard')"
                    >
                      <div class="flex items-center gap-sm">
                        <div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-lg shrink-0">
                          {{ app.candidate_name ? app.candidate_name.charAt(0).toUpperCase() : 'U' }}
                        </div>
                        <div>
                          <h4 class="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors">
                            {{ app.candidate_name || 'Anonymous Candidate' }}
                          </h4>
                          <p class="font-body-md text-[13px] text-on-surface-variant">
                            Applied for <span class="font-medium text-on-surface">{{ app.job_title }}</span>
                          </p>
                        </div>
                      </div>
                      <div class="flex flex-col items-end gap-1 shrink-0">
                        <span class="text-[12px] text-outline">{{ formatRelativeTime(app.applied_at) }}</span>
                        <span
                          :class="[
                            'px-2 py-0.5 rounded font-label-sm text-[10px] uppercase tracking-wide font-bold',
                            app.application_status === 'shortlisted' ? 'bg-secondary-container/20 text-secondary' :
                            app.application_status === 'rejected' ? 'bg-error-container/30 text-error' :
                            app.application_status === 'offered' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
                          ]"
                        >
                          {{ app.application_status === 'offered' ? 'Offered' : app.application_status }}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
  </main>
</template>

<style scoped>
.ambient-shadow {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
</style>

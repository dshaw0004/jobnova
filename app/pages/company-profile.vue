<script setup lang="ts">
definePageMeta({
  layout: 'jobseeker'
})

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Nova — Company Profile"
})

const route = useRoute()
const router = useRouter()
const { user, fetchUser } = useAuth()

const companyId = route.query.id as string
const company = ref<any>(null)
const jobs = ref<any[]>([])
const loading = ref(true)
const errorMsg = ref('')

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value) {
    router.push('/login')
    return
  }

  if (!companyId) {
    errorMsg.value = 'No company ID specified.'
    loading.value = false
    return
  }

  try {
    const res = await $fetch<{ success: boolean; company: any; jobs: any[] }>('/api/employers/profile', {
      query: { id: companyId }
    })
    if (res.success) {
      company.value = res.company
      jobs.value = res.jobs
    } else {
      errorMsg.value = 'Failed to load company profile.'
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to fetch company profile.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="p-gutter md:p-xl max-w-7xl mx-auto w-full">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-md">
      <UIcon name="i-lucide-loader-circle" class="animate-spin text-primary text-[48px]" />
      <p class="text-on-surface-variant font-medium">Loading company profile...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMsg" class="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
      <div class="bg-error/10 p-md rounded-full text-error mb-md">
        <UIcon name="i-lucide-circle-alert" class="text-[36px]" />
      </div>
      <h3 class="font-headline-md text-headline-md font-bold text-on-surface mb-xs">Error Loading Profile</h3>
      <p class="text-on-surface-variant mb-lg">{{ errorMsg }}</p>
      <button @click="router.back()" class="px-6 py-2.5 bg-primary text-on-primary font-label-md rounded-xl hover:scale-98 transition-transform">
        Go Back
      </button>
    </div>

    <!-- Profile Content -->
    <div v-else-if="company" class="space-y-xl">
      <!-- Company Banner / Header -->
      <section class="bg-surface-container-lowest p-lg md:p-xl rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 flex flex-col md:flex-row gap-lg items-center md:items-start text-center md:text-left relative overflow-hidden">
        <!-- Colored top accent -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
        
        <!-- Company Logo -->
        <div class="w-24 h-24 rounded-2xl bg-surface-container-low flex items-center justify-center overflow-hidden border border-outline-variant/30 shrink-0 shadow-sm mt-2">
          <img v-if="company.logo_url" :src="company.logo_url" class="w-full h-full object-cover" :alt="company.company_name" />
          <UIcon v-else name="i-lucide-building-2" class="text-primary text-[48px]" />
        </div>
        
        <div class="flex-1 space-y-sm mt-2">
          <div class="flex flex-col md:flex-row md:items-center gap-sm justify-between">
            <h1 class="font-headline-xl text-headline-xl font-bold text-on-surface">
              {{ company.company_name }}
            </h1>
            <a 
              v-if="company.website" 
              :href="company.website" 
              target="_blank" 
              class="inline-flex items-center gap-xs px-md py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-label-md text-label-md font-bold transition-colors w-fit mx-auto md:mx-0"
            >
              Visit Website <UIcon name="i-lucide-external-link" class="text-sm" />
            </a>
          </div>
          <p class="text-primary font-semibold font-body-md text-body-md">{{ company.industry || 'Technology / Industry' }}</p>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-md text-on-surface-variant text-sm font-medium">
            <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-primary" /> {{ company.location || 'Headquarters location' }}</span>
            <span v-if="company.team_size" class="flex items-center gap-xs"><UIcon name="i-lucide-users" class="text-primary" /> {{ company.team_size }} Employees</span>
            <span v-if="company.founded_in" class="flex items-center gap-xs"><UIcon name="i-lucide-calendar" class="text-primary" /> Founded {{ company.founded_in }}</span>
          </div>
        </div>
      </section>

      <!-- Main Layout: 2 Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <!-- Left Column: About & Active Jobs -->
        <div class="lg:col-span-2 space-y-xl">
          <!-- About Company -->
          <section class="bg-surface-container-lowest p-lg md:p-xl rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 space-y-md">
            <h3 class="font-headline-md text-headline-md font-bold text-on-surface pb-xs border-b border-outline-variant/20">
              About {{ company.company_name }}
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {{ company.about_company || 'No company description provided yet.' }}
            </p>
          </section>

          <!-- Active Jobs list -->
          <section class="space-y-md">
            <h3 class="font-headline-lg text-headline-lg text-on-surface font-bold">
              Active Job Openings ({{ jobs.length }})
            </h3>
            
            <div class="space-y-md">
              <div v-if="jobs.length === 0" class="p-xl text-center text-on-surface-variant font-medium bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant/50">
                <UIcon name="i-lucide-briefcase" class="text-[32px] text-outline mb-sm" />
                <p>No active job postings at the moment.</p>
              </div>

              <NuxtLink
                v-for="job in jobs"
                :key="job.id"
                :to="`/frontend-developer-details?id=${job.id}`"
                class="block bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 hover:border-primary/50 hover:shadow-[0px_8px_30px_rgba(26,115,232,0.06)] transition-all cursor-pointer group"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
                  <div>
                    <h4 class="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors mb-xs">
                      {{ job.title }}
                    </h4>
                    <div class="flex flex-wrap items-center gap-md text-sm text-on-surface-variant font-medium">
                      <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-primary" /> {{ job.city || 'Remote' }}</span>
                      <span class="flex items-center gap-xs"><UIcon name="i-lucide-clock" class="text-primary" /> {{ job.job_type || 'Full Time' }}</span>
                      <span class="flex items-center gap-xs"><UIcon name="i-lucide-wallet" class="text-primary" /> {{ job.sal_min ? `${job.sal_min} - ${job.sal_max} LPA` : 'Best in Industry' }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-sm shrink-0">
                    <span class="text-primary font-label-md text-label-md font-bold group-hover:translate-x-1 transition-transform flex items-center gap-xs">
                      Apply Now <UIcon name="i-lucide-chevron-right" />
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </section>
        </div>

        <!-- Right Column: Sidebar Stats -->
        <div class="space-y-xl">
          <section class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 space-y-md">
            <h4 class="font-headline-md text-headline-md font-bold text-on-surface pb-xs border-b border-outline-variant/20">
              Company Overview
            </h4>
            
            <div class="space-y-md text-sm">
              <div class="flex justify-between items-center py-xs border-b border-outline-variant/20">
                <span class="text-on-surface-variant font-semibold">Industry</span>
                <span class="text-on-surface font-bold text-right">{{ company.industry || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center py-xs border-b border-outline-variant/20">
                <span class="text-on-surface-variant font-semibold">Headquarters</span>
                <span class="text-on-surface font-bold text-right">{{ company.location || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center py-xs border-b border-outline-variant/20">
                <span class="text-on-surface-variant font-semibold">Team Size</span>
                <span class="text-on-surface font-bold text-right">{{ company.team_size || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center py-xs border-b border-outline-variant/20">
                <span class="text-on-surface-variant font-semibold">Founded In</span>
                <span class="text-on-surface font-bold text-right">{{ company.founded_in || 'N/A' }}</span>
              </div>
              <div v-if="company.website" class="flex justify-between items-center py-xs">
                <span class="text-on-surface-variant font-semibold">Website</span>
                <a :href="company.website" target="_blank" class="text-primary font-bold hover:underline truncate max-w-[150px]">
                  {{ company.website.replace('https://', '').replace('http://', '').replace('www.', '') }}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
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

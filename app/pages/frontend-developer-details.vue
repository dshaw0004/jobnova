<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Details | Job Nova"
})

const route = useRoute()
const router = useRouter()
const { user, fetchUser } = useAuth()
const applyLoading = ref(false)

const jobId = computed(() => route.query.id)

const { data: res, refresh } = await useFetch<{ success: boolean; jobs: any[] }>('/api/jobs/public-list')

const job = computed(() => {
  const list = res.value?.jobs || []
  if (jobId.value) {
    return list.find(j => j.id === Number(jobId.value))
  }
  return list[0]
})

const mockJob = {
  id: null,
  title: "Frontend Developer",
  company_name: "NovaStream Technologies",
  employer_id: null,
  industry: "FinTech",
  sal_min: 18,
  sal_max: 28,
  exp_min: 3,
  exp_max: 5,
  city: "Bengaluru",
  state: "Karnataka",
  description: "We are looking for a highly skilled Frontend Developer to join our core engineering team at NovaStream Technologies. You will be responsible for building the next generation of our wealth management platform, focusing on performance, scalability, and an exceptional user experience for millions of users across India.",
  skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
  hasApplied: false
}

const activeJob = computed(() => {
  if (job.value) {
    let parsedSkills = []
    if (Array.isArray(job.value.skills)) {
      parsedSkills = job.value.skills
    } else {
      try {
        parsedSkills = job.value.skills ? JSON.parse(job.value.skills) : []
      } catch {
        parsedSkills = []
      }
    }
    return {
      id: job.value.id,
      title: job.value.title,
      company_name: job.value.company_name || 'Verified Employer',
      employer_id: job.value.employer_id,
      industry: job.value.industry || 'Technology',
      sal_min: job.value.sal_min,
      sal_max: job.value.sal_max,
      exp_min: job.value.exp_min,
      exp_max: job.value.exp_max,
      city: job.value.city || 'Remote',
      state: job.value.state || '',
      description: job.value.description,
      skills: parsedSkills,
      hasApplied: job.value.hasApplied
    }
  }
  return mockJob
})

const relatedJobs = computed(() => {
  const list = res.value?.jobs || []
  const currentId = activeJob.value?.id
  return list.filter(j => j.id !== currentId).slice(0, 4)
})

async function applyToJob() {
  const id = activeJob.value.id
  if (!id) {
    alert('This is a mock listing. Please register and apply to a real job.')
    return
  }

  if (!user.value) {
    router.push(`/login?redirect=/frontend-developer-details?id=${id}`)
    return
  }

  if (user.value.role !== 'jobseeker') {
    alert('Only jobseeker accounts can apply for jobs.')
    return
  }

  applyLoading.value = true
  try {
    const response = await $fetch<{ success: boolean; message: string; aiScreeningRequired?: boolean }>('/api/jobs/apply', {
      method: 'POST',
      body: { jobId: id }
    })
    if (response.success) {
      if (response.aiScreeningRequired) {
        alert("This application requires a brief AI screening interview. Redirecting you to the interview room...")
        router.push(`/job-screening-chat?jobId=${id}`)
      } else {
        alert(response.message)
        await refresh()
      }
    }
  } catch (err: any) {
    alert(err.data?.message || 'Failed to submit application.')
  } finally {
    applyLoading.value = false
  }
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

function formatExperience(min: any, max: any) {
  if (min !== null && max !== null) {
    return `${min}-${max} Yrs`
  }
  if (min !== null) {
    return `${min}+ Yrs`
  }
  return '0-5 Yrs'
}

onMounted(async () => {
  await fetchUser()
})
</script>

<template>
  <div>
    <main class="max-w-7xl mx-auto px-lg py-xl">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-xs text-on-surface-variant mb-xl font-label-md text-label-md">
        <a class="hover:text-primary transition-colors" href="/">Home</a>
        <UIcon name="i-lucide-chevron-right" class="text-sm" />
        <a class="hover:text-primary transition-colors" href="/private-jobs">Private Jobs</a>
        <UIcon name="i-lucide-chevron-right" class="text-sm" />
        <span class="text-primary font-semibold">{{ activeJob.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- Main Content Area -->
        <div class="lg:col-span-8 space-y-xl">
          <!-- Job Hero Section -->
          <section class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow border border-surface-variant/30">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-lg mb-lg">
              <div class="flex gap-lg">
                <div class="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-variant overflow-hidden">
                  <UIcon name="i-lucide-building-2" class="text-primary text-[32px]" />
                </div>
                <div>
                  <div class="flex flex-wrap gap-sm mb-sm">
                    <span class="px-sm py-xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm uppercase">Urgent Hiring</span>
                    <span class="px-sm py-xs rounded-full premium-badge-gradient text-on-primary font-label-sm text-label-sm uppercase">Featured</span>
                  </div>
                  <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">{{ activeJob.title }}</h1>
                  <p class="font-body-lg text-body-lg text-on-surface-variant">
                    <NuxtLink v-if="activeJob.employer_id" :to="`/company-profile?id=${activeJob.employer_id}`" class="hover:underline text-primary font-semibold">
                      {{ activeJob.company_name }}
                    </NuxtLink>
                    <span v-else>{{ activeJob.company_name }}</span>
                    • <span class="text-primary">{{ activeJob.industry }}</span>
                  </p>
                </div>
              </div>
              <div class="flex gap-sm">
                <button 
                  class="px-lg h-11 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
                  :disabled="activeJob.hasApplied || applyLoading"
                  @click="applyToJob"
                >
                  {{ activeJob.hasApplied ? 'Applied' : 'Apply Now' }}
                </button>
                <button class="p-sm border border-outline-variant text-on-surface-variant rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer">
                  <UIcon name="i-lucide-bookmark" />
                </button>
              </div>
            </div>
            <div class="flex flex-wrap gap-md">
              <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
                <UIcon name="i-lucide-banknote" class="text-primary text-[20px]" />
                <span class="font-label-md text-label-md">{{ formatSalary(activeJob.sal_min, activeJob.sal_max) }}</span>
              </div>
              <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
                <UIcon name="i-lucide-history" class="text-primary text-[20px]" />
                <span class="font-label-md text-label-md">{{ formatExperience(activeJob.exp_min, activeJob.exp_max) }}</span>
              </div>
              <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
                <UIcon name="i-lucide-map-pin" class="text-primary text-[20px]" />
                <span class="font-label-md text-label-md">{{ activeJob.city ? `${activeJob.city}${activeJob.state ? ', ' + activeJob.state : ''}` : 'Remote' }}</span>
              </div>
            </div>
          </section>

          <!-- Job Overview Grid -->
          <section class="grid grid-cols-2 md:grid-cols-4 gap-lg p-lg bg-surface-container-low rounded-xl">
            <div class="space-y-xs">
              <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Employment Type</span>
              <p class="font-body-md text-body-md font-semibold">Full-time</p>
            </div>
            <div class="space-y-xs">
              <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Department</span>
              <p class="font-body-md text-body-md font-semibold">Engineering</p>
            </div>
            <div class="space-y-xs">
              <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Team Size</span>
              <p class="font-body-md text-body-md font-semibold">15+ members</p>
            </div>
            <div class="space-y-xs">
              <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Joining</span>
              <p class="font-body-md text-body-md font-semibold">Immediate</p>
            </div>
          </section>

          <!-- Job Description -->
          <article class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow space-y-xl">
            <div>
              <h2 class="font-headline-md text-headline-md text-on-surface mb-md">About the Role</h2>
              <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                {{ activeJob.description }}
              </p>
            </div>
            <div>
              <h2 class="font-headline-md text-headline-md text-on-surface mb-md">Responsibilities</h2>
              <ul class="space-y-sm">
                <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
                  <UIcon name="i-lucide-check-circle" class="text-primary mt-1" />
                  Develop high-quality, reusable frontend features and state interfaces.
                </li>
                <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
                  <UIcon name="i-lucide-check-circle" class="text-primary mt-1" />
                  Optimize application load performance and accessibility standards.
                </li>
                <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
                  <UIcon name="i-lucide-check-circle" class="text-primary mt-1" />
                  Collaborate closely with product designers and backend API engineers.
                </li>
              </ul>
            </div>
          </article>

          <!-- Required Skills -->
          <section class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow">
            <h2 class="font-headline-md text-headline-md text-on-surface mb-lg">Required Skills</h2>
            <div class="flex flex-wrap gap-md">
              <span v-for="skill in activeJob.skills" :key="skill" class="px-lg py-sm bg-primary/10 text-primary rounded-xl font-label-md text-label-md">
                {{ skill }}
              </span>
              <span v-if="!activeJob.skills || activeJob.skills.length === 0" class="text-on-surface-variant/60 font-body-sm">
                No specific skills listed.
              </span>
            </div>
          </section>
        </div>

        <!-- Sticky Sidebar -->
        <aside class="lg:col-span-4 space-y-lg">
          <div class="sticky top-24 space-y-lg">
            <!-- CTA Card -->
            <div class="bg-surface-container-lowest rounded-xl p-lg job-card-shadow border border-surface-variant/30">
              <div class="flex items-center gap-md mb-lg p-md bg-error-container/20 rounded-xl border border-error/10">
                <UIcon name="i-lucide-timer" class="text-error" />
                <div class="flex flex-col">
                  <span class="font-label-sm text-label-sm text-error uppercase">Apply Before</span>
                  <span class="font-body-md text-body-md font-bold text-on-surface">15 Days Remaining</span>
                </div>
              </div>
              <div class="space-y-md">
                <button 
                  class="w-full h-[56px] bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
                  :disabled="activeJob.hasApplied || applyLoading"
                  @click="applyToJob"
                >
                  {{ activeJob.hasApplied ? 'Applied' : 'Apply for this Job' }}
                </button>
                <button class="w-full h-[44px] border border-outline-variant text-on-surface-variant rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-md cursor-pointer">
                  <UIcon name="i-lucide-share-2" />
                  Share Job Post
                </button>
              </div>
            </div>

            <!-- Benefits & Perks -->
            <div class="bg-surface-container-lowest rounded-xl p-lg job-card-shadow border border-surface-variant/30">
              <h3 class="font-headline-md text-[18px] text-on-surface mb-lg">Benefits &amp; Perks</h3>
              <div class="grid grid-cols-1 gap-md">
                <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
                  <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                    <UIcon name="i-lucide-activity" />
                  </div>
                  <span class="font-body-md text-body-md text-on-surface-variant">Health Insurance</span>
                </div>
                <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
                  <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                    <UIcon name="i-lucide-clock" />
                  </div>
                  <span class="font-body-md text-body-md text-on-surface-variant">Flexible Hours</span>
                </div>
                <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
                  <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                    <UIcon name="i-lucide-graduation-cap" />
                  </div>
                  <span class="font-body-md text-body-md text-on-surface-variant">Learning Budget</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Related Jobs Section -->
      <section class="mt-xl">
        <div class="flex items-center justify-between mb-xl">
          <h2 class="font-headline-lg text-headline-lg text-on-surface">Related Jobs</h2>
          <a class="text-primary font-label-md text-label-md flex items-center gap-xs hover:underline" href="/job-search">
            View All Jobs
            <UIcon name="i-lucide-arrow-right" />
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          <div v-if="relatedJobs.length === 0" class="col-span-full py-8 text-center text-on-surface-variant/60 font-body-sm bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
            No other related jobs at the moment.
          </div>
          <NuxtLink
            v-for="rj in relatedJobs"
            :key="rj.id"
            :to="`/frontend-developer-details?id=${rj.id}`"
            class="p-lg bg-surface-container-lowest rounded-xl job-card-shadow border border-surface-variant/30 hover:border-primary/50 transition-colors block cursor-pointer"
          >
            <div class="flex items-center gap-md mb-md">
              <div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
                <UIcon name="i-lucide-building-2" class="text-primary text-xl" />
              </div>
              <div>
                <h4 class="font-body-md text-body-md font-bold truncate">{{ rj.title }}</h4>
                <p class="font-label-sm text-label-sm text-on-surface-variant">{{ rj.company_name || 'Verified Employer' }}</p>
              </div>
            </div>
            <div class="space-y-md">
              <div class="flex items-center gap-xs text-on-surface-variant">
                <UIcon name="i-lucide-map-pin" class="text-sm" />
                <span class="font-label-sm text-label-sm">{{ rj.city || 'Remote' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md font-bold text-primary">{{ formatSalary(rj.sal_min, rj.sal_max) }}</span>
                <span class="px-sm py-xs bg-surface-container-low rounded-full font-label-sm text-label-sm text-primary font-bold">Apply</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.job-card-shadow {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
.premium-badge-gradient {
  background: linear-gradient(135deg, #2b5bb5 0%, var(--color-primary) 100%);
}
</style>

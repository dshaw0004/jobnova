<script setup lang="ts">
definePageMeta({
  layout: 'jobseeker'
})

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Nova — Jobseeker Dashboard",
})

const router = useRouter()
const { user, profile, fetchUser } = useAuth()

const summary = ref({
  total: 0,
  applied: 0,
  shortlisted: 0,
  rejected: 0,
  offered: 0
})

const recommendations = ref<any[]>([])

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value) {
    router.push('/login')
    return
  }

  // Load application counts
  try {
    const res = await $fetch<{ success: boolean; summary: any }>('/api/jobs/applications')
    if (res.success && res.summary) {
      summary.value = res.summary
    }
  } catch (err) {
    console.error('Failed to load application stats:', err)
  }

  // Load recommendations
  try {
    const res = await $fetch<{ success: boolean; recommendations: any[] }>('/api/jobs/recommendations')
    if (res.success && res.recommendations) {
      recommendations.value = res.recommendations
    }
  } catch (err) {
    console.error('Failed to load recommendations:', err)
  }
})
</script>

<template>
  <main class="p-gutter md:p-xl max-w-7xl mx-auto w-full flex flex-col gap-xl">
      <!-- Top Section: Welcome & Quick Actions -->
      <section class="flex flex-col md:flex-row gap-lg items-start md:items-center justify-between bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
        <div class="flex-1 flex flex-col sm:flex-row items-center gap-md text-center sm:text-left">
          <div class="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 shadow-sm relative">
            <img v-if="profile?.photo_url" :src="profile.photo_url" class="w-full h-full object-cover" alt="Profile" />
            <span v-else class="text-primary text-[24px] font-bold">
              {{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}
            </span>
          </div>
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-sm flex items-center gap-xs">
              Welcome Back, <span class="text-primary font-bold">{{ profile?.full_name ? profile.full_name.split(' ')[0] : 'Jobseeker' }}</span>!
            </h1>
            <p class="font-body-lg text-body-lg text-on-surface-variant">
              Manage your profile, track applications, and view AI recommendations.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap gap-md shrink-0">
          <NuxtLink
            to="/my-profile-dashboard"
            class="h-11 px-6 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:scale-98 transition-transform shadow-md flex items-center gap-2"
          >
            <UIcon name="i-lucide-user" class="text-[18px]" /> View Profile
          </NuxtLink>
          <NuxtLink
            to="/register-job-seeker-chat"
            class="h-11 px-6 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-xl hover:scale-98 transition-transform flex items-center gap-2 border border-outline-variant/30"
          >
            <UIcon name="i-lucide-bot" class="text-[18px]" /> Talk to Aria (AI)
          </NuxtLink>
          <NuxtLink
            to="/job-agent"
            class="h-11 px-6 bg-tertiary-container text-on-tertiary-container font-label-md text-label-md rounded-xl hover:scale-98 transition-transform flex items-center gap-2 border border-outline-variant/30"
          >
            <UIcon name="i-lucide-briefcase" class="text-[18px]" /> Job AI Agent
          </NuxtLink>
        </div>
      </section>

      <!-- Profile Completeness Warning Banner -->
      <section v-if="profile && profile.completeness_score < 80" class="bg-amber-50 border border-amber-200 p-lg rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md">
        <div class="flex items-start gap-md">
          <UIcon name="i-lucide-circle-alert" class="text-amber-600 text-[32px] shrink-0 mt-0.5" />
          <div>
            <h3 class="font-headline-md text-headline-md text-amber-900 font-semibold mb-xs">
              Complete your profile ({{ profile.completeness_score }}%)
            </h3>
            <p class="text-sm text-amber-800">
              Profiles with at least 80% completeness get up to 5x more visibility from premium employers. Complete or redo your AI Interview to get started.
            </p>
          </div>
        </div>
        <NuxtLink
          to="/register-job-seeker-chat"
          class="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-label-md text-label-md rounded-xl shadow-sm transition-colors shrink-0 flex items-center gap-1"
        >
          <span>Complete AI Interview</span>
          <UIcon name="i-lucide-arrow-right" />
        </NuxtLink>
      </section>

      <!-- Analytics Row -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-md">
        <!-- Stat Card 1 -->
        <div class="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col justify-center border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
            <UIcon name="i-lucide-file-text" class="text-primary text-[20px]" />
            <span class="font-label-md text-label-md uppercase tracking-wider text-[10px] font-semibold">Total Applications</span>
          </div>
          <div class="font-display-lg text-display-lg text-primary">{{ summary.total }}</div>
        </div>
        <!-- Stat Card 2 -->
        <div class="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col justify-center border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
            <UIcon name="i-lucide-loader-circle" class="text-tertiary text-[20px]" />
            <span class="font-label-md text-label-md uppercase tracking-wider text-[10px] font-semibold">Under Review</span>
          </div>
          <div class="font-display-lg text-display-lg text-tertiary">{{ summary.applied }}</div>
        </div>
        <!-- Stat Card 3 -->
        <div class="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col justify-center border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
            <UIcon name="i-lucide-thumbs-up" class="text-secondary text-[20px]" />
            <span class="font-label-md text-label-md uppercase tracking-wider text-[10px] font-semibold">Shortlisted</span>
          </div>
          <div class="font-display-lg text-display-lg text-secondary">{{ summary.shortlisted }}</div>
        </div>
        <!-- Stat Card 4 -->
        <div class="bg-surface-container-lowest p-md rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col justify-center border border-outline-variant/20 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
            <UIcon name="i-lucide-award" class="text-primary text-[20px]" />
            <span class="font-label-md text-label-md uppercase tracking-wider text-[10px] font-semibold">Selected</span>
          </div>
          <div class="font-display-lg text-display-lg text-primary">{{ summary.offered }}</div>
        </div>
      </section>

      <!-- Profile Overview Section -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        <!-- Self Introduction / Bio -->
        <div class="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] space-y-md">
          <div class="flex justify-between items-center border-b border-outline-variant/30 pb-sm">
            <h3 class="font-headline-md text-headline-md font-bold text-on-surface">About Yourself</h3>
            <NuxtLink to="/my-profile-dashboard" class="text-primary hover:underline text-sm font-semibold">Edit</NuxtLink>
          </div>
          <p class="font-body-md text-body-md text-on-surface whitespace-pre-wrap leading-relaxed">
            {{ profile?.about_self || "You haven't introduced yourself yet. Use the profile page or complete the AI interview to build a robust bio." }}
          </p>

          <div v-if="profile?.academic_info?.length" class="space-y-sm pt-sm">
            <h4 class="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-xs">
              <UIcon name="i-lucide-graduation-cap" class="text-primary" />
              Latest Education
            </h4>
            <div class="bg-surface-container-low p-md rounded-lg border border-outline-variant/30">
              <p class="font-semibold text-on-surface">{{ profile?.academic_info?.[0]?.degree }}</p>
              <p class="text-sm text-on-surface-variant">{{ profile?.academic_info?.[0]?.institution }} · {{ profile?.academic_info?.[0]?.year || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Career Target & Interview Context -->
        <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] space-y-md">
          <div class="border-b border-outline-variant/30 pb-sm">
            <h3 class="font-headline-md text-headline-md font-bold text-on-surface">Target Sector</h3>
          </div>
          <div>
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">Target Sector</p>
            <p class="font-body-md text-body-md text-on-surface mt-xs font-semibold">{{ profile?.sector || 'Not chosen yet' }}</p>
          </div>
          <div v-if="profile?.sector_reason">
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">Sector Motivation</p>
            <p class="font-body-md text-body-md text-on-surface-variant mt-xs line-clamp-4">{{ profile.sector_reason }}</p>
          </div>
          <div v-if="profile?.team_scenario_answer">
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">Collaboration Approach</p>
            <p class="font-body-md text-body-md text-on-surface-variant mt-xs line-clamp-4">{{ profile.team_scenario_answer }}</p>
          </div>
        </div>
      </section>

      <!-- Recommended Jobs Section -->
      <section class="space-y-md">
        <div class="flex justify-between items-center">
          <h2 class="font-headline-lg text-headline-lg text-on-surface">Recommended Jobs For You</h2>
          <NuxtLink to="/job-search" class="text-primary hover:underline text-sm font-semibold flex items-center gap-xs">
            Search All Jobs <UIcon name="i-lucide-arrow-right" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div v-if="recommendations.length === 0" class="col-span-full py-8 text-center text-on-surface-variant/60 font-body-sm bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
            No recommendations at the moment. Complete your profile & skills to see matches!
          </div>

          <NuxtLink
            v-for="rj in recommendations"
            :key="rj.id"
            :to="`/frontend-developer-details?id=${rj.id}`"
            class="p-lg bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 hover:border-primary/50 transition-colors flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div class="flex items-center gap-md mb-md">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center overflow-hidden border border-outline-variant/30">
                  <img v-if="rj.logo_url" :src="rj.logo_url" class="w-full h-full object-cover" />
                  <UIcon v-else name="i-lucide-building-2" class="text-primary text-2xl" />
                </div>
                <div class="min-w-0">
                  <h4 class="font-body-md text-body-md font-bold truncate max-w-[180px]">{{ rj.title }}</h4>
                  <p class="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[180px]">{{ rj.company_name }}</p>
                </div>
              </div>

              <div class="flex items-center gap-xs text-on-surface-variant mb-md">
                <UIcon name="i-lucide-map-pin" class="text-sm" />
                <span class="font-label-sm text-label-sm">{{ rj.city || 'Remote' }}</span>
                <span class="text-xs text-outline">•</span>
                <span class="font-label-sm text-label-sm">{{ rj.industry || 'Technology' }}</span>
              </div>
            </div>

            <div class="flex items-center justify-between mt-sm pt-sm border-t border-outline-variant/20">
              <span class="px-2 py-1 bg-primary/10 text-primary rounded font-label-sm text-[11px] font-bold">
                {{ rj.matchScore }}% Match
              </span>
              <span class="text-primary font-label-md text-label-md font-bold hover:underline">Apply Now</span>
            </div>
          </NuxtLink>
        </div>
      </section>
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

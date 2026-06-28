<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Nova — My Profile"
})

const router = useRouter()
const { user, profile, loading, error, logout, updateProfile, fetchUser } = useAuth()

// Local copy of profile fields for editing
const form = ref({
  full_name: '',
  phone: '',
  location: '',
  about_self: '',
  sector: '',
  sector_reason: '',
  team_scenario_answer: '',
  academic_info: [] as any[],
  professional_info: [] as any[]
})

// Sync global profile state into local form state
function syncProfile() {
  if (profile.value) {
    form.value = {
      full_name: profile.value.full_name || '',
      phone: profile.value.phone || '',
      location: profile.value.location || '',
      about_self: profile.value.about_self || '',
      sector: profile.value.sector || '',
      sector_reason: profile.value.sector_reason || '',
      team_scenario_answer: profile.value.team_scenario_answer || '',
      academic_info: profile.value.academic_info ? JSON.parse(JSON.stringify(profile.value.academic_info)) : [],
      professional_info: profile.value.professional_info ? JSON.parse(JSON.stringify(profile.value.professional_info)) : []
    }
  }
}

watch(profile, () => {
  syncProfile()
}, { immediate: true })

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value) {
    router.push('/login')
  } else {
    syncProfile()
  }
})

const saveSuccess = ref(false)
const saveError = ref('')

async function handleSaveAll() {
  saveSuccess.value = false
  saveError.value = ''
  try {
    await updateProfile({
      full_name: form.value.full_name,
      phone: form.value.phone,
      location: form.value.location,
      about_self: form.value.about_self,
      academic_info: form.value.academic_info,
      professional_info: form.value.professional_info,
      sector: form.value.sector,
      sector_reason: form.value.sector_reason,
      team_scenario_answer: form.value.team_scenario_answer
    })
    saveSuccess.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      saveSuccess.value = false
    }, 4000)
  } catch (err: any) {
    saveError.value = err.message || 'Failed to save changes'
  }
}

// Helpers for adding/editing education & experience
function addAcademic() {
  form.value.academic_info.push({
    degree: '',
    institution: '',
    year: '',
    grade: ''
  })
}

function removeAcademic(index: number) {
  form.value.academic_info.splice(index, 1)
}

function addProfessional() {
  form.value.professional_info.push({
    company: '',
    role: '',
    duration: '',
    description: ''
  })
}

function removeProfessional(index: number) {
  form.value.professional_info.splice(index, 1)
}
</script>

<template>
  <div class="min-h-screen bg-surface">
    <!-- SideNavBar -->
    <nav class="bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)] h-screen w-72 fixed left-0 top-0 flex flex-col py-md px-md border-r border-outline-variant/30 z-50 hidden md:flex">
      <div class="mb-xl flex items-center gap-md px-md py-sm">
        <div class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-headline-md font-headline-md">
          JN
        </div>
        <div>
          <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
          <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Premium Candidate</p>
        </div>
      </div>
      <ul class="flex-1 space-y-2">
        <li>
          <NuxtLink class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200" to="/jobseeker-dashboard">
            <UIcon name="i-lucide-layout-dashboard" class="text-[18px]" />
            <span class="font-label-md text-label-md">Dashboard</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="flex items-center gap-md px-md py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low" to="/my-profile-dashboard">
            <UIcon name="i-lucide-user" class="text-[18px]" />
            <span class="font-label-md text-label-md">My Profile</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200" to="/applied-jobs-dashboard">
            <UIcon name="i-lucide-history" class="text-[18px]" />
            <span class="font-label-md text-label-md">Applied Jobs</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200" to="/selected-jobs-dashboard">
            <UIcon name="i-lucide-check-circle" class="text-[18px]" />
            <span class="font-label-md text-label-md">Selected Jobs</span>
          </NuxtLink>
        </li>
      </ul>
      <div class="mt-auto pt-xl border-t border-outline-variant/30">
        <button
          class="w-full flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-error-container/20 hover:text-error transition-colors duration-200"
          @click="logout"
        >
          <UIcon name="i-lucide-log-out" class="text-[18px]" />
          <span class="font-label-md text-label-md">Logout</span>
        </button>
      </div>
    </nav>

    <!-- Main Content Wrapper -->
    <div class="flex-1 ml-0 md:ml-72 flex flex-col min-h-screen">
      <!-- TopAppBar -->
      <header class="bg-surface/80 backdrop-blur-md fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 flex justify-between items-center h-16 px-gutter ml-auto border-b border-outline-variant/30">
        <h2 class="font-headline-md text-headline-md font-bold text-primary">My Profile</h2>
        <div class="flex items-center gap-md">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[14px]">
            {{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant hidden sm:inline-block">
            {{ profile?.full_name || user?.email }}
          </span>
        </div>
      </header>

      <!-- Scrollable Canvas -->
      <main class="flex-1 pt-24 pb-xl px-gutter md:px-xl max-w-7xl mx-auto w-full">
        <!-- Status alerts -->
        <div v-if="saveSuccess" class="mb-md p-md bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-sm">
          <UIcon name="i-lucide-check-circle" class="text-green-600 text-[20px]" />
          <div>
            <p class="font-semibold">Profile saved successfully!</p>
            <p class="text-sm">Your profile completeness score is now {{ profile?.completeness_score }}%.</p>
          </div>
        </div>
        <div v-if="saveError" class="mb-md p-md bg-error/10 border border-error/20 text-error rounded-xl flex items-center gap-sm">
          <UIcon name="i-lucide-circle-alert" class="text-error text-[20px]" />
          <p class="font-semibold">{{ saveError }}</p>
        </div>

        <div class="mb-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-sm">
          <div>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Manage your personal details, academic history, work experience, and target career fields.
            </p>
          </div>
          <div class="flex items-center gap-sm bg-primary/10 border border-primary/20 rounded-full px-md py-xs w-fit">
            <span class="font-label-sm text-label-sm text-primary font-semibold">Completeness Score: {{ profile?.completeness_score }}%</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
          <!-- Left Column (Profile Summary & Resume) -->
          <div class="lg:col-span-1 space-y-xl">
            <!-- Profile Summary Card -->
            <div class="bg-surface-container-lowest rounded-xl p-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 flex flex-col items-center text-center">
              <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[36px] font-bold mb-md border border-primary/20">
                {{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}
              </div>
              <h3 class="font-headline-lg text-headline-lg font-bold text-on-surface mb-xs">
                {{ profile?.full_name || 'Anonymous User' }}
              </h3>
              <p class="text-sm text-on-surface-variant mb-lg font-medium">
                {{ profile?.sector || 'Sector not selected' }}
              </p>
              <div class="flex flex-col gap-2 text-on-surface-variant font-label-md text-label-md mb-lg text-left w-full border-t border-outline-variant/30 pt-md">
                <span class="flex items-center gap-sm"><UIcon name="i-lucide-mail" class="text-[18px] text-primary" /> {{ user?.email }}</span>
                <span class="flex items-center gap-sm"><UIcon name="i-lucide-phone" class="text-[18px] text-primary" /> {{ profile?.phone || 'Not provided' }}</span>
                <span class="flex items-center gap-sm"><UIcon name="i-lucide-map-pin" class="text-[18px] text-primary" /> {{ profile?.location || 'Not provided' }}</span>
              </div>
            </div>

            <!-- Resume Section -->
            <div class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
              <h4 class="font-headline-md text-headline-md font-semibold text-on-surface mb-md flex items-center gap-sm">
                <UIcon name="i-lucide-file-text" class="text-primary" />
                Resume
              </h4>
              <div class="bg-surface-container-low rounded-lg p-md mb-md border border-outline-variant/30 flex items-center gap-md">
                <div class="bg-primary/10 p-2 rounded text-primary flex items-center justify-center">
                  <UIcon name="i-lucide-file-text" class="text-[24px]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Status: Ready</p>
                  <p class="font-label-md text-label-md text-on-surface truncate font-semibold">Auto-Generated Resume</p>
                </div>
              </div>
              <p class="text-sm text-on-surface-variant mb-md">
                Your resume will be generated dynamically using the profile information below.
              </p>
            </div>
          </div>

          <!-- Right Column (Forms & Details) -->
          <div class="lg:col-span-2 space-y-xl">
            <!-- Personal Information -->
            <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
              <h4 class="font-headline-md text-headline-md font-semibold text-on-surface mb-lg pb-sm border-b border-outline-variant/30">Personal Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-md">
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Full Name</label>
                  <input
                    v-model="form.full_name"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    type="text"
                    placeholder="Enter your full name"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Email Address</label>
                  <input
                    :value="user?.email"
                    disabled
                    class="w-full rounded-lg bg-surface-container-low border border-transparent px-4 py-3 font-body-md text-body-md text-on-surface opacity-60 cursor-not-allowed"
                    type="email"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Phone Number</label>
                  <input
                    v-model="form.phone"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Location / City</label>
                  <input
                    v-model="form.location"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    type="text"
                    placeholder="e.g. Bangalore, India"
                  >
                </div>
                <div class="flex flex-col gap-1 md:col-span-2">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">About Yourself</label>
                  <textarea
                    v-model="form.about_self"
                    rows="3"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    placeholder="Introduce yourself, your key strengths, and achievements."
                  ></textarea>
                </div>
              </div>
            </section>

            <!-- Education -->
            <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
              <div class="flex justify-between items-center mb-lg pb-sm border-b border-outline-variant/30">
                <h4 class="font-headline-md text-headline-md font-semibold text-on-surface">Education</h4>
                <button
                  type="button"
                  class="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs"
                  @click="addAcademic"
                >
                  <UIcon name="i-lucide-plus" class="text-[18px]" /> Add Education
                </button>
              </div>
              <div class="space-y-md">
                <div v-if="form.academic_info.length === 0" class="text-center py-md text-on-surface-variant text-sm">
                  No education records added yet. Click "Add Education" to start.
                </div>
                <div v-for="(edu, idx) in form.academic_info" :key="idx" class="bg-surface-container-low rounded-lg p-md border border-outline-variant/30 space-y-sm">
                  <div class="flex justify-between items-center">
                    <span class="font-label-sm text-label-sm text-secondary uppercase font-semibold">Record #{{ idx + 1 }}</span>
                    <button type="button" class="text-error hover:underline text-label-sm flex items-center gap-xs" @click="removeAcademic(idx)">
                      <UIcon name="i-lucide-trash-2" /> Remove
                    </button>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div class="flex flex-col gap-1">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Degree / Certificate</label>
                      <input v-model="edu.degree" placeholder="e.g. Master of Computer Applications" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                    <div class="flex flex-col gap-1">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Institution / University</label>
                      <input v-model="edu.institution" placeholder="e.g. NIT Bangalore" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                    <div class="flex flex-col gap-1">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Graduation Year</label>
                      <input v-model="edu.year" placeholder="e.g. 2020" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                    <div class="flex flex-col gap-1">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Grade / CGPA (Optional)</label>
                      <input v-model="edu.grade" placeholder="e.g. 8.5 CGPA" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Work Experience -->
            <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
              <div class="flex justify-between items-center mb-lg pb-sm border-b border-outline-variant/30">
                <h4 class="font-headline-md text-headline-md font-semibold text-on-surface">Work Experience / Projects</h4>
                <button
                  type="button"
                  class="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs"
                  @click="addProfessional"
                >
                  <UIcon name="i-lucide-plus" class="text-[18px]" /> Add Experience
                </button>
              </div>
              <div class="space-y-md">
                <div v-if="form.professional_info.length === 0" class="text-center py-md text-on-surface-variant text-sm">
                  No work experience or projects added. Click "Add Experience" to add.
                </div>
                <div v-for="(exp, idx) in form.professional_info" :key="idx" class="bg-surface-container-low rounded-lg p-md border border-outline-variant/30 space-y-sm">
                  <div class="flex justify-between items-center">
                    <span class="font-label-sm text-label-sm text-primary uppercase font-semibold">Experience / Project #{{ idx + 1 }}</span>
                    <button type="button" class="text-error hover:underline text-label-sm flex items-center gap-xs" @click="removeProfessional(idx)">
                      <UIcon name="i-lucide-trash-2" /> Remove
                    </button>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div class="flex flex-col gap-1">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Company Name / Organization</label>
                      <input v-model="exp.company" placeholder="e.g. TechNova Solutions" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                    <div class="flex flex-col gap-1">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Role / Job Title</label>
                      <input v-model="exp.role" placeholder="e.g. Senior Frontend Developer" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                    <div class="flex flex-col gap-1 md:col-span-2">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Duration / Date Range</label>
                      <input v-model="exp.duration" placeholder="e.g. 2021 - Present" class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" />
                    </div>
                    <div class="flex flex-col gap-1 md:col-span-2">
                      <label class="text-[11px] text-on-surface-variant uppercase font-semibold">Description / Key Accomplishments</label>
                      <textarea v-model="exp.description" placeholder="Describe your responsibilities, technologies used, and achievements." class="w-full rounded-lg bg-surface border border-outline-variant/30 px-3 py-2 text-body-md text-on-surface" rows="2"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Career Sectors & AI Interview Results -->
            <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
              <h4 class="font-headline-md text-headline-md font-semibold text-on-surface mb-lg pb-sm border-b border-outline-variant/30">Target Sector & AI Interview Responses</h4>
              <div class="space-y-md">
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Target Sector</label>
                  <input
                    v-model="form.sector"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    type="text"
                    placeholder="e.g. Software Engineering"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Motivation for Target Sector</label>
                  <textarea
                    v-model="form.sector_reason"
                    rows="3"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    placeholder="Explain why you selected this sector to build your career."
                  ></textarea>
                </div>
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Team Collaboration Scenario Response</label>
                  <textarea
                    v-model="form.team_scenario_answer"
                    rows="4"
                    class="w-full rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors"
                    placeholder="Your answer to how you collaborate in difficult team environments."
                  ></textarea>
                </div>
              </div>
            </section>

            <!-- Save Action -->
            <div class="flex justify-end pt-md">
              <button
                class="bg-primary text-on-primary hover:bg-primary-container font-headline-sm text-headline-sm font-semibold py-3 px-8 rounded-lg hover:scale-[0.98] active:scale-[0.96] transition-all shadow-md flex items-center gap-sm disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="loading"
                @click="handleSaveAll"
              >
                <UIcon v-if="loading" name="i-lucide-loader-circle" class="animate-spin text-[18px]" />
                <UIcon v-else name="i-lucide-save" class="text-[18px]" />
                <span>{{ loading ? 'Saving Changes...' : 'Save All Changes' }}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: var(--color-surface);
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Hanken Grotesk", sans-serif;
}
</style>

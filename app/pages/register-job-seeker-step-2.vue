<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: "Professional Information - Step 2 | Job Nova"
})

import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { user, fetchUser } = useAuth()
const loading = ref(false)
const fetching = ref(true)
const errorMsg = ref('')

// Core Form State
const form = reactive({
  full_name: '',
  phone: '',
  location: '',
  about_self: '',
  skillsInput: '',
  sector: '',
  sector_reason: '',
  academic_info: [] as Array<{ degree: string; institution: string; year: string; grade: string }>,
  professional_info: [] as Array<{ company: string; role: string; duration: string; description: string }>
})

// Temp inputs for adding education/experience
const tempEdu = reactive({ degree: '', institution: '', year: '', grade: '' })
const tempWork = reactive({ company: '', role: '', duration: '', description: '' })

// Load profile if exists
onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value) {
    router.push('/login')
    return
  } else if (user.value.role !== 'jobseeker') {
    router.push('/')
    return
  }

  try {
    const data = await $fetch<any>('/api/profile')
    if (data) {
      form.full_name = data.full_name || ''
      form.phone = data.phone || ''
      form.location = data.location || ''
      form.about_self = data.about_self || ''
      form.sector = data.sector || ''
      form.sector_reason = data.sector_reason || ''
      
      if (data.skills) {
        try {
          const parsedSkills = typeof data.skills === 'string' ? JSON.parse(data.skills) : data.skills
          if (Array.isArray(parsedSkills)) {
            form.skillsInput = parsedSkills.join(', ')
          }
        } catch {
          form.skillsInput = String(data.skills)
        }
      }
      
      form.academic_info = Array.isArray(data.academic_info) ? data.academic_info : []
      form.professional_info = Array.isArray(data.professional_info) ? data.professional_info : []
    }
  } catch (err) {
    console.error('Failed to load profile details:', err)
  } finally {
    fetching.value = false
  }
})

function addEducation() {
  if (!tempEdu.degree || !tempEdu.institution) return
  form.academic_info.push({ ...tempEdu })
  tempEdu.degree = ''
  tempEdu.institution = ''
  tempEdu.year = ''
  tempEdu.grade = ''
}

function removeEducation(index: number) {
  form.academic_info.splice(index, 1)
}

function addWork() {
  if (!tempWork.company || !tempWork.role) return
  form.professional_info.push({ ...tempWork })
  tempWork.company = ''
  tempWork.role = ''
  tempWork.duration = ''
  tempWork.description = ''
}

function removeWork(index: number) {
  form.professional_info.splice(index, 1)
}

async function handleSave() {
  errorMsg.value = ''
  loading.value = true

  // Parse skills
  const skillsArray = form.skillsInput
    ? form.skillsInput.split(',').map(s => s.trim()).filter(Boolean)
    : []

  try {
    await $fetch('/api/profile/update', {
      method: 'POST',
      body: {
        full_name: form.full_name,
        phone: form.phone,
        location: form.location,
        about_self: form.about_self,
        sector: form.sector,
        sector_reason: form.sector_reason,
        skills: skillsArray,
        academic_info: form.academic_info,
        professional_info: form.professional_info,
        onboarding_completed: 1
      }
    })
    await fetchUser()
    router.push('/jobseeker-dashboard')
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

async function handleSkip() {
  try {
    await $fetch('/api/profile/skip', { method: 'POST' })
    await fetchUser()
  } catch {
    // Best effort
  }
  router.push('/jobseeker-dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
      <div class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
        <div class="font-headline-md text-headline-md font-bold text-primary">
          Job Nova
        </div>
        <button 
          class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all flex items-center gap-xs"
          @click="handleSkip"
        >
          Skip for now
          <UIcon name="i-lucide-skip-forward" class="text-[16px]" />
        </button>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-lg py-xl flex-grow w-full flex flex-col items-center">
      <!-- Progress Container -->
      <div class="w-full mb-lg">
        <div class="flex justify-between items-end mb-sm">
          <span class="font-label-sm text-label-sm text-on-surface-variant">STEP 2 OF 2</span>
          <span class="font-label-sm text-label-sm text-primary font-semibold">Almost Done!</span>
        </div>
        <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full transition-all duration-500 w-3/4"></div>
        </div>
      </div>

      <!-- Registration Card -->
      <div class="w-full bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] p-lg md:p-xl border border-outline-variant/30">
        <!-- Header Section -->
        <div class="mb-xl text-center md:text-left">
          <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Professional Profile Setup</h1>
          <p class="font-body-md text-body-md text-on-surface-variant">Help us match you with premium jobs and recommendations.</p>
        </div>

        <div v-if="fetching" class="flex flex-col items-center justify-center py-2xl gap-md text-outline">
          <UIcon name="i-lucide-loader-circle" class="text-[40px] animate-spin text-primary" />
          <p class="font-label-md">Loading your profile data...</p>
        </div>

        <!-- Form Content -->
        <form v-else class="space-y-xl" @submit.prevent="handleSave">
          
          <!-- Basic Profile Info -->
          <div class="space-y-lg">
            <h3 class="font-headline-sm text-headline-sm font-semibold text-primary border-b border-outline-variant/30 pb-xs">
              1. Basic Information
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="fullName">Full Name</label>
                <div class="relative">
                  <UIcon name="i-lucide-user" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input 
                    id="fullName" 
                    v-model="form.full_name" 
                    class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                    placeholder="Enter your full name" 
                    required 
                    type="text"
                  >
                </div>
              </div>

              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="mobile">Phone Number</label>
                <div class="relative">
                  <UIcon name="i-lucide-phone" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input 
                    id="mobile" 
                    v-model="form.phone" 
                    class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                    placeholder="E.g. +91 9876543210" 
                    required 
                    type="tel"
                  >
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="location">Preferred Location (City)</label>
                <div class="relative">
                  <UIcon name="i-lucide-map-pin" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input 
                    id="location" 
                    v-model="form.location" 
                    class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                    placeholder="E.g. Bangalore, Mumbai" 
                    required 
                    type="text"
                  >
                </div>
              </div>

              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="skills">Skills (Comma-separated)</label>
                <div class="relative">
                  <UIcon name="i-lucide-cpu" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input 
                    id="skills" 
                    v-model="form.skillsInput" 
                    class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                    placeholder="React, Node.js, Typescript, SQL" 
                    type="text"
                  >
                </div>
              </div>
            </div>

            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="about">Brief Bio (About Yourself)</label>
              <textarea 
                id="about" 
                v-model="form.about_self" 
                rows="3"
                class="w-full p-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all resize-none"
                placeholder="Brief summary of your professional profile, background, and goals..."
                required
              ></textarea>
            </div>
          </div>

          <!-- Academic Information Section -->
          <div class="space-y-lg">
            <h3 class="font-headline-sm text-headline-sm font-semibold text-primary border-b border-outline-variant/30 pb-xs">
              2. Academic Information
            </h3>

            <!-- List of existing qualifications -->
            <div v-if="form.academic_info.length > 0" class="space-y-sm">
              <div 
                v-for="(edu, idx) in form.academic_info" 
                :key="idx"
                class="flex items-center justify-between p-md bg-surface-container-low rounded-xl border border-outline-variant/20 shadow-sm"
              >
                <div>
                  <h4 class="font-label-md text-label-md text-on-surface font-semibold">{{ edu.degree }}</h4>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">{{ edu.institution }} · {{ edu.year }} · {{ edu.grade || 'N/A' }}</p>
                </div>
                <button 
                  type="button" 
                  class="text-error hover:bg-error/10 p-sm rounded-lg transition-colors flex items-center justify-center"
                  @click="removeEducation(idx)"
                >
                  <UIcon name="i-lucide-trash-2" class="text-[18px]" />
                </button>
              </div>
            </div>

            <!-- Dynamic Adder -->
            <div class="bg-surface-container-low/50 p-md rounded-xl border border-outline-variant/30 space-y-md">
              <p class="font-label-sm text-label-sm font-semibold text-on-surface-variant">Add Education Entry</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                <input 
                  v-model="tempEdu.degree" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Degree (e.g. B.Tech Computer Science)"
                  type="text"
                >
                <input 
                  v-model="tempEdu.institution" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Institution (e.g. IIT Delhi)"
                  type="text"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                <input 
                  v-model="tempEdu.year" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Graduation Year (e.g. 2024)"
                  type="text"
                >
                <input 
                  v-model="tempEdu.grade" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Grade / CGPA (e.g. 8.5/10)"
                  type="text"
                >
              </div>
              <button 
                type="button"
                class="px-md h-[40px] bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary transition-all flex items-center gap-xs"
                @click="addEducation"
              >
                <UIcon name="i-lucide-plus" /> Add Education
              </button>
            </div>
          </div>

          <!-- Experience Section -->
          <div class="space-y-lg">
            <h3 class="font-headline-sm text-headline-sm font-semibold text-primary border-b border-outline-variant/30 pb-xs">
              3. Work Experience
            </h3>

            <!-- List of existing work -->
            <div v-if="form.professional_info.length > 0" class="space-y-sm">
              <div 
                v-for="(work, idx) in form.professional_info" 
                :key="idx"
                class="flex items-center justify-between p-md bg-surface-container-low rounded-xl border border-outline-variant/20 shadow-sm"
              >
                <div>
                  <h4 class="font-label-md text-label-md text-on-surface font-semibold">{{ work.role }}</h4>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">{{ work.company }} · {{ work.duration }}</p>
                  <p class="font-body-sm text-body-sm text-on-surface-variant/80 mt-xs leading-relaxed">{{ work.description }}</p>
                </div>
                <button 
                  type="button" 
                  class="text-error hover:bg-error/10 p-sm rounded-lg transition-colors flex items-center justify-center shrink-0 ml-md"
                  @click="removeWork(idx)"
                >
                  <UIcon name="i-lucide-trash-2" class="text-[18px]" />
                </button>
              </div>
            </div>

            <!-- Dynamic Adder -->
            <div class="bg-surface-container-low/50 p-md rounded-xl border border-outline-variant/30 space-y-md">
              <p class="font-label-sm text-label-sm font-semibold text-on-surface-variant">Add Work Experience Entry</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                <input 
                  v-model="tempWork.company" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Company Name (e.g. Infosys)"
                  type="text"
                >
                <input 
                  v-model="tempWork.role" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Role (e.g. Software Engineer)"
                  type="text"
                >
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
                <input 
                  v-model="tempWork.duration" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Duration (e.g. June 2022 - Present)"
                  type="text"
                >
                <input 
                  v-model="tempWork.description" 
                  class="h-[44px] px-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-sm"
                  placeholder="Brief description of work/responsibilities..."
                  type="text"
                >
              </div>
              <button 
                type="button"
                class="px-md h-[40px] bg-primary-container text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary transition-all flex items-center gap-xs"
                @click="addWork"
              >
                <UIcon name="i-lucide-plus" /> Add Work Experience
              </button>
            </div>
          </div>

          <!-- Sector & Motivation -->
          <div class="space-y-lg">
            <h3 class="font-headline-sm text-headline-sm font-semibold text-primary border-b border-outline-variant/30 pb-xs">
              4. Career Aspirations
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="sector">Target Sector / Domain</label>
                <select 
                  id="sector" 
                  v-model="form.sector"
                  required
                  class="w-full h-[52px] px-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                >
                  <option value="">Select industry domain</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Marketing & Design">Marketing & Design</option>
                  <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                  <option value="Sales & Business Development">Sales & Business Development</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>
            </div>

            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="motivation">Why do you want to work in this sector?</label>
              <textarea 
                id="motivation" 
                v-model="form.sector_reason" 
                rows="2"
                class="w-full p-4 bg-surface-container-low border border-transparent rounded-xl font-body-md focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all resize-none"
                placeholder="Share your passion, interests, or career goals in this domain..."
                required
              ></textarea>
            </div>
          </div>

          <!-- Error Alert -->
          <div v-if="errorMsg" class="flex items-center gap-sm p-sm bg-error/10 text-error rounded-lg font-label-md text-label-md">
            <UIcon name="i-lucide-circle-alert" class="text-[16px] shrink-0" />
            {{ errorMsg }}
          </div>

          <!-- Submit Buttons -->
          <div class="flex flex-col sm:flex-row justify-between items-center gap-md pt-lg border-t border-outline-variant/30">
            <button 
              type="button"
              class="w-full sm:w-auto px-lg h-[50px] border border-outline-variant text-on-surface-variant rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-all"
              @click="handleSkip"
            >
              Skip and Set Up Later
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full sm:w-auto px-xl h-[52px] bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm font-semibold hover:bg-secondary active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-sm shadow-lg shadow-primary/20"
            >
              <UIcon v-if="loading" name="i-lucide-loader-circle" class="text-[20px] animate-spin" />
              <span>{{ loading ? 'Saving Profile...' : 'Complete Profile & Dashboard' }}</span>
              <UIcon v-if="!loading" name="i-lucide-arrow-right" class="text-[20px]" />
            </button>
          </div>

        </form>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full mt-xl bg-surface-container-low border-t border-outline-variant">
      <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-7xl mx-auto gap-md">
        <div class="font-headline-md text-headline-md font-bold text-primary">
          Job Nova
        </div>
        <div class="font-label-md text-label-md text-on-surface-variant">
          © 2026 Job Nova India. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
body {
  font-family: "Inter", sans-serif;
  background-color: var(--color-surface);
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.25em 1.25em;
}
</style>

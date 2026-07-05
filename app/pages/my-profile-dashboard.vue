<script setup lang="ts">
definePageMeta({
  layout: 'jobseeker'
})

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Job Nova — My Profile"
})

const router = useRouter()
const { user, profile, loading, error, updateProfile, fetchUser } = useAuth()

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
  professional_info: [] as any[],
  skills: [] as string[],
  photo_url: '',
  resume_url: '',
  resume_name: ''
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
      professional_info: profile.value.professional_info ? JSON.parse(JSON.stringify(profile.value.professional_info)) : [],
      skills: profile.value.skills ? JSON.parse(JSON.stringify(profile.value.skills)) : [],
      photo_url: profile.value.photo_url || '',
      resume_url: profile.value.resume_url || '',
      resume_name: profile.value.resume_name || ''
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
      team_scenario_answer: form.value.team_scenario_answer,
      skills: form.value.skills,
      photo_url: form.value.photo_url,
      resume_url: form.value.resume_url,
      resume_name: form.value.resume_name
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

// Skills Tag Manager
const newSkillText = ref('')
function addSkill() {
  const skill = newSkillText.value.trim()
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill)
  }
  newSkillText.value = ''
}
function removeSkill(index: number) {
  form.value.skills.splice(index, 1)
}

// Photo & Resume Upload helpers
const photoInput = ref<HTMLInputElement | null>(null)
const resumeInput = ref<HTMLInputElement | null>(null)

function triggerPhotoUpload() {
  photoInput.value?.click()
}

function triggerResumeUpload() {
  resumeInput.value?.click()
}

function onPhotoChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 500 * 1024) {
    saveError.value = 'Photo file size exceeds the 500 KB limit.'
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    form.value.photo_url = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

function removePhoto() {
  form.value.photo_url = ''
  if (photoInput.value) photoInput.value.value = ''
}

function onResumeChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    saveError.value = 'Resume file size exceeds the 2 MB limit.'
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    form.value.resume_url = event.target?.result as string
    form.value.resume_name = file.name
  }
  reader.readAsDataURL(file)
}

function removeResume() {
  form.value.resume_url = ''
  form.value.resume_name = ''
  if (resumeInput.value) resumeInput.value.value = ''
}

function downloadResume() {
  if (!form.value.resume_url) return
  const link = document.createElement('a')
  link.href = form.value.resume_url
  link.download = form.value.resume_name || 'resume.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
  <main class="pt-8 pb-xl px-gutter md:px-xl max-w-7xl mx-auto w-full">
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
              <div class="relative group mb-md">
                <div class="w-24 h-24 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm relative">
                  <img v-if="form.photo_url" :src="form.photo_url" class="w-full h-full object-cover" alt="Profile Photo" />
                  <span v-else class="text-primary text-[36px] font-bold">
                    {{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}
                  </span>
                </div>
                <div @click="triggerPhotoUpload" class="absolute inset-0 rounded-full bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
                  <UIcon name="i-lucide-camera" class="text-on-primary text-[20px]" />
                </div>
                <input type="file" ref="photoInput" accept="image/png, image/jpeg" @change="onPhotoChange" class="hidden" />
              </div>
              <div class="flex gap-sm mb-lg">
                <button type="button" @click="triggerPhotoUpload" class="text-xs text-primary hover:underline font-semibold">Upload Photo</button>
                <span v-if="form.photo_url" class="text-xs text-outline">|</span>
                <button v-if="form.photo_url" type="button" @click="removePhoto" class="text-xs text-error hover:underline font-semibold">Remove</button>
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
              <div v-if="form.resume_url" class="bg-surface-container-low rounded-lg p-md mb-md border border-outline-variant/30 flex items-center gap-md">
                <div class="bg-primary/10 p-2 rounded text-primary flex items-center justify-center">
                  <UIcon name="i-lucide-file-text" class="text-[24px]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Uploaded Resume</p>
                  <p class="font-label-md text-label-md text-on-surface truncate font-semibold">{{ form.resume_name || 'Resume File' }}</p>
                </div>
              </div>
              <div v-else class="bg-surface-container-low rounded-lg p-md mb-md border border-dashed border-outline-variant/30 flex flex-col items-center justify-center py-6 text-center">
                <UIcon name="i-lucide-upload-cloud" class="text-outline text-[32px] mb-2" />
                <p class="text-sm font-semibold text-on-surface">No resume uploaded</p>
                <p class="text-xs text-on-surface-variant mt-1">Upload PDF or Word (Max 2MB)</p>
              </div>

              <input type="file" ref="resumeInput" accept=".pdf,.doc,.docx" @change="onResumeChange" class="hidden" />

              <div class="flex flex-col gap-2 w-full">
                <button type="button" @click="triggerResumeUpload" class="w-full h-10 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary font-label-md text-label-md font-semibold rounded-lg transition-colors flex items-center justify-center gap-sm">
                  <UIcon name="i-lucide-upload" />
                  {{ form.resume_url ? 'Change Resume' : 'Upload Resume' }}
                </button>
                <div class="flex gap-2" v-if="form.resume_url">
                  <button type="button" @click="downloadResume" class="flex-1 h-9 border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-sm text-label-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-sm">
                    <UIcon name="i-lucide-download" /> Download
                  </button>
                  <button type="button" @click="removeResume" class="flex-1 h-9 border border-outline-variant text-error hover:bg-error-container/10 font-label-sm text-label-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-sm">
                    <UIcon name="i-lucide-trash-2" /> Remove
                  </button>
                </div>
              </div>
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

            <!-- Skills -->
            <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
              <h4 class="font-headline-md text-headline-md font-semibold text-on-surface mb-lg pb-sm border-b border-outline-variant/30">Skills</h4>
              <div class="space-y-md">
                <div>
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide block mb-xs">Add Skill</label>
                  <div class="flex gap-sm">
                    <input
                      v-model="newSkillText"
                      type="text"
                      placeholder="e.g. TypeScript, React, Docker"
                      class="flex-1 rounded-lg bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-2 font-body-md text-body-md text-on-surface transition-colors"
                      @keydown.enter.prevent="addSkill"
                    >
                    <button type="button" @click="addSkill" class="px-md h-[40px] bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors">
                      Add
                    </button>
                  </div>
                </div>
                <div class="flex flex-wrap gap-xs">
                  <span v-for="(skill, idx) in form.skills" :key="idx" class="inline-flex items-center gap-xs px-sm py-1 bg-primary/10 text-primary rounded-full font-label-md text-label-md font-semibold">
                    {{ skill }}
                    <button type="button" @click="removeSkill(idx)" class="text-primary hover:text-error transition-colors flex items-center">
                      <UIcon name="i-lucide-x" class="text-sm" />
                    </button>
                  </span>
                  <p v-if="form.skills.length === 0" class="text-sm text-on-surface-variant/60 italic">No skills added yet.</p>
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

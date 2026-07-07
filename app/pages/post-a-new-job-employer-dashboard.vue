<script setup lang="ts">
definePageMeta({
  layout: 'employer'
})

import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { user, fetchUser, logout } = useAuth()

const jobId = computed(() => route.query.id ? Number(route.query.id) : null)
const cloneId = computed(() => route.query.cloneId ? Number(route.query.cloneId) : null)
const isEdit = computed(() => !!jobId.value)

useHead({
  title: isEdit.value ? "Edit Job - Job Nova Employer Dashboard" : "Post a New Job - Job Nova Employer Dashboard"
})

const form = reactive({
  title: '',
  functionalArea: '',
  industry: '',
  description: '',
  vacancies: 1,
  expMin: '',
  expMax: '',
  salMin: '',
  salMax: '',
  country: 'India',
  state: '',
  city: '',
  ugQualification: '',
  pgQualification: '',
  skills: [] as string[],
  expiryDate: ''
})

const newSkill = ref('')
const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'employer') {
    router.push('/login')
    return
  }

  const targetId = jobId.value || cloneId.value
  if (targetId) {
    await loadJobDetails(targetId)
  }
})

async function loadJobDetails(id: number) {
  loading.value = true
  try {
    const res = await $fetch<{ success: boolean; job: any }>('/api/jobs/get', {
      query: { id }
    })
    if (res.success && res.job) {
      const j = res.job
      form.title = j.title
      form.functionalArea = j.functional_area
      form.industry = j.industry
      form.description = j.description
      form.vacancies = j.vacancies
      form.expMin = j.exp_min !== null ? String(j.exp_min) : ''
      form.expMax = j.exp_max !== null ? String(j.exp_max) : ''
      form.salMin = j.sal_min !== null ? String(j.sal_min) : ''
      form.salMax = j.sal_max !== null ? String(j.sal_max) : ''
      form.country = j.country || 'India'
      form.state = j.state || ''
      form.city = j.city || ''
      form.ugQualification = j.ug_qualification || ''
      form.pgQualification = j.pg_qualification || ''
      form.skills = j.skills || []
      form.expiryDate = j.expiry_date || ''
    }
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to load job details.'
  } finally {
    loading.value = false
  }
}

// Skills Tag management
function addSkill() {
  const skill = newSkill.value.trim()
  if (skill && !form.skills.includes(skill)) {
    form.skills.push(skill)
  }
  newSkill.value = ''
}

// Form Submission (Publish or Save Draft)
async function submitJob(status: 'active' | 'draft') {
  errorMsg.value = ''

  if (!form.title || !form.functionalArea || !form.industry || !form.description) {
    errorMsg.value = 'Please fill out all required fields marked with *.'
    return
  }

  loading.value = true
  try {
    if (isEdit.value) {
      await $fetch('/api/jobs/update', {
        method: 'POST',
        body: {
          id: jobId.value,
          ...form,
          status
        }
      })
    } else {
      await $fetch('/api/jobs/create', {
        method: 'POST',
        body: {
          ...form,
          status
        }
      })
    }
    router.push('/manage-jobs-employer-dashboard')
  }
  catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to save job. Please try again.'
  }
  finally {
    loading.value = false
  }
}

function removeSkill(index: number) {
  form.skills.splice(index, 1)
}

// Computed properties for live preview card
const previewLocation = computed(() => {
  if (form.city) {
    return `${form.city}, ${form.country}`
  }
  return `City, ${form.country}`
})

const previewExperience = computed(() => {
  if (form.expMin !== '' && form.expMax !== '') {
    return `${form.expMin}-${form.expMax} Yrs`
  }
  if (form.expMin !== '') {
    return `${form.expMin}+ Yrs`
  }
  return '0-5 Yrs'
})

const previewSalary = computed(() => {
  if (form.salMin !== '' && form.salMax !== '') {
    return `₹${form.salMin}-${form.salMax} LPA`
  }
  if (form.salMin !== '') {
    return `₹${form.salMin}+ LPA`
  }
  return 'Not Disclosed'
})
</script>

<template>
  <div class="p-4 md:p-8 flex-grow max-w-7xl mx-auto w-full">
        <div class="mb-xl">
          <h1 class="font-headline-lg text-headline-lg font-bold text-on-surface">{{ isEdit ? 'Edit Job Posting' : 'Post a New Job' }}</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mt-2">
            {{ isEdit ? 'Update the details of your job posting.' : 'Create a job posting and start receiving applications.' }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <!-- Left Column: Form -->
          <form class="lg:col-span-2 space-y-gutter" @submit.prevent>
            <!-- Job Information -->
            <div class="bg-surface rounded-xl p-md md:p-lg border border-outline-variant/30 shadow-sm space-y-4">
              <h3 class="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">Job Information</h3>
              <div>
                <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Job Title *</label>
                <input
                  v-model="form.title"
                  required
                  class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                  placeholder="e.g. Senior Software Engineer"
                  type="text"
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Functional Area *</label>
                  <select
                    v-model="form.functionalArea"
                    required
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                  >
                    <option value="">Select Area</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Industry *</label>
                  <select
                    v-model="form.industry"
                    required
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                  >
                    <option value="">Select Industry</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Finance &amp; Banking">Finance &amp; Banking</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Job Description -->
            <div class="bg-surface rounded-xl p-md md:p-lg border border-outline-variant/30 shadow-sm space-y-4">
              <h3 class="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">Job Description</h3>
              <div>
                <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Detailed Description *</label>
                <p class="font-label-sm text-label-sm text-on-surface-variant mb-2 font-normal opacity-70">Include roles, responsibilities, and benefits.</p>
                <textarea
                  v-model="form.description"
                  required
                  class="w-full px-4 py-3 bg-surface-container-highest border border-outline-variant/50 rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-on-surface resize-y"
                  placeholder="Enter detailed job description here..."
                  rows="6"
                ></textarea>
              </div>
            </div>

            <!-- Details, Location, Education -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <!-- Vacancy Details -->
              <div class="bg-surface rounded-xl p-md md:p-lg border border-outline-variant/30 shadow-sm space-y-4">
                <h3 class="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">Job Details</h3>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Vacancies</label>
                  <input
                    v-model="form.vacancies"
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                    min="1"
                    placeholder="e.g. 3"
                    type="number"
                  />
                </div>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Experience (Years)</label>
                  <div class="flex gap-2 items-center">
                    <input
                      v-model="form.expMin"
                      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                      min="0"
                      placeholder="Min"
                      type="number"
                    />
                    <span class="text-on-surface-variant">-</span>
                    <input
                      v-model="form.expMax"
                      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                      min="0"
                      placeholder="Max"
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Salary Range (LPA)</label>
                  <div class="flex gap-2 items-center">
                    <input
                      v-model="form.salMin"
                      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                      min="0"
                      placeholder="Min"
                      type="number"
                    />
                    <span class="text-on-surface-variant">-</span>
                    <input
                      v-model="form.salMax"
                      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                      min="0"
                      placeholder="Max"
                      type="number"
                    />
                  </div>
                </div>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Expiration Date</label>
                  <input
                    v-model="form.expiryDate"
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                    type="date"
                  />
                </div>
              </div>

              <!-- Location & Education -->
              <div class="flex flex-col gap-gutter justify-between">
                <div class="bg-surface rounded-xl p-md md:p-lg border border-outline-variant/30 shadow-sm flex-1 space-y-4">
                  <h3 class="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">Location</h3>
                  <select
                    v-model="form.country"
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                  >
                    <option value="India">India</option>
                  </select>
                  <div class="grid grid-cols-2 gap-2">
                    <select
                      v-model="form.state"
                      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                    >
                      <option disabled value="">State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                    <input
                      v-model="form.city"
                      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                      placeholder="City"
                      type="text"
                    />
                  </div>
                </div>

                <div class="bg-surface rounded-xl p-md md:p-lg border border-outline-variant/30 shadow-sm flex-1 space-y-4">
                  <h3 class="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">Education</h3>
                  <select
                    v-model="form.ugQualification"
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                  >
                    <option value="">UG Qualification</option>
                    <option value="B.Tech/B.E.">B.Tech/B.E.</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="BCA">BCA</option>
                    <option value="Any Graduate">Any Graduate</option>
                  </select>
                  <select
                    v-model="form.pgQualification"
                    class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
                  >
                    <option value="">PG Qualification</option>
                    <option value="M.Tech">M.Tech</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="bg-surface rounded-xl p-md md:p-lg border border-outline-variant/30 shadow-sm space-y-4">
              <h3 class="font-headline-md text-headline-md text-on-surface pb-sm border-b border-outline-variant/30">Skills Required</h3>
              <div>
                <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Add Tags</label>
                <div class="flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="(skill, index) in form.skills"
                    :key="index"
                    class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-sm text-label-sm"
                  >
                    {{ skill }}
                    <button type="button" class="hover:text-error shrink-0" @click="removeSkill(index)">
                      <UIcon name="i-lucide-x" class="text-[12px] align-middle" />
                    </button>
                  </span>
                  <span v-if="form.skills.length === 0" class="text-on-surface-variant/40 font-body-md text-sm">No skills added yet.</span>
                </div>
                <div class="relative flex items-center group border border-outline-variant bg-surface-container-low rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                  <UIcon name="i-lucide-tag" class="absolute left-4 text-outline group-focus-within:text-primary text-[18px]" />
                  <input
                    v-model="newSkill"
                    class="w-full pl-12 pr-4 py-3 bg-transparent border-none text-on-surface placeholder:text-outline/60 outline-none h-[52px]"
                    placeholder="Type a skill and press Enter (e.g. React)"
                    type="text"
                    @keydown.enter.prevent="addSkill"
                  />
                </div>
              </div>
            </div>

            <!-- Error message -->
            <div v-if="errorMsg" class="flex items-center gap-sm p-sm bg-error/10 text-error rounded-lg font-label-md text-label-md">
              <UIcon name="i-lucide-circle-alert" class="text-[16px] shrink-0" />
              {{ errorMsg }}
            </div>

            <!-- Actions Bottom Mobile -->
            <div class="flex flex-col sm:flex-row gap-4 lg:hidden mt-xl pb-xl">
              <button
                class="bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg h-[56px] transition-all transform active:scale-95 shadow-md flex-1 disabled:opacity-60 flex items-center justify-center gap-2"
                type="button"
                :disabled="loading"
                @click="submitJob('active')"
              >
                <UIcon v-if="loading" name="i-lucide-loader-circle" class="animate-spin text-[20px]" />
                <span>{{ isEdit ? 'Update Job' : 'Publish Job' }}</span>
              </button>
              <div class="flex gap-4 flex-1">
                <button
                  class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-6 py-3 rounded-lg h-[56px] transition-colors flex-1 border border-outline-variant disabled:opacity-60"
                  type="button"
                  :disabled="loading"
                  @click="submitJob('draft')"
                >
                  Save Draft
                </button>
                <button
                  class="text-on-surface-variant hover:text-error font-label-md text-label-md px-4 py-3 h-[56px] transition-colors"
                  type="button"
                  @click="router.push('/manage-jobs-employer-dashboard')"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          <!-- Right Column: Live Preview & Actions -->
          <div class="lg:col-span-1">
            <div class="sticky top-[100px] space-y-gutter">
              <!-- Actions Desktop -->
              <div class="hidden lg:flex flex-col gap-4 bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm">
                <button
                  class="bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg w-full transition-all transform active:scale-95 shadow-md flex justify-center items-center gap-2 disabled:opacity-60"
                  type="button"
                  :disabled="loading"
                  @click="submitJob('active')"
                >
                  <UIcon v-if="loading" name="i-lucide-loader-circle" class="animate-spin text-[20px]" />
                  <UIcon v-else name="i-lucide-send" class="text-[20px]" />
                  <span>{{ isEdit ? 'Update Job' : 'Publish Job' }}</span>
                </button>
                <div class="flex gap-2">
                  <button
                    class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex-1 border border-outline-variant text-center disabled:opacity-60"
                    type="button"
                    :disabled="loading"
                    @click="submitJob('draft')"
                  >
                    Save Draft
                  </button>
                  <button
                    class="text-on-surface-variant hover:text-error hover:bg-error/10 font-label-md text-label-md px-4 py-2 rounded-lg transition-colors text-center"
                    type="button"
                    @click="router.push('/manage-jobs-employer-dashboard')"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Live Preview Card -->
              <div class="bg-surface rounded-xl border border-outline-variant/30 shadow-md overflow-hidden relative">
                <div class="bg-surface-container-low px-4 py-3 border-b border-outline-variant/30 flex items-center justify-between">
                  <span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
                    <UIcon name="i-lucide-eye" class="text-[18px]" /> Live Preview
                  </span>
                  <span class="bg-secondary/10 text-secondary px-2 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider">Card View</span>
                </div>
                <div class="p-md">
                  <div class="flex items-start gap-4 mb-4">
                    <div class="w-12 h-12 rounded bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                      <UIcon name="i-lucide-building" class="text-primary text-[24px]" />
                    </div>
                    <div>
                      <h4 class="font-headline-md text-headline-md text-on-surface leading-tight">
                        {{ form.title || 'Job Title Placeholder' }}
                      </h4>
                      <p class="font-body-md text-body-md text-primary mt-1">TechCorp India</p>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">
                      <UIcon name="i-lucide-map-pin" class="text-[14px]" />
                      <span>{{ previewLocation }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">
                      <UIcon name="i-lucide-briefcase" class="text-[14px]" />
                      <span>{{ previewExperience }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">
                      <UIcon name="i-lucide-banknote" class="text-[14px]" />
                      <span>{{ previewSalary }}</span>
                    </span>
                  </div>
                  <div class="mt-4 pt-4 border-t border-outline-variant/30">
                    <p class="font-body-md text-body-md text-on-surface-variant line-clamp-3 text-sm">
                      {{ form.description || 'This is a preview of how your job description will look to candidates. Start typing in the form to see updates here.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<style scoped>
select, input, textarea {
  outline: none;
}
</style>

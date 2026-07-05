<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'employer'
})

useHead({
  title: "Company Profile - Job Nova"
})

const router = useRouter()
const { user, profile, fetchUser } = useAuth()

const defaultLogoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWvG4wlzJPWuhQLS4jUaMRfk7D6zjslqtF2dUzHVHFOMHHwqLSnsU_D4pp7c7w0Px8LAo8F2XlPpc6HpJD52Vl7G-bQwKAYAu0Xugs7DZ1c71G9lFKXrrvq1vpHm88CFU4NROFcloGsUgichI7E6pD0ZWVsZZ3MBmQkRt5EnPd8XO7Xonnp5zF8uELLo1-dQC421UC7cr1Z7SkWFbCW9gRQ04efF7TOtJGsAUXn4IBjIYoWjoh_grKNThOSEWJ5ADw9ADLkW_5FThX'

const form = reactive({
  companyName: '',
  companyType: '',
  industryType: '',
  executiveName: '',
  executivePhone: '',
  description: '',
  address: '',
  pincode: '',
  country: 'India',
  state: '',
  city: '',
  logoUrl: ''
})

const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

onMounted(async () => {
  if (!user.value || !profile.value) {
    await fetchUser()
  }
  if (!user.value || user.value.role !== 'employer') {
    router.push('/login')
  } else {
    // Populate form
    if (profile.value) {
      form.companyName = (profile.value as any).company_name || ''
      form.companyType = (profile.value as any).company_type || 'Private Limited'
      form.industryType = (profile.value as any).industry_type || 'Software & IT'
      form.executiveName = (profile.value as any).executive_name || ''
      form.executivePhone = (profile.value as any).executive_phone || ''
      form.description = (profile.value as any).description || ''
      form.address = (profile.value as any).address || ''
      form.pincode = (profile.value as any).pincode || ''
      form.country = (profile.value as any).country || 'India'
      form.state = (profile.value as any).state || ''
      form.city = (profile.value as any).city || ''
      form.logoUrl = (profile.value as any).logo_url || ''
    }
  }
})

function triggerUpload() {
  fileInput.value?.click()
}

function onLogoChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file.size > 500 * 1024) {
    errorMsg.value = 'Logo file size exceeds the 500 KB limit.'
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    form.logoUrl = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

function removeLogo() {
  form.logoUrl = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function handleSave() {
  loading.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    const res = await $fetch<{ success: boolean; message: string }>('/api/profile/update-employer', {
      method: 'POST',
      body: form
    })
    successMsg.value = res.message
    await fetchUser()
  } catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to save company profile.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex-1 p-md md:p-xl max-w-7xl mx-auto w-full">
    <!-- Page Header -->
    <div class="mb-xl flex flex-col sm:flex-row justify-between items-start sm:items-end gap-md">
      <div>
        <h2 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Company Profile</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Manage your company information and employer branding.</p>
      </div>
      <div class="bg-surface-container-lowest ambient-shadow-l1 px-md py-sm rounded-lg flex items-center gap-sm border border-outline-variant/50">
        <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: (profile as any)?.is_approved ? '#10b981' : '#f59e0b' }"></span>
        <span class="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
          Status: {{ (profile as any)?.is_approved ? 'Approved' : 'Pending Approval' }}
        </span>
      </div>
    </div>

    <!-- Alert notifications -->
    <div v-if="successMsg" class="mb-md p-md bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/30 flex items-center gap-sm font-label-md">
      <UIcon name="i-lucide-check-circle" class="text-[20px]" />
      <span>{{ successMsg }}</span>
    </div>
    <div v-if="errorMsg" class="mb-md p-md bg-red-500/10 text-red-500 rounded-lg border border-red-500/30 flex items-center gap-sm font-label-md">
      <UIcon name="i-lucide-alert-triangle" class="text-[20px]" />
      <span>{{ errorMsg }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      <!-- Main Form Column -->
      <div class="lg:col-span-8 flex flex-col gap-gutter">
        <!-- Company Profile Header Card -->
        <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg flex flex-col sm:flex-row items-center sm:items-start gap-lg">
          <div class="w-32 h-32 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant overflow-hidden relative group">
            <img class="w-full h-full object-cover" data-alt="Company Logo" :src="form.logoUrl || defaultLogoUrl"/>
            <div @click="triggerUpload" class="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
              <UIcon name="i-lucide-camera" class="text-on-primary text-[24px]" />
            </div>
            <input type="file" ref="fileInput" accept="image/png, image/jpeg" @change="onLogoChange" class="hidden" />
          </div>
          <div class="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <h3 class="font-headline-md text-headline-md text-on-surface mb-xs">{{ form.companyName || 'Your Company Name' }}</h3>
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-sm mb-md">
              <span class="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm text-label-sm">{{ form.industryType }}</span>
              <span class="w-1 h-1 bg-outline-variant rounded-full"></span>
              <span class="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm text-label-sm">{{ form.companyType }}</span>
            </div>
            <div class="flex items-center gap-md w-full sm:w-auto">
              <button @click="triggerUpload" class="flex-1 sm:flex-none bg-primary-container text-on-primary-container px-md py-sm rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors btn-hover-effect">
                Upload Logo
              </button>
              <button @click="removeLogo" class="flex-1 sm:flex-none border border-outline-variant text-on-surface px-md py-sm rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors btn-hover-effect">
                Remove
              </button>
            </div>
            <p class="font-label-sm text-label-sm text-on-surface-variant mt-sm">Logo Requirements: JPEG / PNG, Max Size: 500 KB</p>
          </div>
        </div>

        <!-- Company Information Section -->
        <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
          <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
            <UIcon name="i-lucide-building" class="text-primary" />
            Company Information
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div class="col-span-1 md:col-span-2">
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Company Name</label>
              <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" v-model="form.companyName"/>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Company Type</label>
              <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" v-model="form.companyType">
                <option>Private Limited</option>
                <option>Public Limited</option>
                <option>Partnership</option>
                <option>Sole Proprietorship</option>
              </select>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Industry Type</label>
              <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" v-model="form.industryType">
                <option>Software &amp; IT</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Manufacturing</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Company Description Section -->
        <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
          <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
            <UIcon name="i-lucide-file-text" class="text-primary" />
            Company Description
          </h4>
          <div>
            <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Company Profile Description</label>
            <p class="font-label-sm text-label-sm text-outline mb-sm">Tell candidates about your company, culture and opportunities.</p>
            <textarea class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all resize-none" rows="5" v-model="form.description"></textarea>
          </div>
        </div>
      </div>

      <!-- Secondary Form Column -->
      <div class="lg:col-span-4 flex flex-col gap-gutter">
        <!-- Contact Information Section -->
        <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
          <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
            <UIcon name="i-lucide-contact" class="text-primary" />
            Contact Information
          </h4>
          <div class="flex flex-col gap-md">
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Executive Name</label>
              <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" v-model="form.executiveName"/>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Email Address</label>
              <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all disabled:opacity-50" type="email" :value="user?.email" disabled/>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Phone Number</label>
              <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="tel" v-model="form.executivePhone"/>
            </div>
          </div>
        </div>

        <!-- Address Information Section -->
        <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
          <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
            <UIcon name="i-lucide-map-pin" class="text-primary" />
            Location
          </h4>
          <div class="flex flex-col gap-md">
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Address</label>
              <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" v-model="form.address"/>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Country</label>
              <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" v-model="form.country">
                <option>India</option>
                <option>USA</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-sm">
              <div>
                <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">State</label>
                <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" v-model="form.state" />
              </div>
              <div>
                <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">City</label>
                <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" v-model="form.city"/>
              </div>
            </div>
            <div>
              <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Pincode</label>
              <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" v-model="form.pincode"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Area -->
    <div class="mt-xl flex justify-end gap-md pt-lg border-t border-outline-variant/30">
      <button @click="router.push('/employer-dashboard-2')" class="px-lg py-3 rounded-lg border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors btn-hover-effect">
        Cancel
      </button>
      <button @click="handleSave" :disabled="loading" class="px-lg py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors btn-hover-effect shadow-md disabled:opacity-50">
        {{ loading ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>
  </main>
</template>

<style scoped>
body {
  background-color: #F9FAFB; /* Neutral-50 */
}
.ambient-shadow-l1 {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
.btn-hover-effect:active {
  transform: scale(0.98);
}
</style>

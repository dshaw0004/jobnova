<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: "Employer Registration - Step 2 | Job Nova"
})

const router = useRouter()
const { user, fetchUser } = useAuth()

const form = reactive({
  companyType: '',
  industryType: '',
  executiveName: '',
  executivePhone: '',
  description: '',
  address: '',
  pincode: '',
  country: 'india',
  state: '',
  city: ''
})

const loading = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  // Ensure the user session is loaded
  if (!user.value) {
    await fetchUser()
  }
  // Redirect to login if not logged in or if they are not an employer
  if (!user.value) {
    router.push('/login')
  } else if (user.value.role !== 'employer') {
    router.push('/')
  }
})

async function handleSubmit() {
  errorMsg.value = ''
  loading.value = true

  try {
    await $fetch('/api/profile/update-employer', {
      method: 'POST',
      body: {
        companyType: form.companyType,
        industryType: form.industryType,
        executiveName: form.executiveName,
        executivePhone: form.executivePhone,
        description: form.description,
        address: form.address,
        pincode: form.pincode,
        country: form.country,
        state: form.state,
        city: form.city
      }
    })
    router.push('/employer-pending-approval')
  }
  catch (err: any) {
    errorMsg.value = err.data?.message || 'Failed to submit registration. Please try again.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- TopNavBar -->
    <nav class="w-full sticky top-0 z-50 bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
      <div class="max-w-7xl mx-auto px-gutter flex justify-between items-center h-20">
        <NuxtLink to="/" class="font-headline-md text-headline-md font-bold text-primary">
          Job Nova
        </NuxtLink>
        <div class="flex items-center gap-md">
          <NuxtLink to="/login" class="text-on-surface-variant font-medium hover:text-primary px-4 py-2 transition-colors">Log In</NuxtLink>
        </div>
      </div>
    </nav>

    <main class="flex-grow flex flex-col items-center justify-center py-xl px-gutter">
      <!-- Main Registration Container -->
      <div class="w-full max-w-3xl bg-surface-container-lowest rounded-xl p-lg md:p-xl border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
        <!-- Header Section -->
        <div class="mb-xl">
          <div class="flex justify-between items-end mb-sm">
            <div>
              <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Business Information</h1>
              <p class="font-body-md text-body-md text-on-surface-variant">Provide company details for verification.</p>
            </div>
            <span class="font-label-md text-label-md text-primary font-bold bg-primary/10 px-3 py-1 rounded-full mb-2">Step 2 of 2</span>
          </div>
          <!-- Progress Bar -->
          <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div class="w-full h-full bg-primary transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <!-- Form Start -->
        <form class="space-y-xl" @submit.prevent="handleSubmit">
          <!-- 1. Company Details -->
          <section class="space-y-md">
            <div class="flex items-center gap-sm">
              <UIcon name="i-lucide-building" class="text-primary text-[20px]" />
              <h2 class="font-headline-md text-[18px] text-on-surface font-semibold">Company Details</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Company Type</label>
                <select
                  v-model="form.companyType"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option disabled value="">Select company type</option>
                  <option value="private">Private Limited</option>
                  <option value="public">Public Limited</option>
                  <option value="partnership">Partnership</option>
                  <option value="proprietorship">Sole Proprietorship</option>
                  <option value="ngo">NGO / Non-Profit</option>
                </select>
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Industry Type</label>
                <select
                  v-model="form.industryType"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option disabled value="">Select industry</option>
                  <option value="it">Information Technology</option>
                  <option value="finance">Finance &amp; Banking</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail &amp; E-commerce</option>
                </select>
              </div>
            </div>
          </section>

          <hr class="border-outline-variant/30"/>

          <!-- 2. Representative Details -->
          <section class="space-y-md">
            <div class="flex items-center gap-sm">
              <UIcon name="i-lucide-user" class="text-primary text-[20px]" />
              <h2 class="font-headline-md text-[18px] text-on-surface font-semibold">Representative Details</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Executive Name</label>
                <input
                  v-model="form.executiveName"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                  placeholder="Full name of representative"
                  type="text"
                />
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Executive Phone Number</label>
                <div class="flex">
                  <span class="h-11 flex items-center px-3 bg-surface-container-high border border-r-0 border-outline-variant rounded-l-xl text-on-surface-variant font-label-md">+91</span>
                  <input
                    v-model="form.executivePhone"
                    required
                    class="h-11 w-full px-md rounded-r-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                    placeholder="10-digit mobile number"
                    type="tel"
                    pattern="[0-9]{10}"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr class="border-outline-variant/30"/>

          <!-- 3. Company Information -->
          <section class="space-y-md">
            <div class="flex items-center gap-sm">
              <UIcon name="i-lucide-info" class="text-primary text-[20px]" />
              <h2 class="font-headline-md text-[18px] text-on-surface font-semibold">Company Information</h2>
            </div>
            <div class="flex flex-col gap-xs">
              <label class="font-label-md text-on-surface-variant">Company Description</label>
              <textarea
                v-model="form.description"
                required
                class="p-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 resize-none"
                placeholder="Briefly describe your company's mission and operations..."
                rows="3"
              ></textarea>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div class="md:col-span-2 flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Address</label>
                <textarea
                  v-model="form.address"
                  required
                  class="p-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 resize-none"
                  placeholder="Registered office address"
                  rows="2"
                ></textarea>
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Pincode</label>
                <input
                  v-model="form.pincode"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                  placeholder="6-digit code"
                  type="text"
                  pattern="[0-9]{6}"
                />
              </div>
            </div>
          </section>

          <!-- 4. Location -->
          <section class="space-y-md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">Country</label>
                <select
                  v-model="form.country"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option value="india">India</option>
                </select>
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">State</label>
                <select
                  v-model="form.state"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option disabled value="">Select state</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>
              <div class="flex flex-col gap-xs">
                <label class="font-label-md text-on-surface-variant">City</label>
                <select
                  v-model="form.city"
                  required
                  class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                >
                  <option disabled value="">Select city</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Info Notice Card -->
          <div class="flex items-start gap-md p-md bg-secondary/10 border border-secondary/20 rounded-xl">
            <UIcon name="i-lucide-info" class="text-secondary text-[20px] shrink-0" />
            <p class="font-label-md text-on-surface leading-tight">
              All employer accounts require admin verification before activation. You will receive a notification once your account is reviewed.
            </p>
          </div>

          <!-- Error message -->
          <div v-if="errorMsg" class="flex items-center gap-sm p-sm bg-error/10 text-error rounded-lg font-label-md text-label-md">
            <UIcon name="i-lucide-circle-alert" class="text-[16px] shrink-0" />
            {{ errorMsg }}
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-md pt-lg">
            <button
              class="w-full sm:w-auto px-xl py-3 border border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-container-low transition-colors active:scale-[0.98]"
              type="button"
              @click="router.push('/register-employer-step-1')"
            >
              Back
            </button>
            <button
              class="w-full sm:w-auto px-xl py-3 bg-primary text-on-primary font-headline-md text-[16px] rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-sm"
              type="submit"
              :disabled="loading"
            >
              <UIcon v-if="loading" name="i-lucide-loader-circle" class="text-[20px] animate-spin" />
              <span>{{ loading ? 'Submitting...' : 'Create Employer Account' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Trust Section -->
      <div class="mt-xl text-center">
        <p class="font-label-md text-on-surface-variant flex items-center justify-center gap-xs">
          <UIcon name="i-lucide-shield-check" class="text-[18px]" />
          Your data is secured with enterprise-grade encryption.
        </p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-xl bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div class="max-w-7xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        <div class="flex flex-col gap-xs">
          <div class="font-headline-md text-headline-md font-bold text-on-surface">Job Nova</div>
          <p class="font-label-md text-on-surface-variant">© 2024 Job Nova. Premium Career Ecosystem.</p>
        </div>
        <div class="flex flex-wrap gap-md md:justify-end">
          <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a>
          <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
select, input, textarea {
  outline: none;
}
</style>

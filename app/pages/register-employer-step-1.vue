<script setup lang="ts">
definePageMeta({
  layout: false
})

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

useHead({
  title: "Company Account Setup - Step 1 | Job Nova"
})

const router = useRouter()

const form = reactive({
  companyName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

async function handleRegister() {
  errorMsg.value = ''

  if (form.password !== form.confirmPassword) {
    errorMsg.value = 'Passwords do not match.'
    return
  }
  if (form.password.length < 8) {
    errorMsg.value = 'Password must be at least 8 characters.'
    return
  }

  loading.value = true
  try {
    await $fetch('/api/auth/register-employer', {
      method: 'POST',
      body: {
        companyName: form.companyName,
        email: form.email,
        phone: form.phone,
        password: form.password
      }
    })
    router.push('/register-employer-step-2')
  }
  catch (err: any) {
    errorMsg.value = err.data?.message || 'Something went wrong. Please try again.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="w-full bg-surface-container-lowest sticky top-0 z-50 shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
      <div class="max-w-7xl mx-auto px-gutter flex justify-between items-center h-20">
        <NuxtLink to="/" class="font-headline-md text-headline-md font-bold text-primary">Job Nova</NuxtLink>
        <NuxtLink to="/login" class="text-on-surface-variant font-medium hover:text-primary transition-colors">
          Already have an account? <span class="text-primary font-semibold">Login</span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Registration Section -->
    <main class="flex-grow flex items-center justify-center py-xl px-gutter relative">
      <div class="w-full max-w-[500px] z-10">
        <!-- Progress Indicator -->
        <div class="mb-lg">
          <div class="flex justify-between items-center mb-sm">
            <span class="font-label-md text-label-md text-primary font-bold">Step 1 of 2</span>
            <span class="font-label-md text-label-md text-on-surface-variant">Company Account Setup</span>
          </div>
          <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div class="bg-primary h-full rounded-full transition-all duration-500 w-1/2" />
          </div>
        </div>

        <!-- Registration Card -->
        <div class="bg-surface-container-lowest rounded-2xl p-lg md:p-xl border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
          <!-- Header -->
          <div class="mb-xl">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md">
              <UIcon name="i-lucide-building" class="text-primary text-[24px]" />
            </div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Company Account Setup</h1>
            <p class="text-on-surface-variant font-body-md">Create your employer account to start hiring candidates.</p>
          </div>

          <!-- Registration Form -->
          <form class="space-y-md" @submit.prevent="handleRegister">
            <!-- Company Name -->
            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="company-name">Company Name</label>
              <div class="relative flex items-center group border border-outline-variant bg-surface-container-low rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                <UIcon name="i-lucide-building" class="absolute left-4 text-outline group-focus-within:text-primary text-[18px]" />
                <input
                  id="company-name"
                  v-model="form.companyName"
                  required
                  class="w-full pl-12 pr-4 py-3 bg-transparent border-none text-on-surface placeholder:text-outline/60 outline-none h-[52px]"
                  placeholder="Enter your company's legal name"
                  type="text"
                />
              </div>
            </div>

            <!-- Business Email -->
            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="business-email">Business Email Address</label>
              <div class="relative flex items-center group border border-outline-variant bg-surface-container-low rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                <UIcon name="i-lucide-mail" class="absolute left-4 text-outline group-focus-within:text-primary text-[18px]" />
                <input
                  id="business-email"
                  v-model="form.email"
                  required
                  class="w-full pl-12 pr-4 py-3 bg-transparent border-none text-on-surface placeholder:text-outline/60 outline-none h-[52px]"
                  placeholder="email@company.com"
                  type="email"
                />
              </div>
            </div>

            <!-- Phone Number -->
            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="phone-number">Phone Number</label>
              <div class="relative flex items-center group border border-outline-variant bg-surface-container-low rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                <UIcon name="i-lucide-phone" class="absolute left-4 text-outline group-focus-within:text-primary text-[18px]" />
                <div class="flex items-center w-full pl-12">
                  <span class="text-on-surface-variant font-medium pr-2 border-r border-outline-variant/50">+91</span>
                  <input
                    id="phone-number"
                    v-model="form.phone"
                    required
                    class="w-full px-3 py-3 bg-transparent border-none text-on-surface placeholder:text-outline/60 outline-none h-[52px]"
                    placeholder="9876543210"
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Please enter a 10-digit mobile number"
                  />
                </div>
              </div>
            </div>

            <!-- Passwords -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <!-- Password -->
              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="password">Password</label>
                <div class="relative flex items-center group border border-outline-variant bg-surface-container-low rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                  <UIcon name="i-lucide-lock" class="absolute left-4 text-outline group-focus-within:text-primary text-[18px]" />
                  <input
                    id="password"
                    v-model="form.password"
                    required
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full pl-12 pr-10 py-3 bg-transparent border-none text-on-surface placeholder:text-outline/60 outline-none h-[52px]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    class="absolute right-3 text-outline hover:text-primary"
                    @click="showPassword = !showPassword"
                  >
                    <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="text-[18px]" />
                  </button>
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="space-y-xs">
                <label class="font-label-md text-label-md text-on-surface" for="confirm-password">Confirm Password</label>
                <div class="relative flex items-center group border border-outline-variant bg-surface-container-low rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
                  <UIcon name="i-lucide-lock" class="absolute left-4 text-outline group-focus-within:text-primary text-[18px]" />
                  <input
                    id="confirm-password"
                    v-model="form.confirmPassword"
                    required
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="w-full pl-12 pr-10 py-3 bg-transparent border-none text-on-surface placeholder:text-outline/60 outline-none h-[52px]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    class="absolute right-3 text-outline hover:text-primary"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <UIcon :name="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Error message -->
            <div v-if="errorMsg" class="flex items-center gap-sm p-sm bg-error/10 text-error rounded-lg font-label-md text-label-md">
              <UIcon name="i-lucide-circle-alert" class="text-[16px] shrink-0" />
              {{ errorMsg }}
            </div>

            <!-- CTA Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-primary text-on-primary font-headline-md py-4 rounded-xl shadow-lg hover:bg-secondary active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-sm mt-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <UIcon v-if="loading" name="i-lucide-loader-circle" class="text-[20px] animate-spin" />
              <span>{{ loading ? 'Processing...' : 'Continue' }}</span>
              <UIcon v-if="!loading" name="i-lucide-arrow-right" />
            </button>
          </form>
        </div>

        <!-- Trust Badges -->
        <div class="mt-xl flex justify-center gap-xl items-center opacity-60">
          <div class="flex items-center gap-xs">
            <UIcon name="i-lucide-badge-check" class="text-outline" />
            <span class="text-label-sm text-outline uppercase tracking-wider">Trusted by 50k+ companies</span>
          </div>
          <div class="flex items-center gap-xs">
            <UIcon name="i-lucide-shield-check" class="text-outline" />
            <span class="text-label-sm text-outline uppercase tracking-wider">Secure ISO Certified</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-xl bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div class="max-w-7xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        <div>
          <div class="font-headline-md text-headline-md font-bold text-on-surface mb-2">Job Nova</div>
          <p class="text-on-surface-variant font-label-md">© 2024 Job Nova. Premium Career Ecosystem.</p>
        </div>
        <div class="flex flex-wrap gap-md md:justify-end">
          <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">Cookie Policy</a>
          <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  box-shadow: none;
}
</style>

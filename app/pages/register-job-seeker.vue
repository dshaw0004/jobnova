<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({ title: 'Create Jobseeker Account - Job Nova' })

import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { fetchUser } = useAuth()

const form = reactive({ email: '', password: '', confirmPassword: '' })
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
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: { email: form.email, password: form.password }
    })
    await fetchUser()
    router.push('/register-job-seeker-step-2')
  }
  catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    errorMsg.value = e?.data?.message ?? 'Something went wrong. Please try again.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Header -->
    <header class="w-full sticky top-0 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
      <nav class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
        <NuxtLink to="/" class="font-headline-md text-headline-md font-bold text-primary">
          Job Nova
        </NuxtLink>
        <NuxtLink to="/login" class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
          Already have an account? <span class="text-primary font-semibold">Login</span>
        </NuxtLink>
      </nav>
    </header>

    <!-- Main -->
    <main class="flex-1 flex items-center justify-center py-xl px-gutter">
      <div class="w-full max-w-[520px]">

        <!-- Progress Indicator -->
        <div class="mb-lg">
          <div class="flex justify-between items-center mb-sm">
            <span class="font-label-md text-label-md text-primary font-semibold">Step 1 of 2</span>
            <span class="font-label-md text-label-md text-on-surface-variant">Create Account</span>
          </div>
          <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div class="bg-primary h-full rounded-full transition-all duration-500 w-1/2" />
          </div>
        </div>

        <!-- Card -->
        <div class="bg-surface-container-lowest rounded-2xl p-lg md:p-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
          <!-- Heading -->
          <div class="mb-xl">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md">
              <UIcon name="i-lucide-user-plus" class="text-primary text-[24px]" />
            </div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">
              Create your account
            </h1>
            <p class="font-body-md text-body-md text-on-surface-variant">
              Step 2 is a quick AI-powered interview to build your profile — it takes about 5 minutes.
            </p>
          </div>

          <!-- Form -->
          <form class="space-y-md" @submit.prevent="handleRegister">
            <!-- Email -->
            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="email">Email Address</label>
              <div class="relative">
                <UIcon name="i-lucide-mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  autocomplete="email"
                  class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border border-transparent rounded-xl font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                >
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="password">Password</label>
              <div class="relative">
                <UIcon name="i-lucide-lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Min. 8 characters"
                  required
                  autocomplete="new-password"
                  class="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border border-transparent rounded-xl font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                >
                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  @click="showPassword = !showPassword"
                >
                  <UIcon :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="text-[18px]" />
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-xs">
              <label class="font-label-md text-label-md text-on-surface" for="confirmPassword">Confirm Password</label>
              <div class="relative">
                <UIcon name="i-lucide-lock-keyhole" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[18px]" />
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Re-enter your password"
                  required
                  autocomplete="new-password"
                  class="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border border-transparent rounded-xl font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                >
                <button
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <UIcon :name="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" class="text-[18px]" />
                </button>
              </div>
            </div>

            <!-- Error message -->
            <div v-if="errorMsg" class="flex items-center gap-sm p-sm bg-error/10 text-error rounded-lg font-label-md text-label-md">
              <UIcon name="i-lucide-circle-alert" class="text-[16px] shrink-0" />
              {{ errorMsg }}
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full h-[56px] bg-primary text-on-primary rounded-xl font-headline-md text-[18px] font-semibold hover:bg-secondary active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-sm shadow-lg shadow-primary/20 mt-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <UIcon v-if="loading" name="i-lucide-loader-circle" class="text-[20px] animate-spin" />
              <span>{{ loading ? 'Creating account…' : 'Create Account & Continue' }}</span>
              <UIcon v-if="!loading" name="i-lucide-arrow-right" class="text-[20px]" />
            </button>
          </form>

          <!-- What's next callout -->
          <div class="mt-lg pt-lg border-t border-outline-variant/30 flex items-start gap-sm">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <UIcon name="i-lucide-bot" class="text-primary text-[16px]" />
            </div>
            <div>
              <p class="font-label-md text-label-md text-on-surface font-semibold mb-xs">
                Next: AI Interview
              </p>
              <p class="font-label-sm text-label-sm text-on-surface-variant">
                Our AI interviewer will ask you a few questions to build your profile and match you with the right opportunities.
              </p>
            </div>
          </div>
        </div>

        <!-- Background blobs -->
        <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary opacity-5 blur-[120px] rounded-full" />
          <div class="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-secondary opacity-5 blur-[100px] rounded-full" />
        </div>
      </div>
    </main>
  </div>
</template>

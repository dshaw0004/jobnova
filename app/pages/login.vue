<script setup lang="ts">
useHead({
  title: "Login | Job Nova",
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { fetchUser } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  errorMsg.value = ''
  loading.value = true

  try {
    const res = await $fetch<{
      success: boolean
      userId: number
      role: string
      profile: { completeness_score: number; onboarding_completed: number; onboarding_skipped: number } | null
    }>('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })

    // Fetch the user globally into the state
    await fetchUser()

    // Redirect depending on user role / profile completion
    const isJobseeker = res.role === 'jobseeker'
    if (isJobseeker && res.profile) {
      const score = res.profile.completeness_score
      const skipped = res.profile.onboarding_skipped
      const completed = res.profile.onboarding_completed

      if (score < 30 && !skipped && !completed) {
        router.push('/register-job-seeker-chat')
      } else {
        router.push('/jobseeker-dashboard')
      }
    } else {
      router.push('/manage-jobs-employer-dashboard')
    }
  }
  catch (err: any) {
    errorMsg.value = err.data?.message || 'Invalid email or password.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <main class="flex min-h-screen">
      <!-- Left Side: Visual/Brand Content -->
      <section
        class="hidden lg:flex w-1/2 relative overflow-hidden bg-primary items-center justify-center p-xl"
      >
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img
            class="w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="A premium professional workspace"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5s2H0OTyT_sLU6N0N0n9A8-lU9exRbiZh6B1kIQVkKqi41druqrAaVGDziJ3p68Ai7RF6f_N_9BO8fO1EGy4glc0VcyWcTFXee3BQsr0HMzpucn0hBGQQwSUwAMtGFJPDCC-BWFE5zHM_qQwTiTPuqTElFEpaDA5Yq9eyUUuMCSFdfokpTAk00DVcF5fc4AK6rLYlGFPK5Kjd-xUxSdRrE8RWhGI-B_L2bUSYzbHvXkwKcty7MfwBrGw5Ry-VeS5O3Dv42g0nBwu7"
          />
        </div>
        <div class="relative z-10 text-center">
          <div class="mb-sm flex justify-center">
            <span
              class="inline-flex items-center justify-center p-md bg-surface-container-lowest/10 rounded-full backdrop-blur-sm"
            >
              <UIcon
                name="i-lucide-history"
                class="text-on-primary text-[48px]"
              />
            </span>
          </div>
          <h1
            class="font-headline-lg text-headline-lg text-on-primary mb-md tracking-tight"
          >
            Welcome Back
          </h1>
          <p
            class="font-body-lg text-body-lg text-primary-fixed leading-relaxed max-w-md mx-auto"
          >
            Access your account and continue your career journey. Your next big
            opportunity is just one click away.
          </p>
          <!-- Trust Badge in Left Column -->
          <div
            class="mt-xl pt-xl border-t border-outline-variant/10 inline-flex items-center gap-sm text-primary-fixed font-label-md"
          >
            <UIcon name="i-lucide-verified-user" class="text-[20px]" />
            <span class="tracking-wide"
              >Trusted by over 10M+ Indian Professionals</span
            >
          </div>
        </div>
        <!-- Decorative Elements -->
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"
        ></div>
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-surface-container-lowest/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"
        ></div>
      </section>
      <!-- Right Side: Login Interaction -->
      <section
        class="w-full lg:w-1/2 flex items-center justify-center p-lg bg-surface"
      >
        <div class="w-full max-w-[480px]">
          <!-- Mobile Branding (Logo only visible on mobile/tablet) -->
          <div class="lg:hidden mb-xl flex items-center gap-sm">
            <UIcon
              name="i-lucide-rocket-launch"
              class="text-primary text-[32px]"
            />
            <span
              class="font-headline-md text-headline-md font-bold text-primary"
              >Job Nova</span
            >
          </div>
          <div
            class="bg-surface-container-lowest login-card-shadow rounded-2xl p-lg md:p-xl border border-outline-variant/30"
          >
            <header class="mb-lg">
              <h2
                class="font-headline-md text-headline-md text-on-surface mb-xs"
              >
                Login
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant">
                Enter your credentials to manage your career.
              </p>
            </header>
            <form class="space-y-lg" @submit.prevent="handleLogin">
              <!-- Email Field -->
              <div class="space-y-xs">
                <label
                  class="font-label-md text-label-md text-on-surface-variant block ml-xs"
                  for="email"
                  >Email Address</label
                >
                <div class="relative">
                  <input
                    id="email"
                    v-model="email"
                    class="w-full h-[52px] pl-4 pr-12 rounded-xl bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 transition-all font-body-md text-on-surface placeholder:text-outline"
                    placeholder="name@company.in"
                    required
                    type="email"
                  />
                  <UIcon
                    name="i-lucide-mail"
                    class="absolute right-md top-1/2 -translate-y-1/2 text-outline text-[20px]"
                  />
                </div>
              </div>
              <!-- Password Field -->
              <div class="space-y-xs">
                <div class="flex justify-between items-center px-xs">
                  <label
                    class="font-label-md text-label-md text-on-surface-variant"
                    for="password"
                    >Password</label
                  >
                  <NuxtLink
                    class="font-label-md text-label-md text-primary hover:underline transition-all"
                    to="/login"
                    >Forgot Password?</NuxtLink
                  >
                </div>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    class="w-full h-[52px] pl-4 pr-12 rounded-xl bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 transition-all font-body-md text-on-surface placeholder:text-outline"
                    placeholder="••••••••"
                    required
                    :type="showPassword ? 'text' : 'password'"
                  />
                  <button
                    class="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors flex items-center justify-center"
                    type="button"
                    @click="showPassword = !showPassword"
                  >
                    <UIcon
                      :name="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      class="text-[20px]"
                    />
                  </button>
                </div>
              </div>
              <!-- Remember Me -->
              <div class="flex items-center gap-sm px-xs">
                <input
                  id="remember"
                  class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
                  type="checkbox"
                />
                <label
                  class="font-body-md text-on-surface-variant cursor-pointer select-none"
                  for="remember"
                  >Remember Me</label
                >
              </div>

              <!-- Error message -->
              <div v-if="errorMsg" class="flex items-center gap-sm p-sm bg-error/10 text-error rounded-lg font-label-md text-label-md">
                <UIcon name="i-lucide-circle-alert" class="text-[16px] shrink-0" />
                {{ errorMsg }}
              </div>

              <!-- Login Button -->
              <button
                class="w-full h-[56px] bg-primary text-on-primary rounded-xl font-headline-md text-[18px] hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                :disabled="loading"
              >
                <UIcon v-if="loading" name="i-lucide-loader-circle" class="text-[20px] animate-spin mr-2" />
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
              <!-- OR Divider -->
              <div class="relative py-md">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-outline-variant/30"></div>
                </div>
                <div
                  class="relative flex justify-center text-label-sm uppercase tracking-widest text-outline"
                >
                  <span class="bg-surface-container-lowest px-md">OR</span>
                </div>
              </div>
              <!-- Social Login -->
              <button
                class="w-full h-[52px] flex items-center justify-center gap-md rounded-xl border border-outline-variant hover:bg-surface-container-low active:scale-[0.98] transition-all"
                type="button"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span class="font-label-md text-on-surface"
                  >Continue with Google</span
                >
              </button>
            </form>
            <!-- Footer Link -->
            <footer class="mt-xl text-center">
              <p class="font-body-md text-on-surface-variant">
                Don't have an account?
                <NuxtLink
                  class="text-primary font-semibold hover:underline"
                  to="/register-choose-account-type"
                  >Register</NuxtLink
                >
              </p>
            </footer>
          </div>
          <!-- Trust Badge -->
          <div class="mt-lg flex items-center justify-center gap-sm">
            <div
              class="flex items-center gap-xs px-sm py-xs bg-surface-container-high rounded-full border border-outline-variant/50"
            >
              <UIcon
                name="i-lucide-badge-check"
                class="text-[18px] text-primary"
              />
              <span class="font-label-sm text-on-surface-variant"
                >Secure Login · ISO 27001 Certified</span
              >
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
h1,
h2,
h3 {
  font-family: "Hanken Grotesk", sans-serif;
}

.login-card-shadow {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
</style>

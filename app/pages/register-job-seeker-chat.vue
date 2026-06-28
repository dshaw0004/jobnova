<script setup lang="ts">
useHead({ title: 'AI Interview — Build Your Profile | Job Nova' })

import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ProfileState {
  full_name: string | null
  about_self: string | null
  academic_info: unknown[] | null
  professional_info: unknown[] | null
  sector: string | null
  sector_reason: string | null
  team_scenario_answer: string | null
  completeness_score: number
}

// ─── State ─────────────────────────────────────────────────────────────────────
const messages = ref<Message[]>([])
const inputText = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const profile = reactive<ProfileState>({
  full_name: null,
  about_self: null,
  academic_info: null,
  professional_info: null,
  sector: null,
  sector_reason: null,
  team_scenario_answer: null,
  completeness_score: 0
})

// ─── Computed ──────────────────────────────────────────────────────────────────
const progressPercent = computed(() => profile.completeness_score)
const canSkip = computed(() => profile.completeness_score >= 30)

const profileFields = computed(() => [
  {
    key: 'full_name',
    label: 'Full Name',
    icon: 'i-lucide-user',
    done: !!profile.full_name,
    value: profile.full_name
  },
  {
    key: 'about_self',
    label: 'About Yourself',
    icon: 'i-lucide-file-text',
    done: !!profile.about_self,
    value: profile.about_self ? profile.about_self.substring(0, 60) + '…' : null
  },
  {
    key: 'academic_info',
    label: 'Academic Background',
    icon: 'i-lucide-graduation-cap',
    done: !!(profile.academic_info && (profile.academic_info as unknown[]).length > 0),
    value: profile.academic_info && (profile.academic_info as unknown[]).length > 0
      ? `${(profile.academic_info as unknown[]).length} record(s) captured`
      : null
  },
  {
    key: 'professional_info',
    label: 'Work Experience',
    icon: 'i-lucide-briefcase',
    done: !!(profile.professional_info && (profile.professional_info as unknown[]).length > 0),
    value: profile.professional_info && (profile.professional_info as unknown[]).length > 0
      ? `${(profile.professional_info as unknown[]).length} record(s) captured`
      : null
  },
  {
    key: 'sector',
    label: 'Target Sector',
    icon: 'i-lucide-building-2',
    done: !!profile.sector,
    value: profile.sector
  },
  {
    key: 'sector_reason',
    label: 'Sector Motivation',
    icon: 'i-lucide-target',
    done: !!profile.sector_reason,
    value: null
  },
  {
    key: 'team_scenario_answer',
    label: 'Team Collaboration',
    icon: 'i-lucide-users',
    done: !!profile.team_scenario_answer,
    value: null
  }
])

// ─── Functions ─────────────────────────────────────────────────────────────────
function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

async function loadHistory() {
  try {
    const res = await $fetch<{ messages: { role: string; content: string; created_at: string }[] }>(
      '/api/chat/history'
    )
    if (res.messages.length > 0) {
      messages.value = res.messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: new Date(m.created_at)
      }))
      await scrollToBottom()
    }
    else {
      // First visit — trigger AI greeting
      await triggerGreeting()
    }
  }
  catch {
    // Not authenticated — redirect to register
    router.push('/register-job-seeker')
  }
}

async function loadProfile() {
  try {
    const res = await $fetch<ProfileState>('/api/profile')
    Object.assign(profile, res)
  }
  catch {
    // Profile not found yet — keep defaults
  }
}

async function triggerGreeting() {
  // Send an empty first message to kick off the interview
  isTyping.value = true
  await scrollToBottom()
  try {
    const res = await $fetch<{ reply: string; profile: Partial<ProfileState>; completeness: number }>(
      '/api/chat', {
        method: 'POST',
        body: { message: 'Hello, I am ready to begin.' }
      }
    )
    messages.value.push({ role: 'assistant', content: res.reply, timestamp: new Date() })
    await scrollToBottom()
  }
  catch (err) {
    console.error('Failed to trigger greeting:', err)
  }
  finally {
    isTyping.value = false
  }
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  // Add user message immediately
  messages.value.push({ role: 'user', content: text, timestamp: new Date() })
  inputText.value = ''
  isLoading.value = true
  isTyping.value = true
  await scrollToBottom()

  try {
    const res = await $fetch<{ reply: string; profile: Partial<ProfileState>; completeness: number }>(
      '/api/chat', {
        method: 'POST',
        body: { message: text }
      }
    )

    // Add AI reply
    messages.value.push({ role: 'assistant', content: res.reply, timestamp: new Date() })

    // Update profile state
    if (res.profile) {
      Object.assign(profile, res.profile)
    }
    if (typeof res.completeness === 'number') {
      profile.completeness_score = res.completeness
    }

    await scrollToBottom()
  }
  catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    messages.value.push({
      role: 'assistant',
      content: e?.data?.message ?? 'I encountered a hiccup. Could you please try again?',
      timestamp: new Date()
    })
    await scrollToBottom()
  }
  finally {
    isLoading.value = false
    isTyping.value = false
    await nextTick()
    inputRef.value?.focus()
  }
}

async function skipInterview() {
  try {
    // Mark as skipped in DB
    await $fetch('/api/profile/skip', { method: 'POST' })
  }
  catch {
    // best effort
  }
  router.push('/jobseeker-dashboard')
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

onMounted(async () => {
  await Promise.all([loadProfile(), loadHistory()])
  inputRef.value?.focus()
})
</script>

<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Header -->
    <header class="w-full sticky top-0 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
      <div class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
        <!-- Brand -->
        <NuxtLink to="/" class="font-headline-md text-headline-md font-bold text-primary">
          Job Nova
        </NuxtLink>

        <!-- Progress chip -->
        <div class="hidden sm:flex items-center gap-sm bg-primary/8 border border-primary/20 rounded-full px-md py-xs">
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span class="font-label-sm text-label-sm text-primary font-semibold">AI Interview in progress</span>
          <span class="font-label-sm text-label-sm text-on-surface-variant">{{ progressPercent }}% complete</span>
        </div>

        <!-- Skip -->
        <button
          v-if="canSkip"
          class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs"
          @click="skipInterview"
        >
          <span>Skip for now</span>
          <UIcon name="i-lucide-skip-forward" class="text-[16px]" />
        </button>
        <span v-else class="font-label-sm text-label-sm text-on-surface-variant opacity-60">
          Skip unlocks soon
        </span>
      </div>
    </header>

    <!-- Main layout -->
    <div class="flex-1 flex max-w-7xl mx-auto w-full px-lg gap-lg py-lg">

      <!-- ── Chat Panel ── -->
      <main class="flex-1 flex flex-col min-h-0">
        <!-- Step label -->
        <div class="mb-md">
          <div class="flex justify-between items-center mb-sm">
            <span class="font-label-md text-label-md text-primary font-semibold">Step 2 of 2</span>
            <span class="font-label-md text-label-md text-on-surface-variant">AI Profile Interview</span>
          </div>
          <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div
              class="bg-primary h-full rounded-full transition-all duration-700"
              :style="`width: ${progressPercent}%`"
            />
          </div>
        </div>

        <!-- Chat card -->
        <div class="flex-1 flex flex-col bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 overflow-hidden">

          <!-- Messages -->
          <div
            ref="messagesContainer"
            class="flex-1 overflow-y-auto p-lg space-y-md scroll-smooth"
            style="max-height: calc(100vh - 280px);"
          >
            <!-- Welcome banner (shown before any messages) -->
            <div v-if="messages.length === 0 && !isTyping" class="flex flex-col items-center justify-center py-xl text-center">
              <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-md animate-bounce-slow">
                <UIcon name="i-lucide-bot" class="text-primary text-[32px]" />
              </div>
              <h2 class="font-headline-md text-headline-md text-on-surface mb-sm">
                Meet Aria, your AI interviewer
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Aria will ask you a few questions to build your profile. This usually takes about 5 minutes.
              </p>
            </div>

            <!-- Message bubbles -->
            <template v-for="(msg, idx) in messages" :key="idx">
              <!-- AI Message -->
              <div v-if="msg.role === 'assistant'" class="flex items-end gap-sm">
                <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-bot" class="text-on-primary text-[16px]" />
                </div>
                <div class="max-w-[75%]">
                  <div class="bg-surface-container-low rounded-2xl rounded-bl-sm px-md py-sm shadow-sm">
                    <p class="font-body-md text-body-md text-on-surface whitespace-pre-wrap leading-relaxed">
                      {{ msg.content }}
                    </p>
                  </div>
                  <p class="font-label-sm text-label-sm text-outline mt-xs ml-xs">
                    Aria · {{ formatTime(msg.timestamp) }}
                  </p>
                </div>
              </div>

              <!-- User Message -->
              <div v-else class="flex items-end gap-sm justify-end">
                <div class="max-w-[75%]">
                  <div class="bg-primary rounded-2xl rounded-br-sm px-md py-sm shadow-sm shadow-primary/20">
                    <p class="font-body-md text-body-md text-on-primary whitespace-pre-wrap leading-relaxed">
                      {{ msg.content }}
                    </p>
                  </div>
                  <p class="font-label-sm text-label-sm text-outline mt-xs mr-xs text-right">
                    You · {{ formatTime(msg.timestamp) }}
                  </p>
                </div>
                <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-user" class="text-secondary text-[16px]" />
                </div>
              </div>
            </template>

            <!-- Typing indicator -->
            <div v-if="isTyping" class="flex items-end gap-sm">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-bot" class="text-on-primary text-[16px]" />
              </div>
              <div class="bg-surface-container-low rounded-2xl rounded-bl-sm px-md py-sm shadow-sm">
                <div class="flex items-center gap-xs">
                  <span class="w-2 h-2 rounded-full bg-outline animate-bounce" style="animation-delay: 0ms" />
                  <span class="w-2 h-2 rounded-full bg-outline animate-bounce" style="animation-delay: 150ms" />
                  <span class="w-2 h-2 rounded-full bg-outline animate-bounce" style="animation-delay: 300ms" />
                </div>
              </div>
            </div>
          </div>

          <!-- Input area -->
          <div class="p-md border-t border-outline-variant/30 bg-surface-container-lowest">
            <div class="flex items-end gap-sm">
              <div class="flex-1 relative">
                <input
                  id="chat-input"
                  ref="inputRef"
                  v-model="inputText"
                  type="text"
                  placeholder="Type your answer and press Enter…"
                  :disabled="isLoading"
                  class="w-full h-[52px] px-md bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all disabled:opacity-50 pr-12"
                  @keydown="handleKeydown"
                >
              </div>
              <button
                :disabled="!inputText.trim() || isLoading"
                class="w-[52px] h-[52px] bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-secondary active:scale-95 transition-all duration-150 shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                @click="sendMessage"
              >
                <UIcon v-if="isLoading" name="i-lucide-loader-circle" class="text-[20px] animate-spin" />
                <UIcon v-else name="i-lucide-send-horizontal" class="text-[20px]" />
              </button>
            </div>
            <p class="font-label-sm text-label-sm text-outline text-center mt-xs">
              Press <kbd class="bg-surface-container-high rounded px-1 py-0.5 font-mono text-[11px]">Enter</kbd> to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>

      <!-- ── Profile Extraction Sidebar ── -->
      <aside class="hidden lg:flex flex-col w-[300px] shrink-0 gap-md">

        <!-- Aria profile card -->
        <div class="bg-primary rounded-2xl p-lg text-center">
          <div class="w-14 h-14 rounded-full bg-surface-container-lowest/20 flex items-center justify-center mx-auto mb-sm">
            <UIcon name="i-lucide-bot" class="text-on-primary text-[28px]" />
          </div>
          <h2 class="font-headline-md text-headline-md text-on-primary font-bold">Aria</h2>
          <p class="font-label-sm text-label-sm text-primary-fixed mt-xs">AI Profile Interviewer</p>
          <p class="font-label-sm text-label-sm text-primary-fixed mt-sm opacity-80">
            Powered by Gemma 3 · Local AI
          </p>
        </div>

        <!-- Profile completeness -->
        <div class="bg-surface-container-lowest rounded-2xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30">
          <div class="flex items-center justify-between mb-md">
            <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">
              Profile
            </h3>
            <span class="font-label-sm text-label-sm bg-primary/10 text-primary rounded-full px-sm py-xs font-semibold">
              {{ progressPercent }}%
            </span>
          </div>

          <!-- Radial progress ring -->
          <div class="flex justify-center mb-lg">
            <div class="relative w-24 h-24">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-surface-variant)" stroke-width="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="var(--color-primary)"
                  stroke-width="8"
                  stroke-linecap="round"
                  :stroke-dasharray="`${2 * Math.PI * 40}`"
                  :stroke-dashoffset="`${2 * Math.PI * 40 * (1 - progressPercent / 100)}`"
                  class="transition-all duration-700"
                />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="font-headline-md text-headline-md text-primary font-bold">{{ progressPercent }}%</span>
                <span class="font-label-sm text-label-sm text-outline">done</span>
              </div>
            </div>
          </div>

          <!-- Field checklist -->
          <div class="space-y-sm">
            <div
              v-for="field in profileFields"
              :key="field.key"
              class="flex items-start gap-sm"
            >
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300"
                :class="field.done ? 'bg-primary' : 'bg-surface-container-high'"
              >
                <UIcon
                  :name="field.done ? 'i-lucide-check' : field.icon"
                  class="text-[12px] transition-all"
                  :class="field.done ? 'text-on-primary' : 'text-outline'"
                />
              </div>
              <div class="min-w-0">
                <p
                  class="font-label-md text-label-md transition-colors"
                  :class="field.done ? 'text-on-surface' : 'text-on-surface-variant'"
                >
                  {{ field.label }}
                </p>
                <p v-if="field.done && field.value" class="font-label-sm text-label-sm text-primary truncate">
                  {{ field.value }}
                </p>
              </div>
            </div>
          </div>

          <!-- Skip button -->
          <div class="mt-lg pt-lg border-t border-outline-variant/30">
            <button
              :disabled="!canSkip"
              class="w-full h-[44px] border border-outline-variant rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-xs"
              @click="skipInterview"
            >
              <UIcon name="i-lucide-skip-forward" class="text-[16px]" />
              {{ canSkip ? 'Continue to Dashboard' : 'Answer more to skip' }}
            </button>
            <p v-if="!canSkip" class="font-label-sm text-label-sm text-outline text-center mt-xs">
              Skip unlocks after 30% completion
            </p>
          </div>
        </div>

        <!-- Tips card -->
        <div class="bg-surface-container-low rounded-2xl p-md border border-outline-variant/30">
          <div class="flex items-center gap-sm mb-sm">
            <UIcon name="i-lucide-lightbulb" class="text-tertiary text-[18px]" />
            <p class="font-label-md text-label-md text-on-surface font-semibold">Pro Tips</p>
          </div>
          <ul class="space-y-xs font-label-sm text-label-sm text-on-surface-variant">
            <li class="flex items-start gap-xs">
              <span class="text-primary mt-0.5">•</span> Be specific — mention company names, project details, and dates
            </li>
            <li class="flex items-start gap-xs">
              <span class="text-primary mt-0.5">•</span> Detailed answers unlock better job matches
            </li>
            <li class="flex items-start gap-xs">
              <span class="text-primary mt-0.5">•</span> You can always return and complete your profile later
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- Background blobs -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary opacity-3 blur-[140px] rounded-full" />
      <div class="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-secondary opacity-3 blur-[120px] rounded-full" />
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce-slow {
  animation: bounce-slow 2.5s ease-in-out infinite;
}
</style>

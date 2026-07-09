<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false
})

useHead({ title: 'AI Screening Interview | Job Nova' })

const router = useRouter()
const route = useRoute()
const { user, fetchUser } = useAuth()

const jobId = computed(() => Number(route.query.jobId))

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// ─── State ─────────────────────────────────────────────────────────────────────
const messages = ref<Message[]>([])
const inputText = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const isCompleted = ref(false)
const jobTitle = ref('')
const companyName = ref('')

const messagesContainer = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

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

async function initializeScreening() {
  if (!jobId.value) {
    alert('Invalid Job ID. Redirecting to dashboard...')
    router.push('/jobseeker-dashboard')
    return
  }

  isLoading.value = true
  isTyping.value = true
  try {
    const res = await $fetch<{
      success: boolean
      completed: boolean
      reply?: string
      chatHistory?: { role: string; content: string }[]
      jobTitle: string
      companyName: string
    }>('/api/jobs/screening', {
      method: 'POST',
      body: { jobId: jobId.value }
    })

    jobTitle.value = res.jobTitle
    companyName.value = res.companyName

    if (res.chatHistory && res.chatHistory.length > 0) {
      messages.value = res.chatHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: new Date()
      }))
    }

    if (res.completed) {
      isCompleted.value = true
    }

    await scrollToBottom()
  } catch (err: any) {
    console.error('Failed to initialize screening:', err)
    alert(err.data?.message || 'Failed to start AI screening interview.')
    router.push('/jobseeker-dashboard')
  } finally {
    isLoading.value = false
    isTyping.value = false
  }
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value || isCompleted.value) return

  // Add user message to local array immediately
  messages.value.push({ role: 'user', content: text, timestamp: new Date() })
  inputText.value = ''
  isLoading.value = true
  isTyping.value = true
  await scrollToBottom()

  try {
    const res = await $fetch<{
      success: boolean
      completed: boolean
      reply: string
      chatHistory: { role: string; content: string }[]
      jobTitle: string
      companyName: string
    }>('/api/jobs/screening', {
      method: 'POST',
      body: { jobId: jobId.value, message: text }
    })

    // Update messages from returned history or append reply
    if (res.chatHistory) {
      messages.value = res.chatHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
        timestamp: new Date()
      }))
    }

    if (res.completed) {
      isCompleted.value = true
    }

    await scrollToBottom()
  } catch (err: any) {
    console.error('Failed to send message:', err)
    messages.value.push({
      role: 'assistant',
      content: err.data?.message || 'I encountered a connection issue. Could you please try repeating your response?',
      timestamp: new Date()
    })
    await scrollToBottom()
  } finally {
    isLoading.value = false
    isTyping.value = false
    await nextTick()
    inputRef.value?.focus()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

onMounted(async () => {
  await fetchUser()
  if (!user.value || user.value.role !== 'jobseeker') {
    router.push('/login')
    return
  }
  await initializeScreening()
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
        <div class="flex items-center gap-sm bg-primary/8 border border-primary/20 rounded-full px-md py-xs">
          <div :class="['w-2 h-2 rounded-full', isCompleted ? 'bg-green-600' : 'bg-primary animate-pulse']" />
          <span class="font-label-sm text-label-sm text-primary font-semibold">
            {{ isCompleted ? 'Screening Completed' : 'AI Screening Interview' }}
          </span>
        </div>

        <!-- Exit -->
        <NuxtLink
          to="/jobseeker-dashboard"
          class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs"
        >
          <span>Exit Interview</span>
          <UIcon name="i-lucide-log-out" class="text-[16px]" />
        </NuxtLink>
      </div>
    </header>

    <!-- Main layout -->
    <div class="flex-1 flex max-w-7xl mx-auto w-full px-lg gap-lg py-lg min-h-0">

      <!-- ── Chat Panel ── -->
      <main class="flex-1 flex flex-col min-h-0">
        <!-- Job Banner -->
        <div class="mb-md bg-surface-container-low p-md rounded-2xl border border-outline-variant/30 flex justify-between items-center shadow-sm">
          <div>
            <span class="text-xs text-primary font-bold uppercase tracking-wider">Post-Application Screening</span>
            <h1 class="text-headline-md text-[20px] font-bold text-on-surface leading-tight mt-0.5">{{ jobTitle || 'Loading Position...' }}</h1>
            <p class="text-body-sm text-on-surface-variant mt-0.5">{{ companyName || 'Loading Company...' }}</p>
          </div>
          <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-briefcase" class="text-primary text-[24px]" />
          </div>
        </div>

        <!-- Chat card -->
        <div class="flex-1 flex flex-col bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 overflow-hidden">

          <!-- Messages -->
          <div
            ref="messagesContainer"
            class="flex-1 overflow-y-auto p-lg space-y-md scroll-smooth"
            style="max-height: calc(100vh - 300px);"
          >
            <!-- Welcome banner (shown before any messages) -->
            <div v-if="messages.length === 0 && !isTyping" class="flex flex-col items-center justify-center py-xl text-center">
              <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-md animate-bounce-slow">
                <UIcon name="i-lucide-bot" class="text-primary text-[32px]" />
              </div>
              <h2 class="font-headline-md text-headline-md text-on-surface mb-sm">
                Meet Aria, your Screening Assistant
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Aria will ask you a few screening questions regarding your application. This takes about 3-5 minutes.
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
            <!-- Completed Screen -->
            <div v-if="isCompleted" class="bg-green-500/10 border border-green-500/20 p-lg rounded-xl text-center space-y-md">
              <div class="flex items-center justify-center gap-sm text-green-700 font-bold">
                <UIcon name="i-lucide-check-circle" class="text-[24px]" />
                <span class="font-headline-md text-[18px]">Screening Interview Completed</span>
              </div>
              <p class="text-body-md text-on-surface-variant max-w-lg mx-auto">
                Thank you! Your responses have been processed and safely stored for the employer to review. You are all set.
              </p>
              <NuxtLink
                to="/jobseeker-dashboard"
                class="inline-block bg-primary text-on-primary font-label-md text-label-md px-xl py-3 rounded-xl hover:bg-primary-container hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Go to Dashboard
              </NuxtLink>
            </div>

            <!-- Normal input -->
            <div v-else class="flex items-end gap-sm">
              <div class="flex-1 relative">
                <input
                  id="chat-input"
                  ref="inputRef"
                  v-model="inputText"
                  type="text"
                  placeholder="Type your reply and press Enter…"
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
            <p v-if="!isCompleted" class="font-label-sm text-label-sm text-outline text-center mt-xs">
              Press <kbd class="bg-surface-container-high rounded px-1 py-0.5 font-mono text-[11px]">Enter</kbd> to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </main>

      <!-- ── Sidebar ── -->
      <aside class="hidden lg:flex flex-col w-[300px] shrink-0 gap-md">
        <!-- Aria Card -->
        <div class="bg-primary rounded-2xl p-lg text-center text-on-primary relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-surface-container-lowest/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div class="w-14 h-14 rounded-full bg-surface-container-lowest/20 flex items-center justify-center mx-auto mb-sm relative z-10">
            <UIcon name="i-lucide-bot" class="text-on-primary text-[28px]" />
          </div>
          <h2 class="font-headline-md text-headline-md text-on-primary font-bold relative z-10">Aria</h2>
          <p class="font-label-sm text-label-sm text-primary-fixed mt-xs relative z-10">AI Recruitment Assistant</p>
          <p class="font-label-sm text-label-sm text-primary-fixed-dim mt-sm opacity-80 relative z-10">
            Post-application screening tool
          </p>
        </div>

        <!-- Instructions -->
        <div class="bg-surface-container-lowest rounded-2xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant/30 space-y-md">
          <div class="flex items-center gap-sm">
            <UIcon name="i-lucide-lightbulb" class="text-tertiary text-[20px]" />
            <h3 class="font-headline-md text-headline-md text-on-surface font-semibold">Important Tips</h3>
          </div>
          <ul class="space-y-sm font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
            <li class="flex items-start gap-xs">
              <span class="text-primary mt-0.5">•</span> Provide specific examples of tasks you've handled.
            </li>
            <li class="flex items-start gap-xs">
              <span class="text-primary mt-0.5">•</span> Keep your answers concise and answer precisely what is asked.
            </li>
            <li class="flex items-start gap-xs">
              <span class="text-primary mt-0.5">•</span> Take your time. You can exit and return later to finish.
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

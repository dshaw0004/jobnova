<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: false
})

useHead({
  title: "Job Nova — AI Job Agent",
})

const router = useRouter()
const { user, profile, fetchUser, logout } = useAuth()

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])
const inputText = ref('')
const isLoading = ref(false)
const chatContainerRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
  }
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  inputText.value = ''
  messages.value.push({ role: 'user', content: text })
  scrollToBottom()
  isLoading.value = true

  try {
    const data = await $fetch<{ reply: string }>('/api/agent', {
      method: 'POST',
      body: { message: text }
    })

    if (data) {
      messages.value.push({ role: 'assistant', content: data.reply })
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    messages.value.push({ role: 'assistant', content: 'An unexpected error occurred.' })
  } finally {
    isLoading.value = false
    scrollToBottom()
    await nextTick()
    inputRef.value?.focus()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

onMounted(async () => {
  if (!user.value) {
    await fetchUser()
  }
  if (!user.value) {
    router.push('/login')
    return
  }

  // Fetch initial message history
  try {
    const history = await $fetch<Message[]>('/api/agent-history')
    if (history && history.length > 0) {
        messages.value = history
    } else {
        messages.value.push({
            role: 'assistant',
            content: "Hello! I'm your AI Job Agent. I can help you find jobs, check job details, and even apply on your behalf. What kind of roles are you looking for today?"
        })
    }
  } catch (err) {
      console.error("Failed to load history", err)
  }

  await nextTick()
  inputRef.value?.focus()
})

const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

</script>

<template>
  <div class="min-h-screen bg-surface flex">
    <!-- SideNavBar (Copied from dashboard) -->
    <nav class="hidden md:flex h-screen w-64 fixed left-0 top-0 shadow-[0px_4px_20px_rgba(26,115,232,0.08)] bg-surface flex-col py-6 border-r border-outline-variant/30 z-50">
      <div class="px-gutter mb-xl flex flex-col items-center text-center">
        <div class="w-20 h-20 rounded-full mb-md overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-[28px] shadow-sm">
          {{ profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U' }}
        </div>
        <h2 class="font-headline-md text-headline-md font-bold text-primary truncate max-w-full px-2">
          {{ profile?.full_name || 'Anonymous' }}
        </h2>
        <p class="font-label-md text-label-md text-on-surface-variant mt-xs">
          {{ profile?.sector || 'Jobseeker' }}
        </p>
      </div>
      <div class="flex-1 flex flex-col gap-sm">
        <NuxtLink
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all"
          to="/jobseeker-dashboard"
        >
          <UIcon name="i-lucide-layout-dashboard" class="text-[18px]" />
          <span class="font-body-md text-body-md">Dashboard</span>
        </NuxtLink>
        <NuxtLink
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all"
          to="/my-profile-dashboard"
        >
          <UIcon name="i-lucide-user" class="text-[18px]" />
          <span class="font-body-md text-body-md">My Profile</span>
        </NuxtLink>
        <NuxtLink
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all"
          to="/applied-jobs-dashboard"
        >
          <UIcon name="i-lucide-history" class="text-[18px]" />
          <span class="font-body-md text-body-md">Applied Jobs</span>
        </NuxtLink>
        <NuxtLink
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all"
          to="/selected-jobs-dashboard"
        >
          <UIcon name="i-lucide-check-circle" class="text-[18px]" />
          <span class="font-body-md text-body-md">Selected Jobs</span>
        </NuxtLink>
        <NuxtLink
          class="flex items-center gap-3 px-4 py-3 text-primary bg-secondary-container/10 border-r-4 border-primary font-bold hover:bg-surface-container-high transition-all"
          to="/job-agent"
        >
          <UIcon name="i-lucide-bot" class="text-[18px]" />
          <span class="font-body-md text-body-md">AI Job Agent</span>
        </NuxtLink>
      </div>
      <div class="mt-auto flex flex-col gap-sm border-t border-outline-variant/30 pt-md">
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 transition-all font-label-md text-label-md"
          @click="logout"
        >
          <UIcon name="i-lucide-log-out" class="text-[18px]" />
          <span class="text-left font-body-md text-body-md">Logout</span>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1 md:ml-64 h-screen flex flex-col bg-surface relative z-10">
      <!-- Header -->
      <header class="h-[72px] shrink-0 border-b border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-between px-lg z-20">
        <div class="flex items-center gap-md">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <UIcon name="i-lucide-bot" class="text-on-primary text-[20px]" />
          </div>
          <div>
            <h1 class="font-headline-sm text-headline-sm font-bold text-on-surface">AI Job Agent</h1>
            <p class="font-label-sm text-label-sm text-primary flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
        <NuxtLink to="/jobseeker-dashboard" class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label-md text-label-md">
           <UIcon name="i-lucide-x" class="text-[20px]" /> Close
        </NuxtLink>
      </header>

      <!-- Chat Container -->
      <div ref="chatContainerRef" class="flex-1 overflow-y-auto p-lg lg:px-[15%] space-y-lg scroll-smooth pb-[100px]">
        <div v-for="(msg, index) in messages" :key="index" class="flex flex-col">

          <div v-if="msg.role === 'assistant'" class="flex items-start gap-sm">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
              <UIcon name="i-lucide-bot" class="text-on-primary text-[16px]" />
            </div>
            <div class="max-w-[85%]">
              <div class="bg-surface-container-low rounded-2xl rounded-tl-sm px-md py-sm shadow-sm border border-outline-variant/20">
                <p class="font-body-md text-body-md text-on-surface whitespace-pre-wrap leading-relaxed prose prose-sm">{{ msg.content }}</p>
              </div>
              <p class="font-label-sm text-label-sm text-outline mt-xs ml-xs">
                Agent · {{ formatTime() }}
              </p>
            </div>
          </div>

          <div v-else class="flex items-end gap-sm justify-end">
            <div class="max-w-[85%]">
              <div class="bg-primary rounded-2xl rounded-br-sm px-md py-sm shadow-sm shadow-primary/20">
                <p class="font-body-md text-body-md text-on-primary whitespace-pre-wrap leading-relaxed">
                  {{ msg.content }}
                </p>
              </div>
              <p class="font-label-sm text-label-sm text-outline mt-xs mr-xs text-right">
                You · {{ formatTime() }}
              </p>
            </div>
            <div class="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-1">
              <UIcon name="i-lucide-user" class="text-secondary text-[16px]" />
            </div>
          </div>

        </div>

        <div v-if="isLoading" class="flex items-start gap-sm">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-bot" class="text-on-primary text-[16px]" />
          </div>
          <div class="bg-surface-container-low rounded-2xl rounded-tl-sm px-md py-sm shadow-sm border border-outline-variant/20">
            <div class="flex items-center gap-xs">
              <span class="w-2 h-2 rounded-full bg-outline animate-bounce" style="animation-delay: 0ms" />
              <span class="w-2 h-2 rounded-full bg-outline animate-bounce" style="animation-delay: 150ms" />
              <span class="w-2 h-2 rounded-full bg-outline animate-bounce" style="animation-delay: 300ms" />
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-md border-t border-outline-variant/30 bg-surface-container-lowest lg:px-[15%]">
        <div class="flex items-end gap-sm">
          <div class="flex-1 relative">
            <input
              id="agent-input"
              ref="inputRef"
              v-model="inputText"
              type="text"
              placeholder="Ask me to find jobs, show details, or apply..."
              :disabled="isLoading"
              class="w-full h-[52px] px-md bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all disabled:opacity-50"
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
      </div>
    </main>
  </div>
</template>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>

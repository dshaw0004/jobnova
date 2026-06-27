<script setup>
useHead({
  title: "Login - Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Subtle entrance animation for the card
          document.addEventListener('DOMContentLoaded', () => {
              const card = document.querySelector('.bg-surface-container-lowest');
              card.classList.add('animate-in', 'fade-in', 'zoom-in-95', 'duration-700');
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Top AppBar (Simplified for Login) -->
    <header class="fixed top-0 left-0 w-full h-[72px] bg-surface flex items-center px-lg z-50">
    <div class="w-full max-w-container-max mx-auto flex justify-between items-center">
    <div class="font-headline-md text-headline-md font-bold text-primary">Job Nova</div>
    <a class="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md group" href="/">
    <UIcon name="i-lucide-arrow-left" class="text-[20px] group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </a>
    </div>
    </header>
    <main class="w-full max-w-[480px] px-md py-xl mt-[72px]">
    <!-- Status Alert Banner -->
    <div class="mb-lg animate-in fade-in slide-in-from-top-4 duration-500">
    <div class="bg-tertiary-fixed text-on-tertiary-fixed p-md rounded-xl shadow-premium border border-tertiary-container/20 flex gap-md">
    <div class="flex-shrink-0">
    <UIcon name="i-lucide-info" class="text-tertiary" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div class="flex flex-col gap-xs">
    <h2 class="font-label-md text-label-md font-bold">Account Pending Approval</h2>
    <p class="text-label-sm leading-relaxed opacity-90">
                            Your employer account is still under review. You will be able to log in once our team has verified your details. Need help? <a class="underline font-bold hover:text-primary transition-colors" href="#">Contact support.</a>
    </p>
    </div>
    </div>
    </div>
    <!-- Login Card -->
    <div class="bg-surface-container-lowest p-xl rounded-xl shadow-premium border border-outline-variant/30">
    <div class="text-center mb-lg">
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Welcome Back</h1>
    <p class="text-on-surface-variant font-body-md">Sign in to manage your company profile and jobs.</p>
    </div>
    <form class="space-y-lg" onsubmit="event.preventDefault();">
    <!-- Email Field -->
    <div class="space-y-sm">
    <label class="block font-label-md text-label-md text-on-surface" for="email">Email Address</label>
    <div class="relative group">
    <UIcon name="i-lucide-mail" class="absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
    <input class="w-full h-[56px] pl-[48px] pr-md bg-surface-container-low border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface transition-all outline-none text-on-surface-variant" id="email" readonly="" type="email" value="recruiter@futurecorp.in">
    </div>
    </div>
    <!-- Password Field -->
    <div class="space-y-sm">
    <div class="flex justify-between items-center">
    <label class="block font-label-md text-label-md text-on-surface" for="password">Password</label>
    <a class="text-primary font-label-sm text-label-sm hover:underline" href="#">Forgot password?</a>
    </div>
    <div class="relative group">
    <UIcon name="i-lucide-lock" class="absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
    <input class="w-full h-[56px] pl-[48px] pr-md bg-surface-container-low border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface transition-all outline-none text-on-surface-variant" id="password" readonly="" type="password" value="••••••••••••">
    <UIcon name="i-lucide-eye-off" class="absolute right-md top-1/2 -translate-y-1/2 text-outline cursor-pointer hover:text-on-surface" />
    </div>
    </div>
    <!-- Action Button -->
    <button class="w-full h-[56px] bg-outline-variant text-on-surface-variant font-label-md text-label-md rounded-xl cursor-not-allowed flex items-center justify-center gap-sm" disabled="" type="submit">
                        Sign In
                    </button>
    <div class="relative py-md">
    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-outline-variant"></div></div>
    <div class="relative flex justify-center text-label-sm uppercase"><span class="bg-surface-container-lowest px-md text-outline">New to Job Nova?</span></div>
    </div>
    <a class="w-full h-[56px] border border-outline-variant text-primary font-label-md text-label-md rounded-xl hover:bg-surface-container transition-all flex items-center justify-center active:scale-[0.98]" href="#">
                        Register as an Employer
                    </a>
    </form>
    </div>
    <!-- Support Info -->
    <div class="mt-lg text-center space-y-md">
    <p class="text-on-surface-variant font-label-sm text-label-sm">
                    Expected verification time: <span class="font-bold text-on-surface">24-48 business hours</span>
    </p>
    <div class="flex justify-center gap-lg">
    <a class="text-outline hover:text-primary transition-colors flex items-center gap-xs" href="#">
    <UIcon name="i-lucide-help-outline" class="text-[18px]" />
                        Help Center
                    </a>
    <a class="text-outline hover:text-primary transition-colors flex items-center gap-xs" href="#">
    <UIcon name="i-lucide-chat-bubble-outline" class="text-[18px]" />
                        Support Chat
                    </a>
    </div>
    </div>
    </main>
    <!-- Background Decorative Element -->
    <div class="fixed top-0 right-0 -z-10 opacity-20 pointer-events-none translate-x-1/4 -translate-y-1/4">
    <div class="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/10 blur-[120px]"></div>
    </div>
    <div class="fixed bottom-0 left-0 -z-10 opacity-20 pointer-events-none -translate-x-1/4 translate-y-1/4">
    <div class="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-tertiary/20 to-primary/5 blur-[100px]"></div>
    </div>
    <!-- Micro-interaction Script -->
    
  </div>
</template>

<style scoped>
body {
            background-color: #f9f9ff;
            color: #191c23;
            -webkit-font-smoothing: antialiased;
        }
        
        .login-glass {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .shadow-premium {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
</style>

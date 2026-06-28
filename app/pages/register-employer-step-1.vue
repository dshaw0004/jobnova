<script setup>
useHead({
  title: "Job Nova | Employer Registration"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  document.getElementById('employer-registration').addEventListener('submit', function(e) {
              e.preventDefault();
              // In a real app, this would trigger navigation to Step 2 or form validation
              const btn = e.target.querySelector('button');
              const originalContent = btn.innerHTML;
              
              btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Processing...';
              btn.classList.add('opacity-80', 'pointer-events-none');
              
              setTimeout(() => {
                  btn.innerHTML = originalContent;
                  btn.classList.remove('opacity-80', 'pointer-events-none');
                  alert('Account details saved. Proceeding to Step 2: Company Verification.');
              }, 1200);
          });
  
          // Dynamic icon styling on focus
          const inputs = document.querySelectorAll('input');
          inputs.forEach(input => {
              input.addEventListener('focus', () => {
                  input.parentElement.classList.add('border-primary');
              });
              input.addEventListener('blur', () => {
                  input.parentElement.classList.remove('border-primary');
              });
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Top Navigation Bar (Simplified for focused flow) -->
    <header class="w-full bg-surface-container-lowest z-50">
    <div class="max-w-7xl mx-auto px-gutter flex justify-between items-center h-20">
    <div class="font-headline-md text-headline-md font-bold text-primary">Job Nova</div>
    <div class="hidden md:flex gap-md">
    <a class="text-on-surface-variant font-medium hover:text-primary transition-colors" href="/">Support</a>
    </div>
    </div>
    </header>
    <!-- Main Registration Section -->
    <main class="flex-grow flex items-center justify-center py-xl px-gutter relative">
    <!-- Abstract background element for visual interest -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-10 pointer-events-none">
    
    </div>
    <div class="w-full max-w-[480px] z-10">
    <!-- Registration Card -->
    <div class="bg-surface-container-lowest rounded-lg form-shadow p-md md:p-xl border border-outline-variant/30">
    <!-- Header & Progress -->
    <div class="mb-lg">
    <div class="flex justify-between items-end mb-sm">
    <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Company Account Setup</h1>
    <span class="text-primary font-label-md bg-primary-fixed/30 px-3 py-1 rounded-full">Step 1 of 2</span>
    </div>
    <p class="text-on-surface-variant font-body-md">Create your employer account to start hiring candidates.</p>
    </div>
    <!-- Registration Form -->
    <form class="space-y-md" id="employer-registration">
    <!-- Company Name -->
    <div class="space-y-xs">
    <label class="font-label-md text-on-surface-variant" for="company-name">Company Name</label>
    <div class="relative flex items-center group input-focus-ring border border-outline-variant bg-surface-container-low rounded-lg transition-all duration-200">
    <UIcon name="i-lucide-building" class="absolute left-4 text-outline group-focus-within:text-primary" />
    <input class="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 outline-none" id="company-name" placeholder="Enter your company's legal name" type="text"/>
    </div>
    </div>
    <!-- Business Email -->
    <div class="space-y-xs">
    <label class="font-label-md text-on-surface-variant" for="business-email">Business Email Address</label>
    <div class="relative flex items-center group input-focus-ring border border-outline-variant bg-surface-container-low rounded-lg transition-all duration-200">
    <UIcon name="i-lucide-mail" class="absolute left-4 text-outline group-focus-within:text-primary" />
    <input class="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 outline-none" id="business-email" placeholder="email@company.com" type="email"/>
    </div>
    </div>
    <!-- Phone Number -->
    <div class="space-y-xs">
    <label class="font-label-md text-on-surface-variant" for="phone-number">Phone Number</label>
    <div class="relative flex items-center group input-focus-ring border border-outline-variant bg-surface-container-low rounded-lg transition-all duration-200">
    <UIcon name="i-lucide-call" class="absolute left-4 text-outline group-focus-within:text-primary" />
    <div class="flex items-center w-full pl-12">
    <span class="text-on-surface-variant font-medium pr-2 border-r border-outline-variant/50">+91</span>
    <input class="w-full px-3 py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 outline-none" id="phone-number" placeholder="9876543210" type="tel"/>
    </div>
    </div>
    </div>
    <!-- Password Fields Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <!-- Password -->
    <div class="space-y-xs">
    <label class="font-label-md text-on-surface-variant" for="password">Password</label>
    <div class="relative flex items-center group input-focus-ring border border-outline-variant bg-surface-container-low rounded-lg transition-all duration-200">
    <UIcon name="i-lucide-lock" class="absolute left-4 text-outline group-focus-within:text-primary" />
    <input class="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 outline-none" id="password" placeholder="••••••••" type="password"/>
    </div>
    </div>
    <!-- Confirm Password -->
    <div class="space-y-xs">
    <label class="font-label-md text-on-surface-variant" for="confirm-password">Confirm Password</label>
    <div class="relative flex items-center group input-focus-ring border border-outline-variant bg-surface-container-low rounded-lg transition-all duration-200">
    <UIcon name="i-lucide-lock" class="absolute left-4 text-outline group-focus-within:text-primary" />
    <input class="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 outline-none" id="confirm-password" placeholder="••••••••" type="password"/>
    </div>
    </div>
    </div>
    <!-- CTA Button -->
    <button class="w-full bg-primary-container text-on-primary font-headline-md py-4 rounded-lg shadow-sm hover:brightness-110 transition-active transition-all duration-200 flex items-center justify-center gap-sm mt-lg" type="submit">
                            Continue
                            <UIcon name="i-lucide-arrow-right" />
    </button>
    <!-- Secondary Action -->
    <div class="text-center mt-md">
    <p class="text-on-surface-variant font-label-md">
                                Already have an account? 
                                <a class="text-primary font-bold hover:underline" href="/login">Login</a>
    </p>
    </div>
    </form>
    </div>
    <!-- Trust Badges (Aspirational content) -->
    <div class="mt-xl flex justify-center gap-xl items-center opacity-60">
    <div class="flex items-center gap-xs">
    <UIcon name="i-lucide-badge-check" class="text-outline" style="font-variation-settings: 'FILL' 1;" />
    <span class="text-label-sm text-outline uppercase tracking-wider">Trusted by 50k+ companies</span>
    </div>
    <div class="flex items-center gap-xs">
    <UIcon name="i-lucide-security" class="text-outline" style="font-variation-settings: 'FILL' 1;" />
    <span class="text-label-sm text-outline uppercase tracking-wider">Secure ISO Certified</span>
    </div>
    </div>
    </div>
    </main>
    <!-- Footer Component (Shared) -->
    <footer class="w-full py-xl bg-surface-container-lowest border-t border-outline-variant">
    <div class="max-w-7xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
    <div>
    <div class="font-headline-md text-headline-md font-bold text-on-surface mb-2">Job Nova</div>
    <p class="text-on-surface-variant font-label-md">© 2024 Job Nova. Premium Career Ecosystem.</p>
    </div>
    <div class="flex flex-wrap gap-md md:justify-end">
    <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="/">Privacy Policy</a>
    <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="/">Terms of Service</a>
    <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="/">Cookie Policy</a>
    <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="/">Support</a>
    <a class="text-on-surface-variant font-label-md hover:text-primary transition-colors" href="/">Contact</a>
    </div>
    </div>
    </footer>
    <!-- Simple validation/interaction logic -->
    
  </div>
</template>

<style scoped>

        .form-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .input-focus-ring:focus-within {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 1px var(--color-primary);
        }
        .transition-active:active {
            transform: scale(0.98);
        }
</style>

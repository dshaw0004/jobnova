<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: "Job Seeker Registration - Step 2 | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Simple micro-interaction for input fields
          document.querySelectorAll('input, select').forEach(el => {
              el.addEventListener('focus', () => {
                  el.parentElement.querySelector('label')?.classList.add('text-primary');
              });
              el.addEventListener('blur', () => {
                  el.parentElement.querySelector('label')?.classList.remove('text-primary');
              });
          });
  
          // Form submission prevention for demo
          document.querySelector('form').addEventListener('submit', (e) => {
              e.preventDefault();
              const btn = e.target.querySelector('button[type="submit"]');
              const originalContent = btn.innerHTML;
              btn.innerHTML = '<span class="material-symbols-outlined animate-spin" data-icon="progress_activity">progress_activity</span> Processing...';
              btn.disabled = true;
              
              setTimeout(() => {
                  btn.innerHTML = 'Account Created!';
                  btn.classList.remove('bg-primary');
                  btn.classList.add('bg-green-600');
              }, 1500);
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Top Navigation Bar -->
    <header class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
    <div class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary">
                    Job Nova
                </div>
    <nav class="hidden md:flex gap-lg items-center">
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Find Jobs</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Companies</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Salaries</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/my-career-hub">Career Advice</a>
    </nav>
    <div class="flex items-center gap-md">
    <button class="font-label-md text-label-md text-primary px-md py-sm rounded-lg hover:bg-surface-container-low transition-all">Login</button>
    <button class="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md text-label-md shadow-sm active:scale-95 duration-150">Post a Job</button>
    </div>
    </div>
    </header>
    <main class="max-w-7xl mx-auto px-lg py-xl flex flex-col items-center">
    <!-- Progress Container -->
    <div class="w-full max-w-[640px] mb-lg">
    <div class="flex justify-between items-end mb-sm">
    <span class="font-label-sm text-label-sm text-on-surface-variant">STEP 2 OF 2</span>
    <span class="font-label-sm text-label-sm text-primary font-semibold">50% Completed</span>
    </div>
    <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
    <div class="h-full w-full step-progress-bar"></div>
    </div>
    </div>
    <!-- Registration Card -->
    <div class="w-full max-w-[640px] bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] p-xl border border-outline-variant/30">
    <!-- Header Section -->
    <div class="mb-xl text-center md:text-left">
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Professional Information</h1>
    <p class="font-body-md text-body-md text-on-surface-variant">Help us match you with relevant jobs.</p>
    </div>
    <!-- Form Content -->
    <form class="space-y-lg">
    <!-- Experience & Skills Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">Experience Level</label>
    <select class="form-select w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all">
    <option value="">Select level</option>
    <option value="fresher">Fresher (0 years)</option>
    <option value="entry">Entry Level (1-3 years)</option>
    <option value="mid">Mid Level (3-7 years)</option>
    <option value="senior">Senior Level (7+ years)</option>
    </select>
    </div>
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">Skills</label>
    <div class="flex flex-wrap gap-2 p-2 min-h-[48px] bg-surface-container-low border-none rounded-lg items-center">
    <span class="flex items-center gap-1 bg-primary-container text-on-primary px-2 py-1 rounded-md text-[13px] font-medium">
                                    React
                                    <UIcon name="i-lucide-x" class="text-[14px] cursor-pointer" data-icon="close" />
    </span>
    <span class="flex items-center gap-1 bg-primary-container text-on-primary px-2 py-1 rounded-md text-[13px] font-medium">
                                    Tailwind
                                    <UIcon name="i-lucide-x" class="text-[14px] cursor-pointer" data-icon="close" />
    </span>
    <input class="bg-transparent border-none focus:ring-0 text-[14px] placeholder:text-outline p-0 w-24" placeholder="Add more..." type="text">
    </div>
    </div>
    </div>
    <!-- Qualification Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="space-y-lg">
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">UG Qualification</label>
    <select class="form-select w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all">
    <option value="">Select degree</option>
    <option value="be">B.E. / B.Tech</option>
    <option value="bca">BCA</option>
    <option value="bsc">B.Sc</option>
    <option value="bcom">B.Com</option>
    </select>
    </div>
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">Institution Name (UG)</label>
    <input class="w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all px-md" placeholder="College/University Name" type="text">
    </div>
    </div>
    <div class="space-y-lg">
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">PG Qualification</label>
    <select class="form-select w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all">
    <option value="">Select degree</option>
    <option value="me">M.E. / M.Tech</option>
    <option value="mca">MCA</option>
    <option value="mba">MBA</option>
    <option value="none">Not Applicable</option>
    </select>
    </div>
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">Institution Name (PG)</label>
    <input class="w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all px-md" placeholder="College/University Name" type="text">
    </div>
    </div>
    </div>
    <!-- Location Triptych -->
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface-variant">Preferred Work Location</label>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-md">
    <select class="form-select w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all">
    <option value="india">India</option>
    </select>
    <select class="form-select w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all">
    <option value="">State</option>
    <option value="karnataka">Karnataka</option>
    <option value="maharashtra">Maharashtra</option>
    <option value="delhi">Delhi</option>
    </select>
    <select class="form-select w-full h-[48px] bg-surface-container-low border-none rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container transition-all">
    <option value="">City</option>
    <option value="bangalore">Bangalore</option>
    <option value="mumbai">Mumbai</option>
    <option value="pune">Pune</option>
    </select>
    </div>
    <p class="text-[12px] text-outline mt-1 italic">Dropdowns are dependent on your country selection.</p>
    </div>
    <!-- Information Box -->
    <div class="bg-primary/5 border border-primary/10 rounded-lg p-md flex gap-md items-start">
    <UIcon name="i-lucide-info" class="text-primary" data-icon="info" data-weight="fill" />
    <p class="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                            Your qualifications and location help us recommend relevant jobs and opportunities tailored to your profile.
                        </p>
    </div>
    <!-- Action Buttons -->
    <div class="flex flex-col-reverse sm:flex-row justify-between items-center gap-md pt-lg">
    <button class="w-full sm:w-auto px-xl py-sm border border-outline-variant text-on-surface-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95" type="button">
                            Back
                        </button>
    <button class="w-full sm:w-auto px-xl py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-lg shadow-primary/20 hover:bg-secondary transition-all active:scale-95" type="submit">
                            Create Account
                        </button>
    </div>
    </form>
    </div>
    <!-- Trust Signals / Illustration Section (Subtle) -->
    <div class="mt-xl grid grid-cols-1 md:grid-cols-3 gap-xl max-w-[800px] text-center opacity-60">
    <div class="flex flex-col items-center">
    <UIcon name="i-lucide-verified-user" class="text-[32px] text-primary mb-sm" data-icon="verified_user" />
    <p class="font-label-sm text-label-sm">Secure Data Storage</p>
    </div>
    <div class="flex flex-col items-center">
    <UIcon name="i-lucide-precision-manufacturing" class="text-[32px] text-primary mb-sm" data-icon="precision_manufacturing" />
    <p class="font-label-sm text-label-sm">AI Matching Engine</p>
    </div>
    <div class="flex flex-col items-center">
    <UIcon name="i-lucide-bell-ring" class="text-[32px] text-primary mb-sm" data-icon="notifications_active" />
    <p class="font-label-sm text-label-sm">Instant Job Alerts</p>
    </div>
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full mt-xl bg-surface-container-low border-t border-outline-variant">
    <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-7xl mx-auto gap-md">
    <div class="font-headline-md text-headline-md font-bold text-primary">
                    Job Nova
                </div>
    <div class="flex flex-wrap justify-center gap-md">
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">About Us</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Contact</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Privacy Policy</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Terms of Service</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Help Center</a>
    </div>
    <div class="font-label-md text-label-md text-on-surface-variant">
                    © 2024 Job Nova India. All rights reserved.
                </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; }
        
        .form-select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        .step-progress-bar {
            background: linear-gradient(to right, var(--color-primary-container) 50%, var(--color-surface-variant) 50%);
        }
</style>

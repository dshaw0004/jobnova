<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: "Job Nova - Recruiter Registration"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Micro-interactions for form validation states
          const inputs = document.querySelectorAll('input');
          inputs.forEach(input => {
              input.addEventListener('focus', () => {
                  input.parentElement.querySelector('.material-symbols-outlined').style.color = 'var(--color-primary)';
              });
              input.addEventListener('blur', () => {
                  input.parentElement.querySelector('.material-symbols-outlined').style.color = '#727785';
              });
          });
  
          // Basic button hover feedback
          const primaryBtn = document.querySelector('button[type="submit"]');
          primaryBtn.addEventListener('mouseenter', () => {
              primaryBtn.style.transform = 'translateY(-1px)';
          });
          primaryBtn.addEventListener('mouseleave', () => {
              primaryBtn.style.transform = 'translateY(0)';
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar -->
    <header class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
    <div class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary">Job Nova</div>
    <nav class="hidden md:flex items-center gap-lg">
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Find Jobs</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Companies</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Salaries</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/my-career-hub">Career Advice</a>
    </nav>
    <div class="flex items-center gap-md">
    <button class="font-label-md text-label-md text-primary px-lg py-2 rounded-xl hover:bg-surface-container-low transition-all">Login</button>
    <button class="font-label-md text-label-md bg-primary text-on-primary px-lg py-2 rounded-xl active:scale-95 duration-150 shadow-sm">Post a Job</button>
    </div>
    </div>
    </header>
    <main class="max-w-[1280px] mx-auto px-lg py-xl flex flex-col md:flex-row gap-xl items-start">
    <!-- Left Side: Informational/Branding -->
    <div class="w-full md:w-1/2 flex flex-col gap-lg">
    <div class="flex items-center gap-sm text-primary mb-2">
    <UIcon name="i-lucide-corporate-fare" data-icon="corporate_fare" />
    <span class="font-label-md text-label-md uppercase tracking-wider">Recruiter Portal</span>
    </div>
    <h1 class="font-display-lg text-display-lg text-on-surface">Hire the best talent across India.</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant">Join thousands of companies using Job Nova to build their dream teams with verified professionals and seamless hiring workflows.</p>
    <!-- Progress Indicator -->
    <div class="mt-xl flex flex-col gap-md">
    <div class="flex items-center justify-between max-w-xs">
    <span class="font-label-md text-label-md text-primary">Step 1 of 2: Company Details</span>
    <span class="font-label-sm text-label-sm text-on-surface-variant">66% Complete</span>
    </div>
    <div class="flex gap-sm h-1.5 max-w-xs">
    <div class="h-full flex-1 bg-primary rounded-full"></div>
    <div class="h-full flex-1 bg-primary rounded-full"></div>
    <div class="h-full flex-1 bg-surface-container-highest rounded-full"></div>
    </div>
    </div>
    <!-- Visual Element -->
    <div class="mt-xl relative rounded-xl overflow-hidden shadow-lg aspect-video w-full">
    <img class="w-full h-full object-cover" data-alt="A professional Indian modern office setting where a diverse team of HR specialists is collaborating around a sleek conference table with laptops and digital displays. The lighting is bright and airy with floor-to-ceiling windows showing a blurred cityscape, emphasizing a premium and trustworthy corporate atmosphere. The color palette features clean whites and professional blues consistent with the Job Nova brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSn-4GiSxUDeth4iBU2L4Ldnf_48G26-NnlNHSPeb3H2Zt-DF84p-3Q8fV1X3yC32p65aQoT2AzWFl8rkbIhWWFQNv6-Hzue2x8844nKgQGzMsF4WOvpH7_THVhDnby1WsIAVnII1QhcminZP331mYSqANa_zzbW2PYrKLvH93MMMUrPJrxgbNsfrQW2u-m7J-X_xNfX1LKfixoc9d8klQK4eTgbLRO8PsvuREOOecgTeLCh1vQte6e065Mp4gF3BECYP-V0qqrGBv">
    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
    </div>
    <!-- Right Side: Registration Form -->
    <div class="w-full md:w-1/2 bg-surface-container-lowest p-lg md:p-xl rounded-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <form action="#" class="flex flex-col gap-lg" onsubmit="return false;">
    <div class="flex flex-col gap-xs">
    <h2 class="font-headline-md text-headline-md text-on-surface">Create Recruiter Account</h2>
    <p class="font-body-md text-body-md text-on-surface-variant">Please provide your business credentials to continue.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
    <!-- Company Name -->
    <div class="flex flex-col gap-xs col-span-full">
    <label class="font-label-md text-label-md text-on-surface">Company Name</label>
    <div class="relative group">
    <UIcon name="i-lucide-building" class="absolute left-md top-1/2 -translate-y-1/2 text-outline" data-icon="domain" />
    <input class="w-full h-11 pl-[48px] pr-md bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. Nova Technologies India" type="text">
    </div>
    </div>
    <!-- Contact Person -->
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-label-md text-on-surface">Contact Person Name</label>
    <div class="relative group">
    <UIcon name="i-lucide-user" class="absolute left-md top-1/2 -translate-y-1/2 text-outline" data-icon="person" style="color: rgb(114, 119, 133);" />
    <input class="w-full h-11 pl-[48px] pr-md bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all" placeholder="Your full name" type="text">
    </div>
    </div>
    <!-- Business Email -->
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-label-md text-on-surface">Business Email</label>
    <div class="relative group">
    <UIcon name="i-lucide-mail" class="absolute left-md top-1/2 -translate-y-1/2 text-outline" data-icon="mail" />
    <input class="w-full h-11 pl-[48px] pr-md bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all" placeholder="name@company.com" type="email">
    </div>
    </div>
    <!-- Mobile Number -->
    <div class="flex flex-col gap-xs col-span-full">
    <label class="font-label-md text-label-md text-on-surface">Mobile Number</label>
    <div class="flex gap-sm">
    <div class="flex items-center px-md bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface-variant">
                                    +91
                                </div>
    <div class="relative group flex-1">
    <UIcon name="i-lucide-call" class="absolute left-md top-1/2 -translate-y-1/2 text-outline" data-icon="call" />
    <input class="w-full h-11 pl-[48px] pr-md bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all" placeholder="98765 43210" type="tel">
    </div>
    </div>
    </div>
    <!-- Password -->
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-label-md text-on-surface">Password</label>
    <div class="relative group">
    <UIcon name="i-lucide-lock" class="absolute left-md top-1/2 -translate-y-1/2 text-outline" data-icon="lock" />
    <input class="w-full h-11 pl-[48px] pr-md bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all" placeholder="••••••••" type="password">
    </div>
    </div>
    <!-- Confirm Password -->
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-label-md text-on-surface">Confirm Password</label>
    <div class="relative group">
    <UIcon name="i-lucide-lock-reset" class="absolute left-md top-1/2 -translate-y-1/2 text-outline" data-icon="lock_reset" />
    <input class="w-full h-11 pl-[48px] pr-md bg-surface-container-low border-none rounded-xl font-body-md text-body-md focus:ring-2 focus:ring-primary transition-all" placeholder="••••••••" type="password">
    </div>
    </div>
    </div>
    <!-- Checkbox -->
    <div class="flex items-start gap-md mt-sm">
    <div class="flex items-center h-5">
    <input class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer transition-all" id="terms" type="checkbox">
    </div>
    <label class="font-body-md text-body-md text-on-surface-variant cursor-pointer" for="terms">
                            I agree to the <a class="text-primary font-semibold hover:underline" href="/">Terms &amp; Conditions</a> and <a class="text-primary font-semibold hover:underline" href="/">Privacy Policy</a> of Job Nova India.
                        </label>
    </div>
    <!-- Primary Button -->
    <button class="w-full h-[56px] bg-primary text-on-primary font-headline-md text-headline-md rounded-xl shadow-lg active:scale-[0.98] transition-all hover:bg-secondary duration-150 mt-md" type="submit">
                        Create Recruiter Account
                    </button>
    <p class="text-center font-label-md text-label-md text-on-surface-variant">
                        Already have an account? <a class="text-primary font-semibold hover:underline" href="/login">Log in here</a>
    </p>
    </form>
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full mt-xl bg-surface-container-low border-t border-outline-variant">
    <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-7xl mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary mb-md md:mb-0">Job Nova</div>
    <div class="flex flex-wrap justify-center gap-lg mb-md md:mb-0">
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">About Us</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Contact</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Privacy Policy</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Terms of Service</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Help Center</a>
    </div>
    <div class="font-label-md text-label-md text-on-surface-variant">© 2024 Job Nova India. All rights reserved.</div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>

        .form-input-focus:focus-within {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 1px var(--color-primary);
        }
        .step-active {
            width: 32px;
            background-color: var(--color-primary);
            transition: all 0.3s ease;
        }
</style>

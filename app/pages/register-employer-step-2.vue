<script setup>
useHead({
  title: "Employer Registration - Step 2 | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Simple form interaction handling
          document.querySelector('form').addEventListener('submit', (e) => {
              e.preventDefault();
              // In a real app, this would handle registration logic
              alert('Employer registration submitted for verification!');
          });
  
          // Dropdown dynamic visual state (simulated)
          const selects = document.querySelectorAll('select');
          selects.forEach(select => {
              select.addEventListener('change', () => {
                  select.classList.add('border-primary');
                  select.classList.remove('border-outline-variant');
              });
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar Placeholder (As defined in JSON) -->
    <nav class="w-full sticky top-0 z-50 bg-surface dark:bg-surface-container-low shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
    <div class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
                    Job Nova
                </div>
    <div class="hidden md:flex items-center gap-lg">
    <a class="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Find Talent</a>
    <a class="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Solutions</a>
    <a class="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Resources</a>
    <a class="text-on-surface-variant font-medium hover:text-primary transition-colors" href="#">Pricing</a>
    </div>
    <div class="flex items-center gap-md">
    <button class="text-on-surface-variant font-medium hover:text-primary px-4 py-2 transition-colors">Log In</button>
    <button class="bg-primary-container text-on-primary-container font-medium px-6 py-2.5 rounded-lg active:scale-[0.98] transition-transform">Post a Job</button>
    </div>
    </div>
    </nav>
    <main class="flex-grow flex flex-col items-center justify-center py-xl px-gutter">
    <!-- Main Registration Container -->
    <div class="w-full max-w-3xl bg-surface-container-lowest registration-card rounded-xl p-lg md:p-xl border border-outline-variant/30">
    <!-- Header Section -->
    <div class="mb-xl">
    <div class="flex justify-between items-end mb-sm">
    <div>
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Business Information</h1>
    <p class="font-body-md text-body-md text-on-surface-variant">Provide company details for verification.</p>
    </div>
    <span class="font-label-md text-label-md text-primary font-bold bg-primary/10 px-3 py-1 rounded-full mb-2">Step 2 of 2</span>
    </div>
    <!-- Progress Bar -->
    <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
    <div class="w-full h-full bg-primary-container transition-all duration-500 ease-out"></div>
    </div>
    </div>
    <!-- Form Start -->
    <form class="space-y-xl">
    <!-- 1. Company Details -->
    <section class="space-y-md">
    <div class="flex items-center gap-sm">
    <UIcon name="i-lucide-building" class="text-primary" style="font-variation-settings: 'FILL' 1;" />
    <h2 class="font-headline-md text-[18px] text-on-surface">Company Details</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Company Type</label>
    <select class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
    <option disabled="" selected="" value="">Select company type</option>
    <option value="private">Private Limited</option>
    <option value="public">Public Limited</option>
    <option value="partnership">Partnership</option>
    <option value="proprietorship">Sole Proprietorship</option>
    <option value="ngo">NGO / Non-Profit</option>
    </select>
    </div>
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Industry Type</label>
    <select class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
    <option disabled="" selected="" value="">Select industry</option>
    <option value="it">Information Technology</option>
    <option value="finance">Finance &amp; Banking</option>
    <option value="healthcare">Healthcare</option>
    <option value="manufacturing">Manufacturing</option>
    <option value="education">Education</option>
    <option value="retail">Retail &amp; E-commerce</option>
    </select>
    </div>
    </div>
    </section>
    <hr class="border-outline-variant/30"/>
    <!-- 2. Representative Details -->
    <section class="space-y-md">
    <div class="flex items-center gap-sm">
    <UIcon name="i-lucide-contact-2" class="text-primary" style="font-variation-settings: 'FILL' 1;" />
    <h2 class="font-headline-md text-[18px] text-on-surface">Representative Details</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Executive Name</label>
    <input class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50" placeholder="Full name of representative" type="text"/>
    </div>
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Executive Phone Number</label>
    <div class="flex">
    <span class="h-11 flex items-center px-3 bg-surface-container-high border border-r-0 border-outline-variant rounded-l-xl text-on-surface-variant font-label-md">+91</span>
    <input class="h-11 w-full px-md rounded-r-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50" placeholder="10-digit mobile number" type="tel"/>
    </div>
    </div>
    </div>
    </section>
    <hr class="border-outline-variant/30"/>
    <!-- 3. Company Information -->
    <section class="space-y-md">
    <div class="flex items-center gap-sm">
    <UIcon name="i-lucide-info" class="text-primary" style="font-variation-settings: 'FILL' 1;" />
    <h2 class="font-headline-md text-[18px] text-on-surface">Company Information</h2>
    </div>
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Company Description</label>
    <textarea class="p-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 resize-none" placeholder="Briefly describe your company's mission and operations..." rows="3"></textarea>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
    <div class="md:col-span-2 flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Address</label>
    <textarea class="p-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 resize-none" placeholder="Registered office address" rows="2"></textarea>
    </div>
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Pincode</label>
    <input class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50" placeholder="6-digit code" type="text"/>
    </div>
    </div>
    </section>
    <!-- 4. Location -->
    <section class="space-y-md">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">Country</label>
    <select class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
    <option selected="" value="india">India</option>
    </select>
    </div>
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">State</label>
    <select class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
    <option disabled="" selected="" value="">Select state</option>
    <option value="maharashtra">Maharashtra</option>
    <option value="karnataka">Karnataka</option>
    <option value="delhi">Delhi</option>
    <option value="tamilnadu">Tamil Nadu</option>
    <option value="telangana">Telangana</option>
    </select>
    </div>
    <div class="flex flex-col gap-xs">
    <label class="font-label-md text-on-surface-variant">City</label>
    <select class="h-11 px-md rounded-xl bg-surface-container-low border border-outline-variant font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
    <option disabled="" selected="" value="">Select city</option>
    <option value="mumbai">Mumbai</option>
    <option value="pune">Pune</option>
    <option value="bangalore">Bangalore</option>
    <option value="hyderabad">Hyderabad</option>
    <option value="chennai">Chennai</option>
    </select>
    </div>
    </div>
    </section>
    <!-- Info Notice Card -->
    <div class="flex items-start gap-md p-md bg-secondary-fixed/30 border border-secondary-container/20 rounded-xl">
    <UIcon name="i-lucide-info" class="text-secondary" style="font-variation-settings: 'FILL' 1;" />
    <p class="font-label-md text-on-secondary-container leading-tight">
                            All employer accounts require admin verification before activation. You will receive a notification once your account is reviewed.
                        </p>
    </div>
    <!-- Form Actions -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-md pt-lg">
    <button class="w-full sm:w-auto px-xl py-3 border border-outline-variant text-on-surface font-label-md rounded-xl hover:bg-surface-container-low transition-colors active:scale-[0.98]" type="button">
                            Back
                        </button>
    <button class="w-full sm:w-auto px-xl py-3 bg-primary-container text-on-primary-container font-headline-md text-[16px] rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all" type="submit">
                            Create Employer Account
                        </button>
    </div>
    </form>
    </div>
    <!-- Trust Section -->
    <div class="mt-xl text-center">
    <p class="font-label-md text-on-surface-variant flex items-center justify-center gap-xs">
    <UIcon name="i-lucide-verified-user" class="text-[18px]" style="font-variation-settings: 'FILL' 1;" />
                    Your data is secured with enterprise-grade encryption.
                </p>
    </div>
    </main>
    <!-- Footer Placeholder (As defined in JSON) -->
    <footer class="w-full py-xl bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant dark:border-outline mt-auto">
    <div class="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
    <div class="flex flex-col gap-xs">
    <div class="font-headline-md text-headline-md font-bold text-on-surface">Job Nova</div>
    <p class="font-label-md text-on-surface-variant">© 2024 Job Nova. Premium Career Ecosystem.</p>
    </div>
    <div class="flex flex-wrap gap-md md:justify-end">
    <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
    <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
    <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Cookie Policy</a>
    <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
    <a class="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body {
            background-color: #f9f9ff;
            font-family: 'Inter', sans-serif;
        }
        
        .registration-card {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .input-focus-ring:focus {
            outline: none;
            border-color: #005bbf;
            box-shadow: 0 0 0 2px rgba(0, 91, 191, 0.1);
        }
</style>

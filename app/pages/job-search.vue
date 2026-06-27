<script setup>
useHead({
  title: "Job Search | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Simple interactivity for Job Cards
          document.querySelectorAll('article').forEach(card => {
              card.addEventListener('click', () => {
                  document.querySelectorAll('article').forEach(c => c.classList.remove('job-card-active', 'bg-surface-container-low'));
                  document.querySelectorAll('article').forEach(c => c.classList.add('bg-surface-container-lowest'));
                  card.classList.add('job-card-active');
                  card.classList.remove('bg-surface-container-lowest');
                  card.classList.add('bg-surface-container-low');
              });
          });
  
          // Floating Action Button logic could go here if needed
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar -->
    <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg h-16 bg-surface-container-lowest dark:bg-surface-dim shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex items-center gap-xl">
    <span class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Job Nova</span>
    <nav class="hidden md:flex gap-lg items-center h-full">
    <a class="font-label-md text-label-md text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary transition-colors" href="#">Find Jobs</a>
    <a class="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Companies</a>
    <a class="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Salaries</a>
    <a class="font-label-md text-label-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Career Advice</a>
    </nav>
    </div>
    <div class="flex items-center gap-md">
    <button class="hidden sm:block font-label-md text-label-md text-on-surface-variant px-md py-sm hover:text-primary transition-all">Login</button>
    <button class="bg-primary text-white font-label-md text-label-md px-lg py-sm rounded-xl scale-98 active:scale-95 transition-transform shadow-sm">Post a Job</button>
    </div>
    </header>
    <main class="mt-16 max-w-container-max mx-auto px-lg py-xl flex flex-col gap-xl">
    <!-- Search Section -->
    <section class="w-full">
    <div class="bg-surface-container-lowest p-md rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-wrap lg:flex-nowrap items-center gap-base border border-outline-variant/30">
    <div class="flex-1 min-w-[200px] flex items-center gap-sm px-md border-r border-outline-variant/30">
    <UIcon name="i-lucide-briefcase" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md" placeholder="Job Title, Skills, or Company" type="text"/>
    </div>
    <div class="flex-1 min-w-[150px] flex items-center gap-sm px-md border-r border-outline-variant/30">
    <UIcon name="i-lucide-map-pin" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md" placeholder="City or State" type="text"/>
    </div>
    <div class="flex-[0.5] min-w-[120px] flex items-center gap-sm px-md border-r border-outline-variant/30">
    <UIcon name="i-lucide-bar-chart-3" class="text-outline" />
    <select class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md cursor-pointer">
    <option>Experience</option>
    <option>Fresher</option>
    <option>1-3 Years</option>
    <option>3-5 Years</option>
    <option>5+ Years</option>
    </select>
    </div>
    <div class="flex-[0.5] min-w-[120px] flex items-center gap-sm px-md">
    <UIcon name="i-lucide-clock" class="text-outline" />
    <select class="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md py-md cursor-pointer">
    <option>Job Type</option>
    <option>Full Time</option>
    <option>Remote</option>
    <option>Contract</option>
    </select>
    </div>
    <button class="w-full lg:w-auto bg-primary text-white px-xl py-md rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm hover:shadow-lg transition-all active:scale-95">
                        Find Jobs
                    </button>
    </div>
    </section>
    <!-- Main Content Area -->
    <div class="grid grid-cols-12 gap-lg items-start">
    <!-- Left Sidebar: Filters -->
    <aside class="hidden lg:flex col-span-3 flex-col gap-md sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-sm">
    <div class="flex items-center justify-between mb-sm">
    <h3 class="font-headline-md text-headline-md text-on-surface">Filters</h3>
    <button class="text-primary font-label-md text-label-md hover:underline">Clear All</button>
    </div>
    <!-- Filter Category -->
    <div class="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm">
    <h4 class="font-label-md text-label-md text-on-surface font-bold">Industry</h4>
    <div class="flex flex-col gap-xs mt-xs">
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="rounded text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
    <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Information Technology</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="rounded text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
    <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Healthcare</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="rounded text-primary focus:ring-primary h-4 w-4" type="checkbox"/>
    <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Finance</span>
    </label>
    </div>
    </div>
    <!-- Filter Salary Range -->
    <div class="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm">
    <h4 class="font-label-md text-label-md text-on-surface font-bold">Salary Range (Monthly)</h4>
    <div class="flex flex-col gap-xs mt-xs">
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="text-primary focus:ring-primary h-4 w-4" name="salary" type="radio"/>
    <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">₹20,000 - ₹50,000</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="text-primary focus:ring-primary h-4 w-4" name="salary" type="radio"/>
    <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">₹50,000 - ₹1,00,000</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="text-primary focus:ring-primary h-4 w-4" name="salary" type="radio"/>
    <span class="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">₹1,00,000+</span>
    </label>
    </div>
    </div>
    <!-- More Filters (Collapsible placeholders) -->
    <div class="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm">
    <h4 class="font-label-md text-label-md text-on-surface font-bold">Posted Date</h4>
    <select class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-sm py-sm focus:ring-primary focus:border-primary">
    <option>Anytime</option>
    <option>Last 24 Hours</option>
    <option>Last 7 Days</option>
    <option>Last 30 Days</option>
    </select>
    </div>
    <div class="bg-surface-container-low p-md rounded-xl flex flex-col gap-sm">
    <h4 class="font-label-md text-label-md text-on-surface font-bold">Company Type</h4>
    <div class="flex gap-sm">
    <button class="flex-1 py-sm border border-outline-variant/30 rounded-lg text-body-md hover:bg-primary-container hover:text-white transition-all">Private</button>
    <button class="flex-1 py-sm border border-outline-variant/30 rounded-lg text-body-md hover:bg-primary-container hover:text-white transition-all">Govt</button>
    </div>
    </div>
    </aside>
    <!-- Center Listing Area -->
    <section class="col-span-12 lg:col-span-5 flex flex-col gap-lg">
    <div>
    <h1 class="font-display-lg text-display-lg text-on-surface">Find Your Next Opportunity</h1>
    <p class="text-body-lg text-on-surface-variant mt-xs">Search and filter through 15,000+ active job openings.</p>
    </div>
    <!-- Quick Filters -->
    <div class="flex items-center gap-sm overflow-x-auto pb-sm no-scrollbar">
    <button class="whitespace-nowrap px-md py-base bg-secondary-container text-on-secondary-container rounded-full font-label-md text-label-md border border-transparent hover:border-primary transition-all">Government Jobs</button>
    <button class="whitespace-nowrap px-md py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all">Private Jobs</button>
    <button class="whitespace-nowrap px-md py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all">Remote</button>
    <button class="whitespace-nowrap px-md py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all">Part-time</button>
    <button class="whitespace-nowrap px-md py-base bg-surface-container-high text-on-surface-variant rounded-full font-label-md text-label-md hover:bg-secondary-container hover:text-on-secondary-container transition-all">Internship</button>
    </div>
    <!-- Results Header -->
    <div class="flex items-center justify-between border-b border-outline-variant/30 pb-sm">
    <span class="font-label-md text-label-md text-on-surface-variant">Showing <span class="font-bold text-on-surface">1,248</span> results</span>
    <div class="flex items-center gap-sm">
    <span class="text-body-sm text-outline">Sort By:</span>
    <select class="bg-transparent border-none focus:ring-0 text-label-md font-bold cursor-pointer pr-lg">
    <option>Relevance</option>
    <option>Newest First</option>
    <option>Salary: High to Low</option>
    </select>
    </div>
    </div>
    <!-- Job Listing Cards -->
    <div class="flex flex-col gap-md">
    <!-- Job Card 1 -->
    <article class="job-card-active p-md rounded-xl shadow-sm border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all group">
    <div class="flex justify-between items-start mb-sm">
    <div class="flex gap-md">
    <div class="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center overflow-hidden">
    <img class="w-10 h-10 object-contain" data-alt="A clean, professional corporate logo for a tech company, featuring minimalist geometric shapes in a vibrant blue color palette. The logo is centered on a soft grey background with subtle depth and modern aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM9unYnqILB5lMz8fI3DWUt0OCQSLLFf_kYzp8Upp4aknSo65uwCUPv5jTokU8MsQzxwPEyjSH44ahppc2MIqglYRaT8ayoSgG0IG4lUzXtmsjMMF5MY6bDy3qovmZXBOfk0okpQr8_bN3gFxJKYavCV1zy-E2WaNjfvK0bE7roRy3GBI_mFZBoXLvdL2bLUZt3_VPGcCHxlrFvkfl4pcUqZAvuri_XOxsNJ-LMhg9mfVEymjy0H6iUMf2o3pb1Vfh9F3vHuc6Bzm3"/>
    </div>
    <div>
    <h3 class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Senior UI/UX Designer</h3>
    <div class="flex items-center gap-sm mt-xs">
    <span class="font-label-md text-label-md text-on-surface">NovaTech Solutions</span>
    <span class="w-1 h-1 bg-outline rounded-full"></span>
    <span class="text-body-sm text-on-surface-variant">Mumbai, India (Remote)</span>
    </div>
    </div>
    </div>
    <button class="text-outline hover:text-primary transition-colors">
    <UIcon name="i-lucide-bookmark" />
    </button>
    </div>
    <div class="flex flex-wrap gap-xs mb-md">
    <span class="px-sm py-base bg-success/10 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 px-2 py-1">Featured</span>
    <span class="px-sm py-base bg-error-container text-on-error-container rounded text-[10px] font-bold uppercase tracking-wider px-2 py-1">Urgent Hiring</span>
    <span class="px-sm py-base bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold uppercase tracking-wider px-2 py-1">Remote</span>
    </div>
    <div class="grid grid-cols-2 gap-sm mb-lg">
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-[18px]" />
    <span class="text-body-sm">₹8,00,000 - ₹12,00,000 PA</span>
    </div>
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-briefcase" class="text-[18px]" />
    <span class="text-body-sm">3-5 Years Exp.</span>
    </div>
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-graduation-cap" class="text-[18px]" />
    <span class="text-body-sm">Bachelor's Degree</span>
    </div>
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-history" class="text-[18px]" />
    <span class="text-body-sm">2 days ago</span>
    </div>
    </div>
    <div class="flex items-center gap-sm pt-md border-t border-outline-variant/20">
    <button class="flex-1 bg-primary text-white font-label-md text-label-md py-sm rounded-lg hover:shadow-lg transition-all">Apply Now</button>
    <button class="px-lg py-sm border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container transition-all">View Details</button>
    </div>
    </article>
    <!-- Job Card 2 -->
    <article class="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all group">
    <div class="flex justify-between items-start mb-sm">
    <div class="flex gap-md">
    <div class="w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-center overflow-hidden">
    <img class="w-10 h-10 object-contain" data-alt="A minimalist tech logo for a financial services company, utilizing a professional palette of deep indigo and white. The design is sleek, modern, and high-end, presented on a clean, bright background that emphasizes its corporate professional feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGzG2ucQtUzCm_qQIYDBenOiHlkqlGqmbgzZwqLTK6fky93W-B04RUDlSV1BBsEWA7arVfdEwSQQPAGisE-ySNKFQfBifTquZpyhfJtwZincCtGn_IDRaXAmgytw10BR50m679dthGwGGcgTUYlrQzWC0y6X1UrdGjQD7p4I3zKADAckyqKDd2gbiYI7pHSN9CphHp7nbb8YE5SVwEuHTHLkWb8DI46KgG2XoSfU-8QHjUvsr3lN2SYLMkgefv74yar2JNaYyUKrFY"/>
    </div>
    <div>
    <h3 class="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">Backend Engineer (Node.js)</h3>
    <div class="flex items-center gap-sm mt-xs">
    <span class="font-label-md text-label-md text-on-surface">CloudScale Systems</span>
    <span class="w-1 h-1 bg-outline rounded-full"></span>
    <span class="text-body-sm text-on-surface-variant">Bangalore, India</span>
    </div>
    </div>
    </div>
    <button class="text-outline hover:text-primary transition-colors">
    <UIcon name="i-lucide-bookmark" />
    </button>
    </div>
    <div class="flex flex-wrap gap-xs mb-md">
    <span class="px-sm py-base bg-primary-fixed text-on-primary-fixed rounded text-[10px] font-bold uppercase tracking-wider px-2 py-1">Private</span>
    <span class="px-sm py-base bg-surface-container text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider px-2 py-1">Full-time</span>
    </div>
    <div class="grid grid-cols-2 gap-sm mb-lg">
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-[18px]" />
    <span class="text-body-sm">₹12,00,000 - ₹18,00,000 PA</span>
    </div>
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-briefcase" class="text-[18px]" />
    <span class="text-body-sm">5-8 Years Exp.</span>
    </div>
    </div>
    <div class="flex items-center gap-sm pt-md border-t border-outline-variant/20">
    <button class="flex-1 bg-primary text-white font-label-md text-label-md py-sm rounded-lg hover:shadow-lg transition-all">Apply Now</button>
    <button class="px-lg py-sm border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container transition-all">View Details</button>
    </div>
    </article>
    <!-- Skeleton Loader Placeholder -->
    <div class="bg-surface-container-low/50 p-md rounded-xl border border-outline-variant/10 animate-pulse">
    <div class="flex gap-md mb-md">
    <div class="w-12 h-12 bg-surface-container rounded-lg"></div>
    <div class="flex-1 space-y-2">
    <div class="h-4 bg-surface-container rounded w-3/4"></div>
    <div class="h-3 bg-surface-container rounded w-1/2"></div>
    </div>
    </div>
    <div class="flex gap-sm mb-md">
    <div class="h-4 bg-surface-container rounded w-16"></div>
    <div class="h-4 bg-surface-container rounded w-16"></div>
    </div>
    <div class="h-8 bg-surface-container rounded w-full"></div>
    </div>
    </div>
    <!-- Pagination Placeholder -->
    <div class="flex items-center justify-center gap-sm mt-lg">
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-all"><UIcon name="i-lucide-chevron-left" /></button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold">1</button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-all">2</button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-all">3</button>
    <span class="mx-xs">...</span>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-all">12</button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant hover:bg-surface-container transition-all"><UIcon name="i-lucide-chevron-right" /></button>
    </div>
    </section>
    <!-- Right Preview Panel (Desktop Only) -->
    <aside class="hidden lg:flex col-span-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar bg-surface-container-lowest border border-outline-variant/30 rounded-2xl flex-col p-lg shadow-sm">
    <div class="flex flex-col gap-lg">
    <div class="flex items-center justify-between">
    <div class="w-16 h-16 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-center">
    <img class="w-12 h-12 object-contain" data-alt="Close up of a sophisticated modern technology brand logo on a soft white background. The logo utilizes elegant serif typography paired with a minimalist blue icon. The lighting is bright and airy, creating a professional and premium high-end SaaS feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1JQxOAPJtrGm_HusWCimkhAzGowWnIW9YEXP1zcLET-q6jWeXZZdtYOvaCj4ZG31ffSlFkL7VrVlBVFCkTxq_lTaN7PSA_EFC_DsdKiWQeWr9nIpanq6JaUiuP6a6HGictUMcxFzCU8S-af25KCdkd0N5BT3jeldi80XKNToKVvMbk8qZPwsXn_8tcdW_m44jMIXKmzJGSj7FqTFOVBMwkuQ257OFnB_5LCb0-u57kGFaFa5HLZjY7_8XACfmb15Pw1s2pLORiVCQ"/>
    </div>
    <div class="flex gap-sm">
    <button class="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"><UIcon name="i-lucide-share-2" /></button>
    <button class="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"><UIcon name="i-lucide-flag" /></button>
    </div>
    </div>
    <div>
    <h2 class="font-display-lg text-[28px] text-on-surface leading-tight">Senior UI/UX Designer</h2>
    <div class="flex items-center gap-sm mt-xs">
    <span class="font-headline-md text-headline-md text-primary">NovaTech Solutions</span>
    <span class="text-body-md text-on-surface-variant">• Mumbai, India</span>
    </div>
    </div>
    <div class="flex items-center gap-md">
    <button class="flex-1 bg-primary text-white font-headline-md text-headline-md py-md rounded-xl hover:shadow-lg transition-all active:scale-95">Apply Now</button>
    <button class="w-14 h-14 border border-outline-variant text-on-surface-variant flex items-center justify-center rounded-xl hover:bg-surface-container transition-all">
    <UIcon name="i-lucide-bookmark" data-weight="fill" />
    </button>
    </div>
    <div class="space-y-md border-t border-outline-variant/20 pt-lg">
    <h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Job Description</h4>
    <p class="text-body-md text-on-surface-variant leading-relaxed">
                                NovaTech is seeking a creative and user-focused Senior UI/UX Designer to join our product team. You will lead the design strategy for our flagship job discovery platform, ensuring a seamless and aspirational experience for millions of job seekers in India.
                            </p>
    </div>
    <div class="space-y-md">
    <h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Key Requirements</h4>
    <ul class="list-disc list-inside text-body-md text-on-surface-variant space-y-xs">
    <li>5+ years of experience in product design (UI/UX).</li>
    <li>Strong portfolio demonstrating high-end SaaS or e-commerce projects.</li>
    <li>Proficiency in Figma, Adobe Creative Suite, and prototyping tools.</li>
    <li>Understanding of Indian user behavior and market trends.</li>
    </ul>
    </div>
    <div class="space-y-md">
    <h4 class="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">Salary &amp; Benefits</h4>
    <div class="grid grid-cols-2 gap-md">
    <div class="p-sm bg-surface-container-low rounded-lg">
    <span class="block text-body-xs text-outline mb-xs">Compensation</span>
    <span class="font-bold text-on-surface">₹8L - ₹12L PA</span>
    </div>
    <div class="p-sm bg-surface-container-low rounded-lg">
    <span class="block text-body-xs text-outline mb-xs">Work Mode</span>
    <span class="font-bold text-on-surface">Fully Remote</span>
    </div>
    </div>
    </div>
    <div class="p-md bg-secondary-fixed text-on-secondary-fixed rounded-xl flex items-center gap-md">
    <UIcon name="i-lucide-badge-check" class="text-[32px]" />
    <div>
    <p class="font-bold text-label-md">Verified Employer</p>
    <p class="text-body-sm opacity-80">This company has been vetted by our safety team.</p>
    </div>
    </div>
    </div>
    </aside>
    </div>
    </main>
    <!-- BottomNavBar (Mobile Only) -->
    <nav class="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-md py-sm bg-surface dark:bg-inverse-surface shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-xl">
    <a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant font-label-sm text-label-sm" href="#">
    <UIcon name="i-lucide-home" />
    <span>Home</span>
    </a>
    <a class="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1 font-label-sm text-label-sm" href="#">
    <UIcon name="i-lucide-business-center" />
    <span>My Jobs</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant font-label-sm text-label-sm" href="#">
    <UIcon name="i-lucide-chat-bubble" />
    <span>Messages</span>
    </a>
    <a class="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant font-label-sm text-label-sm" href="#">
    <UIcon name="i-lucide-user" />
    <span>Profile</span>
    </a>
    </nav>
    <!-- Micro-interaction Script -->
    
  </div>
</template>

<style scoped>
body {
            background-color: #f9f9ff;
            color: #191c23;
            font-family: 'Inter', sans-serif;
        }
        
        .job-card-active {
            border-left: 4px solid #005bbf;
            background-color: #f2f3fd;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c1c6d6;
            border-radius: 10px;
        }
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
        }
</style>

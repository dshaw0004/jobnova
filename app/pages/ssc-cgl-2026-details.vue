<script setup>
useHead({
  title: "SSC CGL 2026 - Combined Graduate Level Examination | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Simple Countdown logic
          function updateTimer() {
              const daysEl = document.getElementById('days');
              const hoursEl = document.getElementById('hours');
              const minutesEl = document.getElementById('minutes');
              const secondsEl = document.getElementById('seconds');
              
              let d = parseInt(daysEl.innerText);
              let h = parseInt(hoursEl.innerText);
              let m = parseInt(minutesEl.innerText);
              let s = parseInt(secondsEl.innerText);
              
              if (s > 0) s--;
              else {
                  s = 59;
                  if (m > 0) m--;
                  else {
                      m = 59;
                      if (h > 0) h--;
                      else {
                          h = 23;
                          if (d > 0) d--;
                      }
                  }
              }
              
              daysEl.innerText = d.toString().padStart(2, '0');
              hoursEl.innerText = h.toString().padStart(2, '0');
              minutesEl.innerText = m.toString().padStart(2, '0');
              secondsEl.innerText = s.toString().padStart(2, '0');
          }
          
          setInterval(updateTimer, 1000);
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar -->
    <header class="w-full sticky top-0 z-50 bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex justify-between items-center max-w-container-max mx-auto px-lg h-16">
    <div class="flex items-center gap-md">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    </div>
    <nav class="hidden md:flex items-center gap-lg">
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Home</a>
    <a class="font-body-md text-body-md text-primary border-b-2 border-primary pb-1" href="#">Govt Jobs</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Private Jobs</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
    </nav>
    <div class="flex items-center gap-md">
    <button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all active:scale-95">notifications</button>
    <div class="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
    <img alt="User Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3eFZPMXpigXieVI5TOpGr_hOJidmgOg-8zaKm_-xIoZdKDmlFa1dYa7osytKNLxAhh234z1xwfLUTEIcdZmnbutsp1YjwGp6ZsFwCiC-YQsuJJ0cxHeTrkMiLqVn-v4-QuTDR9TLoQ-iIAesOrPkZtZzxq3q3_icLjSnCSmIThY1tWgFdiBISacLEkDx6myzZgFTfLD_-dB1xy9VDjB6vPGWlLTlnlbywjBa_jD6sRkpYKKLxcS9LWUBxgDRZxHYiwYiUiQ1O9wm">
    </div>
    </div>
    </div>
    </header>
    <main class="max-w-container-max mx-auto px-lg py-sm md:py-md">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-sm mb-lg text-on-surface-variant font-label-md">
    <a class="hover:text-primary" href="#">Home</a>
    <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
    <a class="hover:text-primary" href="#">Government Jobs</a>
    <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
    <span class="text-primary font-bold">SSC CGL 2026</span>
    </nav>
    <div class="flex flex-col lg:flex-row gap-lg">
    <!-- Main Content (75%) -->
    <div class="w-full lg:w-3/4 space-y-lg">
    <!-- Hero Card -->
    <section class="bg-surface-container-lowest p-lg md:p-xl rounded-2xl premium-shadow border border-outline-variant/30">
    <div class="flex flex-col md:flex-row justify-between items-start gap-md mb-lg">
    <div class="flex-1">
    <div class="flex items-center gap-sm mb-sm">
    <img alt="SSC Logo" class="w-12 h-12 rounded-xl object-contain border border-surface-container-high p-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDajpA6ktpNz1cfIKhOoF9tFS3eHtN1xPIRLQVia3QzkMLA4kK_g4BKV0ux8P082iv5iHdaZsE4Af3sv5tbk1k6WpzfD-2ny_-GQzTwuSoydZJiDDQkN9lkPvkL2Mh9-8UYecChfj_cH5yFN2o5HA0EliN2vL9MT9ik3Umbcc9ch-2EkU2M68IEi_8zLoJn7v8LOMKXBUKuC2pytT9zCX-5oQTAqSCdswKy3Vy7AdbSzXM7YeqCmrx2Q3iBA9AzJVs6xnVqOH24CtCN">
    <span class="font-label-md text-secondary uppercase tracking-wider">Staff Selection Commission (SSC)</span>
    </div>
    <h1 class="font-headline-lg text-headline-lg hanken text-on-surface mb-md">SSC CGL 2026 - Combined Graduate Level Examination</h1>
    <div class="flex flex-wrap gap-sm">
    <span class="px-3 py-1.5 bg-green-100 text-green-800 rounded-full font-label-sm flex items-center gap-1">
    <UIcon name="i-lucide-check-circle" class="text-[14px]" style="font-variation-settings: 'FILL' 1;" />
                                        Open
                                    </span>
    <span class="px-3 py-1.5 bg-primary-container/10 text-primary rounded-full font-label-sm border border-primary-container/20">Full-time</span>
    <span class="px-3 py-1.5 gradient-chip rounded-full font-label-sm shadow-sm">Premium Listing</span>
    </div>
    </div>
    <div class="flex flex-row md:flex-col gap-sm w-full md:w-auto">
    <button class="flex-1 md:w-44 h-11 bg-primary text-white rounded-xl font-label-md hover:shadow-lg active:scale-95 transition-all">Apply Now</button>
    <button class="flex-1 md:w-44 h-11 border border-outline text-on-surface rounded-xl font-label-md hover:bg-surface-container transition-all flex items-center justify-center gap-2">
    <UIcon name="i-lucide-bookmark" class="text-[20px]" /> Save Job
                                </button>
    </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-md pt-lg border-t border-outline-variant/30">
    <div class="flex flex-col gap-1">
    <span class="text-on-surface-variant font-label-sm uppercase">Vacancies</span>
    <span class="text-on-surface font-bold font-body-md text-primary">15,000+</span>
    </div>
    <div class="flex flex-col gap-1">
    <span class="text-on-surface-variant font-label-sm uppercase">Salary</span>
    <span class="text-on-surface font-bold font-body-md">₹47k - 1.5L</span>
    </div>
    <div class="flex flex-col gap-1">
    <span class="text-on-surface-variant font-label-sm uppercase">Location</span>
    <span class="text-on-surface font-bold font-body-md">All India</span>
    </div>
    <div class="flex flex-col gap-1">
    <span class="text-on-surface-variant font-label-sm uppercase">Qualification</span>
    <span class="text-on-surface font-bold font-body-md">Graduate</span>
    </div>
    <div class="flex flex-col gap-1">
    <span class="text-on-surface-variant font-label-sm uppercase">Last Date</span>
    <span class="text-error font-bold font-body-md">Oct 15, 2025</span>
    </div>
    </div>
    </section>
    <!-- Important Dates -->
    <section class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow">
    <h2 class="font-headline-md text-headline-md hanken mb-lg flex items-center gap-2">
    <UIcon name="i-lucide-calendar" class="text-primary" /> Important Dates
                        </h2>
    <div class="relative flex flex-col md:flex-row justify-between items-center gap-md">
    <!-- Desktop Line -->
    <div class="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-surface-container-high -z-10 translate-y-[-50%]"></div>
    <div class="flex flex-col items-center text-center gap-2 bg-surface-container-lowest px-2">
    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
    <div>
    <p class="font-label-sm text-on-surface-variant">Notification</p>
    <p class="font-body-md font-bold">Aug 1, 2025</p>
    </div>
    </div>
    <div class="flex flex-col items-center text-center gap-2 bg-surface-container-lowest px-2">
    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
    <div>
    <p class="font-label-sm text-on-surface-variant">Apps Start</p>
    <p class="font-body-md font-bold">Aug 5, 2025</p>
    </div>
    </div>
    <div class="flex flex-col items-center text-center gap-2 bg-surface-container-lowest px-2">
    <div class="w-10 h-10 rounded-full bg-error flex items-center justify-center text-white font-bold">3</div>
    <div>
    <p class="font-label-sm text-on-surface-variant">App Ends</p>
    <p class="font-body-md font-bold text-error">Oct 15, 2025</p>
    </div>
    </div>
    <div class="flex flex-col items-center text-center gap-2 bg-surface-container-lowest px-2">
    <div class="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary-fixed-dim font-bold">4</div>
    <div>
    <p class="font-label-sm text-on-surface-variant">Exam Date</p>
    <p class="font-body-md font-bold">Dec 15, 2025</p>
    </div>
    </div>
    </div>
    </section>
    <!-- Overview -->
    <section class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow">
    <h2 class="font-headline-md text-headline-md hanken mb-md">Recruitment Overview</h2>
    <p class="font-body-md text-on-surface-variant leading-relaxed">
                            The Staff Selection Commission (SSC) has released the official notification for the Combined Graduate Level (CGL) Examination 2026. This prestigious recruitment drive aims to fill over 15,000 Grade 'B' and 'C' posts in various Ministries, Departments, and Organizations of the Government of India. Selected candidates will be placed in diverse roles including Assistant Audit Officer, Assistant Section Officer, Inspector of Income Tax, and more.
                        </p>
    </section>
    <!-- Vacancy Details Table -->
    <section class="bg-surface-container-lowest rounded-2xl premium-shadow overflow-hidden">
    <div class="p-lg border-b border-outline-variant/30">
    <h2 class="font-headline-md text-headline-md hanken">Vacancy Details</h2>
    </div>
    <div class="overflow-x-auto">
    <table class="w-full text-left">
    <thead class="bg-surface-container-low font-label-sm text-on-surface-variant uppercase">
    <tr>
    <th class="px-lg py-md">Post Name</th>
    <th class="px-lg py-md text-center">Vacancies</th>
    <th class="px-lg py-md">Category</th>
    <th class="px-lg py-md">Reservation</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-outline-variant/20 font-body-md">
    <tr class="hover:bg-surface-container-low/50">
    <td class="px-lg py-md font-medium text-primary">Assistant Audit Officer</td>
    <td class="px-lg py-md text-center font-bold">450</td>
    <td class="px-lg py-md">Group B Gazetted</td>
    <td class="px-lg py-md text-on-surface-variant">UR/OBC/SC/ST/EWS</td>
    </tr>
    <tr class="hover:bg-surface-container-low/50">
    <td class="px-lg py-md font-medium text-primary">Inspector (Income Tax)</td>
    <td class="px-lg py-md text-center font-bold">1,200</td>
    <td class="px-lg py-md">Group B</td>
    <td class="px-lg py-md text-on-surface-variant">Horizontal/Vertical</td>
    </tr>
    <tr class="hover:bg-surface-container-low/50">
    <td class="px-lg py-md font-medium text-primary">Tax Assistant</td>
    <td class="px-lg py-md text-center font-bold">2,100</td>
    <td class="px-lg py-md">Group C</td>
    <td class="px-lg py-md text-on-surface-variant">Standard Rules</td>
    </tr>
    <tr class="bg-surface-container-low/30">
    <td class="px-lg py-md font-bold">Total Tentative Vacancies</td>
    <td class="px-lg py-md text-center font-bold text-primary">15,000+</td>
    <td class="px-lg py-md text-on-surface-variant text-sm italic" colspan="2">Subject to change by Commission</td>
    </tr>
    </tbody>
    </table>
    </div>
    </section>
    <!-- Eligibility -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-lg">
    <div class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow border-l-4 border-primary">
    <UIcon name="i-lucide-graduation-cap" class="text-primary mb-sm" />
    <h3 class="font-headline-md text-[18px] hanken mb-xs">Education</h3>
    <p class="font-body-md text-on-surface-variant">Bachelor's Degree in any discipline from a recognized University or equivalent.</p>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow border-l-4 border-secondary">
    <UIcon name="i-lucide-history" class="text-secondary mb-sm" />
    <h3 class="font-headline-md text-[18px] hanken mb-xs">Experience</h3>
    <p class="font-body-md text-on-surface-variant">No prior experience required for most posts. Fresh graduates are welcome.</p>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow border-l-4 border-tertiary">
    <UIcon name="i-lucide-public" class="text-tertiary mb-sm" />
    <h3 class="font-headline-md text-[18px] hanken mb-xs">Nationality</h3>
    <p class="font-body-md text-on-surface-variant">Must be a Citizen of India, or a subject of Nepal/Bhutan (as per GOI rules).</p>
    </div>
    </section>
    <!-- Selection Process -->
    <section class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow">
    <h2 class="font-headline-md text-headline-md hanken mb-lg">Selection Process</h2>
    <div class="relative pl-10 space-y-lg timeline-line">
    <div class="relative">
    <div class="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
    <h4 class="font-body-md font-bold text-on-surface">Step 1: Tier-I Examination</h4>
    <p class="font-body-md text-on-surface-variant">Objective Multiple Choice (CBT). Mandatory for all posts. Screening nature.</p>
    </div>
    <div class="relative">
    <div class="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
    <h4 class="font-body-md font-bold text-on-surface">Step 2: Tier-II Examination</h4>
    <p class="font-body-md text-on-surface-variant">Specific subject papers based on post preference. Crucial for final merit.</p>
    </div>
    <div class="relative">
    <div class="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
    <h4 class="font-body-md font-bold text-on-surface">Step 3: Skill Test / DEST</h4>
    <p class="font-body-md text-on-surface-variant">Data Entry Speed Test and Computer Proficiency Test where applicable.</p>
    </div>
    <div class="relative">
    <div class="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
    <h4 class="font-body-md font-bold text-on-surface">Step 4: DV &amp; Final Merit</h4>
    <p class="font-body-md text-on-surface-variant">Document Verification followed by the final selection list based on Tier-II scores.</p>
    </div>
    </div>
    </section>
    <!-- Important Links Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <a class="group flex items-center justify-between p-md bg-primary-container text-white rounded-2xl hover:shadow-xl transition-all active:scale-[0.98]" href="#">
    <div class="flex items-center gap-md">
    <UIcon name="i-lucide-download-for-offline" class="text-4xl opacity-80" />
    <div>
    <p class="font-label-sm opacity-80 uppercase">Official PDF</p>
    <p class="font-headline-md text-[18px] hanken">Download Notification</p>
    </div>
    </div>
    <UIcon name="i-lucide-arrow-right" class="group-hover:translate-x-1 transition-transform" />
    </a>
    <a class="group flex items-center justify-between p-md bg-secondary text-white rounded-2xl hover:shadow-xl transition-all active:scale-[0.98]" href="#">
    <div class="flex items-center gap-md">
    <UIcon name="i-lucide-ads-click" class="text-4xl opacity-80" />
    <div>
    <p class="font-label-sm opacity-80 uppercase">Registration</p>
    <p class="font-headline-md text-[18px] hanken">Apply Online Link</p>
    </div>
    </div>
    <UIcon name="i-lucide-arrow-right" class="group-hover:translate-x-1 transition-transform" />
    </a>
    <a class="group flex items-center justify-between p-md bg-surface-container-high border border-outline-variant text-on-surface rounded-2xl hover:bg-surface-container-highest transition-all active:scale-[0.98]" href="#">
    <div class="flex items-center gap-md">
    <UIcon name="i-lucide-menu-book" class="text-4xl text-primary" />
    <div>
    <p class="font-label-sm text-on-surface-variant uppercase">Preparation</p>
    <p class="font-headline-md text-[18px] hanken">Detailed Syllabus</p>
    </div>
    </div>
    <UIcon name="i-lucide-arrow-right" class="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
    </a>
    <a class="group flex items-center justify-between p-md bg-surface-container-high border border-outline-variant text-on-surface rounded-2xl hover:bg-surface-container-highest transition-all active:scale-[0.98]" href="#">
    <div class="flex items-center gap-md">
    <UIcon name="i-lucide-history-edu" class="text-4xl text-primary" />
    <div>
    <p class="font-label-sm text-on-surface-variant uppercase">Practice</p>
    <p class="font-headline-md text-[18px] hanken">Previous Year Papers</p>
    </div>
    </div>
    <UIcon name="i-lucide-arrow-right" class="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
    </a>
    </section>
    <!-- Related Jobs -->
    <section class="space-y-md">
    <h2 class="font-headline-md text-headline-md hanken">Similar Opportunities</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="bg-surface-container-lowest p-md rounded-2xl premium-shadow border border-outline-variant/30 hover:border-primary transition-all cursor-pointer">
    <div class="flex justify-between items-start mb-sm">
    <span class="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] rounded font-bold uppercase">UPSC</span>
    <UIcon name="i-lucide-bookmark" class="text-outline-variant text-[20px]" />
    </div>
    <h4 class="font-body-md font-bold mb-xs">UPSC CSE 2026</h4>
    <p class="text-[12px] text-on-surface-variant mb-md">Civil Services Examination • 1,000+ Posts</p>
    <button class="w-full py-2 bg-surface-container-low text-primary rounded-lg font-label-sm hover:bg-primary-container hover:text-white transition-all">View Details</button>
    </div>
    <div class="bg-surface-container-lowest p-md rounded-2xl premium-shadow border border-outline-variant/30 hover:border-primary transition-all cursor-pointer">
    <div class="flex justify-between items-start mb-sm">
    <span class="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] rounded font-bold uppercase">IBPS</span>
    <UIcon name="i-lucide-bookmark" class="text-outline-variant text-[20px]" />
    </div>
    <h4 class="font-body-md font-bold mb-xs">IBPS PO XV</h4>
    <p class="text-[12px] text-on-surface-variant mb-md">Probationary Officers • 4,500+ Posts</p>
    <button class="w-full py-2 bg-surface-container-low text-primary rounded-lg font-label-sm hover:bg-primary-container hover:text-white transition-all">View Details</button>
    </div>
    </div>
    </section>
    </div>
    <!-- Sidebar (25%) -->
    <aside class="w-full lg:w-1/4">
    <div class="sticky-sidebar space-y-md">
    <!-- Timer Card -->
    <div class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow border border-error/20">
    <p class="font-label-sm text-error uppercase font-bold text-center mb-md">Time Remaining to Apply</p>
    <div class="grid grid-cols-4 gap-2 text-center mb-lg">
    <div class="bg-error/5 p-2 rounded-xl">
    <p class="text-headline-md font-bold text-error" id="days">42</p>
    <p class="text-[10px] text-on-surface-variant uppercase">Days</p>
    </div>
    <div class="bg-error/5 p-2 rounded-xl">
    <p class="text-headline-md font-bold text-error" id="hours">12</p>
    <p class="text-[10px] text-on-surface-variant uppercase">Hrs</p>
    </div>
    <div class="bg-error/5 p-2 rounded-xl">
    <p class="text-headline-md font-bold text-error" id="minutes">08</p>
    <p class="text-[10px] text-on-surface-variant uppercase">Min</p>
    </div>
    <div class="bg-error/5 p-2 rounded-xl">
    <p class="text-headline-md font-bold text-error" id="seconds">29</p>
    <p class="text-[10px] text-on-surface-variant uppercase">Sec</p>
    </div>
    </div>
    <button class="w-full h-12 bg-primary text-white rounded-xl font-headline-md text-[18px] hover:shadow-lg active:scale-95 transition-all">Apply Now</button>
    </div>
    <!-- Actions Card -->
    <div class="bg-surface-container-lowest p-md rounded-2xl premium-shadow">
    <div class="flex flex-col gap-sm">
    <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all">
    <UIcon name="i-lucide-share-2" class="text-primary" />
    <span class="font-label-md text-on-surface">Share Notification</span>
    </button>
    <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all">
    <UIcon name="i-lucide-bookmark" class="text-primary" style="font-variation-settings: 'FILL' 1;" />
    <span class="font-label-md text-on-surface">Already Saved</span>
    </button>
    <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all">
    <UIcon name="i-lucide-download" class="text-primary" />
    <span class="font-label-md text-on-surface">Save for Offline</span>
    </button>
    <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all">
    <UIcon name="i-lucide-help-circle" class="text-primary" />
    <span class="font-label-md text-on-surface">Ask Expert</span>
    </button>
    </div>
    </div>
    <!-- Promotional Banner -->
    <div class="relative overflow-hidden rounded-2xl aspect-[4/5] premium-shadow group">
    <img alt="Exam Prep" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="A premium educational workspace featuring a high-end laptop, a sleek notebook with a pen, and a warm cup of coffee on a clean white desk. The lighting is soft and professional, with a bright, airy aesthetic. In the background, a modern home office setup with minimalist shelving is visible. The atmosphere conveys a sense of focused study and professional ambition, aligning with a high-end career preparation portal." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp_KQ1_qTXMXrpoJjx262n2VfN7IrfUciEIaVALO5xjGNYeSGYR4yNwjJPMY6jHbl6XU8_LXfALwHJbi0GFl7ui8YggRVvT2jha2aStYNKbbQOmvHO6G_KC-0iMfnjMKaXldgyOMwD9UymTCXRbseTxezyV0HAmdewZlvelM9RhMCUdhamnzGlJ1qU6VhG7yUm0SuCyBzTnDXUfJSDIyhNLciEudnEZ8XHrxwUumxrU6wAIbse-6B9HkT9F6nxThLH4_Ci5jxMDaPg">
    <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-lg">
    <h4 class="font-headline-md text-white mb-xs">Master SSC CGL 2026</h4>
    <p class="font-body-md text-white/80 mb-md">Get exclusive mock tests and study material.</p>
    <button class="bg-white text-primary px-lg py-md rounded-xl font-label-md shadow-lg">Unlock Premium</button>
    </div>
    </div>
    </div>
    </aside>
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full mt-xl bg-surface-container-lowest border-t border-outline-variant">
    <div class="max-w-container-max mx-auto px-lg py-xl flex flex-col md:flex-row justify-between items-center gap-md">
    <div>
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    <p class="font-body-md text-on-surface-variant mt-xs">© 2024 Job Nova. Premium Recruitment Portal.</p>
    </div>
    <div class="flex gap-lg">
    <a class="font-body-md text-on-surface-variant hover:text-primary underline transition-all" href="#">About Us</a>
    <a class="font-body-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Contact</a>
    <a class="font-body-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Privacy Policy</a>
    <a class="font-body-md text-on-surface-variant hover:text-primary underline transition-all" href="#">Terms of Service</a>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; background-color: #f9f9ff; color: #191c23; }
        .hanken { font-family: 'Hanken Grotesk', sans-serif; }
        
        .premium-shadow { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
        .sticky-sidebar { position: sticky; top: 100px; height: fit-content; }
        .timeline-line::before { content: ''; position: absolute; left: 16px; top: 0; bottom: 0; width: 2px; background: #d8e2ff; }
        .gradient-chip { background: linear-gradient(90deg, #2b5bb5 0%, #005bbf 100%); color: white; }
</style>

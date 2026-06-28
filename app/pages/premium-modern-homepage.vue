<script setup>
useHead({
  title: "Job Nova | India's Premium Professional Job Portal"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Search interactions
      const searchInputs = document.querySelectorAll('input, select');
      searchInputs.forEach(input => {
          input.addEventListener('focus', () => {
              input.closest('.search-container').classList.add('ring-4', 'ring-primary/15', 'border-primary');
          });
          input.addEventListener('blur', () => {
              input.closest('.search-container').classList.remove('ring-4', 'ring-primary/15', 'border-primary');
          });
      });
  
      // Simple row interactions
      document.querySelectorAll('tr').forEach(row => {
          row.addEventListener('click', (e) => {
              if (e.target.tagName !== 'BUTTON') {
                  console.log('Navigating to job details...');
              }
          });
      });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30">
    <div class="flex justify-between items-center px-gutter py-4 max-w-7xl mx-auto">
    <div class="flex items-center gap-xl">
    <a class="text-headline-md font-headline-md font-bold text-primary flex items-center gap-2" href="/">
    <UIcon name="i-lucide-rocket-launch" class="text-primary text-3xl" style="font-variation-settings: 'FILL' 1;" />
                    Job Nova
                </a>
    <nav class="hidden lg:flex items-center gap-lg">
    <a class="font-Inter text-label-md text-primary font-bold border-b-2 border-primary py-1" href="/job-search">Find Jobs</a>
    <a class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all" href="/government-jobs">Govt Jobs</a>
    <a class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all" href="/private-jobs">Private Jobs</a>
    <a class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all" href="/job-search">Companies</a>
    <a class="font-Inter text-label-md text-on-surface-variant hover:text-primary transition-all" href="/my-career-hub">Career Advice</a>
    </nav>
    </div>
    <div class="flex items-center gap-md">
    <button class="px-md py-2 font-Inter text-label-md text-on-surface font-semibold hover:text-primary transition-all">Login</button>
    <button class="bg-primary text-on-primary px-lg py-2.5 rounded-lg font-Inter text-label-md font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-primary/20">Post a Job</button>
    </div>
    </div>
    </header>
    <main>
    <!-- Hero Search Section -->
    <section class="relative pt-20 pb-32 overflow-hidden bg-surface-container-lowest">
    <div class="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
    <UIcon name="i-lucide-briefcase" class="text-[400px] text-primary rotate-12" />
    </div>
    <div class="max-w-7xl mx-auto px-gutter relative z-10">
    <div class="max-w-3xl">
    <span class="inline-block px-3 py-1 bg-primary/10 text-primary text-label-sm font-bold rounded-full mb-md uppercase tracking-wider">India's Leading Job Portal</span>
    <h1 class="font-display-lg text-display-lg text-on-surface mb-md">Unlock your professional potential.</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant mb-xl leading-relaxed">Search through 1.2M+ active listings from Fortune 500 companies to prestigious government sectors.</p>
    </div>
    <!-- Search Module -->
    <div class="search-container max-w-5xl bg-surface-container-lowest border border-outline-variant/50 p-2 rounded-2xl elevation-premium flex flex-col md:flex-row items-stretch gap-1 transition-all duration-300">
    <div class="flex-1 flex items-center px-4 py-4 gap-sm border-r border-outline-variant/20">
    <UIcon name="i-lucide-search" class="text-primary" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-Inter text-body-md placeholder:text-outline/60" placeholder="Job title, keywords, or company" type="text"/>
    </div>
    <div class="flex-1 flex items-center px-4 py-4 gap-sm border-r border-outline-variant/20">
    <UIcon name="i-lucide-map-pin" class="text-primary" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-Inter text-body-md placeholder:text-outline/60" placeholder="City, State or Remote" type="text"/>
    </div>
    <div class="w-full md:w-56 flex items-center px-4 py-4 gap-sm">
    <UIcon name="i-lucide-history" class="text-primary" />
    <select class="w-full bg-transparent border-none focus:ring-0 font-Inter text-body-md text-on-surface-variant cursor-pointer">
    <option>Experience</option>
    <option>Fresher</option>
    <option>1-3 Years</option>
    <option>3-5 Years</option>
    <option>5+ Years</option>
    </select>
    </div>
    <button class="w-full md:w-auto bg-primary text-on-primary px-10 py-4 rounded-xl font-Inter text-label-md font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">Find Jobs</button>
    </div>
    <!-- Modern Stats Cards -->
    <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-lg">
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 text-center job-card-hover transition-all">
    <div class="text-headline-lg text-primary mb-1">50k+</div>
    <div class="text-label-md text-on-surface-variant font-medium">Active Vacancies</div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 text-center job-card-hover transition-all">
    <div class="text-headline-lg text-primary mb-1">15k+</div>
    <div class="text-label-md text-on-surface-variant font-medium">Govt Openings</div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 text-center job-card-hover transition-all">
    <div class="text-headline-lg text-primary mb-1">5k+</div>
    <div class="text-label-md text-on-surface-variant font-medium">Hiring Companies</div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 text-center job-card-hover transition-all">
    <div class="text-headline-lg text-primary mb-1">100+</div>
    <div class="text-label-md text-on-surface-variant font-medium">Cities Covered</div>
    </div>
    </div>
    </div>
    </section>
    <!-- High Impact Career Paths -->
    <section class="py-20 bg-surface-container-lowest">
    <div class="max-w-7xl mx-auto px-gutter">
    <div class="grid md:grid-cols-2 gap-lg">
    <!-- Government Jobs Card -->
    <div class="group relative overflow-hidden bg-[#f0f4ff] rounded-2xl p-xl border border-primary/10 hover:border-primary/30 transition-all">
    <div class="relative z-10 flex flex-col h-full">
    <div class="flex items-center gap-md mb-lg">
    <div class="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/30">
    <UIcon name="i-lucide-landmark" class="text-[32px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <h3 class="font-headline-lg text-on-surface">Government Jobs</h3>
    <div class="flex items-center gap-2 text-primary font-bold text-label-md">
    <span>15k+ Openings</span>
    <UIcon name="i-lucide-trending-up" class="text-sm" />
    </div>
    </div>
    </div>
    <div class="grid grid-cols-2 gap-md mb-xl">
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-primary hover:text-on-primary transition-all text-center" href="/government-jobs">SSC &amp; Railway</a>
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-primary hover:text-on-primary transition-all text-center" href="/government-jobs">Banking &amp; PSU</a>
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-primary hover:text-on-primary transition-all text-center" href="/government-jobs">UPSC &amp; PSC</a>
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-primary hover:text-on-primary transition-all text-center" href="/government-jobs">Teaching</a>
    </div>
    <button class="mt-auto w-fit flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                Browse All Govt Jobs <UIcon name="i-lucide-arrow-right" />
    </button>
    </div>
    </div>
    <!-- Private Sector Card -->
    <div class="group relative overflow-hidden bg-[#fdf2ff] rounded-2xl p-xl border border-secondary/10 hover:border-secondary/30 transition-all">
    <div class="relative z-10 flex flex-col h-full">
    <div class="flex items-center gap-md mb-lg">
    <div class="w-14 h-14 rounded-xl bg-secondary text-on-primary flex items-center justify-center shadow-lg shadow-secondary/30">
    <UIcon name="i-lucide-business-center" class="text-[32px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <h3 class="font-headline-lg text-on-surface">Private Sector</h3>
    <div class="flex items-center gap-2 text-secondary font-bold text-label-md">
    <span>40k+ Openings</span>
    <UIcon name="i-lucide-rocket" class="text-sm" />
    </div>
    </div>
    </div>
    <div class="grid grid-cols-2 gap-md mb-xl">
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-secondary hover:text-on-primary transition-all text-center" href="/job-search">IT &amp; Tech</a>
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-secondary hover:text-on-primary transition-all text-center" href="/job-search">Finance</a>
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-secondary hover:text-on-primary transition-all text-center" href="/job-search">Management</a>
    <a class="bg-surface-container-lowest/80 backdrop-blur px-md py-3 rounded-xl text-body-md font-medium text-on-surface hover:bg-secondary hover:text-on-primary transition-all text-center" href="/job-search">Creative</a>
    </div>
    <button class="mt-auto w-fit flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all">
                                Browse All Private Jobs <UIcon name="i-lucide-arrow-right" />
    </button>
    </div>
    </div>
    </div>
    </div>
    </section>
    <!-- Refined Job Tables -->
    <section class="py-20 bg-surface-container-lowest">
    <div class="max-w-7xl mx-auto px-gutter space-y-24">
    <!-- Govt Jobs Table -->
    <div>
    <div class="flex justify-between items-end mb-lg">
    <div>
    <h2 class="font-headline-lg text-on-surface">Latest Government Vacancies</h2>
    <p class="text-body-md text-on-surface-variant">Real-time updates from official government notifications</p>
    </div>
    <a class="text-primary font-bold text-label-md flex items-center gap-1 hover:underline" href="/job-search">View All <UIcon name="i-lucide-external-link" class="text-base" /></a>
    </div>
    <div class="border border-outline-variant/30 rounded-2xl overflow-hidden elevation-premium">
    <table class="w-full text-left border-collapse">
    <thead class="bg-surface-container-low/50">
    <tr>
    <th class="px-lg py-5 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Position</th>
    <th class="px-lg py-5 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Dept / Organization</th>
    <th class="px-lg py-5 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Location</th>
    <th class="px-lg py-5 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Deadline</th>
    <th class="px-lg py-5 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-outline-variant/20">
    <tr class="hover:bg-primary/5 transition-all cursor-pointer group">
    <td class="px-lg py-5">
    <div class="font-Inter text-body-md font-bold text-on-surface">Assistant Manager (IT)</div>
    <div class="text-label-sm text-on-surface-variant mt-1">Scale II Officer</div>
    </td>
    <td class="px-lg py-5 font-Inter text-body-md text-on-surface-variant">State Bank of India (SBI)</td>
    <td class="px-lg py-5 font-Inter text-body-md text-on-surface-variant">Mumbai / Pan India</td>
    <td class="px-lg py-5">
    <span class="px-2 py-1 bg-error-container text-on-error-container text-label-sm font-bold rounded">15 Oct 2024</span>
    </td>
    <td class="px-lg py-5">
    <button class="bg-primary-container text-on-primary-container px-lg py-2 rounded-lg text-label-sm font-bold shadow-sm hover:shadow-md transition-all">View Details</button>
    </td>
    </tr>
    <tr class="hover:bg-primary/5 transition-all cursor-pointer group">
    <td class="px-lg py-5">
    <div class="font-Inter text-body-md font-bold text-on-surface">Section Officer</div>
    <div class="text-label-sm text-on-surface-variant mt-1">Grade B Gazetted</div>
    </td>
    <td class="px-lg py-5 font-Inter text-body-md text-on-surface-variant">UPSC</td>
    <td class="px-lg py-5 font-Inter text-body-md text-on-surface-variant">New Delhi</td>
    <td class="px-lg py-5 font-Inter text-body-md text-on-surface-variant">22 Oct 2024</td>
    <td class="px-lg py-5">
    <button class="bg-primary-container text-on-primary-container px-lg py-2 rounded-lg text-label-sm font-bold shadow-sm hover:shadow-md transition-all">View Details</button>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    <!-- Private Jobs Grid -->
    <div>
    <div class="flex justify-between items-end mb-lg">
    <div>
    <h2 class="font-headline-lg text-on-surface">Trending Professional Roles</h2>
    <p class="text-body-md text-on-surface-variant">Verified listings from leading corporate firms</p>
    </div>
    <a class="text-primary font-bold text-label-md flex items-center gap-1 hover:underline" href="/register-choose-account-type">Explore Careers <UIcon name="i-lucide-east" class="text-base" /></a>
    </div>
    <div class="grid md:grid-cols-3 gap-lg">
    <!-- Featured Job Card 1 -->
    <div class="bg-surface-container-lowest border border-outline-variant/30 p-lg rounded-2xl job-card-hover transition-all flex flex-col relative">
    <div class="absolute top-4 right-4">
    <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-tighter">Remote</span>
    </div>
    <div class="flex items-center gap-md mb-lg">
    <div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-bold text-primary border border-outline-variant/20">T</div>
    <div>
    <h4 class="font-bold text-on-surface">Full Stack Developer</h4>
    <p class="text-label-sm text-on-surface-variant">TCS • 2 days ago</p>
    </div>
    </div>
    <div class="space-y-2 mb-lg">
    <div class="flex items-center gap-2 text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" /> Bengaluru, KA
                                </div>
    <div class="flex items-center gap-2 text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-sm" /> ₹12L - ₹18L PA
                                </div>
    </div>
    <div class="flex flex-wrap gap-2 mb-lg">
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">React</span>
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">Node.js</span>
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">AWS</span>
    </div>
    <button class="mt-auto w-full py-3 border border-primary text-primary font-bold text-label-md rounded-xl hover:bg-primary hover:text-on-primary transition-all">Quick Apply</button>
    </div>
    <!-- Featured Job Card 2 -->
    <div class="bg-surface-container-lowest border border-outline-variant/30 p-lg rounded-2xl job-card-hover transition-all flex flex-col relative">
    <div class="absolute top-4 right-4">
    <span class="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-tighter">Featured</span>
    </div>
    <div class="flex items-center gap-md mb-lg">
    <div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-bold text-primary border border-outline-variant/20">I</div>
    <div>
    <h4 class="font-bold text-on-surface">UX/UI Designer</h4>
    <p class="text-label-sm text-on-surface-variant">Infosys • 4 hours ago</p>
    </div>
    </div>
    <div class="space-y-2 mb-lg">
    <div class="flex items-center gap-2 text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" /> Hyderabad, TS
                                </div>
    <div class="flex items-center gap-2 text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-sm" /> ₹8L - ₹15L PA
                                </div>
    </div>
    <div class="flex flex-wrap gap-2 mb-lg">
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">Figma</span>
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">Interaction</span>
    </div>
    <button class="mt-auto w-full py-3 border border-primary text-primary font-bold text-label-md rounded-xl hover:bg-primary hover:text-on-primary transition-all">Quick Apply</button>
    </div>
    <!-- Featured Job Card 3 -->
    <div class="bg-surface-container-lowest border border-outline-variant/30 p-lg rounded-2xl job-card-hover transition-all flex flex-col relative">
    <div class="absolute top-4 right-4">
    <span class="px-2 py-1 bg-error-container text-error text-[10px] font-bold rounded uppercase tracking-tighter">Urgent</span>
    </div>
    <div class="flex items-center gap-md mb-lg">
    <div class="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-bold text-primary border border-outline-variant/20">W</div>
    <div>
    <h4 class="font-bold text-on-surface">Data Analyst</h4>
    <p class="text-label-sm text-on-surface-variant">Wipro • Today</p>
    </div>
    </div>
    <div class="space-y-2 mb-lg">
    <div class="flex items-center gap-2 text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" /> Gurugram, HR
                                </div>
    <div class="flex items-center gap-2 text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-sm" /> ₹6L - ₹10L PA
                                </div>
    </div>
    <div class="flex flex-wrap gap-2 mb-lg">
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">SQL</span>
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">Python</span>
    <span class="px-2 py-1 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">PowerBI</span>
    </div>
    <button class="mt-auto w-full py-3 border border-primary text-primary font-bold text-label-md rounded-xl hover:bg-primary hover:text-on-primary transition-all">Quick Apply</button>
    </div>
    </div>
    </div>
    </div>
    </section>
    <!-- Top Employers Showcase -->
    <section class="py-20 bg-surface-container-low/30">
    <div class="max-w-7xl mx-auto px-gutter">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
    <div>
    <h2 class="font-headline-lg text-on-surface">Top Hiring Partners</h2>
    <p class="text-body-md text-on-surface-variant">Direct career pathways to India's most valued organizations</p>
    </div>
    <button class="px-lg py-2.5 border border-outline-variant text-on-surface font-bold text-label-md rounded-xl hover:bg-surface-container-lowest transition-all">View All Companies</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-md">
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 flex flex-col items-center group cursor-pointer hover:border-primary transition-all">
    <img alt="TCS Logo" class="w-16 h-16 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnUcPJVu16WS6w0TT23PKiB9OQSjrWxKp3AJBhgVtw_jIqUCucZeCtv_MI-48dGKDpJ6pqqpYgUV48WXFZl2DEyu9BGfAoJEZxsFXjWRlGs2N2-X8iG8mNcAzFKeiTscEAXbgRLSxBGEpfxgL024VihkpyuC4e3Az5kxPj6OCrpMIeeMH5dQztj3aGKjIwF6dMBzsWM1JeWl2GYZvOXzEVMPht1m3RBOEzDftpFNdvc_-lUkTkPWbXv408USQOX5s5J1rG8sv-o0NA"/>
    <span class="text-label-md font-bold text-on-surface">TCS</span>
    <span class="text-[10px] text-primary font-bold mt-1">1200+ Jobs</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 flex flex-col items-center group cursor-pointer hover:border-primary transition-all">
    <img alt="Infosys Logo" class="w-16 h-16 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATsrXLSVtJFofeGqgdyv-mPXvOkyB45KVti3QZeSwwdcWvcIiKmgsy0OPZSA8hDeBQsNzsMTIDEkS5eN-pj-n1o1dy8jDNjYl5aunS8y7M-eB1_LIqpUfpX0_JxW-ymxJyOFREvTLE_JIX55pTkkkkiqlX_Z5rOxpMQsRk4YPoBxyqlqkdMW6GiVlCZcf8iLjMDGEalEl9y7ywIw6LJlnAsc1ssFHJC6roIlhQpA4bzpHvRv0oKOe_Re8E0AQSQColelGEradvLQf_"/>
    <span class="text-label-md font-bold text-on-surface">Infosys</span>
    <span class="text-[10px] text-primary font-bold mt-1">850+ Jobs</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 flex flex-col items-center group cursor-pointer hover:border-primary transition-all">
    <img alt="Wipro Logo" class="w-16 h-16 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2UXn4lZeilfjw-EHqxDWiodhmo1jPoDOwpoJpYKai8b-8yKQW39MYkIRHTXfUjUEvRN4_CT0TI9qwbyDStBYirlo_lz9Hb2ni_pZG09d_KYwuIOlK4sNNmjC79YStpgObkzY1A4bC8RClkbpCYjNNltHbmVhER_Qa3qA_WjJDBr8tlw-pzBxWNXTZKKcUuLGU2tCVw5OO-YaEg-iAS4JK7IDmL72p5uFFlIapBAaveZlS2LOGr9wfoHdSdMaGoH_DhdFm_Uaq3fy3"/>
    <span class="text-label-md font-bold text-on-surface">Wipro</span>
    <span class="text-[10px] text-primary font-bold mt-1">600+ Jobs</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 flex flex-col items-center group cursor-pointer hover:border-primary transition-all">
    <img alt="HCL Logo" class="w-16 h-16 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqohTZw24mrmWsTztON6WI3Grli3XJdtC9grWv_wgaiZbPNyPZJ4DA51g678EgkKoYZwig3MacTScl6HTQ00_mVD_AoV9mq_6B1YARCY960OoK5FeY_92UX9iojHB3glsUlCd0GN7FMdjXMcWxZCf6ee0fW3SoDkRvLVv6VuTwWypdIeKTt4gTCIfu2vVaEs3UbTqHJ_Jl_oSNZlLbBEQoQllwEN-i1AmeTXtPp0JCPfnmFjJL4ccQy1JlAe9dfT6I-QfWxVmH0TxD"/>
    <span class="text-label-md font-bold text-on-surface">HCLTech</span>
    <span class="text-[10px] text-primary font-bold mt-1">400+ Jobs</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 flex flex-col items-center group cursor-pointer hover:border-primary transition-all">
    <div class="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all">
    <UIcon name="i-lucide-wallet" class="text-primary" />
    </div>
    <span class="text-label-md font-bold text-on-surface">HDFC Bank</span>
    <span class="text-[10px] text-primary font-bold mt-1">200+ Jobs</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant/30 flex flex-col items-center group cursor-pointer hover:border-primary transition-all">
    <div class="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all">
    <UIcon name="i-lucide-shopping-bag" class="text-primary" />
    </div>
    <span class="text-label-md font-bold text-on-surface">Reliance</span>
    <span class="text-[10px] text-primary font-bold mt-1">900+ Jobs</span>
    </div>
    </div>
    </div>
    </section>
    <!-- Employer Section -->
    <section class="py-24 bg-primary overflow-hidden">
    <div class="max-w-7xl mx-auto px-gutter grid lg:grid-cols-2 gap-xl items-center">
    <div class="text-on-primary">
    <span class="inline-block px-3 py-1 bg-surface-container-lowest/20 backdrop-blur-md rounded-full text-[12px] font-bold uppercase tracking-widest mb-6">For Employers</span>
    <h2 class="text-display-lg font-display-lg mb-8 leading-tight">Hire faster with data-driven insights.</h2>
    <p class="text-body-lg opacity-80 mb-10 max-w-lg leading-relaxed">Join 5000+ HR teams across India. Get access to the largest pool of qualified candidates from government and private sectors.</p>
    <div class="flex flex-col sm:flex-row gap-4 mb-12">
    <button class="bg-surface-container-lowest text-primary px-xl py-4 rounded-xl font-bold text-label-md hover:bg-surface-container transition-all active:scale-95 shadow-xl shadow-black/10">Post A Job Now</button>
    <button class="border border-outline-variant/40 bg-surface-container-lowest/10 text-on-primary px-xl py-4 rounded-xl font-bold text-label-md hover:bg-surface-container-lowest/20 transition-all active:scale-95">Book a Demo</button>
    </div>
    <div class="flex items-center gap-lg">
    <div class="flex -space-x-3">
    <div class="w-12 h-12 rounded-full border-4 border-primary bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsoncoJjcM5E6kABROfjcAzPlxvXt9UuuX5TCy1pXlljbo70kzvckMop8qyEbrqOiQtUz9ejjHOLKPG_LqjnDAjdQ7yRIB2iaUeS2nktz_s6150uhfn7m4P8HpYYBy6mGYts-B6F0j-t7S47dfq8LKJ3F9qVMlxUtjXgmTRgp619gI9foo_sXBogeDJbnNTr-SnXcqGCvH5rUi9fQNTFuV2TsVTA3bMFEfDULT3OnsrA0kUcF1m_0pKRHE3nf4TsJ6lCEmN-0RbcTE')"></div>
    <div class="w-12 h-12 rounded-full border-4 border-primary bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOmj90G_By9QLlIk6OIYJ_0xhfYYgpErRx-TvjNArQnHb-Bg-yF0UNb4b9t635qo3CtSRpk6oFaWIU6tW5UsBUDAsMRi8PDfTpSdp0gIFnWqzJIl45m79lZWXf226JRjqbl3P3QeQPqBuB2KpbO2ksWi_cemvAaYW0MZ6KQhf3XlxlDf0f5SDFJ0SV7Zd5cwNj_kpTsFdVMPH16vt28sfmjdoN7v8z1bW1Wn0vaQ38R1DvpOhKNmgTX4_f9pOxqSz12PRAYN6pZrl-')"></div>
    <div class="w-12 h-12 rounded-full border-4 border-primary bg-cover" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvN6cgt3ImnNM_fopzl56GpLH-h8x7isdfrcoa9UT2lw25API19rdNkYdswaGCK-XVp3TDOu0UIM5HOWSrYwwSYYBplSmZ_qY5_wTQZJmGvBlSutXiT0zZARvXdLbXgpsLwBwOk4XFpEIGyEirgelR0pQAFbU9yl9HsvmHvVQgm5W0g0cE7OBF_qugdmqVKfyARaEfMYFeKpRa5-Hdr9JEJ1mVxxFdU4VFgvIoK-_AUP-CUpwEcUNqiXV8zDq9Hu7MgylKuzYCC1lk')"></div>
    </div>
    <div class="text-on-primary/80 text-label-sm font-medium">
                            Trusted by top recruitment teams
                        </div>
    </div>
    </div>
    <div class="relative mt-12 lg:mt-0">
    <div class="bg-surface-container-lowest/5 backdrop-blur-2xl p-4 rounded-[2rem] border border-outline-variant/20 shadow-2xl relative z-10">
    <img alt="Hiring Dashboard Preview" class="rounded-2xl shadow-2xl border border-outline-variant/10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDjjEA0UFVGkhRvbgyIiiFMMsT2qoTNYbu8wUUG9yG_ETxvaMqs9Da7XRD9Tr-3YfJEPYpJQRVxTxgQMvIU7_po940Z8no-CDjPxZ1obdV0Fcz_lbvgWXAuphVALlbaezCo-JhavRtp9cf5cLKVW770u1ngKQxCkdJQayPxtb8-o9L000tM2O-EOZ0knxKycyBfcZB2oXq-biAvdWobbmlMWKav5oi_LM11Fqgu_zRydN-PYgThA1WHFx6l6Vobzo2tMY63YIULDb"/>
    </div>
    <div class="absolute -top-10 -right-10 w-40 h-40 bg-surface-container-lowest/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl"></div>
    </div>
    </div>
    </section>
    </main>
    <!-- Footer -->
    <footer class="bg-surface-container-lowest pt-24 pb-12 border-t border-outline-variant/30">
    <div class="max-w-7xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-xl">
    <div class="lg:col-span-2">
    <a class="text-headline-md font-headline-md font-bold text-primary mb-6 block" href="/">Job Nova</a>
    <p class="text-body-md text-on-surface-variant mb-8 max-w-sm leading-relaxed">Empowering careers through curated opportunities across India's government and private professional landscapes.</p>
    <div class="flex gap-md">
    <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all" href="/"><UIcon name="i-lucide-share-2" class="text-base" /></a>
    <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all" href="/"><UIcon name="i-lucide-mail" class="text-base" /></a>
    <a class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all" href="/"><UIcon name="i-lucide-link-2" class="text-base" /></a>
    </div>
    </div>
    <div>
    <h5 class="font-bold text-label-md text-on-surface mb-6 uppercase tracking-widest text-[11px]">Seekers</h5>
    <ul class="space-y-4">
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/register-choose-account-type">Govt Careers</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Corporate Roles</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Fresher Jobs</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/job-search">Salary Guide</a></li>
    </ul>
    </div>
    <div>
    <h5 class="font-bold text-label-md text-on-surface mb-6 uppercase tracking-widest text-[11px]">Employers</h5>
    <ul class="space-y-4">
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/register-employer-step-1">Post a Job</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/jobseeker-dashboard">Hiring Dashboard</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/register-employer-step-1">Pricing Plans</a></li>
    </ul>
    </div>
    <div>
    <h5 class="font-bold text-label-md text-on-surface mb-6 uppercase tracking-widest text-[11px]">Support</h5>
    <ul class="space-y-4">
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/">Help Center</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/">Contact Us</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/">Terms of Use</a></li>
    <li><a class="text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/">Privacy Policy</a></li>
    </ul>
    </div>
    </div>
    <div class="max-w-7xl mx-auto px-gutter mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-md">
    <p class="text-label-sm text-on-surface-variant">© 2024 Job Nova Professional Services. All rights reserved.</p>
    <div class="flex gap-lg">
    <span class="text-label-sm text-on-surface-variant font-medium">Headquartered in Bengaluru, India</span>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; background-color: var(--color-surface); color: var(--color-on-surface); }
        .hanken { font-family: 'Hanken Grotesk', sans-serif; }
        
        .elevation-premium { box-shadow: 0 10px 40px -10px rgba(0, 91, 191, 0.12); }
        .search-container:focus-within { box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.15); border-color: var(--color-primary-container); }
        .job-card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05); }
</style>

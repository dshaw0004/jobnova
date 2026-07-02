<script setup>
useHead({
  title: "Job Nova | India's Premium Professional Job Portal"
})

import { onMounted, computed } from 'vue'

// Fetch the latest 3 government jobs from D1
const { data: govtJobsData } = await useFetch('/api/jobs/govt-list', {
  query: { limit: 3 }
})
const govtJobs = computed(() => govtJobsData.value?.jobs || [])

onMounted(() => {
  try {
  // Micro-interaction for table rows
          document.querySelectorAll('tr').forEach(row => {
              row.addEventListener('click', () => {
                  const title = row.querySelector('td')?.innerText || 'Job';
                  console.log(`Navigating to details for: ${title}`);
              });
          });
  
          // Search bar interaction
          const searchInputs = document.querySelectorAll('input, select');
          searchInputs.forEach(input => {
              input.addEventListener('focus', () => {
                  input.closest('.bg-surface-container-lowest').classList.add('ring-2', 'ring-primary/20', 'border-primary');
              });
              input.addEventListener('blur', () => {
                  input.closest('.bg-surface-container-lowest').classList.remove('ring-2', 'ring-primary/20', 'border-primary');
              });
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <main>
    <!-- Hero Search Section -->
    <section class="relative pt-xl pb-32 overflow-hidden">
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent"></div>
    <div class="max-w-7xl mx-auto px-gutter text-center">
    <h1 class="font-display-lg text-display-lg text-on-surface mb-md">Find your dream job in India</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-2xl mx-auto">Explore thousands of opportunities from top government organizations and leading private companies.</p>
    <!-- Search Box -->
    <div class="max-w-4xl mx-auto bg-surface-container-lowest p-sm md:p-base rounded-xl elevation-1 flex flex-col md:flex-row items-center gap-base">
    <div class="flex-1 w-full flex items-center px-md py-3 gap-sm border-r border-outline-variant/30">
    <UIcon name="i-lucide-search" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-Inter text-body-md placeholder:text-outline/60" placeholder="Job title, skills, or company" type="text"/>
    </div>
    <div class="flex-1 w-full flex items-center px-md py-3 gap-sm border-r border-outline-variant/30">
    <UIcon name="i-lucide-map-pin" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-Inter text-body-md placeholder:text-outline/60" placeholder="City or state" type="text"/>
    </div>
    <div class="w-full md:w-48 flex items-center px-md py-3 gap-sm">
    <UIcon name="i-lucide-history" class="text-outline" />
    <select class="w-full bg-transparent border-none focus:ring-0 font-Inter text-body-md text-on-surface-variant">
    <option>Experience</option>
    <option>Fresher</option>
    <option>1-3 Years</option>
    <option>3-5 Years</option>
    <option>5+ Years</option>
    </select>
    </div>
    <button class="w-full md:w-auto bg-primary-container text-on-primary-container px-xl py-4 rounded-lg font-Inter text-label-md font-bold hover:opacity-90 active:scale-[0.98] transition-all">Search Jobs</button>
    </div>
    <!-- Stats -->
    <div class="mt-xl flex flex-wrap justify-center gap-xl">
    <div class="flex flex-col items-center">
    <span class="font-headline-lg text-headline-lg text-primary">15k+</span>
    <span class="font-label-md text-label-md text-on-surface-variant">Govt Jobs</span>
    </div>
    <div class="h-10 w-px bg-outline-variant hidden md:block"></div>
    <div class="flex flex-col items-center">
    <span class="font-headline-lg text-headline-lg text-primary">40k+</span>
    <span class="font-label-md text-label-md text-on-surface-variant">Private Jobs</span>
    </div>
    <div class="h-10 w-px bg-outline-variant hidden md:block"></div>
    <div class="flex flex-col items-center">
    <span class="font-headline-lg text-headline-lg text-primary">5k+</span>
    <span class="font-label-md text-label-md text-on-surface-variant">Hiring Companies</span>
    </div>
    </div>
    </div>
    </section>
    <!-- Career Path Grid -->
    <section class="py-xl bg-surface-container-low/50">
    <div class="max-w-7xl mx-auto px-gutter">
    <div class="grid md:grid-cols-2 gap-lg">
    <!-- Government Jobs Card -->
    <div class="bg-surface-container-lowest rounded-xl p-lg elevation-1 hover:scale-[1.01] transition-transform cursor-pointer border border-primary/10">
    <div class="flex items-center gap-md mb-lg">
    <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
    <UIcon name="i-lucide-landmark" class="text-[32px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <h3 class="font-headline-md text-headline-md text-on-surface">Government Jobs</h3>
    <p class="font-label-md text-label-md text-on-surface-variant">Central &amp; State Govt. Opportunities</p>
    </div>
    </div>
    <div class="grid grid-cols-2 gap-sm">
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-primary/5 transition-colors">SSC &amp; Railway</div>
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-primary/5 transition-colors">Banking &amp; PSU</div>
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-primary/5 transition-colors">UPSC &amp; State PSC</div>
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-primary/5 transition-colors">Teaching &amp; Defense</div>
    </div>
    </div>
    <!-- Private Jobs Card -->
    <div class="bg-surface-container-lowest rounded-xl p-lg elevation-1 hover:scale-[1.01] transition-transform cursor-pointer border border-secondary/10">
    <div class="flex items-center gap-md mb-lg">
    <div class="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
    <UIcon name="i-lucide-business-center" class="text-[32px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <h3 class="font-headline-md text-headline-md text-on-surface">Private Sector</h3>
    <p class="font-label-md text-label-md text-on-surface-variant">Top Corporate &amp; Startup Roles</p>
    </div>
    </div>
    <div class="grid grid-cols-2 gap-sm">
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-secondary/5 transition-colors">IT &amp; Software</div>
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-secondary/5 transition-colors">Finance &amp; Sales</div>
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-secondary/5 transition-colors">Marketing &amp; HR</div>
    <div class="bg-surface-container-low px-md py-3 rounded-lg font-Inter text-body-md hover:bg-secondary/5 transition-colors">Healthcare &amp; Ops</div>
    </div>
    </div>
    </div>
    </div>
    </section>
    <!-- Jobs Table Sections -->
    <section class="py-xl">
    <div class="max-w-7xl mx-auto px-gutter space-y-xl">
    <!-- Govt Jobs -->
    <div>
    <div class="flex justify-between items-end mb-lg">
    <div>
    <h2 class="font-headline-lg text-headline-lg text-on-surface">Latest Government Jobs</h2>
    <p class="font-body-md text-body-md text-on-surface-variant">Updated every hour with direct official links</p>
    </div>
    <a class="text-primary font-bold font-Inter text-label-md hover:underline" href="/government-jobs">View All Govt Jobs</a>
    </div>
    <div class="bg-surface-container-lowest rounded-xl elevation-1 overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
    <thead>
    <tr class="bg-surface-container border-b border-outline-variant/30">
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Job Title</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Organization</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Location</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Last Date</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Qualification</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-outline-variant/20">
    <tr v-for="job in govtJobs" :key="job.id" class="hover:bg-primary/5 transition-colors group">
    <td class="px-lg py-4 font-Inter text-body-md font-semibold text-on-surface line-clamp-1 mt-1.5">{{ job.post }}</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant font-medium">{{ job.organisation }}</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">Pan India</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">{{ job.last_date }}</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">{{ job.method }}</td>
    <td class="px-lg py-4">
    <a href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All" target="_blank" class="bg-primary/10 text-primary px-md py-1.5 rounded-lg text-label-sm font-bold group-hover:bg-primary group-hover:text-on-primary transition-all inline-block text-center">Apply</a>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
    <!-- Private Jobs -->
    <div>
    <div class="flex justify-between items-end mb-lg">
    <div>
    <h2 class="font-headline-lg text-headline-lg text-on-surface">Trending Private Jobs</h2>
    <p class="font-body-md text-body-md text-on-surface-variant">Discover high-growth career opportunities</p>
    </div>
    <a class="text-primary font-bold font-Inter text-label-md hover:underline" href="/job-search">View All Private Jobs</a>
    </div>
    <div class="bg-surface-container-lowest rounded-xl elevation-1 overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
    <thead>
    <tr class="bg-surface-container border-b border-outline-variant/30">
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Job Title</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Company</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Location</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Salary (LPA)</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Experience</th>
    <th class="px-lg py-4 font-Inter text-label-md font-bold text-on-surface-variant">Action</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-outline-variant/20">
    <tr class="hover:bg-primary/5 transition-colors group">
    <td class="px-lg py-4 flex items-center gap-md">
    <div class="w-10 h-10 rounded-lg bg-surface-container-low border border-outline-variant/20 flex items-center justify-center font-bold text-primary">T</div>
    <div class="font-Inter text-body-md font-semibold text-on-surface">Software Developer</div>
    </td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">TCS</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">Hyderabad</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">4.5 - 12.0</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">0-3 Years</td>
    <td class="px-lg py-4">
    <button class="bg-primary/10 text-primary px-md py-1.5 rounded-lg text-label-sm font-bold group-hover:bg-primary group-hover:text-on-primary transition-all">Quick Apply</button>
    </td>
    </tr>
    <tr class="hover:bg-primary/5 transition-colors group">
    <td class="px-lg py-4 flex items-center gap-md">
    <div class="w-10 h-10 rounded-lg bg-surface-container-low border border-outline-variant/20 flex items-center justify-center font-bold text-primary">I</div>
    <div class="font-Inter text-body-md font-semibold text-on-surface">Senior Sales Executive</div>
    </td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">Infosys</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">Bengaluru</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">8.0 - 15.0</td>
    <td class="px-lg py-4 font-Inter text-body-md text-on-surface-variant">4-6 Years</td>
    <td class="px-lg py-4">
    <button class="bg-primary/10 text-primary px-md py-1.5 rounded-lg text-label-sm font-bold group-hover:bg-primary group-hover:text-on-primary transition-all">Quick Apply</button>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    </section>
    <!-- Categories Grid -->
    <section class="py-xl bg-surface-container-low">
    <div class="max-w-7xl mx-auto px-gutter">
    <h2 class="font-headline-lg text-headline-lg text-on-surface mb-lg">Jobs by Category</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
    <div class="bg-surface-container-lowest p-lg rounded-xl elevation-1 flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group">
    <UIcon name="i-lucide-code" class="text-[40px] text-primary mb-md group-hover:scale-110 transition-transform" />
    <span class="font-Inter text-body-md font-bold text-on-surface">IT &amp; Software</span>
    <span class="font-label-sm text-label-sm text-on-surface-variant mt-1">12k+ Openings</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-xl elevation-1 flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group">
    <UIcon name="i-lucide-banknote" class="text-[40px] text-primary mb-md group-hover:scale-110 transition-transform" />
    <span class="font-Inter text-body-md font-bold text-on-surface">Banking &amp; Finance</span>
    <span class="font-label-sm text-label-sm text-on-surface-variant mt-1">8k+ Openings</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-xl elevation-1 flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group">
    <UIcon name="i-lucide-megaphone" class="text-[40px] text-primary mb-md group-hover:scale-110 transition-transform" />
    <span class="font-Inter text-body-md font-bold text-on-surface">Marketing</span>
    <span class="font-label-sm text-label-sm text-on-surface-variant mt-1">5k+ Openings</span>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-xl elevation-1 flex flex-col items-center text-center hover:shadow-lg transition-all cursor-pointer group">
    <UIcon name="i-lucide-shopping-cart" class="text-[40px] text-primary mb-md group-hover:scale-110 transition-transform" />
    <span class="font-Inter text-body-md font-bold text-on-surface">Retail &amp; Sales</span>
    <span class="font-label-sm text-label-sm text-on-surface-variant mt-1">6k+ Openings</span>
    </div>
    </div>
    </div>
    </section>
    <!-- Featured Companies -->
    <section class="py-xl">
    <div class="max-w-7xl mx-auto px-gutter">
    <div class="flex items-center justify-between mb-lg">
    <h2 class="font-headline-lg text-headline-lg text-on-surface">Featured Companies</h2>
    <a class="text-primary font-bold font-Inter text-label-md hover:underline" href="/job-search">View All</a>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-lg">
    <!-- TCS -->
    <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 text-center hover:border-primary transition-all group cursor-pointer">
    <div class="w-20 h-20 mx-auto bg-surface-container-low rounded-lg mb-md flex items-center justify-center p-md">
    <img class="w-full h-auto grayscale group-hover:grayscale-0 transition-all" data-alt="Official logo of Tata Consultancy Services (TCS) in a clean corporate style, high resolution, minimalist blue and white aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnUcPJVu16WS6w0TT23PKiB9OQSjrWxKp3AJBhgVtw_jIqUCucZeCtv_MI-48dGKDpJ6pqqpYgUV48WXFZl2DEyu9BGfAoJEZxsFXjWRlGs2N2-X8iG8mNcAzFKeiTscEAXbgRLSxBGEpfxgL024VihkpyuC4e3Az5kxPj6OCrpMIeeMH5dQztj3aGKjIwF6dMBzsWM1JeWl2GYZvOXzEVMPht1m3RBOEzDftpFNdvc_-lUkTkPWbXv408USQOX5s5J1rG8sv-o0NA"/>
    </div>
    <h4 class="font-Inter text-body-md font-bold text-on-surface">TCS</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-md">Fortune 500 Global Leader</p>
    <span class="inline-block px-md py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold">1200+ Jobs</span>
    </div>
    <!-- Infosys -->
    <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 text-center hover:border-primary transition-all group cursor-pointer">
    <div class="w-20 h-20 mx-auto bg-surface-container-low rounded-lg mb-md flex items-center justify-center p-md">
    <img class="w-full h-auto grayscale group-hover:grayscale-0 transition-all" data-alt="Official logo of Infosys in a high-tech corporate style, minimalist blue and white, crisp lines, professional and modern look." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATsrXLSVtJFofeGqgdyv-mPXvOkyB45KVti3QZeSwwdcWvcIiKmgsy0OPZSA8hDeBQsNzsMTIDEkS5eN-pj-n1o1dy8jDNjYl5aunS8y7M-eB1_LIqpUfpX0_JxW-ymxJyOFREvTLE_JIX55pTkkkkiqlX_Z5rOxpMQsRk4YPoBxyqlqkdMW6GiVlCZcf8iLjMDGEalEl9y7ywIw6LJlnAsc1ssFHJC6roIlhQpA4bzpHvRv0oKOe_Re8E0AQSQColelGEradvLQf_"/>
    </div>
    <h4 class="font-Inter text-body-md font-bold text-on-surface">Infosys</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-md">Global Digital Services</p>
    <span class="inline-block px-md py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold">850+ Jobs</span>
    </div>
    <!-- Wipro -->
    <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 text-center hover:border-primary transition-all group cursor-pointer">
    <div class="w-20 h-20 mx-auto bg-surface-container-low rounded-lg mb-md flex items-center justify-center p-md">
    <img class="w-full h-auto grayscale group-hover:grayscale-0 transition-all" data-alt="Official Wipro company logo, colorful yet corporate, professional logo design for a major IT consulting firm, clean background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2UXn4lZeilfjw-EHqxDWiodhmo1jPoDOwpoJpYKai8b-8yKQW39MYkIRHTXfUjUEvRN4_CT0TI9qwbyDStBYirlo_lz9Hb2ni_pZG09d_KYwuIOlK4sNNmjC79YStpgObkzY1A4bC8RClkbpCYjNNltHbmVhER_Qa3qA_WjJDBr8tlw-pzBxWNXTZKKcUuLGU2tCVw5OO-YaEg-iAS4JK7IDmL72p5uFFlIapBAaveZlS2LOGr9wfoHdSdMaGoH_DhdFm_Uaq3fy3"/>
    </div>
    <h4 class="font-Inter text-body-md font-bold text-on-surface">Wipro</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-md">IT, Consulting &amp; BPO</p>
    <span class="inline-block px-md py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold">600+ Jobs</span>
    </div>
    <!-- HCL -->
    <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant/30 text-center hover:border-primary transition-all group cursor-pointer">
    <div class="w-20 h-20 mx-auto bg-surface-container-low rounded-lg mb-md flex items-center justify-center p-md">
    <img class="w-full h-auto grayscale group-hover:grayscale-0 transition-all" data-alt="HCL Technologies corporate logo, minimalist professional branding, high contrast, clean modern typography, blue and white theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqohTZw24mrmWsTztON6WI3Grli3XJdtC9grWv_wgaiZbPNyPZJ4DA51g678EgkKoYZwig3MacTScl6HTQ00_mVD_AoV9mq_6B1YARCY960OoK5FeY_92UX9iojHB3glsUlCd0GN7FMdjXMcWxZCf6ee0fW3SoDkRvLVv6VuTwWypdIeKTt4gTCIfu2vVaEs3UbTqHJ_Jl_oSNZlLbBEQoQllwEN-i1AmeTXtPp0JCPfnmFjJL4ccQy1JlAe9dfT6I-QfWxVmH0TxD"/>
    </div>
    <h4 class="font-Inter text-body-md font-bold text-on-surface">HCLTech</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-md">Supercharging Progress</p>
    <span class="inline-block px-md py-1 bg-primary/10 text-primary rounded-full text-label-sm font-bold">400+ Jobs</span>
    </div>
    </div>
    </div>
    </section>
    <!-- Employer Section -->
    <section class="py-xl bg-primary text-on-primary">
    <div class="max-w-7xl mx-auto px-gutter grid md:grid-cols-2 gap-xl items-center">
    <div class="space-y-lg">
    <h2 class="font-display-lg text-headline-lg md:text-display-lg">Hire The Right Talent Faster</h2>
    <p class="font-body-lg text-body-lg opacity-90">India's most trusted job portal for hiring Govt-aspirants and experienced private sector professionals. Post your requirements today.</p>
    <div class="flex flex-wrap gap-md">
    <button class="bg-surface-container-lowest text-primary px-xl py-4 rounded-lg font-Inter text-label-md font-bold hover:bg-surface-container transition-all active:scale-[0.98]">Post A Job Now</button>
    <button class="border border-outline-variant/40 bg-surface-container-lowest/10 text-on-primary px-xl py-4 rounded-lg font-Inter text-label-md font-bold hover:bg-surface-container-lowest/20 transition-all active:scale-[0.98]">Register As Employer</button>
    </div>
    <div class="flex items-center gap-xl pt-md">
    <div class="flex -space-x-3">
    <div class="w-10 h-10 rounded-full border-2 border-primary bg-surface" data-alt="A professional headshot of a female HR manager, smiling confidently, high-key lighting, modern office background, light mode aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsoncoJjcM5E6kABROfjcAzPlxvXt9UuuX5TCy1pXlljbo70kzvckMop8qyEbrqOiQtUz9ejjHOLKPG_LqjnDAjdQ7yRIB2iaUeS2nktz_s6150uhfn7m4P8HpYYBy6mGYts-B6F0j-t7S47dfq8LKJ3F9qVMlxUtjXgmTRgp619gI9foo_sXBogeDJbnNTr-SnXcqGCvH5rUi9fQNTFuV2TsVTA3bMFEfDULT3OnsrA0kUcF1m_0pKRHE3nf4TsJ6lCEmN-0RbcTE')"></div>
    <div class="w-10 h-10 rounded-full border-2 border-primary bg-surface" data-alt="A professional headshot of a male technical recruiter, modern corporate style, neutral background, sharp focus, friendly expression." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOmj90G_By9QLlIk6OIYJ_0xhfYYgpErRx-TvjNArQnHb-Bg-yF0UNb4b9t635qo3CtSRpk6oFaWIU6tW5UsBUDAsMRi8PDfTpSdp0gIFnWqzJIl45m79lZWXf226JRjqbl3P3QeQPqBuB2KpbO2ksWi_cemvAaYW0MZ6KQhf3XlxlDf0f5SDFJ0SV7Zd5cwNj_kpTsFdVMPH16vt28sfmjdoN7v8z1bW1Wn0vaQ38R1DvpOhKNmgTX4_f9pOxqSz12PRAYN6pZrl-')"></div>
    <div class="w-10 h-10 rounded-full border-2 border-primary bg-surface" data-alt="A professional headshot of a senior hiring executive, professional attire, modern minimalist office, high-quality lighting." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvN6cgt3ImnNM_fopzl56GpLH-h8x7isdfrcoa9UT2lw25API19rdNkYdswaGCK-XVp3TDOu0UIM5HOWSrYwwSYYBplSmZ_qY5_wTQZJmGvBlSutXiT0zZARvXdLbXgpsLwBwOk4XFpEIGyEirgelR0pQAFbU9yl9HsvmHvVQgm5W0g0cE7OBF_qugdmqVKfyARaEfMYFeKpRa5-Hdr9JEJ1mVxxFdU4VFgvIoK-_AUP-CUpwEcUNqiXV8zDq9Hu7MgylKuzYCC1lk')"></div>
    </div>
    <p class="font-label-sm text-label-sm opacity-80">Trusted by 5000+ HR Teams across India</p>
    </div>
    </div>
    <div class="relative hidden md:block">
    <div class="bg-surface-container-lowest/10 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-md shadow-2xl">
    <img class="rounded-xl shadow-lg border border-outline-variant/10" data-alt="A high-fidelity UI mockup of a recruitment dashboard dashboard, showing hiring funnels, candidate profiles, and job application stats. The interface is clean, modern, and data-driven with professional blue accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuASDjjEA0UFVGkhRvbgyIiiFMMsT2qoTNYbu8wUUG9yG_ETxvaMqs9Da7XRD9Tr-3YfJEPYpJQRVxTxgQMvIU7_po940Z8no-CDjPxZ1obdV0Fcz_lbvgWXAuphVALlbaezCo-JhavRtp9cf5cLKVW770u1ngKQxCkdJQayPxtb8-o9L000tM2O-EOZ0knxKycyBfcZB2oXq-biAvdWobbmlMWKav5oi_LM11Fqgu_zRydN-PYgThA1WHFx6l6Vobzo2tMY63YIULDb"/>
    </div>
    <!-- Decorative element -->
    <div class="absolute -top-4 -right-4 w-24 h-24 bg-secondary/30 blur-3xl rounded-full"></div>
    <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-fixed/20 blur-3xl rounded-full"></div>
    </div>
    </div>
    </section>
    </main>
    </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; background-color: var(--color-surface); color: var(--color-on-surface); }
        .hanken { font-family: 'Hanken Grotesk', sans-serif; }
        
        .elevation-1 { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
        .premium-gradient { background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-container) 100%); }
</style>

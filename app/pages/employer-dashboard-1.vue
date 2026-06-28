<script setup>
useHead({
  title: "Employer Dashboard - Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  document.querySelectorAll('button, a').forEach(elem => {
              elem.addEventListener('mousedown', () => {
                  elem.style.transform = 'scale(0.97)';
              });
              elem.addEventListener('mouseup', () => {
                  elem.style.transform = 'scale(1)';
              });
              elem.addEventListener('mouseleave', () => {
                  elem.style.transform = 'scale(1)';
              });
          });
  
          // Simple Chart Animation Simulation on Load
          window.addEventListener('DOMContentLoaded', () => {
              const chartBars = document.querySelectorAll('.bg-primary, .bg-secondary-container');
              chartBars.forEach(bar => {
                  const targetHeight = bar.style.height;
                  bar.style.height = '0%';
                  setTimeout(() => {
                      bar.style.transition = 'height 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
                      bar.style.height = targetHeight;
                  }, 100);
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
    <header class="fixed top-0 left-0 right-0 z-50 bg-surface h-[72px] shadow-sm flex items-center">
    <div class="flex justify-between items-center px-lg w-full max-w-7xl mx-auto">
    <div class="flex items-center gap-xl">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    <nav class="hidden md:flex gap-lg">
    <a class="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md" href="/jobseeker-dashboard">Dashboard</a>
    <a class="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="/manage-jobs-employer-dashboard">Job Postings</a>
    <a class="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="/applicants-tracking-employer-dashboard">Candidates</a>
    <a class="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="/company-profile-employer-dashboard">Company Profile</a>
    </nav>
    </div>
    <div class="flex items-center gap-md">
    <button class="p-sm text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
    <UIcon name="i-lucide-bell" />
    </button>
    <button class="bg-primary text-on-primary font-bold px-lg py-sm rounded-xl active:scale-95 transition-transform font-label-md text-label-md">
                        Post a Job
                    </button>
    <div class="h-10 w-10 rounded-full overflow-hidden border border-outline-variant">
    <img class="h-full w-full object-cover" data-alt="Professional studio portrait of a corporate recruiter in a modern office environment, wearing a stylish navy blazer. The lighting is soft and professional, with a clean blurred background of a glass-walled conference room. The image conveys trust, efficiency, and a high-end corporate aesthetic consistent with a premium SaaS platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMVFQvQpR43067NqWPbfoVrROAzA-2Pyjhg4wpJCDUJ0V07k_7ANI6YUcrYbX6ofoe6p-mtul24IMwVVoTfberlIxraRCWDbMmSWMdxW5_mz1dSq__LkE40al7jGZSB9-z001l_A7Xh7EKAQ0eMuUxU4YF0VF_EL_XCkwqHU1v5LFn5BTnTBlIg6wsHQ_RPBEK64jNJ-qeH1kMqvQyut0I8dGg3rPzsPuA-LRzaGb2PAQKYb2PH85WhPVBJK_zeydAWKhAFXEttbg0">
    </div>
    </div>
    </div>
    </header>
    <!-- Side Navigation Bar -->
    <aside class="fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 p-md flex flex-col bg-surface-container-low border-r border-surface-variant hidden md:flex">
    <div class="flex flex-col gap-xs mb-lg">
    <div class="p-md">
    <p class="font-headline-md text-primary font-bold text-headline-md">Recruiter Portal</p>
    <p class="font-label-sm text-outline uppercase tracking-wider">Premium Hiring</p>
    </div>
    </div>
    <nav class="flex flex-col gap-sm flex-grow">
    <a class="flex items-center gap-md bg-secondary-container text-on-secondary-container rounded-lg p-md transition-all duration-200 font-label-md text-label-md" href="/employer-dashboard-2">
    <UIcon name="i-lucide-layout-dashboard" />
    <span>Overview</span>
    </a>
    <a class="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant rounded-lg p-md transition-all duration-200 font-label-md text-label-md" href="/manage-jobs-employer-dashboard">
    <UIcon name="i-lucide-briefcase" />
    <span>Active Jobs</span>
    </a>
    <a class="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant rounded-lg p-md transition-all duration-200 font-label-md text-label-md" href="/applicants-tracking-employer-dashboard">
    <UIcon name="i-lucide-users" />
    <span>Candidate Pipeline</span>
    </a>
    <a class="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant rounded-lg p-md transition-all duration-200 font-label-md text-label-md" href="/employer-dashboard-2">
    <UIcon name="i-lucide-line-chart" />
    <span>Analytics</span>
    </a>
    <a class="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant rounded-lg p-md transition-all duration-200 font-label-md text-label-md" href="/employer-dashboard-2">
    <UIcon name="i-lucide-settings" />
    <span>Settings</span>
    </a>
    </nav>
    <div class="mt-auto p-md bg-surface-container rounded-xl flex items-center gap-sm">
    <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">JN</div>
    <div>
    <p class="font-label-md font-bold text-on-surface">Job Nova India</p>
    <p class="text-[10px] text-outline">v2.4.0-Enterprise</p>
    </div>
    </div>
    </aside>
    <!-- Main Content Area -->
    <main class="md:ml-64 pt-[72px] min-h-screen">
    <div class="p-lg max-w-7xl mx-auto space-y-xl">
    <!-- Welcome Header -->
    <section class="flex flex-col md:flex-row md:items-end justify-between gap-md">
    <div>
    <h1 class="font-headline-lg text-headline-lg text-on-surface">Welcome back, TechNova Solutions Recruiter</h1>
    <p class="text-on-surface-variant font-body-md mt-sm">Here's what's happening with your hiring pipeline today.</p>
    </div>
    <div class="flex gap-sm">
    <button class="bg-surface-container-high text-on-surface px-md py-sm rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors flex items-center gap-xs">
    <UIcon name="i-lucide-calendar" class="text-[20px]" />
    <span>Schedule Interview</span>
    </button>
    </div>
    </section>
    <!-- Quick Stats Row -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
    <div class="bg-surface-container-lowest p-lg rounded-xl card-elevation border border-surface-variant/20">
    <p class="text-outline font-label-md">Active Jobs</p>
    <div class="flex items-end gap-sm mt-xs">
    <span class="text-display-lg font-display-lg text-primary">4</span>
    <span class="text-tertiary font-label-sm pb-2">+1 this week</span>
    </div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-xl card-elevation border border-surface-variant/20">
    <p class="text-outline font-label-md">Total Applications</p>
    <div class="flex items-end gap-sm mt-xs">
    <span class="text-display-lg font-display-lg text-on-surface">128</span>
    <span class="text-primary font-label-sm pb-2">↑ 12%</span>
    </div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-xl card-elevation border border-surface-variant/20">
    <p class="text-outline font-label-md">New Candidates</p>
    <div class="flex items-end gap-sm mt-xs">
    <span class="text-display-lg font-display-lg text-secondary">12</span>
    <span class="bg-secondary/10 text-secondary px-xs rounded font-label-sm mb-2">Urgent</span>
    </div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-xl card-elevation border border-surface-variant/20">
    <p class="text-outline font-label-md">Shortlisted</p>
    <div class="flex items-end gap-sm mt-xs">
    <span class="text-display-lg font-display-lg text-tertiary">24</span>
    <span class="text-outline font-label-sm pb-2">6 Ready for review</span>
    </div>
    </div>
    </section>
    <!-- Middle Section: Pipeline & AI Recs -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
    <!-- Hiring Pipeline Summary -->
    <section class="lg:col-span-2 bg-surface-container-lowest p-lg rounded-xl card-elevation border border-surface-variant/20">
    <div class="flex justify-between items-center mb-lg">
    <h2 class="font-headline-md text-on-surface">Hiring Pipeline Summary</h2>
    <button class="text-primary font-label-md hover:underline">View Pipeline Details</button>
    </div>
    <!-- Visual Chart Simulation -->
    <div class="flex items-end justify-between h-64 gap-md pt-xl border-b border-surface-variant">
    <div class="flex-1 flex flex-col items-center group">
    <div class="w-full bg-primary/10 rounded-t-lg transition-all duration-500 hover:bg-primary/20 relative" style="height: 100%;">
    <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-primary">128</span>
    </div>
    <p class="text-outline font-label-sm mt-sm">Sourced</p>
    </div>
    <div class="flex-1 flex flex-col items-center group">
    <div class="w-full bg-primary/30 rounded-t-lg transition-all duration-500 hover:bg-primary/40 relative" style="height: 65%;">
    <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-primary">84</span>
    </div>
    <p class="text-outline font-label-sm mt-sm">Screened</p>
    </div>
    <div class="flex-1 flex flex-col items-center group">
    <div class="w-full bg-primary/60 rounded-t-lg transition-all duration-500 hover:bg-primary/70 relative" style="height: 40%;">
    <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-primary">48</span>
    </div>
    <p class="text-outline font-label-sm mt-sm">Interview</p>
    </div>
    <div class="flex-1 flex flex-col items-center group">
    <div class="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary-fixed-dim relative" style="height: 20%;">
    <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-primary">24</span>
    </div>
    <p class="text-outline font-label-sm mt-sm">Shortlist</p>
    </div>
    <div class="flex-1 flex flex-col items-center group">
    <div class="w-full bg-secondary-container rounded-t-lg transition-all duration-500 relative" style="height: 8%;">
    <span class="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-on-secondary-container">6</span>
    </div>
    <p class="text-outline font-label-sm mt-sm">Offered</p>
    </div>
    </div>
    </section>
    <!-- AI Recommendations -->
    <section class="bg-surface-container-lowest p-lg rounded-xl card-elevation border border-surface-variant/20 overflow-hidden relative">
    <div class="absolute top-0 right-0 p-lg">
    <span class="bg-gradient-to-r from-secondary to-primary text-on-primary text-[10px] px-sm py-xs rounded-full font-bold uppercase tracking-widest">AI Match</span>
    </div>
    <h2 class="font-headline-md text-on-surface mb-lg">Top Matches</h2>
    <p class="font-label-sm text-outline mb-md">For Frontend Developer role</p>
    <div class="space-y-md">
    <!-- Candidate Match 1 -->
    <div class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30">
    <div class="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
    <img class="h-full w-full object-cover" data-alt="Close-up headshot of a young professional woman with glasses, smiling warmly. She is wearing a modern tech-industry casual outfit. Soft lighting, high-end photography, focused on her intelligent expression. The background is a minimalist coworking space with light wood accents and lush indoor plants, perfectly fitting a modern SaaS dashboard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoy64YQ5hyQ6ZyYqdHh0Them-9NOQ7B6sXAtcg-jEVJrVeOqjpoV5qIFDrbhu4JESD30TvoJzUcGRaMKyRYBjBbLHmhpY-0Z0hb_-g916-GwhfoH56B2rThcuDAl75rzqlIWB6KN3YQc5IafxNaKcaX1mm6fSkOjcyXZqET6WphBq9RvMOXgUxDf4x1H8a7g1o0dez5D-cn53covYthimPirulAQioXk2S6V4N5DS6bXKfwlEhG-RTAEe2W-rJGMjQHjqT6MnRxojB">
    </div>
    <div class="flex-grow">
    <p class="font-label-md font-bold text-on-surface">Ananya Sharma</p>
    <p class="text-[12px] text-outline">98% Match • React, TS</p>
    </div>
    <UIcon name="i-lucide-chevron-right" class="text-primary" />
    </div>
    <!-- Candidate Match 2 -->
    <div class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30">
    <div class="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
    <img class="h-full w-full object-cover" data-alt="Portrait of a male software developer in his late 20s, looking confident and professional. He is in a brightly lit modern office with blurred architectural elements in the background. The aesthetic is clean, premium, and professional, using soft shadows and a cool-toned color palette of blues and greys." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMjayOgGdXsmAi_aATLltMrd1hYtGFFvwExq4lpNgdKq-v3ahWFsxOGbBBGX2ItYLUT7x38Ve0fzfPQlsOrzv8wsJ7UnXbC6g7WRXKkhWboTlgGcrnQp2_h3V93T-zr8HHbiNxhgNag_X8JjaDpcOGXI3uMJFFBJ3EBcs8sK9IwDm4bgvtzOLHEJ41l4dEq7TapckzbHOm6d0sM6ysGNh_o3-5CYKU_73lM_FhCyB-UcGVnoeY_r74S2hu83RYf959-zh6mVVk-w_B">
    </div>
    <div class="flex-grow">
    <p class="font-label-md font-bold text-on-surface">Vikram Iyer</p>
    <p class="text-[12px] text-outline">94% Match • Next.js, UI/UX</p>
    </div>
    <UIcon name="i-lucide-chevron-right" class="text-primary" />
    </div>
    <!-- Candidate Match 3 -->
    <div class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer border border-transparent hover:border-outline-variant/30">
    <div class="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
    <img class="h-full w-full object-cover" data-alt="Professional headshot of a female engineer with a friendly and approachable look. She has a high-key lighting background that gives an airy, professional feel. The photo style is editorial and high-quality, suitable for an enterprise dashboard. Background shows subtle hints of a modern tech hub." src="https://lh3.googleusercontent.com/aida-public/AB6AXuChpsVdHFU3qWk0J-FWuoFeDXOga-m0MW-uDboIOZQjCp6ENDIw58aCQhfUGnJ_qoeuSZd24N8Nao8Nv3ZziLRe0gTdiycuuNVwJGt9SHCJSq13VdhHE4JQV0cDNipmMoHSEinus0vZmwZ96OuveAOH7IFw4hUZ7vyaYj6kFJYjoUa2YhJuENGmbf5Me1jB0pq4XCh2KT2bItKICTc2yiD9c8tGOHq2frUkYgdaiuv81_hy4qlvhqPVGzwsUK-THmE7KFFV1sN38nUB">
    </div>
    <div class="flex-grow">
    <p class="font-label-md font-bold text-on-surface">Priya Verma</p>
    <p class="text-[12px] text-outline">92% Match • CSS, Framer</p>
    </div>
    <UIcon name="i-lucide-chevron-right" class="text-primary" />
    </div>
    </div>
    <button class="w-full mt-lg py-sm text-primary font-bold text-label-md border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">View All Matches</button>
    </section>
    </div>
    <!-- Recent Job Postings Table -->
    <section class="bg-surface-container-lowest rounded-xl card-elevation border border-surface-variant/20 overflow-hidden">
    <div class="p-lg flex justify-between items-center border-b border-surface-variant/50">
    <h2 class="font-headline-md text-on-surface">Recent Job Postings</h2>
    <div class="flex gap-sm">
    <div class="relative">
    <UIcon name="i-lucide-search" class="absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[18px]" />
    <input class="pl-xl pr-md py-xs bg-surface-container-low border-none rounded-lg text-label-md focus:ring-1 focus:ring-primary w-48" placeholder="Search jobs..." type="text">
    </div>
    </div>
    </div>
    <div class="overflow-x-auto">
    <table class="w-full text-left">
    <thead class="bg-surface-container-low">
    <tr>
    <th class="p-md font-label-sm text-outline uppercase">Job Title</th>
    <th class="p-md font-label-sm text-outline uppercase">Status</th>
    <th class="p-md font-label-sm text-outline uppercase">Applications</th>
    <th class="p-md font-label-sm text-outline uppercase">New</th>
    <th class="p-md font-label-sm text-outline uppercase">Actions</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-surface-variant/30">
    <tr class="hover:bg-surface-container-lowest transition-colors">
    <td class="p-md">
    <p class="font-label-md font-bold text-on-surface">Senior Frontend Developer</p>
    <p class="text-[12px] text-outline">Posted 2 days ago</p>
    </td>
    <td class="p-md">
    <span class="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold uppercase">Active</span>
    </td>
    <td class="p-md font-body-md text-on-surface">42</td>
    <td class="p-md">
    <span class="bg-primary/10 text-primary px-sm py-xs rounded-lg text-label-sm">8 New</span>
    </td>
    <td class="p-md">
    <button class="bg-surface-variant/50 text-on-surface-variant px-md py-sm rounded-lg font-label-md hover:bg-surface-variant transition-colors">View</button>
    </td>
    </tr>
    <tr class="hover:bg-surface-container-lowest transition-colors">
    <td class="p-md">
    <p class="font-label-md font-bold text-on-surface">Backend Lead (Node.js)</p>
    <p class="text-[12px] text-outline">Posted 5 days ago</p>
    </td>
    <td class="p-md">
    <span class="bg-green-100 text-green-700 px-sm py-xs rounded-full text-[10px] font-bold uppercase">Active</span>
    </td>
    <td class="p-md font-body-md text-on-surface">36</td>
    <td class="p-md">
    <span class="bg-primary/10 text-primary px-sm py-xs rounded-lg text-label-sm">3 New</span>
    </td>
    <td class="p-md">
    <button class="bg-surface-variant/50 text-on-surface-variant px-md py-sm rounded-lg font-label-md hover:bg-surface-variant transition-colors">View</button>
    </td>
    </tr>
    <tr class="hover:bg-surface-container-lowest transition-colors">
    <td class="p-md">
    <p class="font-label-md font-bold text-on-surface">UI/UX Designer</p>
    <p class="text-[12px] text-outline">Posted 1 week ago</p>
    </td>
    <td class="p-md">
    <span class="bg-surface-variant text-outline px-sm py-xs rounded-full text-[10px] font-bold uppercase">Closed</span>
    </td>
    <td class="p-md font-body-md text-on-surface">50+</td>
    <td class="p-md">
    <span class="text-outline font-label-sm">—</span>
    </td>
    <td class="p-md">
    <button class="bg-surface-variant/50 text-on-surface-variant px-md py-sm rounded-lg font-label-md hover:bg-surface-variant transition-colors">View</button>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div class="p-md bg-surface-container-low text-center">
    <button class="text-primary font-bold text-label-md hover:underline">View All Job Postings</button>
    </div>
    </section>
    </div>
    </main>
    <!-- Footer -->
    <footer class="md:ml-64 bg-surface-container-highest w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-lg border-t border-surface-variant/50">
    <div>
    <span class="font-headline-md text-headline-md text-on-surface font-bold">Job Nova</span>
    <p class="font-label-sm text-on-surface-variant mt-sm">© 2024 Job Nova India. All rights reserved.</p>
    </div>
    <div class="flex flex-wrap justify-center gap-lg">
    <a class="text-outline hover:text-on-surface font-label-sm transition-colors" href="/">Terms of Service</a>
    <a class="text-outline hover:text-on-surface font-label-sm transition-colors" href="/">Privacy Policy</a>
    <a class="text-outline hover:text-on-surface font-label-sm transition-colors" href="/">Help Center</a>
    <a class="text-outline hover:text-on-surface font-label-sm transition-colors" href="/">Contact Us</a>
    </div>
    </footer>
    <!-- Micro-interaction Scripts -->
    
  </div>
</template>

<style scoped>

      .card-elevation {
        box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: var(--color-surface-variant);
        border-radius: 10px;
      }
</style>

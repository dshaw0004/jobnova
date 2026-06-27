<script setup>
useHead({
  title: "Government Jobs - Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  const jobData = [
                              {title: "Assistant Audit Officer", dept: "SSC CGL 2024", logo: "account_balance", vacancy: "1,250", salary: "₹47,600 - 1,51,100", date: "Oct 15, 2024", location: "Pan India", badge: "New"},
                              {title: "Probationary Officer (PO)", dept: "SBI Recruitment", logo: "payments", vacancy: "2,000", salary: "₹52,000 - 65,000", date: "Oct 22, 2024", location: "Mumbai", badge: "Open"},
                              {title: "Section Officer", dept: "UPSC CSE", logo: "policy", vacancy: "150", salary: "₹67,700 - 2,08,700", date: "Oct 30, 2024", location: "Delhi", badge: "Closing Soon"},
                              {title: "Junior Engineer", dept: "Railway Recruitment Board", logo: "train", vacancy: "4,500", salary: "₹35,400 - 1,12,400", date: "Nov 05, 2024", location: "Bangalore", badge: "New"},
                              {title: "Customs Inspector", dept: "Central Board of Indirect Taxes", logo: "gavel", vacancy: "800", salary: "₹44,900 - 1,42,400", date: "Oct 18, 2024", location: "Chennai", badge: "Open"},
                              {title: "District Forest Officer", dept: "State Forest Service", logo: "forest", vacancy: "45", salary: "₹56,100 - 1,77,500", date: "Oct 12, 2024", location: "Dehradun", badge: "New"}
                          ];
  
                          document.write(jobData.concat(jobData).map(job => `
                              <div class="bg-surface p-md rounded-2xl shadow-soft border border-outline-variant/20 hover:border-primary/40 transition-all group">
                                  <div class="flex items-start gap-md">
                                      <div class="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant/30 flex-shrink-0">
                                          <span class="material-symbols-outlined text-primary text-[32px]">${job.logo}</span>
                                      </div>
                                      <div class="flex-1">
                                          <div class="flex justify-between items-start">
                                              <div>
                                                  <div class="flex items-center gap-sm mb-xs">
                                                      <h3 class="font-headline-md text-[20px] text-on-surface group-hover:text-primary transition-colors">${job.title}</h3>
                                                      ${job.badge === 'New' ? '<span class="bg-green-100 text-green-700 px-sm py-[2px] rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>' : ''}
                                                      ${job.badge === 'Closing Soon' ? '<span class="bg-red-100 text-red-700 px-sm py-[2px] rounded-full text-[10px] font-bold uppercase tracking-wider">Closing Soon</span>' : ''}
                                                  </div>
                                                  <p class="font-body-md text-on-surface-variant">${job.dept}</p>
                                              </div>
                                              <button class="text-outline hover:text-primary transition-colors">
                                                  <span class="material-symbols-outlined">bookmark</span>
                                              </button>
                                          </div>
                                          
                                          <div class="grid grid-cols-2 md:grid-cols-4 gap-y-sm mt-md">
                                              <div class="flex items-center gap-xs">
                                                  <span class="material-symbols-outlined text-outline text-[18px]">group</span>
                                                  <span class="font-label-sm text-on-surface-variant">${job.vacancy} Vacancies</span>
                                              </div>
                                              <div class="flex items-center gap-xs">
                                                  <span class="material-symbols-outlined text-outline text-[18px]">currency_rupee</span>
                                                  <span class="font-label-sm text-on-surface-variant">${job.salary.split(' - ')[0]}</span>
                                              </div>
                                              <div class="flex items-center gap-xs">
                                                  <span class="material-symbols-outlined text-outline text-[18px]">location_on</span>
                                                  <span class="font-label-sm text-on-surface-variant">${job.location}</span>
                                              </div>
                                              <div class="flex items-center gap-xs">
                                                  <span class="material-symbols-outlined text-outline text-[18px]">event</span>
                                                  <span class="font-label-sm text-on-surface-variant">Last: ${job.date.split(',')[0]}</span>
                                              </div>
                                          </div>
  
                                          <div class="mt-md pt-md border-t border-outline-variant/10 flex justify-between items-center">
                                              <p class="font-label-sm text-outline">Published 2 days ago</p>
                                              <div class="flex gap-sm">
                                                  <button class="px-lg py-sm border border-primary text-primary rounded-lg font-label-sm hover:bg-primary-container/10 transition-colors">Save Job</button>
                                                  <button class="px-lg py-sm bg-primary text-on-primary rounded-lg font-label-sm hover:opacity-90 active:scale-95 transition-all">View Details</button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          `).join(''));
  } catch (e) {
    console.error('Error in page script:', e)
  }
  try {
  document.addEventListener('DOMContentLoaded', () => {
              // Smooth reveal on scroll for job cards
              const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                      if (entry.isIntersecting) {
                          entry.target.classList.add('opacity-100', 'translate-y-0');
                          entry.target.classList.remove('opacity-0', 'translate-y-4');
                      }
                  });
              }, { threshold: 0.1 });
  
              document.querySelectorAll('.job-card').forEach(card => {
                  card.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-4');
                  observer.observe(card);
              });
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar -->
    <header class="sticky top-0 w-full z-50 bg-surface dark:bg-inverse-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="max-w-container-max mx-auto px-lg flex justify-between items-center h-16">
    <div class="flex items-center gap-xl">
    <span class="font-headline-lg text-headline-lg font-bold text-primary dark:text-inverse-primary">Job Nova</span>
    <nav class="hidden md:flex items-center gap-lg">
    <a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Home</a>
    <a class="text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary font-bold pb-1" href="#">Govt Jobs</a>
    <a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Private Jobs</a>
    <a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Resources</a>
    </nav>
    </div>
    <div class="flex items-center gap-md">
    <button class="hidden lg:block px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">Post a Job</button>
    <button class="px-md py-sm border border-outline-variant text-primary rounded-lg font-label-md text-label-md hover:bg-surface-container transition-colors">Register</button>
    <UIcon name="i-lucide-user" class="text-on-surface-variant cursor-pointer p-sm hover:bg-surface-container rounded-full" data-icon="person" />
    </div>
    </div>
    </header>
    <main class="max-w-container-max mx-auto px-lg py-xl">
    <!-- Hero Section -->
    <section class="mb-xl">
    <nav class="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md mb-md">
    <a class="hover:text-primary transition-colors" href="#">Home</a>
    <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
    <span class="text-primary font-bold">Government Jobs</span>
    </nav>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
    <div>
    <h1 class="font-display-lg text-display-lg text-on-surface mb-sm">Government Jobs</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Find the latest government recruitment opportunities, notifications, admit cards and results across India.</p>
    </div>
    <!-- Stats Bento -->
    <div class="grid grid-cols-2 gap-md">
    <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
    <p class="font-display-lg text-headline-lg text-primary">1,240+</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Active Jobs</p>
    </div>
    <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
    <p class="font-display-lg text-headline-lg text-secondary">45</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Upcoming Exams</p>
    </div>
    <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
    <p class="font-display-lg text-headline-lg text-tertiary">12</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Results Out</p>
    </div>
    <div class="bg-surface p-md rounded-xl shadow-soft border border-outline-variant/30 text-center">
    <p class="font-display-lg text-headline-lg text-primary">89</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Notifications</p>
    </div>
    </div>
    </div>
    </section>
    <!-- Search & Filter Bar -->
    <section class="mb-xl">
    <div class="bg-surface p-md lg:p-lg rounded-2xl shadow-soft border border-outline-variant/20">
    <div class="flex flex-col lg:flex-row gap-md">
    <div class="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-md">
    <UIcon name="i-lucide-search" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-body-md py-md" placeholder="Job Title or Keyword" type="text">
    </div>
    <div class="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-md">
    <UIcon name="i-lucide-building" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-body-md py-md" placeholder="Department (e.g. UPSC)" type="text">
    </div>
    <div class="flex-1 relative flex items-center bg-surface-container-low rounded-xl px-md">
    <UIcon name="i-lucide-map-pin" class="text-outline" />
    <input class="w-full bg-transparent border-none focus:ring-0 font-body-md py-md" placeholder="Location" type="text">
    </div>
    <button class="bg-primary text-on-primary px-xl py-md rounded-xl font-label-md text-label-md hover:opacity-90 transition-all">Search Jobs</button>
    </div>
    <div class="mt-md flex flex-wrap gap-sm">
    <span class="font-label-md text-label-md text-on-surface-variant self-center mr-sm">Popular:</span>
    <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed transition-colors">SSC CGL</button>
    <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed transition-colors">UPSC CSE</button>
    <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed transition-colors">IBPS PO</button>
    <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed transition-colors">Railway RRB</button>
    <button class="px-md py-xs bg-surface-variant/30 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed transition-colors">State PSC</button>
    </div>
    </div>
    </section>
    <!-- Main Content Area -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-lg">
    <!-- Left Sidebar: Filters -->
    <aside class="lg:col-span-3 space-y-lg">
    <div class="bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm sticky top-24">
    <div class="flex justify-between items-center mb-md pb-sm border-b border-outline-variant/20">
    <h3 class="font-headline-md text-headline-md text-on-surface text-[18px]">Filters</h3>
    <button class="text-primary font-label-sm text-label-sm">Clear All</button>
    </div>
    <div class="space-y-md overflow-y-auto max-h-[716px] pr-sm custom-scrollbar">
    <!-- Category -->
    <div>
    <p class="font-label-md text-label-md text-on-surface-variant mb-sm">Category</p>
    <div class="space-y-sm">
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox">
    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">Central Govt</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox">
    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">State Govt</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer group">
    <input class="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox">
    <span class="font-body-md text-body-md group-hover:text-primary transition-colors">Bank Jobs</span>
    </label>
    </div>
    </div>
    <!-- Qualification -->
    <div>
    <p class="font-label-md text-label-md text-on-surface-variant mb-sm">Qualification</p>
    <select class="w-full bg-surface-container-low border-outline-variant rounded-lg p-sm font-body-md">
    <option>Select Level</option>
    <option>10th Pass</option>
    <option>12th Pass</option>
    <option>Graduate</option>
    <option>Post Graduate</option>
    </select>
    </div>
    <!-- Status -->
    <div>
    <p class="font-label-md text-label-md text-on-surface-variant mb-sm">Status</p>
    <div class="space-y-sm">
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="w-5 h-5 border-outline-variant text-primary focus:ring-primary" name="status" type="radio">
    <span class="font-body-md text-body-md">Open Jobs</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="w-5 h-5 border-outline-variant text-primary focus:ring-primary" name="status" type="radio">
    <span class="font-body-md text-body-md">Closing Soon</span>
    </label>
    </div>
    </div>
    <!-- Location Multi-select mockup -->
    <div>
    <p class="font-label-md text-label-md text-on-surface-variant mb-sm">State / UT</p>
    <div class="grid grid-cols-1 gap-sm">
    <label class="flex items-center gap-sm cursor-pointer"><input class="rounded text-primary" type="checkbox"> <span class="text-body-md">Delhi</span></label>
    <label class="flex items-center gap-sm cursor-pointer"><input class="rounded text-primary" type="checkbox"> <span class="text-body-md">Maharashtra</span></label>
    <label class="flex items-center gap-sm cursor-pointer"><input class="rounded text-primary" type="checkbox"> <span class="text-body-md">Uttar Pradesh</span></label>
    </div>
    </div>
    </div>
    </div>
    </aside>
    <!-- Center Content: Job Listings -->
    <section class="lg:col-span-6 space-y-md">
    <div class="flex justify-between items-center mb-md">
    <h2 class="font-headline-md text-headline-md text-on-surface">Latest Government Jobs</h2>
    <div class="flex items-center gap-sm">
    <span class="font-label-md text-label-md text-on-surface-variant">Sort by:</span>
    <select class="bg-transparent border-none font-bold text-primary focus:ring-0 cursor-pointer">
    <option>Latest</option>
    <option>Closing Date</option>
    <option>Salary: High to Low</option>
    </select>
    </div>
    </div>
    <!-- Job Card Grid -->
    <div class="grid grid-cols-1 gap-md">
    <!-- Card Template Loop (Simulated) -->
    
    </div>
    <!-- Pagination -->
    <div class="flex justify-center items-center gap-sm py-xl">
    <button class="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors">
    <UIcon name="i-lucide-chevron-left" />
    </button>
    <button class="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold">1</button>
    <button class="w-10 h-10 rounded-lg border border-outline-variant font-medium hover:bg-surface-container transition-colors">2</button>
    <button class="w-10 h-10 rounded-lg border border-outline-variant font-medium hover:bg-surface-container transition-colors">3</button>
    <span class="px-sm text-outline">...</span>
    <button class="w-10 h-10 rounded-lg border border-outline-variant font-medium hover:bg-surface-container transition-colors">12</button>
    <button class="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors">
    <UIcon name="i-lucide-chevron-right" />
    </button>
    </div>
    </section>
    <!-- Right Sidebar: Widgets -->
    <aside class="lg:col-span-3 space-y-lg">
    <!-- Trending Notifications -->
    <div class="bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm">
    <div class="flex items-center gap-sm mb-md border-b border-outline-variant/20 pb-sm">
    <UIcon name="i-lucide-bell-ring" class="text-primary" style="font-variation-settings: 'FILL' 1;" />
    <h3 class="font-headline-md text-[18px]">Trending</h3>
    </div>
    <ul class="space-y-md">
    <li class="group cursor-pointer">
    <p class="font-label-md text-primary group-hover:underline">UPSC Prelims 2025 Calendar Released</p>
    <p class="font-label-sm text-outline mt-xs">2 hours ago</p>
    </li>
    <li class="group cursor-pointer">
    <p class="font-label-md text-on-surface group-hover:text-primary">SSC CHSL Tier 1 Cut-off marks declared</p>
    <p class="font-label-sm text-outline mt-xs">5 hours ago</p>
    </li>
    <li class="group cursor-pointer">
    <p class="font-label-md text-on-surface group-hover:text-primary">IBPS Clerk Main Exam admit card link</p>
    <p class="font-label-sm text-outline mt-xs">1 day ago</p>
    </li>
    </ul>
    <button class="w-full mt-md py-sm text-primary font-bold text-label-sm hover:bg-primary-container/10 rounded-lg transition-colors">View All Notifications</button>
    </div>
    <!-- Latest Results -->
    <div class="bg-surface rounded-xl p-md border border-outline-variant/30 shadow-sm">
    <div class="flex items-center gap-sm mb-md border-b border-outline-variant/20 pb-sm">
    <UIcon name="i-lucide-award" class="text-tertiary" style="font-variation-settings: 'FILL' 1;" />
    <h3 class="font-headline-md text-[18px]">Latest Results</h3>
    </div>
    <ul class="space-y-sm">
    <li class="p-sm bg-surface-container-low rounded-lg hover:bg-tertiary-fixed transition-colors cursor-pointer flex justify-between items-center">
    <span class="font-body-md text-[14px]">RBI Grade B Results</span>
    <UIcon name="i-lucide-download" class="text-[16px] text-outline" />
    </li>
    <li class="p-sm bg-surface-container-low rounded-lg hover:bg-tertiary-fixed transition-colors cursor-pointer flex justify-between items-center">
    <span class="font-body-md text-[14px]">UPPSC PCS 2023 Finals</span>
    <UIcon name="i-lucide-download" class="text-[16px] text-outline" />
    </li>
    <li class="p-sm bg-surface-container-low rounded-lg hover:bg-tertiary-fixed transition-colors cursor-pointer flex justify-between items-center">
    <span class="font-body-md text-[14px]">CTET Aug 2024 Scores</span>
    <UIcon name="i-lucide-download" class="text-[16px] text-outline" />
    </li>
    </ul>
    </div>
    <!-- Upcoming Exams -->
    <div class="bg-primary/5 rounded-xl p-md border border-primary/20 shadow-sm">
    <div class="flex items-center gap-sm mb-md pb-sm">
    <UIcon name="i-lucide-calendar-month" class="text-primary" />
    <h3 class="font-headline-md text-[18px]">Exam Calendar</h3>
    </div>
    <div class="space-y-md">
    <div class="flex gap-md">
    <div class="bg-primary text-on-primary rounded-lg p-sm w-12 text-center h-fit">
    <p class="text-[10px] uppercase font-bold">Oct</p>
    <p class="text-[16px] font-extrabold">24</p>
    </div>
    <div>
    <p class="font-label-md">SSC Steno Grade C/D</p>
    <p class="text-[12px] text-outline">Application Deadline</p>
    </div>
    </div>
    <div class="flex gap-md">
    <div class="bg-surface text-primary border border-primary/20 rounded-lg p-sm w-12 text-center h-fit">
    <p class="text-[10px] uppercase font-bold">Nov</p>
    <p class="text-[16px] font-extrabold">12</p>
    </div>
    <div>
    <p class="font-label-md">IBPS PO Prelims</p>
    <p class="text-[12px] text-outline">Examination Date</p>
    </div>
    </div>
    </div>
    </div>
    <!-- Ad/CTA Widget -->
    <div class="relative overflow-hidden rounded-2xl aspect-[4/5] group">
    <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A professional young Indian candidate in a modern bright office environment preparing for an interview with study materials and a digital tablet. The scene is illuminated by soft daylight and styled with a premium corporate blue color palette to evoke success and aspiration in career growth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuABHPdwv6J9iAMCxqamfFx-3rDwbCTxmQSJsRo68tConB8K9V-sqzu7KC4k8qK7Y3Jfo1n0VIUgWiNUSPMzp3tWno_UAXCJCQgkeiP_JjrDwfEd2T8XtZuothTR9DlHeJPWLyD7Y7xmt7rXxWjkUHD_qHqduZAvbrkvwl2i3uOF3T_PQawF6sPUo8xB1vggX1phlLMOmA7pyhU90kFzj5RRgeFBjASc1cmaieuXRP9fT4O-FzZn3wX_ZsOefTieu9dSejVqzh_3xMtH">
    <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-lg">
    <h4 class="text-on-primary font-headline-md mb-sm">Premium Test Series</h4>
    <p class="text-on-primary/80 font-body-md text-[14px] mb-md">Get access to 500+ mock tests and previous year papers.</p>
    <button class="bg-on-primary text-primary py-sm rounded-lg font-bold hover:bg-surface transition-colors">Explore Now</button>
    </div>
    </div>
    </aside>
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full rounded-t-xl bg-surface-container dark:bg-inverse-surface border-t border-outline-variant dark:border-outline mt-xl">
    <div class="max-w-container-max mx-auto px-lg py-xl grid grid-cols-1 md:grid-cols-4 gap-lg">
    <div class="space-y-md">
    <span class="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">Job Nova</span>
    <p class="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant">© 2024 Job Nova. All rights reserved. Built for the Indian job market.</p>
    </div>
    <div>
    <h4 class="font-label-md text-label-md font-bold mb-md">Company</h4>
    <ul class="space-y-sm">
    <li><a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">About Us</a></li>
    <li><a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Contact</a></li>
    <li><a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Support</a></li>
    </ul>
    </div>
    <div>
    <h4 class="font-label-md text-label-md font-bold mb-md">Categories</h4>
    <ul class="space-y-sm">
    <li><a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">SSC Jobs</a></li>
    <li><a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Bank Jobs</a></li>
    <li><a class="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary transition-colors" href="#">Defense Jobs</a></li>
    </ul>
    </div>
    <div>
    <h4 class="font-label-md text-label-md font-bold mb-md">Newsletter</h4>
    <p class="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant mb-md">Get job alerts directly in your inbox.</p>
    <div class="flex gap-xs">
    <input class="flex-1 bg-surface border-outline-variant rounded-lg p-sm text-body-md" placeholder="Email Address" type="email">
    <button class="bg-primary text-on-primary px-md rounded-lg material-symbols-outlined">send</button>
    </div>
    </div>
    </div>
    </footer>
    <!-- Micro-interactions Script -->
    
  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; }
        
        .active-nav-border { position: relative; }
        .active-nav-border::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: #005bbf;
        }
        .shadow-soft { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
</style>

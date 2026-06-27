<script setup>
useHead({
  title: "Private Jobs | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Micro-interactions
          document.querySelectorAll('button').forEach(btn => {
              btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.96)');
              btn.addEventListener('mouseup', () => btn.style.transform = '');
              btn.addEventListener('mouseleave', () => btn.style.transform = '');
          });
  
          // Search Bar Focus Effect
          const searchInputs = document.querySelectorAll('input[type="text"]');
          searchInputs.forEach(input => {
              input.parentElement.addEventListener('focusin', () => {
                  input.parentElement.classList.add('ring-2', 'ring-primary/20', 'border-primary/50');
              });
              input.parentElement.addEventListener('focusout', () => {
                  input.parentElement.classList.remove('ring-2', 'ring-primary/20', 'border-primary/50');
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
    <header class="fixed top-0 w-full z-50 bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)] h-16 flex items-center">
    <div class="flex justify-between items-center h-16 px-gutter max-w-container-max mx-auto w-full">
    <div class="flex items-center gap-xl">
    <img alt="Job Nova Logo" class="h-8" src="https://lh3.googleusercontent.com/aida/AP1WRLv-2ydrJl8ro1k84ft1k9MO5Em6SalCNf_iBsc5e2OrMXGzVtTEjEVSDVF0eqZ5V1Z_MPaBUWEQQ8TL7E3DxyEnGA7MWJqWOPP72z1irJFGDUio_NAxnFCDhTIzvJN_d82NUtrax4T5sFIHMVMt0DlQpjHdqwbYT5EGkxna8Fryt9hxYC82kY9-xi6IA4YUdJd7k03IMQnhTHiuA8QbRIlRuduwRdMmacENBtGs6xiWZi2SVeaz0MLRcv5f">
    <nav class="hidden md:flex items-center gap-lg">
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Home</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Govt Jobs</a>
    <a class="font-body-md text-body-md text-primary border-b-2 border-primary pb-1" href="#">Private Jobs</a>
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Resources</a>
    </nav>
    </div>
    <div class="flex items-center gap-md">
    <button class="hidden sm:block text-primary font-label-md px-md py-sm hover:bg-surface-container-low rounded-xl transition-all">Login</button>
    <button class="bg-primary text-white font-label-md px-lg py-sm rounded-xl hover:scale-[0.98] transition-transform shadow-md">Post a Job</button>
    <button class="p-2 text-on-surface-variant hover:text-primary rounded-full transition-colors">
    <UIcon name="i-lucide-user" data-icon="person" />
    </button>
    </div>
    </div>
    </header>
    <main class="pt-24 pb-xl px-gutter max-w-container-max mx-auto">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-xs text-on-surface-variant mb-md font-label-md">
    <a class="hover:text-primary" href="#">Home</a>
    <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
    <span class="text-primary font-semibold">Private Jobs</span>
    </nav>
    <!-- Hero Section -->
    <section class="mb-xl">
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Private Jobs</h1>
    <p class="text-on-surface-variant font-body-lg max-w-2xl">Discover opportunities from startups, MNCs and leading companies across India. Your next career milestone starts here.</p>
    </section>
    <!-- Stats Grid -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-lg mb-xl">
    <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
    <span class="text-primary text-headline-md font-bold">2,450+</span>
    <span class="text-on-surface-variant font-label-md">Active Jobs</span>
    </div>
    <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
    <span class="text-primary text-headline-md font-bold">850+</span>
    <span class="text-on-surface-variant font-label-md">Companies Hiring</span>
    </div>
    <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
    <span class="text-primary text-headline-md font-bold">1,200+</span>
    <span class="text-on-surface-variant font-label-md">Remote Jobs</span>
    </div>
    <div class="bg-surface p-lg rounded-xl job-card-shadow border border-surface-container flex flex-col items-center text-center">
    <span class="text-primary text-headline-md font-bold">600+</span>
    <span class="text-on-surface-variant font-label-md">Freshers Jobs</span>
    </div>
    </section>
    <!-- Search Section -->
    <section class="bg-surface p-md rounded-2xl job-card-shadow mb-xl border border-surface-container">
    <div class="flex flex-col md:flex-row gap-base md:items-center">
    <div class="flex-1 flex items-center px-md border-r border-outline-variant/30">
    <UIcon name="i-lucide-search" class="text-outline" />
    <input class="w-full border-none focus:ring-0 font-body-md placeholder:text-outline/70" placeholder="Job Title or Keyword" type="text">
    </div>
    <div class="flex-1 flex items-center px-md border-r border-outline-variant/30">
    <UIcon name="i-lucide-building" class="text-outline" />
    <input class="w-full border-none focus:ring-0 font-body-md placeholder:text-outline/70" placeholder="Company Name" type="text">
    </div>
    <div class="flex-1 flex items-center px-md">
    <UIcon name="i-lucide-map-pin" class="text-outline" />
    <input class="w-full border-none focus:ring-0 font-body-md placeholder:text-outline/70" placeholder="Location" type="text">
    </div>
    <button class="bg-primary text-white font-label-md px-xl py-md rounded-xl hover:bg-primary-container transition-colors shadow-md">Search Jobs</button>
    </div>
    <div class="mt-md flex flex-wrap items-center gap-sm px-sm">
    <span class="text-label-sm text-on-surface-variant mr-xs">Quick tags:</span>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">IT</button>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">Marketing</button>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">Finance</button>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">HR</button>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">Design</button>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">Sales</button>
    <button class="bg-surface-container-low px-md py-1 rounded-full text-label-sm hover:bg-primary-fixed transition-colors">Remote</button>
    </div>
    </section>
    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-xl">
    <!-- Left Filter Sidebar -->
    <aside class="md:col-span-3 space-y-lg">
    <div class="bg-surface p-lg rounded-xl border border-surface-container-high">
    <div class="flex justify-between items-center mb-lg">
    <h3 class="font-headline-md text-[18px]">Filters</h3>
    <button class="text-primary font-label-sm hover:underline">Clear Filters</button>
    </div>
    <!-- Filter Section: Experience -->
    <div class="mb-lg">
    <h4 class="font-label-md mb-md">Experience</h4>
    <div class="space-y-sm">
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="rounded text-primary focus:ring-primary border-outline-variant" type="checkbox">
    <span class="text-body-md">Fresher</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="rounded text-primary focus:ring-primary border-outline-variant" type="checkbox">
    <span class="text-body-md">1-3 Years</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="rounded text-primary focus:ring-primary border-outline-variant" type="checkbox">
    <span class="text-body-md">3-5 Years</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="rounded text-primary focus:ring-primary border-outline-variant" type="checkbox">
    <span class="text-body-md">5+ Years</span>
    </label>
    </div>
    </div>
    <!-- Filter Section: Work Mode -->
    <div class="mb-lg">
    <h4 class="font-label-md mb-md">Work Mode</h4>
    <div class="space-y-sm">
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
    <span class="text-body-md">Remote</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
    <span class="text-body-md">Hybrid</span>
    </label>
    <label class="flex items-center gap-sm cursor-pointer">
    <input class="text-primary focus:ring-primary border-outline-variant" name="mode" type="radio">
    <span class="text-body-md">Onsite</span>
    </label>
    </div>
    </div>
    <!-- Filter Section: Industry -->
    <div class="mb-lg">
    <h4 class="font-label-md mb-md">Industry</h4>
    <select class="w-full bg-surface-container-low border-none rounded-xl font-body-md focus:ring-primary">
    <option>All Industries</option>
    <option>IT &amp; Tech</option>
    <option>Marketing</option>
    <option>Finance</option>
    <option>Human Resources</option>
    <option>Design</option>
    </select>
    </div>
    <!-- Filter Section: Salary -->
    <div class="mb-lg">
    <h4 class="font-label-md mb-md">Monthly Salary (₹)</h4>
    <input class="w-full accent-primary" type="range">
    <div class="flex justify-between text-label-sm text-on-surface-variant mt-sm">
    <span>20k</span>
    <span>2L+</span>
    </div>
    </div>
    </div>
    <!-- Career Resource Promo -->
    <div class="bg-primary p-lg rounded-xl text-white relative overflow-hidden group">
    <div class="relative z-10">
    <h4 class="font-headline-md text-[20px] mb-sm leading-tight">Elevate Your Career</h4>
    <p class="text-label-md mb-lg opacity-90">Get expert advice on resume building and interviews.</p>
    <button class="bg-white text-primary font-label-md px-md py-sm rounded-xl hover:bg-surface-container transition-colors">Read Articles</button>
    </div>
    <UIcon name="i-lucide-graduation-cap" class="absolute -right-4 -bottom-4 text-[100px] opacity-10 group-hover:scale-110 transition-transform" />
    </div>
    </aside>
    <!-- Center Job Listings -->
    <section class="md:col-span-6">
    <div class="flex justify-between items-center mb-lg">
    <h2 class="font-headline-md text-headline-md">Latest Private Jobs</h2>
    <div class="flex items-center gap-sm">
    <span class="text-label-sm text-on-surface-variant">Sort by:</span>
    <select class="bg-transparent border-none text-label-md font-semibold text-primary focus:ring-0 p-0 pr-lg">
    <option>Latest</option>
    <option>Highest Salary</option>
    <option>Experience (Low to High)</option>
    </select>
    </div>
    </div>
    <!-- Jobs Feed -->
    <div class="space-y-md">
    <!-- Job Card Template (Iterated 12 times in actual implementation, here 3 unique ones) -->
    <div class="bg-surface p-lg rounded-2xl border border-surface-container job-card-shadow transition-all hover:border-primary-fixed-dim hover:-translate-y-1">
    <div class="flex gap-md">
    <div class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center p-2 border border-outline-variant/20">
    <div class="w-full h-full bg-slate-200 rounded flex items-center justify-center">
    <UIcon name="i-lucide-building-2" class="text-outline" />
    </div>
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-start">
    <div>
    <h3 class="font-headline-md text-[18px] text-on-surface">Senior Product Designer</h3>
    <p class="text-primary font-label-md">InnovateX Technologies</p>
    </div>
    <button class="text-outline hover:text-primary transition-colors">
    <UIcon name="i-lucide-bookmark" />
    </button>
    </div>
    <div class="grid grid-cols-2 gap-y-sm mt-md">
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-banknote" class="text-[18px]" />
                                            ₹15L - ₹22L PA
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-map-pin" class="text-[18px]" />
                                            Bengaluru (Remote)
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-briefcase" class="text-[18px]" />
                                            3-5 Years Exp
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-clock" class="text-[18px]" />
                                            Posted 2h ago
                                        </div>
    </div>
    <div class="flex flex-wrap gap-sm mt-md pt-md border-t border-surface-container">
    <span class="bg-primary/10 text-primary px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Featured</span>
    <span class="bg-tertiary/10 text-tertiary px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Urgent</span>
    <div class="ml-auto flex gap-sm">
    <button class="bg-primary text-white text-label-md px-lg py-1.5 rounded-lg hover:bg-primary-container transition-all">Apply Now</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="bg-surface p-lg rounded-2xl border border-surface-container job-card-shadow transition-all hover:border-primary-fixed-dim hover:-translate-y-1">
    <div class="flex gap-md">
    <div class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center p-2 border border-outline-variant/20">
    <div class="w-full h-full bg-slate-200 rounded flex items-center justify-center">
    <UIcon name="i-lucide-rocket-launch" class="text-outline" />
    </div>
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-start">
    <div>
    <h3 class="font-headline-md text-[18px] text-on-surface">Growth Marketing Specialist</h3>
    <p class="text-primary font-label-md">FinEdge Startup</p>
    </div>
    <button class="text-primary transition-colors">
    <UIcon name="i-lucide-bookmark" style="font-variation-settings: 'FILL' 1;" />
    </button>
    </div>
    <div class="grid grid-cols-2 gap-y-sm mt-md">
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-banknote" class="text-[18px]" />
                                            ₹8L - ₹12L PA
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-map-pin" class="text-[18px]" />
                                            Mumbai (Hybrid)
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-briefcase" class="text-[18px]" />
                                            1-3 Years Exp
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-clock" class="text-[18px]" />
                                            Posted 5h ago
                                        </div>
    </div>
    <div class="flex flex-wrap gap-sm mt-md pt-md border-t border-surface-container">
    <span class="bg-secondary/10 text-secondary px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Full Time</span>
    <div class="ml-auto flex gap-sm">
    <button class="bg-primary text-white text-label-md px-lg py-1.5 rounded-lg hover:bg-primary-container transition-all">Apply Now</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="bg-surface p-lg rounded-2xl border border-surface-container job-card-shadow transition-all hover:border-primary-fixed-dim hover:-translate-y-1">
    <div class="flex gap-md">
    <div class="w-14 h-14 bg-surface-container rounded-xl flex items-center justify-center p-2 border border-outline-variant/20">
    <div class="w-full h-full bg-slate-200 rounded flex items-center justify-center">
    <UIcon name="i-lucide-code" class="text-outline" />
    </div>
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-start">
    <div>
    <h3 class="font-headline-md text-[18px] text-on-surface">Full Stack Developer</h3>
    <p class="text-primary font-label-md">Global Services Pvt Ltd</p>
    </div>
    <button class="text-outline hover:text-primary transition-colors">
    <UIcon name="i-lucide-bookmark" />
    </button>
    </div>
    <div class="grid grid-cols-2 gap-y-sm mt-md">
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-banknote" class="text-[18px]" />
                                            ₹10L - ₹18L PA
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-map-pin" class="text-[18px]" />
                                            Pune (Onsite)
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-briefcase" class="text-[18px]" />
                                            Fresher / 1 Yr
                                        </div>
    <div class="flex items-center gap-xs text-on-surface-variant text-label-md">
    <UIcon name="i-lucide-clock" class="text-[18px]" />
                                            Posted Yesterday
                                        </div>
    </div>
    <div class="flex flex-wrap gap-sm mt-md pt-md border-t border-surface-container">
    <span class="bg-primary/10 text-primary px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Hiring Freshers</span>
    <div class="ml-auto flex gap-sm">
    <button class="bg-primary text-white text-label-md px-lg py-1.5 rounded-lg hover:bg-primary-container transition-all">Apply Now</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- Pagination -->
    <div class="flex justify-center items-center gap-sm pt-xl">
    <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:border-primary transition-colors">
    <UIcon name="i-lucide-chevron-left" />
    </button>
    <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-label-md">1</button>
    <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:border-primary transition-colors font-label-md">2</button>
    <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:border-primary transition-colors font-label-md">3</button>
    <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:border-primary transition-colors">
    <UIcon name="i-lucide-chevron-right" />
    </button>
    </div>
    </div>
    </section>
    <!-- Right Sidebar -->
    <aside class="md:col-span-3 space-y-lg">
    <!-- Top Hiring Companies -->
    <div class="bg-surface p-lg rounded-xl border border-surface-container-high shadow-sm">
    <h3 class="font-headline-md text-[18px] mb-lg">Top Hiring Companies</h3>
    <div class="space-y-md">
    <div class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors">
    <div class="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center text-primary font-bold">G</div>
    <div>
    <h4 class="font-label-md">Global Solutions</h4>
    <p class="text-[12px] text-on-surface-variant">45 Openings</p>
    </div>
    </div>
    <div class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors">
    <div class="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center text-secondary font-bold">N</div>
    <div>
    <h4 class="font-label-md">NextGen Tech</h4>
    <p class="text-[12px] text-on-surface-variant">32 Openings</p>
    </div>
    </div>
    <div class="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-xl cursor-pointer transition-colors">
    <div class="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center text-tertiary font-bold">F</div>
    <div>
    <h4 class="font-label-md">Future Retail</h4>
    <p class="text-[12px] text-on-surface-variant">28 Openings</p>
    </div>
    </div>
    </div>
    <button class="w-full mt-lg text-primary font-label-md text-sm border border-primary/20 py-2 rounded-lg hover:bg-primary-fixed transition-colors">View All Companies</button>
    </div>
    <!-- Trending Skills -->
    <div class="bg-surface p-lg rounded-xl border border-surface-container-high shadow-sm">
    <h3 class="font-headline-md text-[18px] mb-lg">Trending Skills</h3>
    <div class="flex flex-wrap gap-xs">
    <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Python</span>
    <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">React</span>
    <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">AWS</span>
    <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">SEO</span>
    <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Figma</span>
    <span class="bg-surface-container px-sm py-1 rounded text-label-sm text-on-surface-variant hover:text-primary cursor-pointer transition-colors">Data Analysis</span>
    </div>
    </div>
    <!-- Career Resources Card -->
    <div class="bg-surface-container-lowest p-lg rounded-xl border-2 border-dashed border-primary/20">
    <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-md">
    <UIcon name="i-lucide-auto-awesome" class="text-primary" />
    </div>
    <h3 class="font-label-md mb-sm">AI Resume Builder</h3>
    <p class="text-on-surface-variant text-label-sm mb-md">Build a recruiter-friendly resume in minutes with our AI tool.</p>
    <a class="text-primary font-bold text-label-md flex items-center gap-xs group" href="#">
                            Get Started
                            <UIcon name="i-lucide-arrow-right" class="group-hover:translate-x-1 transition-transform" />
    </a>
    </div>
    </aside>
    </div>
    </main>
    <!-- Footer -->
    <footer class="bg-surface-container-low dark:bg-inverse-surface w-full py-xl mt-xl border-t border-surface-container">
    <div class="max-w-container-max mx-auto px-gutter">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-lg">
    <div class="col-span-1 md:col-span-1">
    <img alt="Job Nova Logo" class="h-8 mb-md" src="https://lh3.googleusercontent.com/aida/AP1WRLv-2ydrJl8ro1k84ft1k9MO5Em6SalCNf_iBsc5e2OrMXGzVtTEjEVSDVF0eqZ5V1Z_MPaBUWEQQ8TL7E3DxyEnGA7MWJqWOPP72z1irJFGDUio_NAxnFCDhTIzvJN_d82NUtrax4T5sFIHMVMt0DlQpjHdqwbYT5EGkxna8Fryt9hxYC82kY9-xi6IA4YUdJd7k03IMQnhTHiuA8QbRIlRuduwRdMmacENBtGs6xiWZi2SVeaz0MLRcv5f">
    <p class="text-on-surface-variant text-body-md mb-md">Connecting India's top talent with the best private and government opportunities.</p>
    <div class="flex gap-md">
    <a class="text-outline hover:text-primary transition-colors" href="#"><UIcon name="i-lucide-public" /></a>
    <a class="text-outline hover:text-primary transition-colors" href="#"><UIcon name="i-lucide-users" /></a>
    <a class="text-outline hover:text-primary transition-colors" href="#"><UIcon name="i-lucide-hub" /></a>
    </div>
    </div>
    <div>
    <h4 class="font-headline-md text-[18px] mb-lg">Candidate</h4>
    <ul class="space-y-sm text-on-surface-variant font-body-md">
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Browse Jobs</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Career Advice</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Govt Notifications</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Resume Builder</a></li>
    </ul>
    </div>
    <div>
    <h4 class="font-headline-md text-[18px] mb-lg">Employer</h4>
    <ul class="space-y-sm text-on-surface-variant font-body-md">
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Post a Job</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Hiring Solutions</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Pricing Plans</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Admin Dashboard</a></li>
    </ul>
    </div>
    <div>
    <h4 class="font-headline-md text-[18px] mb-lg">Support</h4>
    <ul class="space-y-sm text-on-surface-variant font-body-md">
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Help Center</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Contact Us</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a></li>
    <li><a class="hover:text-primary hover:underline transition-all" href="#">Terms of Service</a></li>
    </ul>
    </div>
    </div>
    <div class="mt-xl pt-lg border-t border-surface-container-highest flex flex-col md:flex-row justify-between items-center gap-md">
    <p class="text-label-md text-on-surface-variant opacity-70">© 2024 Job Nova. All rights reserved. India's Premium Career Ecosystem.</p>
    <div class="flex items-center gap-lg">
    <span class="text-label-sm font-bold bg-primary-fixed text-primary px-sm py-1 rounded">ISO CERTIFIED</span>
    </div>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>

        .job-card-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
</style>

<script setup>
useHead({
  title: "Employer Dashboard - Job Nova"
})
</script>

<template>
  <div>
    <!-- Shell Container -->
    <div class="flex h-screen w-full">
    <!-- SideNavBar -->
    <aside class="hidden md:flex flex-col h-full border-r border-outline-variant/30 bg-surface shadow-sm docked h-screen w-64 left-0 top-0 fixed z-50">
    <!-- Header -->
    <div class="p-lg border-b border-outline-variant/30 flex items-center gap-md">
    <img class="w-10 h-10 rounded-lg object-cover bg-surface-container" data-alt="A modern, abstract, minimalistic geometric logo for a tech company, using primarily blue and white colors, on a clean light background, suggesting professionalism and innovation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvSbaF8sqKzXHYF5AqH_4-DtDUdvNBuJQdtnPAm_5Ba5DQi0w6T0lB-0TQkaNsdqxLGxJ4tmhkRf4j5h6UmS9uxq4w0QBJv8l0xtvbJHHnYJrZjIc7cCyJ79VKSp3N-KJEGfdoOhSwwb9HCtEmnU5UzU5Cj1nDDOwPKQ1Vm74kU8USt9gpiUSViAxf2A0H8kXYlpjs6aO98WuxLkNFzVnqmz4J94z58RBvegVp_ak4uYPPfZTsWqeQIG_4gYd4TuJOgUbs2_CoeNmB"/>
    <div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Employer Portal</p>
    </div>
    </div>
    <!-- CTA -->
    <div class="p-md">
    <button class="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-colors shadow-sm hover:scale-[0.98] duration-200">
    <UIcon name="i-lucide-plus" style="font-variation-settings: 'FILL' 1;" />
                        Post New Job
                    </button>
    </div>
    <!-- Main Navigation -->
    <nav class="flex-1 overflow-y-auto px-sm py-sm space-y-1">
    <!-- Active Tab: Dashboard -->
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-fixed/10 hover:bg-surface-container-high transition-colors" href="/employer-dashboard-2">
    <UIcon name="i-lucide-layout-dashboard" />
    <span class="font-label-md text-label-md">Dashboard</span>
    </a>
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/company-profile-employer-dashboard">
    <UIcon name="i-lucide-building-2" />
    <span class="font-label-md text-label-md">Company Profile</span>
    </a>
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/post-a-new-job-employer-dashboard">
    <UIcon name="i-lucide-post-add" />
    <span class="font-label-md text-label-md">Post Job</span>
    </a>
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/manage-jobs-employer-dashboard">
    <UIcon name="i-lucide-history" />
    <span class="font-label-md text-label-md">Manage Jobs</span>
    </a>
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/applicants-tracking-employer-dashboard">
    <UIcon name="i-lucide-groups" />
    <span class="font-label-md text-label-md">Applicants</span>
    </a>
    </nav>
    <!-- Footer Navigation -->
    <div class="p-sm border-t border-outline-variant/30 space-y-1">
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/employer-dashboard-2">
    <UIcon name="i-lucide-settings" />
    <span class="font-label-md text-label-md">Settings</span>
    </a>
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/login">
    <UIcon name="i-lucide-log-out" />
    <span class="font-label-md text-label-md">Logout</span>
    </a>
    </div>
    </aside>
    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-h-screen md:ml-64 w-full md:w-[calc(100%-16rem)] relative">
    <!-- TopAppBar -->
    <header class="flex justify-between items-center w-full px-lg py-md bg-surface/80 backdrop-blur-md shadow-sm docked full-width top-0 sticky z-40">
    <!-- Left: Search Bar -->
    <div class="flex-1 max-w-md">
    <div class="relative group">
    <UIcon name="i-lucide-search" class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
    <input class="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" placeholder="Search applicants, jobs..." type="text"/>
    </div>
    </div>
    <!-- Right: Actions & Profile -->
    <div class="flex items-center gap-sm">
    <button class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container">
    <UIcon name="i-lucide-bell" />
    </button>
    <button class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container hidden sm:block">
    <UIcon name="i-lucide-help-circle" />
    </button>
    <button class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container hidden sm:block">
    <UIcon name="i-lucide-account-circle" />
    </button>
    <div class="ml-sm pl-sm border-l border-outline-variant/30 hidden sm:block">
    <img class="w-10 h-10 rounded-full object-cover border border-outline-variant/30 cursor-pointer hover:ring-2 ring-primary transition-all" data-alt="A professional headshot of a smiling person, well-lit, corporate environment, white background, conveying approachability and trust." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjoigxntkVi2LaLqIWVOZHqEaaoHgRIpLxhlb0k8l-dWpfU3-5dg1gGKD7TeiuPd6fq4IpuFnCTakigUGFZ4PoVpVgMHn8lrYvXGVN2kj1GKvCv-XGyug7CCyFn8CdLX05v10hRBc6nb_tPacqjkX4b3tvmTDI_jAjaAYVksKTJOf-hdR8NdiORyLXu0ErZ6z9ZrSDnw14_OwHCJzl8UYA5slP4pKVobDzsE6HJFd7QA0tmbW0Zdj9q7WoeHcxvPHFLwnCjyy1EU06"/>
    </div>
    </div>
    </header>
    <!-- Main Canvas -->
    <main class="flex-1 p-md md:p-xl overflow-y-auto w-full max-w-7xl mx-auto">
    <!-- Welcome Section -->
    <section class="mb-xl">
    <div class="relative bg-primary-container text-on-primary-container rounded-2xl p-lg md:p-xl overflow-hidden ambient-shadow flex flex-col justify-center min-h-[160px]">
    <!-- Decorative background element -->
    <div class="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
    <div class="absolute right-1/4 bottom-0 w-48 h-48 bg-tertiary-container/10 rounded-full blur-2xl translate-y-1/2"></div>
    <div class="relative z-10 max-w-2xl">
    <h2 class="font-headline-lg text-headline-lg mb-2">Welcome Back</h2>
    <p class="font-body-lg text-body-lg opacity-90">Manage your jobs, review candidates and grow your hiring pipeline.</p>
    </div>
    </div>
    </section>
    <!-- Overview Statistics -->
    <section class="mb-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
    <!-- Stat Card 1 -->
    <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
    <div>
    <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Active Jobs</p>
    <h3 class="font-display-lg text-display-lg text-primary">12</h3>
    </div>
    <div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
    <UIcon name="i-lucide-briefcase" style="font-variation-settings: 'FILL' 1;" />
    </div>
    </div>
    <!-- Stat Card 2 -->
    <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
    <div>
    <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Applicants</p>
    <h3 class="font-display-lg text-display-lg text-on-surface">248</h3>
    </div>
    <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
    <UIcon name="i-lucide-users" style="font-variation-settings: 'FILL' 1;" />
    </div>
    </div>
    <!-- Stat Card 3 -->
    <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
    <div>
    <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Shortlisted</p>
    <h3 class="font-display-lg text-display-lg text-on-surface">42</h3>
    </div>
    <div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
    <UIcon name="i-lucide-user-check" style="font-variation-settings: 'FILL' 1;" />
    </div>
    </div>
    <!-- Stat Card 4 -->
    <div class="bg-surface-container-lowest p-lg rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-center justify-between group cursor-default border border-transparent hover:border-outline-variant/20">
    <div>
    <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Pending Reviews</p>
    <h3 class="font-display-lg text-display-lg text-on-surface">18</h3>
    </div>
    <div class="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error group-hover:scale-110 transition-transform">
    <UIcon name="i-lucide-pending-actions" style="font-variation-settings: 'FILL' 1;" />
    </div>
    </div>
    </section>
    <!-- Quick Actions & Recent Applicants Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl mb-xl">
    <!-- Left Column: Quick Actions (1 col wide) -->
    <section class="lg:col-span-1 flex flex-col gap-md">
    <div class="flex items-center justify-between mb-2">
    <h3 class="font-headline-md text-headline-md text-on-surface">Quick Actions</h3>
    </div>
    <a class="bg-surface-container-lowest p-md rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-start gap-md border border-outline-variant/20 group" href="/post-a-new-job-employer-dashboard">
    <div class="w-10 h-10 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
    <UIcon name="i-lucide-post-add" />
    </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Post New Job</h4>
    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Create a new listing.</p>
    </div>
    </a>
    <a class="bg-surface-container-lowest p-md rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-start gap-md border border-outline-variant/20 group" href="/manage-jobs-employer-dashboard">
    <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
    <UIcon name="i-lucide-history" />
    </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Manage Jobs</h4>
    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Edit or close active listings.</p>
    </div>
    </a>
    <a class="bg-surface-container-lowest p-md rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-start gap-md border border-outline-variant/20 group" href="/applicants-tracking-employer-dashboard">
    <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
    <UIcon name="i-lucide-rate-review" />
    </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Review Applicants</h4>
    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Process pending candidates.</p>
    </div>
    </a>
    <a class="bg-surface-container-lowest p-md rounded-xl ambient-shadow ambient-shadow-hover transition-all-custom flex items-start gap-md border border-outline-variant/20 group" href="/company-profile-employer-dashboard">
    <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition-colors">
    <UIcon name="i-lucide-storefront" />
    </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-1 group-hover:text-primary transition-colors">Update Profile</h4>
    <p class="font-body-md text-[13px] leading-snug text-on-surface-variant">Edit company details.</p>
    </div>
    </a>
    </section>
    <!-- Middle & Right Column: Recently Posted Jobs (2 cols wide) -->
    <section class="lg:col-span-2 flex flex-col">
    <div class="flex items-center justify-between mb-md">
    <h3 class="font-headline-md text-headline-md text-on-surface">Recently Posted Jobs</h3>
    <a class="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1" href="/job-search">View All <UIcon name="i-lucide-arrow-right" class="text-sm" /></a>
    </div>
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/20 overflow-hidden flex-1">
    <div class="divide-y divide-outline-variant/20">
    <!-- Job Item 1 -->
    <div class="p-md hover:bg-surface-container-lowest/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-md group">
    <div class="flex items-start gap-md">
    <div class="w-12 h-12 rounded-lg border border-outline-variant/20 bg-surface flex items-center justify-center text-primary shadow-sm shrink-0">
    <UIcon name="i-lucide-design-services" />
    </div>
    <div>
    <h4 class="font-label-md text-[16px] text-on-surface font-bold group-hover:text-primary transition-colors cursor-pointer">Senior UI Designer</h4>
    <div class="flex items-center gap-3 mt-1 text-on-surface-variant font-body-md text-[13px]">
    <span class="flex items-center gap-1"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Mumbai (Hybrid)</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-user" class="text-[16px]" /> 2 Vacancies</span>
    </div>
    </div>
    </div>
    <div class="flex items-center justify-between sm:justify-end gap-md sm:w-auto w-full border-t sm:border-t-0 border-outline-variant/20 pt-md sm:pt-0 mt-2 sm:mt-0">
    <div class="text-center sm:text-right px-sm">
    <p class="font-label-sm text-label-sm text-on-surface-variant">Applicants</p>
    <p class="font-label-md text-[16px] text-on-surface font-bold">45</p>
    </div>
    <span class="px-3 py-1 rounded-full bg-primary-fixed/20 text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wide border border-primary-fixed">Active</span>
    </div>
    </div>
    <!-- Job Item 2 -->
    <div class="p-md hover:bg-surface-container-lowest/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-md group">
    <div class="flex items-start gap-md">
    <div class="w-12 h-12 rounded-lg border border-outline-variant/20 bg-surface flex items-center justify-center text-secondary shadow-sm shrink-0">
    <UIcon name="i-lucide-code" />
    </div>
    <div>
    <h4 class="font-label-md text-[16px] text-on-surface font-bold group-hover:text-primary transition-colors cursor-pointer">Frontend Developer</h4>
    <div class="flex items-center gap-3 mt-1 text-on-surface-variant font-body-md text-[13px]">
    <span class="flex items-center gap-1"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Bangalore (Remote)</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-user" class="text-[16px]" /> 3 Vacancies</span>
    </div>
    </div>
    </div>
    <div class="flex items-center justify-between sm:justify-end gap-md sm:w-auto w-full border-t sm:border-t-0 border-outline-variant/20 pt-md sm:pt-0 mt-2 sm:mt-0">
    <div class="text-center sm:text-right px-sm">
    <p class="font-label-sm text-label-sm text-on-surface-variant">Applicants</p>
    <p class="font-label-md text-[16px] text-on-surface font-bold">128</p>
    </div>
    <span class="px-3 py-1 rounded-full bg-primary-fixed/20 text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wide border border-primary-fixed">Active</span>
    </div>
    </div>
    <!-- Job Item 3 -->
    <div class="p-md hover:bg-surface-container-lowest/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-md group">
    <div class="flex items-start gap-md">
    <div class="w-12 h-12 rounded-lg border border-outline-variant/20 bg-surface flex items-center justify-center text-outline shadow-sm shrink-0 opacity-70">
    <UIcon name="i-lucide-megaphone" />
    </div>
    <div>
    <h4 class="font-label-md text-[16px] text-on-surface-variant font-bold group-hover:text-primary transition-colors cursor-pointer">Marketing Manager</h4>
    <div class="flex items-center gap-3 mt-1 text-on-surface-variant font-body-md text-[13px] opacity-80">
    <span class="flex items-center gap-1"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Delhi</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-user" class="text-[16px]" /> 1 Vacancy</span>
    </div>
    </div>
    </div>
    <div class="flex items-center justify-between sm:justify-end gap-md sm:w-auto w-full border-t sm:border-t-0 border-outline-variant/20 pt-md sm:pt-0 mt-2 sm:mt-0">
    <div class="text-center sm:text-right px-sm opacity-70">
    <p class="font-label-sm text-label-sm text-on-surface-variant">Applicants</p>
    <p class="font-label-md text-[16px] text-on-surface font-bold">75</p>
    </div>
    <span class="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wide border border-outline-variant/50">Closed</span>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    <!-- Bottom Grid: Recent Applicants & Timeline -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-xl">
    <!-- Recent Applicants -->
    <section class="flex flex-col">
    <div class="flex items-center justify-between mb-md">
    <h3 class="font-headline-md text-headline-md text-on-surface">Recent Applicants</h3>
    <a class="font-label-md text-label-md text-primary hover:text-on-primary-fixed-variant transition-colors flex items-center gap-1" href="/job-search">View All <UIcon name="i-lucide-arrow-right" class="text-sm" /></a>
    </div>
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/20 overflow-hidden flex-1">
    <ul class="divide-y divide-outline-variant/20">
    <li class="p-md hover:bg-surface-container-lowest/50 transition-colors flex items-center justify-between gap-sm cursor-pointer group">
    <div class="flex items-center gap-sm">
    <div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-lg shrink-0">
                                                RS
                                            </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors">Rahul Sharma</h4>
    <p class="font-body-md text-[13px] text-on-surface-variant">Applied for <span class="font-medium text-on-surface">Senior UI Designer</span></p>
    </div>
    </div>
    <div class="flex flex-col items-end gap-1 shrink-0">
    <span class="text-[12px] text-outline">2h ago</span>
    <span class="px-2 py-0.5 rounded bg-primary-fixed/20 text-on-primary-fixed-variant font-label-sm text-[10px] uppercase tracking-wide">New</span>
    </div>
    </li>
    <li class="p-md hover:bg-surface-container-lowest/50 transition-colors flex items-center justify-between gap-sm cursor-pointer group">
    <div class="flex items-center gap-sm">
    <div class="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold text-lg shrink-0">
                                                PS
                                            </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors">Priya Singh</h4>
    <p class="font-body-md text-[13px] text-on-surface-variant">Applied for <span class="font-medium text-on-surface">Frontend Developer</span></p>
    </div>
    </div>
    <div class="flex flex-col items-end gap-1 shrink-0">
    <span class="text-[12px] text-outline">1d ago</span>
    <span class="px-2 py-0.5 rounded bg-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant font-label-sm text-[10px] uppercase tracking-wide">Shortlisted</span>
    </div>
    </li>
    <li class="p-md hover:bg-surface-container-lowest/50 transition-colors flex items-center justify-between gap-sm cursor-pointer group">
    <div class="flex items-center gap-sm">
    <div class="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
                                                AK
                                            </div>
    <div>
    <h4 class="font-label-md text-label-md text-on-surface font-bold group-hover:text-primary transition-colors">Amit Kumar</h4>
    <p class="font-body-md text-[13px] text-on-surface-variant">Applied for <span class="font-medium text-on-surface">Senior UI Designer</span></p>
    </div>
    </div>
    <div class="flex flex-col items-end gap-1 shrink-0">
    <span class="text-[12px] text-outline">2d ago</span>
    <span class="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wide">Under Review</span>
    </div>
    </li>
    </ul>
    </div>
    </section>
    <!-- Hiring Activity Timeline -->
    <section class="flex flex-col">
    <div class="flex items-center justify-between mb-md">
    <h3 class="font-headline-md text-headline-md text-on-surface">Hiring Activity</h3>
    </div>
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/20 p-lg flex-1 relative overflow-hidden">
    <!-- Subtle glass background effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
    <div class="relative z-10">
    <!-- Timeline Item 1 -->
    <div class="flex gap-md mb-xl relative">
    <div class="absolute left-[15px] top-8 bottom-[-40px] w-px bg-outline-variant/30"></div>
    <div class="w-8 h-8 rounded-full bg-primary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-primary z-10 shrink-0">
    <UIcon name="i-lucide-user-plus" class="text-[16px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div class="pt-1">
    <p class="font-body-md text-body-md text-on-surface"><span class="font-semibold">New application</span> received for <span class="text-primary font-medium">Product Designer</span></p>
    <p class="font-label-sm text-[12px] text-outline mt-1">Today at 10:42 AM</p>
    </div>
    </div>
    <!-- Timeline Item 2 -->
    <div class="flex gap-md mb-xl relative">
    <div class="absolute left-[15px] top-8 bottom-[-40px] w-px bg-outline-variant/30"></div>
    <div class="w-8 h-8 rounded-full bg-tertiary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-tertiary z-10 shrink-0">
    <UIcon name="i-lucide-user-check" class="text-[16px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div class="pt-1">
    <p class="font-body-md text-body-md text-on-surface">Candidate <span class="font-semibold">shortlisted</span> for <span class="text-primary font-medium">Data Analyst</span></p>
    <p class="font-label-sm text-[12px] text-outline mt-1">Yesterday at 3:15 PM</p>
    </div>
    </div>
    <!-- Timeline Item 3 -->
    <div class="flex gap-md relative">
    <div class="w-8 h-8 rounded-full bg-secondary-fixed border-2 border-surface-container-lowest flex items-center justify-center text-secondary z-10 shrink-0">
    <UIcon name="i-lucide-post-add" class="text-[16px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div class="pt-1">
    <p class="font-body-md text-body-md text-on-surface">New job <span class="font-semibold">Senior UI Designer</span> posted successfully.</p>
    <p class="font-label-sm text-[12px] text-outline mt-1">Mon, 12 Oct at 9:00 AM</p>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    </main>
    </div>
    </div>
  </div>
</template>

<style scoped>

        
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: var(--color-surface-variant);
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--color-outline-variant);
        }

        .ambient-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        
        .ambient-shadow-hover:hover {
            box-shadow: 0px 8px 30px rgba(26, 115, 232, 0.12);
            transform: translateY(-2px);
        }
        
        .transition-all-custom {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
</style>

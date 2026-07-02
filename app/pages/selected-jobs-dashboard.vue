<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: "Selected Jobs - Job Nova"
})
</script>

<template>
  <div>
    <!-- SideNavBar -->
    <aside class="h-screen w-64 fixed left-0 top-0 bg-surface shadow-sm z-50 flex flex-col hidden md:flex">
    <div class="flex flex-col h-full py-xl px-md">
    <!-- Brand -->
    <div class="flex items-center gap-sm mb-xl px-md">
    <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-xl">
                        J
                    </div>
    <div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Professional Dashboard</p>
    </div>
    </div>
    <!-- Navigation -->
    <nav class="flex-1 space-y-sm">
    <a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors active:scale-[0.98] transition-transform duration-200 rounded-lg" href="/jobseeker-dashboard">
    <UIcon name="i-lucide-layout-dashboard" data-icon="dashboard" />
    <span class="font-label-md text-label-md">Dashboard</span>
    </a>
    <a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors active:scale-[0.98] transition-transform duration-200 rounded-lg" href="/my-profile-dashboard">
    <UIcon name="i-lucide-account-circle" data-icon="account_circle" />
    <span class="font-label-md text-label-md">My Profile</span>
    </a>
    <a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors active:scale-[0.98] transition-transform duration-200 rounded-lg" href="/applied-jobs-dashboard">
    <UIcon name="i-lucide-history" data-icon="work_history" />
    <span class="font-label-md text-label-md">Applied Jobs</span>
    </a>
    <a class="flex items-center gap-md bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm hover:bg-surface-container transition-colors active:scale-[0.98] transition-transform duration-200" href="/selected-jobs-dashboard">
    <UIcon name="i-lucide-check-circle" class="icon-fill" data-icon="check_circle" />
    <span class="font-label-md text-label-md font-bold">Selected Jobs</span>
    </a>
    </nav>
    <!-- Bottom Actions -->
    <div class="mt-auto border-t border-outline-variant/30 pt-md">
    <a class="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container transition-colors active:scale-[0.98] transition-transform duration-200 rounded-lg" href="/login">
    <UIcon name="i-lucide-log-out" data-icon="logout" />
    <span class="font-label-md text-label-md">Logout</span>
    </a>
    </div>
    </div>
    </aside>
    <!-- Main Content Wrapper -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
    <!-- TopAppBar -->
    <header class="h-16 w-full sticky top-0 z-40 bg-surface/80 backdrop-blur-md shadow-sm flex justify-between items-center px-lg">
    <!-- Mobile Brand (Hidden on Desktop) -->
    <div class="md:hidden flex items-center gap-sm">
    <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
                        J
                    </div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
    </div>
    <!-- Search Bar -->
    <div class="hidden md:flex flex-1 max-w-md ml-auto mr-lg">
    <div class="relative w-full">
    <UIcon name="i-lucide-search" class="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant" />
    <input class="w-full bg-surface-container-low text-on-surface rounded-full py-sm pl-xl pr-md border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md" placeholder="Search jobs, companies, or keywords..." type="text"/>
    </div>
    </div>
    <!-- Actions -->
    <div class="flex items-center gap-sm">
    <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-[0.98]">
    <UIcon name="i-lucide-bell" data-icon="notifications" />
    </button>
    <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-colors active:scale-[0.98]">
    <UIcon name="i-lucide-settings" data-icon="settings" />
    </button>
    <div class="w-10 h-10 rounded-full bg-surface-variant border border-outline-variant overflow-hidden cursor-pointer ml-sm">
    <img alt="User avatar" class="w-full h-full object-cover" data-alt="A professional headshot of a young confident Indian professional in modern corporate attire against a clean, light blue backdrop. Soft, even lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATgzxu4T_qFqg4-sF0qfUxGEdszIf8ki49-anpJpAN_4k9nNVb2k5FCZdLnz_vbYrsRQbnMKdNh4qvN0wnLbdOXJy0qmxeG2hJUZOQd_y7jlnlJaxcmMLhUuxfBhgXZgRD_Wh5_AIyf696K9Hn1-6wbVPFsL6mxxGb_GjLBMddX5pwyl2I4WXh4c8Q2QTZl2_SE3blYFFftcm9Lj3ZNqT_rWU_SECVgIM4lOhZzXWb3yiHqOEGbZFfN7W5zHdWjOoO3eZgp5LhRSV9"/>
    </div>
    </div>
    </header>
    <!-- Main Canvas -->
    <main class="flex-1 p-md md:p-xl max-w-7xl mx-auto w-full">
    <!-- Header Section -->
    <div class="mb-xl">
    <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-xs">Selected Jobs</h2>
    <p class="font-body-md text-body-md text-on-surface-variant">View shortlisted, selected and offered opportunities.</p>
    </div>
    <!-- Summary Cards Bento -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
    <!-- Shortlisted -->
    <div class="bg-surface-container-lowest rounded-xl p-md soft-shadow border border-surface-container-high hover:-translate-y-1 transition-transform cursor-pointer">
    <div class="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center mb-md">
    <UIcon name="i-lucide-bookmark-added" class="icon-fill" />
    </div>
    <p class="font-headline-md text-headline-md text-on-background mb-xs">12</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Shortlisted</p>
    </div>
    <!-- Interview Scheduled -->
    <div class="bg-surface-container-lowest rounded-xl p-md soft-shadow border border-surface-container-high hover:-translate-y-1 transition-transform cursor-pointer">
    <div class="w-10 h-10 rounded-lg bg-tertiary-container/10 text-tertiary-container flex items-center justify-center mb-md">
    <UIcon name="i-lucide-event-available" class="icon-fill" />
    </div>
    <p class="font-headline-md text-headline-md text-on-background mb-xs">4</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Interview Scheduled</p>
    </div>
    <!-- Selected -->
    <div class="bg-surface-container-lowest rounded-xl p-md soft-shadow border border-surface-container-high hover:-translate-y-1 transition-transform cursor-pointer">
    <div class="w-10 h-10 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center mb-md">
    <UIcon name="i-lucide-task-alt" class="icon-fill" />
    </div>
    <p class="font-headline-md text-headline-md text-on-background mb-xs">2</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Selected</p>
    </div>
    <!-- Offer Received -->
    <div class="bg-surface-container-lowest rounded-xl p-md soft-shadow border border-surface-container-high hover:-translate-y-1 transition-transform cursor-pointer">
    <div class="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mb-md">
    <UIcon name="i-lucide-party-popper" class="icon-fill" />
    </div>
    <p class="font-headline-md text-headline-md text-on-background mb-xs">1</p>
    <p class="font-label-md text-label-md text-on-surface-variant">Offer Received</p>
    </div>
    </div>
    <!-- Tabs -->
    <div class="border-b border-outline-variant mb-lg overflow-x-auto scrollbar-hide">
    <div class="flex gap-lg min-w-max px-sm">
    <button class="pb-sm font-label-md text-label-md text-primary border-b-2 border-primary">
                            Shortlisted (12)
                        </button>
    <button class="pb-sm font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent">
                            Interview Scheduled (4)
                        </button>
    <button class="pb-sm font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent">
                            Selected (2)
                        </button>
    <button class="pb-sm font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent">
                            Offer Received (1)
                        </button>
    </div>
    </div>
    <!-- Job List Container -->
    <div class="space-y-md">
    <!-- Job Card 1 -->
    <div class="bg-surface-container-lowest rounded-xl p-lg soft-shadow border border-surface-container-high">
    <div class="flex flex-col md:flex-row gap-md md:items-start justify-between mb-lg border-b border-outline-variant/30 pb-md">
    <div class="flex gap-md">
    <div class="w-12 h-12 rounded-lg border border-outline-variant/30 flex items-center justify-center bg-surface overflow-hidden shrink-0">
    <img alt="Company Logo" class="w-8 h-8 object-contain" data-alt="A modern, minimalist corporate logo for a tech company, featuring a stylized abstract geometric shape in sharp blue and silver tones on a clean white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5tI1SZ7knKAij7sU3ag_iINCXrM2cakdfpUe3G8dRZUeSt1M6-c6kJ0lFd4w_-xB_PV-2B5pzXA-ty0N_kF4uV8hs-FLBeu1M9hIslzYFHtBGwwy48gUG4Lg0pQIJOUtzSf4ehXqqCZ8POa3qmCk3gD8xIgvYTX3cIBCJVukEV7Bo6HutTx7hOaVk3TvqcvnZjRwX5Z5CSGKzYvkfOt_R9ksq7HP27kj3TDbbkGpY63uWWqumXTuLJarwDxAuKIzyDsxRoyLOG7z8"/>
    </div>
    <div>
    <div class="flex items-center gap-sm mb-xs">
    <h3 class="font-headline-md text-body-lg font-semibold text-on-background">Senior Product Designer</h3>
    <span class="px-2 py-1 rounded-full bg-secondary-container/20 text-secondary-container font-label-sm text-[10px] uppercase tracking-wider font-bold">Shortlisted</span>
    </div>
    <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-sm">
    <span class="flex items-center gap-1"><UIcon name="i-lucide-building" class="text-[16px]" /> TechNova Solutions</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Bangalore, India (Hybrid)</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-banknote" class="text-[16px]" /> ₹25L - ₹35L</span>
    </div>
    </div>
    </div>
    <div class="flex gap-sm mt-sm md:mt-0">
    <button class="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-lowest hover:border-primary hover:text-primary transition-all active:scale-[0.98]">
                                    View Details
                                </button>
    <button class="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed-variant transition-colors active:scale-[0.98] shadow-sm">
                                    Contact Employer
                                </button>
    </div>
    </div>
    <!-- Timeline Visualization -->
    <div class="pt-sm px-sm md:px-lg">
    <div class="relative flex justify-between items-center w-full">
    <!-- Track Line Base -->
    <div class="absolute left-[5%] right-[5%] top-[14px] h-[2px] bg-surface-container-high -z-10"></div>
    <!-- Active Track Line (Progress to Shortlisted) -->
    <div class="absolute left-[5%] right-[70%] top-[14px] h-[2px] bg-primary -z-10"></div>
    <!-- Stage 1: Application Submitted (Done) -->
    <div class="flex flex-col items-center gap-sm z-10 w-20">
    <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
    <UIcon name="i-lucide-check" class="text-[16px] icon-fill" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Applied<br/><span class="text-outline font-normal">Oct 12</span></span>
    </div>
    <!-- Stage 2: Shortlisted (Active) -->
    <div class="flex flex-col items-center gap-sm z-10 w-20">
    <div class="w-7 h-7 rounded-full bg-surface-container-lowest border-2 border-primary text-primary flex items-center justify-center shadow-sm relative">
    <div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
    </div>
    <span class="font-label-sm text-[11px] text-center text-primary font-bold">Shortlisted<br/><span class="text-outline font-normal">Today</span></span>
    </div>
    <!-- Stage 3: Interview Scheduled (Pending) -->
    <div class="flex flex-col items-center gap-sm z-10 w-20 opacity-50">
    <div class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
    <UIcon name="i-lucide-event" class="text-[16px]" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Interview</span>
    </div>
    <!-- Stage 4: Selected (Pending) -->
    <div class="flex flex-col items-center gap-sm z-10 w-20 opacity-50">
    <div class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
    <UIcon name="i-lucide-task-alt" class="text-[16px]" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Selected</span>
    </div>
    <!-- Stage 5: Offer (Pending) -->
    <div class="flex flex-col items-center gap-sm z-10 w-20 opacity-50">
    <div class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
    <UIcon name="i-lucide-party-popper" class="text-[16px]" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Offer</span>
    </div>
    </div>
    </div>
    </div>
    <!-- Job Card 2 -->
    <div class="bg-surface-container-lowest rounded-xl p-lg soft-shadow border border-surface-container-high">
    <div class="flex flex-col md:flex-row gap-md md:items-start justify-between mb-lg border-b border-outline-variant/30 pb-md">
    <div class="flex gap-md">
    <div class="w-12 h-12 rounded-lg border border-outline-variant/30 flex items-center justify-center bg-surface overflow-hidden shrink-0">
    <img alt="Company Logo" class="w-8 h-8 object-contain" data-alt="A modern, elegant corporate logo for a financial company, featuring a sleek rising graph motif in deep indigo and subtle gold tones on a clean white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs8hwJMH53-mXs8F_kKLQxvkBfdHRafO7xz2en21KDW1nFuwby9xkrGsfndFLZh-zVsX6mrSFmcY9orJf6aVV2AR8_GmhFHSCH36PB6Wg6aEQ4px0uv2c1AY0tkM4_Rf1Hq8RSaxpbL2LkLXAptQlcDvAlX6SOFZUyEqTWKt5p875NGZH0GedBX7wDqCgkhq0sjNc-zo9Dv3diezhHlZ6F4yZIljwPq_25P7dNKgJKMr8N7OO97QQBrx279IzXYfpC95NM988hWn4P"/>
    </div>
    <div>
    <div class="flex items-center gap-sm mb-xs">
    <h3 class="font-headline-md text-body-lg font-semibold text-on-background">UX Researcher</h3>
    <span class="px-2 py-1 rounded-full bg-secondary-container/20 text-secondary-container font-label-sm text-[10px] uppercase tracking-wider font-bold">Shortlisted</span>
    </div>
    <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-sm">
    <span class="flex items-center gap-1"><UIcon name="i-lucide-building" class="text-[16px]" /> Global FinCorp</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Mumbai, India (Remote)</span>
    <span class="w-1 h-1 rounded-full bg-outline-variant hidden md:block"></span>
    <span class="flex items-center gap-1"><UIcon name="i-lucide-banknote" class="text-[16px]" /> ₹18L - ₹24L</span>
    </div>
    </div>
    </div>
    <div class="flex gap-sm mt-sm md:mt-0">
    <button class="px-md py-sm rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-lowest hover:border-primary hover:text-primary transition-all active:scale-[0.98]">
                                    View Details
                                </button>
    <button class="px-md py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed-variant transition-colors active:scale-[0.98] shadow-sm">
                                    Contact Employer
                                </button>
    </div>
    </div>
    <!-- Timeline Visualization -->
    <div class="pt-sm px-sm md:px-lg">
    <div class="relative flex justify-between items-center w-full">
    <!-- Track Line Base -->
    <div class="absolute left-[5%] right-[5%] top-[14px] h-[2px] bg-surface-container-high -z-10"></div>
    <!-- Active Track Line (Progress to Shortlisted) -->
    <div class="absolute left-[5%] right-[70%] top-[14px] h-[2px] bg-primary -z-10"></div>
    <!-- Stage 1 -->
    <div class="flex flex-col items-center gap-sm z-10 w-20">
    <div class="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
    <UIcon name="i-lucide-check" class="text-[16px] icon-fill" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Applied<br/><span class="text-outline font-normal">Oct 10</span></span>
    </div>
    <!-- Stage 2 -->
    <div class="flex flex-col items-center gap-sm z-10 w-20">
    <div class="w-7 h-7 rounded-full bg-surface-container-lowest border-2 border-primary text-primary flex items-center justify-center shadow-sm relative">
    <div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
    </div>
    <span class="font-label-sm text-[11px] text-center text-primary font-bold">Shortlisted<br/><span class="text-outline font-normal">Oct 14</span></span>
    </div>
    <!-- Stage 3 -->
    <div class="flex flex-col items-center gap-sm z-10 w-20 opacity-50">
    <div class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
    <UIcon name="i-lucide-event" class="text-[16px]" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Interview</span>
    </div>
    <!-- Stage 4 -->
    <div class="flex flex-col items-center gap-sm z-10 w-20 opacity-50">
    <div class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
    <UIcon name="i-lucide-task-alt" class="text-[16px]" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Selected</span>
    </div>
    <!-- Stage 5 -->
    <div class="flex flex-col items-center gap-sm z-10 w-20 opacity-50">
    <div class="w-7 h-7 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center">
    <UIcon name="i-lucide-party-popper" class="text-[16px]" />
    </div>
    <span class="font-label-sm text-[11px] text-center text-on-surface-variant">Offer</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </main>
    </div>
  </div>
</template>

<style scoped>

        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }
        .soft-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
</style>

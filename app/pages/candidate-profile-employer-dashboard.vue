<script setup>
useHead({
  title: "Candidate Profile - Job Nova Employer Dashboard"
})
</script>

<template>
  <div>
    <!-- SideNavBar -->
    <nav class="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface dark:bg-surface-dim shadow-sm flex-col py-xl px-md z-20">
    <div class="flex items-center gap-md px-md mb-xl">
    <div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-headline-md">
                    JN
                </div>
    <div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Job Nova</h1>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Employer Portal</p>
    </div>
    </div>
    <ul class="flex flex-col gap-sm flex-1">
    <li>
    <a class="flex items-center gap-md px-md py-sm text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-200 rounded-lg font-label-md text-label-md" href="#">
    <UIcon name="i-lucide-layout-dashboard" />
                        Dashboard
                    </a>
    </li>
    <li>
    <a class="flex items-center gap-md px-md py-sm text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-200 rounded-lg font-label-md text-label-md" href="#">
    <UIcon name="i-lucide-building-2" />
                        Company Profile
                    </a>
    </li>
    <li>
    <a class="flex items-center gap-md px-md py-sm text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-200 rounded-lg font-label-md text-label-md" href="#">
    <UIcon name="i-lucide-plus-square" />
                        Post Job
                    </a>
    </li>
    <li>
    <a class="flex items-center gap-md px-md py-sm text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-200 rounded-lg font-label-md text-label-md" href="#">
    <UIcon name="i-lucide-history" />
                        Manage Jobs
                    </a>
    </li>
    <li>
    <a class="flex items-center gap-md px-md py-sm bg-secondary-fixed text-on-secondary-fixed rounded-lg font-bold font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200" href="#">
    <UIcon name="i-lucide-groups" class="icon-fill" />
                        Applicants
                    </a>
    </li>
    </ul>
    <div class="mt-auto">
    <a class="flex items-center gap-md px-md py-sm text-on-surface-variant dark:text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors duration-200 rounded-lg font-label-md text-label-md" href="#">
    <UIcon name="i-lucide-log-out" />
                    Logout
                </a>
    </div>
    </nav>
    <!-- Main Content Area -->
    <main class="md:ml-64 min-h-screen flex flex-col">
    <!-- TopNavBar -->
    <header class="fixed top-0 right-0 w-full md:w-[calc(100%-256px)] h-16 bg-surface dark:bg-surface-dim shadow-sm flex justify-between items-center px-lg py-sm z-10">
    <div class="flex items-center gap-md w-full max-w-md hidden">
    <!-- Search could go here if search_bar: "on_left" wasn't overridden by page context -->
    </div>
    <div class="flex-1"></div> <!-- Spacer -->
    <div class="flex items-center gap-lg">
    <button class="text-on-surface-variant hover:text-primary transition-colors duration-200">
    <UIcon name="i-lucide-bell" />
    </button>
    <button class="text-on-surface-variant hover:text-primary transition-colors duration-200">
    <UIcon name="i-lucide-settings" />
    </button>
    <button class="bg-primary text-on-primary font-label-md text-label-md px-md py-sm rounded-lg hover:bg-primary-container transition-colors duration-200 shadow-sm active:scale-95">
                        Post a Job
                    </button>
    <div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden flex-shrink-0 cursor-pointer">
    <img alt="User Profile" class="w-full h-full object-cover" data-alt="A small circular profile picture of an HR manager, warm lighting, professional corporate environment, soft focus background, high quality portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl6IluRh_6yHxqpeILjafyCVV7bFq2NlwNteADKcSQK6QzADwDkJ8k-fECpoYpx8u1So-wfsPXlBTJxNmBRNb8I9dRZuPfY2G5-7R2tBaFEo-yI3u63_IVLsPA3qQ-m5ULfbJZlJQH0Pf8rhXPjqULhqLEhGtAqdqN7gxMjEUkm7Fg22EVKPQT4wxaLbePwOtkgYgdCRwSj7tKQ6kUPbk_wCilNbfDl3MqQEGUWf1uvB6Yauj9n3YDaDK7wdQ7N8OsZegGE92To4TO"/>
    </div>
    </div>
    </header>
    <!-- Page Canvas -->
    <div class="flex-1 mt-16 p-lg max-w-container-max mx-auto w-full">
    <!-- Breadcrumbs -->
    <nav aria-label="Breadcrumb" class="flex text-on-surface-variant font-label-md text-label-md mb-xl">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
    <li class="inline-flex items-center">
    <a class="inline-flex items-center hover:text-primary transition-colors" href="#">
                                Applicants
                            </a>
    </li>
    <li>
    <div class="flex items-center">
    <UIcon name="i-lucide-chevron-right" class="text-sm mx-1" />
    <span class="text-primary font-medium">Candidate Profile</span>
    </div>
    </li>
    </ol>
    </nav>
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
    <!-- Left Column (Profile Info) -->
    <div class="xl:col-span-8 flex flex-col gap-xl">
    <!-- Profile Header Card -->
    <div class="bg-surface rounded-xl shadow-level-1 p-lg flex flex-col md:flex-row gap-lg items-start border border-neutral-50">
    <div class="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-surface-variant shadow-sm">
    <img alt="Rahul Sharma" class="w-full h-full object-cover" data-alt="A professional headshot of an Indian male designer named Rahul Sharma, wearing a smart casual dark blue shirt, smiling warmly, lit by soft natural light against a clean white studio background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8SVbYjksUDpgLLDNZaXssk6rNSXOf7E0aVxJnALCqwOdgAhce8O7TVH64X6nsDIijJxV5qAr23vGd61a5Lj_7iNkNPp5F_oHyD3K4p8CxJoXKR_YWLHLd3VRtQ8HddaKYEliGpLpV7XEtpOo-1k-wT2Mw59WV8qGJCfYI3sLu4tbWWrVzLjqZz-6QanNHrY7aNV-hlRq3ODh1yXlYXJHJFxkKKaOJMwHbZTTy5FwJ1qNNMFDm6gkvsMAmhS84Zti3Q9t33YVQ8F9"/>
    </div>
    <div class="flex-1 w-full">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-md gap-sm">
    <div>
    <h2 class="font-headline-lg text-headline-lg text-on-surface m-0">Rahul Sharma</h2>
    <p class="font-body-md text-body-md text-on-surface-variant mt-1">Senior UI Designer</p>
    </div>
    <span class="inline-flex items-center px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary-fixed text-on-primary-fixed-variant border border-primary-fixed-dim">
                                        Shortlisted
                                    </span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-sm mb-lg">
    <div class="flex items-center gap-sm text-on-surface-variant font-body-md text-body-md">
    <UIcon name="i-lucide-mail" class="text-outline" />
                                        rahul.sharma@example.com
                                    </div>
    <div class="flex items-center gap-sm text-on-surface-variant font-body-md text-body-md">
    <UIcon name="i-lucide-phone" class="text-outline" />
                                        +91 98765 43210
                                    </div>
    <div class="flex items-center gap-sm text-on-surface-variant font-body-md text-body-md">
    <UIcon name="i-lucide-map-pin" class="text-outline" />
                                        Mumbai, India
                                    </div>
    </div>
    <div class="flex flex-wrap gap-md">
    <button class="flex items-center gap-sm bg-surface-container-low text-primary font-label-md text-label-md px-md py-sm rounded-lg hover:bg-surface-container transition-colors duration-200 border border-outline-variant shadow-sm">
    <UIcon name="i-lucide-download" class="text-sm" />
                                        Download Resume
                                    </button>
    <button class="flex items-center gap-sm bg-transparent text-on-surface-variant border border-outline hover:border-primary hover:text-primary font-label-md text-label-md px-md py-sm rounded-lg transition-colors duration-200">
    <UIcon name="i-lucide-message-square" class="text-sm" />
                                        Contact Candidate
                                    </button>
    </div>
    </div>
    </div>
    <!-- Professional Summary -->
    <section class="bg-surface rounded-xl shadow-level-1 p-lg border border-neutral-50">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md">Professional Summary</h3>
    <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                Senior UI Designer with 5+ years of experience in creating user-centric digital products. Specializing in SaaS platforms, mobile application interfaces, and design systems. Proven track record of bridging the gap between complex functionality and elegant user experiences, utilizing user research to inform design decisions and collaborating closely with engineering teams to ensure pixel-perfect execution.
                            </p>
    </section>
    <!-- Work Experience Timeline -->
    <section class="bg-surface rounded-xl shadow-level-1 p-lg border border-neutral-50">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-lg">Work Experience</h3>
    <div class="relative border-l-2 border-surface-variant ml-3 md:ml-4 space-y-lg pb-4">
    <!-- Experience Item 1 -->
    <div class="relative pl-lg">
    <span class="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-surface"></span>
    <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-sm">
    <div>
    <h4 class="font-label-md text-label-md text-on-surface text-lg">Senior UI Designer</h4>
    <div class="text-on-surface-variant font-body-md text-body-md mt-1 flex items-center gap-sm">
    <UIcon name="i-lucide-building-2" class="text-sm" />
                                                TechNova Solutions
                                            </div>
    </div>
    <span class="inline-block mt-2 md:mt-0 text-sm font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-1 rounded">2020 - Present</span>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant">
                                        Led design for flagship SaaS platforms. Established a comprehensive design system adopted by 5 product teams. Improved user onboarding completion rate by 35% through iterative UX enhancements.
                                    </p>
    </div>
    <!-- Experience Item 2 -->
    <div class="relative pl-lg">
    <span class="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-outline-variant ring-4 ring-surface"></span>
    <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-sm">
    <div>
    <h4 class="font-label-md text-label-md text-on-surface text-lg">UI Designer</h4>
    <div class="text-on-surface-variant font-body-md text-body-md mt-1 flex items-center gap-sm">
    <UIcon name="i-lucide-building-2" class="text-sm" />
                                                Creative Edge
                                            </div>
    </div>
    <span class="inline-block mt-2 md:mt-0 text-sm font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-1 rounded">2018 - 2020</span>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant">
                                        Focused on mobile app interfaces for e-commerce clients. Designed end-to-end shopping experiences resulting in a 20% increase in checkout conversions.
                                    </p>
    </div>
    </div>
    </section>
    </div>
    <!-- Right Column (Sidebar Widgets) -->
    <div class="xl:col-span-4 flex flex-col gap-xl">
    <!-- Action Panel (Sticky) -->
    <div class="bg-surface rounded-xl shadow-level-2 p-lg border border-primary-fixed-dim sticky top-24 z-10">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md">Employer Actions</h3>
    <div class="flex flex-col gap-md">
    <button class="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:bg-primary-container transition-all duration-200 shadow-sm active:scale-95 flex justify-center items-center gap-sm">
    <UIcon name="i-lucide-check-circle" />
                                    Approve / Select
                                </button>
    <button class="w-full bg-surface-container-low text-primary font-label-md text-label-md py-3 rounded-xl hover:bg-surface-container transition-all duration-200 border border-primary-fixed-dim flex justify-center items-center gap-sm">
    <UIcon name="i-lucide-bookmark-add" />
                                    Shortlist
                                </button>
    <button class="w-full bg-transparent text-error border border-error hover:bg-error-container hover:text-on-error-container font-label-md text-label-md py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-sm">
    <UIcon name="i-lucide-cancel" />
                                    Reject Candidate
                                </button>
    </div>
    </div>
    <!-- Application Details -->
    <div class="bg-surface rounded-xl shadow-level-1 p-lg border border-neutral-50">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md">Application Details</h3>
    <div class="space-y-md">
    <div>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">Applied Position</p>
    <p class="font-body-md text-body-md text-on-surface font-medium">Senior UI Designer</p>
    </div>
    <div>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-1">Application Date</p>
    <p class="font-body-md text-body-md text-on-surface font-medium">12 Oct 2023</p>
    </div>
    </div>
    </div>
    <!-- Skills -->
    <div class="bg-surface rounded-xl shadow-level-1 p-lg border border-neutral-50">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md">Skills</h3>
    <div class="flex flex-wrap gap-sm">
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">Java</span>
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">Python</span>
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">SQL</span>
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">React</span>
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">Communication</span>
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">Leadership</span>
    <span class="px-3 py-1 bg-surface-container rounded-lg text-on-surface-variant font-label-sm text-label-sm">Figma</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </main>
  </div>
</template>

<style scoped>

        .icon-fill {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .shadow-level-1 {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .shadow-level-2 {
            box-shadow: 0px 8px 30px rgba(26, 115, 232, 0.12);
        }
</style>

<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: "Company Profile - Job Nova"
})
</script>

<template>
  <div>
    <!-- SideNavBar (Shared Component) -->
    <nav class="hidden md:flex bg-surface text-primary docked h-screen w-64 left-0 top-0 bg-surface shadow-sm shadow-sm flex flex-col h-full border-r border-outline-variant/30 fixed z-50">
    <!-- Header -->
    <div class="p-lg border-b border-outline-variant/30 flex items-center gap-md">
    <div class="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
    <UIcon name="i-lucide-building-2" class="text-on-primary-container" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Employer Portal</p>
    </div>
    </div>
    <!-- CTA -->
    <div class="p-md">
    <button class="w-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-colors py-sm px-md rounded-lg font-label-md text-label-md flex items-center justify-center gap-sm btn-hover-effect">
    <UIcon name="i-lucide-plus" />
                    Post New Job
                </button>
    </div>
    <!-- Main Navigation Tabs -->
    <div class="flex-1 overflow-y-auto py-sm flex flex-col gap-xs px-sm">
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/employer-dashboard-2">
    <UIcon name="i-lucide-layout-dashboard" />
    <span class="font-label-md text-label-md">Dashboard</span>
    </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-fixed/10" href="/company-profile-employer-dashboard">
    <UIcon name="i-lucide-building-2" style="font-variation-settings: 'FILL' 1;" />
    <span class="font-label-md text-label-md">Company Profile</span>
    </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/post-a-new-job-employer-dashboard">
    <UIcon name="i-lucide-post-add" />
    <span class="font-label-md text-label-md">Post Job</span>
    </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/manage-jobs-employer-dashboard">
    <UIcon name="i-lucide-history" />
    <span class="font-label-md text-label-md">Manage Jobs</span>
    </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/applicants-tracking-employer-dashboard">
    <UIcon name="i-lucide-groups" />
    <span class="font-label-md text-label-md">Applicants</span>
    </a>
    </div>
    <!-- Footer Navigation -->
    <div class="p-sm border-t border-outline-variant/30 flex flex-col gap-xs">
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/login">
    <UIcon name="i-lucide-settings" />
    <span class="font-label-md text-label-md">Settings</span>
    </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="/login">
    <UIcon name="i-lucide-log-out" />
    <span class="font-label-md text-label-md">Logout</span>
    </a>
    </div>
    </nav>
    <!-- Main Content Canvas -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
    <!-- TopAppBar (Shared Component) -->
    <header class="bg-surface/80 backdrop-blur-md text-primary docked full-width top-0 sticky z-40 bg-surface/80 shadow-sm flex justify-between items-center w-full px-lg py-md h-[72px]">
    <!-- Left side (Search) -->
    <div class="flex-1 max-w-md hidden sm:block">
    <div class="relative">
    <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-full font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Search..." type="text"/>
    </div>
    </div>
    <div class="flex-1 sm:hidden">
    <h2 class="font-headline-md text-headline-md font-bold">Job Nova</h2>
    </div>
    <!-- Right side (Actions) -->
    <div class="flex items-center gap-md">
    <button class="p-2 text-on-surface-variant hover:text-primary transition-colors relative group">
    <UIcon name="i-lucide-bell" />
    <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
    </button>
    <button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
    <UIcon name="i-lucide-help-circle" />
    </button>
    <button class="w-10 h-10 rounded-full overflow-hidden border border-outline-variant ml-sm">
    <img alt="Employer Profile" class="w-full h-full object-cover" data-alt="A professional headshot of a corporate executive, smiling warmly, well-lit studio lighting, isolated against a light gray background, high resolution, suitable for a professional online profile." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbeBPCf850nmI8spA8QtvF3Cg4Uchp9fkuOtuX9ZZkwZN-fu2bWNoRb_XIRBpl25fXDNwWA8XmiFKbudeQaXJQFIdNJQ0BleTvLMMHyNL9mioBwkP-psP7wfvn6BZHAHPnglY5zPj7XAo1qVfnt5cMR0loCsnEQ0_af6yUESmvmDXoxwKrJq1z7nOv8Gfe-AedZjIVPPZNP9TnJE-niVW8AwI9HKJMUbuhRZ9bHV9acR2cDNxFCTjc-XKEE8EzTOfY9lQyDwtkPIt7"/>
    </button>
    </div>
    </header>
    <!-- Page Content -->
    <main class="flex-1 p-md md:p-xl max-w-7xl mx-auto w-full">
    <!-- Page Header -->
    <div class="mb-xl flex flex-col sm:flex-row justify-between items-start sm:items-end gap-md">
    <div>
    <h2 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Company Profile</h2>
    <p class="font-body-lg text-body-lg text-on-surface-variant">Manage your company information and employer branding.</p>
    </div>
    <div class="bg-surface-container-lowest ambient-shadow-l1 px-md py-sm rounded-lg flex items-center gap-sm border border-outline-variant/50">
    <span class="w-2 h-2 bg-[#10b981] rounded-full"></span>
    <span class="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">Status: Approved</span>
    </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
    <!-- Main Form Column -->
    <div class="lg:col-span-8 flex flex-col gap-gutter">
    <!-- Company Profile Header Card -->
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg flex flex-col sm:flex-row items-center sm:items-start gap-lg">
    <div class="w-32 h-32 rounded-xl bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant overflow-hidden relative group">
    <img class="w-full h-full object-cover" data-alt="A clean, modern corporate logo featuring a stylized geometric 'T' and 'N' intertwined in professional blue hues on a white background. It looks like a high-tech SaaS company logo, minimalist and professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWvG4wlzJPWuhQLS4jUaMRfk7D6zjslqtF2dUzHVHFOMHHwqLSnsU_D4pp7c7w0Px8LAo8F2XlPpc6HpJD52Vl7G-bQwKAYAu0Xugs7DZ1c71G9lFKXrrvq1vpHm88CFU4NROFcloGsUgichI7E6pD0ZWVsZZ3MBmQkRt5EnPd8XO7Xonnp5zF8uELLo1-dQC421UC7cr1Z7SkWFbCW9gRQ04efF7TOtJGsAUXn4IBjIYoWjoh_grKNThOSEWJ5ADw9ADLkW_5FThX"/>
    <div class="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
    <UIcon name="i-lucide-camera" class="text-on-primary" />
    </div>
    </div>
    <div class="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-xs">TechNova Solutions</h3>
    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-sm mb-md">
    <span class="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm text-label-sm">Software &amp; IT</span>
    <span class="w-1 h-1 bg-outline-variant rounded-full"></span>
    <span class="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-label-sm text-label-sm">Private Limited</span>
    </div>
    <div class="flex items-center gap-md w-full sm:w-auto">
    <button class="flex-1 sm:flex-none bg-primary-container text-on-primary-container px-md py-sm rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors btn-hover-effect">
                                        Upload Logo
                                    </button>
    <button class="flex-1 sm:flex-none border border-outline-variant text-on-surface px-md py-sm rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors btn-hover-effect">
                                        Remove
                                    </button>
    </div>
    <p class="font-label-sm text-label-sm text-on-surface-variant mt-sm">Logo Requirements: JPEG / PNG, Max Size: 500 KB</p>
    </div>
    </div>
    <!-- Company Information Section -->
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
    <UIcon name="i-lucide-building" class="text-primary" />
                                Company Information
                            </h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="col-span-1 md:col-span-2">
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Company Name</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="TechNova Solutions"/>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Company Type</label>
    <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none">
    <option>Private Limited</option>
    <option>Public Limited</option>
    <option>Partnership</option>
    <option>Sole Proprietorship</option>
    </select>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Industry Type</label>
    <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none">
    <option>Software &amp; IT</option>
    <option>Finance</option>
    <option>Healthcare</option>
    <option>Manufacturing</option>
    </select>
    </div>
    </div>
    </div>
    <!-- Company Description Section -->
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
    <UIcon name="i-lucide-file-text" class="text-primary" />
                                Company Description
                            </h4>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Company Profile Description</label>
    <p class="font-label-sm text-label-sm text-outline mb-sm">Tell candidates about your company, culture and opportunities.</p>
    <textarea class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all resize-none" rows="5">TechNova Solutions is a leading provider of innovative software solutions. We specialize in developing cutting-edge SaaS products that empower businesses to streamline their operations and achieve their goals.</textarea>
    </div>
    </div>
    </div>
    <!-- Secondary Form Column -->
    <div class="lg:col-span-4 flex flex-col gap-gutter">
    <!-- Contact Information Section -->
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
    <UIcon name="i-lucide-contact-mail" class="text-primary" />
                                Contact Information
                            </h4>
    <div class="flex flex-col gap-md">
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Executive Name</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="Arjun Mehta"/>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Email Address</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="email" value="arjun.m@technova.in"/>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Phone Number</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="tel" value="+91 98765 43210"/>
    </div>
    </div>
    </div>
    <!-- Address Information Section -->
    <div class="bg-surface-container-lowest rounded-xl ambient-shadow-l1 p-lg">
    <h4 class="font-label-md text-label-md text-on-surface font-semibold mb-lg flex items-center gap-sm border-b border-outline-variant/30 pb-sm">
    <UIcon name="i-lucide-map-pin" class="text-primary" />
                                Location
                            </h4>
    <div class="flex flex-col gap-md">
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Address</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="Level 4, Cyber Tower A, Hi-Tech City"/>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Country</label>
    <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none">
    <option>India</option>
    <option>USA</option>
    </select>
    </div>
    <div class="grid grid-cols-2 gap-sm">
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">State</label>
    <select class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all appearance-none">
    <option>Telangana</option>
    <option>Maharashtra</option>
    <option>Karnataka</option>
    </select>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">City</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="Hyderabad"/>
    </div>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-xs">Pincode</label>
    <input class="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-3 font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" type="text" value="500081"/>
    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- Action Area -->
    <div class="mt-xl flex justify-end gap-md pt-lg border-t border-outline-variant/30">
    <button class="px-lg py-3 rounded-lg border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors btn-hover-effect">
                        Cancel
                    </button>
    <button class="px-lg py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors btn-hover-effect shadow-md">
                        Save Changes
                    </button>
    </div>
    </main>
    </div>
  </div>
</template>

<style scoped>
body {
            background-color: #F9FAFB; /* Neutral-50 */
        }
        .ambient-shadow-l1 {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .btn-hover-effect:active {
            transform: scale(0.98);
        }
</style>

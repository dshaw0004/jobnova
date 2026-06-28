<script setup>
useHead({
  title: "Applicants Tracking - Job Nova"
})
</script>

<template>
  <div>
    <!-- SideNavBar -->
    <aside class="h-screen w-64 fixed left-0 top-0 bg-surface shadow-sm z-50 flex flex-col py-lg px-md">
    <!-- Brand -->
    <div class="flex items-center gap-3 mb-xl px-2">
    <div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-soft">
    <UIcon name="i-lucide-briefcase" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <div class="text-headline-md font-headline-md text-primary tracking-tight">Job Nova</div>
    <div class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider opacity-80 mt-1">Employer Console</div>
    </div>
    </div>
    <!-- Navigation -->
    <nav class="flex-1 space-y-2">
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md scale-95 duration-150" href="/employer-dashboard-2">
    <UIcon name="i-lucide-layout-dashboard" />
                    Dashboard
                </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md scale-95 duration-150" href="/company-profile-employer-dashboard">
    <UIcon name="i-lucide-building-2" />
                    Company Profile
                </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md scale-95 duration-150" href="/post-a-new-job-employer-dashboard">
    <UIcon name="i-lucide-post-add" />
                    Post Job
                </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-body-md text-body-md scale-95 duration-150" href="/manage-jobs-employer-dashboard">
    <UIcon name="i-lucide-history" />
                    Manage Jobs
                </a>
    <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold bg-primary-container/10 transition-colors font-body-md text-body-md scale-95 duration-150" href="/applicants-tracking-employer-dashboard">
    <UIcon name="i-lucide-groups" style="font-variation-settings: 'FILL' 1;" />
                    Applicants
                </a>
    </nav>
    <!-- CTA & Footer -->
    <div class="mt-auto space-y-4">
    <button class="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
    <UIcon name="i-lucide-plus" class="text-[20px]" />
                    Post New Job
                </button>
    <div class="pt-4 border-t border-surface-variant">
    <a class="flex items-center gap-3 px-4 py-2 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors font-body-md text-body-md" href="/login">
    <UIcon name="i-lucide-log-out" />
                        Logout
                    </a>
    </div>
    </div>
    </aside>
    <!-- Main Content Wrapper -->
    <div class="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
    <!-- TopAppBar -->
    <header class="fixed top-0 right-0 w-[calc(100%-256px)] z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center h-16 px-lg bg-surface">
    <!-- Left: Search/Title Area (Empty here as requested by component, title is in page body) -->
    <div class="flex items-center gap-4">
    <div class="hidden">Applicants</div>
    </div>
    <!-- Right: Actions & Profile -->
    <div class="flex items-center gap-4">
    <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors relative">
    <UIcon name="i-lucide-bell" />
    <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
    </button>
    <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors">
    <UIcon name="i-lucide-settings" />
    </button>
    <div class="h-8 w-px bg-surface-variant mx-2"></div>
    <button class="flex items-center gap-2 hover:opacity-80 transition-opacity">
    <img alt="Recruiter Profile" class="w-8 h-8 rounded-full object-cover border border-surface-variant" data-alt="A professional headshot of a young Indian male recruiter in a modern office setting. He is wearing a crisp blue button-down shirt. The lighting is bright and airy, typical of a high-end corporate environment. The background is slightly blurred showing glass partitions and a clean white office aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXj7PSCc3hdLYXXNfL6gLG-HdfSf_QKrGw7UnTs8oM6Qd1SQm2I8Q7l5_dcCIP-m98DDizg_IvykqVuarG5UE674rTPDNJCRPHHiAvqlvIPxFsEY9N3BuH9vaObevWid0di6r7k9R--mRy_JLAE8TM0D2_krfl8Vb6Y-eHFLG3R4EUQIDafl9VnfVoFCCAsKH7VbKknM4-Ewk9RWF7ZyHUNRh2sgoaDwc6WdHodBAaf_SWTSxVC0UMXqgCzYJHjY_D8lJR6jrXedoT"/>
    <UIcon name="i-lucide-chevron-down" class="text-on-surface-variant text-[20px]" />
    </button>
    </div>
    </header>
    <!-- Main Scrollable Canvas -->
    <main class="flex-1 overflow-y-auto pt-24 pb-12 px-xl">
    <div class="max-w-7xl mx-auto space-y-xl">
    <!-- Page Header -->
    <div>
    <h1 class="text-headline-lg font-headline-lg text-on-surface">Applicants Tracking</h1>
    <p class="text-body-md font-body-md text-on-surface-variant mt-2">Review and manage applications received across all your job postings.</p>
    </div>
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
    <!-- Total -->
    <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4">
    <div class="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
    <UIcon name="i-lucide-groups" class="text-[28px]" />
    </div>
    <div>
    <div class="text-label-md font-label-md text-on-surface-variant mb-1">Total Applicants</div>
    <div class="text-headline-md font-headline-md text-on-surface">248</div>
    </div>
    </div>
    <!-- New -->
    <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
    <div class="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
    <UIcon name="i-lucide-fiber-new" class="text-[28px]" />
    </div>
    <div>
    <div class="text-label-md font-label-md text-on-surface-variant mb-1">New Applications</div>
    <div class="text-headline-md font-headline-md text-primary-container">32</div>
    </div>
    </div>
    <!-- Shortlisted -->
    <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4">
    <div class="w-12 h-12 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary">
    <UIcon name="i-lucide-thumbs-up" class="text-[28px]" />
    </div>
    <div>
    <div class="text-label-md font-label-md text-on-surface-variant mb-1">Shortlisted</div>
    <div class="text-headline-md font-headline-md text-on-surface">42</div>
    </div>
    </div>
    <!-- Rejected -->
    <div class="bg-surface-container-lowest rounded-xl p-md shadow-soft border border-surface-container-low flex items-center gap-4">
    <div class="w-12 h-12 rounded-lg bg-error-container/50 flex items-center justify-center text-error">
    <UIcon name="i-lucide-thumbs-down" class="text-[28px]" />
    </div>
    <div>
    <div class="text-label-md font-label-md text-on-surface-variant mb-1">Rejected</div>
    <div class="text-headline-md font-headline-md text-on-surface">12</div>
    </div>
    </div>
    </div>
    <!-- Main Content Area: Table + Sidebar Activity -->
    <div class="flex flex-col lg:flex-row gap-xl">
    <!-- Left: Search, Filters & Table -->
    <div class="flex-1 space-y-md min-w-0">
    <!-- Filter Bar -->
    <div class="bg-surface-container-lowest rounded-xl p-3 shadow-soft border border-surface-container-low flex flex-wrap items-center gap-3">
    <!-- Search -->
    <div class="flex-1 min-w-[250px] relative">
    <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full bg-surface-container-low border-transparent focus:border-primary focus:bg-surface-container-lowest focus:ring-0 rounded-lg pl-10 pr-4 py-2 text-body-md font-body-md text-on-surface placeholder:text-outline-variant transition-colors h-11" placeholder="Search candidate by name, skills or qualification" type="text"/>
    </div>
    <!-- Dropdowns -->
    <select class="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-label-md font-label-md text-on-surface h-11 focus:border-primary focus:ring-0 cursor-pointer">
    <option>All Positions</option>
    <option>Senior UI Designer</option>
    <option>Frontend Developer</option>
    <option>Marketing Manager</option>
    </select>
    <select class="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-label-md font-label-md text-on-surface h-11 focus:border-primary focus:ring-0 cursor-pointer">
    <option>Status</option>
    <option>New</option>
    <option>Under Review</option>
    <option>Shortlisted</option>
    <option>Selected</option>
    <option>Rejected</option>
    </select>
    <select class="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-label-md font-label-md text-on-surface h-11 focus:border-primary focus:ring-0 cursor-pointer">
    <option>Experience</option>
    <option>0-2 Years</option>
    <option>3-5 Years</option>
    <option>5+ Years</option>
    </select>
    <div class="h-8 w-px bg-surface-variant hidden md:block mx-1"></div>
    <button class="flex items-center gap-2 px-4 py-2 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container rounded-lg h-11 transition-colors">
    <UIcon name="i-lucide-arrow-up-down" class="text-[18px]" />
                                    Date Applied
                                </button>
    </div>
    <!-- Table Card -->
    <div class="bg-surface-container-lowest rounded-xl shadow-soft border border-surface-container-low overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse whitespace-nowrap">
    <thead>
    <tr class="bg-surface-container-low/50 border-b border-surface-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
    <th class="py-4 px-6 font-semibold">Candidate</th>
    <th class="py-4 px-6 font-semibold">Applied Position</th>
    <th class="py-4 px-6 font-semibold">Experience</th>
    <th class="py-4 px-6 font-semibold">Qualification</th>
    <th class="py-4 px-6 font-semibold">Applied Date</th>
    <th class="py-4 px-6 font-semibold">Status</th>
    <th class="py-4 px-6 font-semibold text-right">Actions</th>
    </tr>
    </thead>
    <tbody class="divide-y divide-surface-variant text-body-md font-body-md text-on-surface">
    <!-- Row 1 -->
    <tr class="hover:bg-surface-container-low/30 transition-colors group">
    <td class="py-3 px-6">
    <div class="flex items-center gap-3">
    <img class="w-10 h-10 rounded-full object-cover border border-surface-variant" data-alt="A professional headshot of a young Indian male professional looking confident. He is wearing a grey blazer over a white shirt. The background is a clean, bright minimalist studio setting. High quality corporate portrait." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlONZwid3hYfEq4gVCq03TUuY9wmukLY_gNBQrq_SzOtscjYDuLZHdmUgMYD-JwvO_G-IaW82wK23YTNVWAKb4Z_UDXZTZeEocf2sLn6N6puhXaPLOZHVkQjE6X5dysMmGffEoT2bRM4MsFPDZJm08voyHvHicrQlW4J4KfXwTw8SInbqJFVPiZYnqfaA2X9UOzq3_W_oBNlLIJxCcNDOknS2ZwiVvrEXF_s4xVHQTruoVMAwXW_g65u37slnHDGNETrV5WLtkjTK4"/>
    <span class="font-medium">Rahul Sharma</span>
    </div>
    </td>
    <td class="py-3 px-6 text-on-surface-variant">Senior UI Designer</td>
    <td class="py-3 px-6 text-on-surface-variant">5 Years</td>
    <td class="py-3 px-6 text-on-surface-variant">B.Tech</td>
    <td class="py-3 px-6 text-on-surface-variant">24 Oct 2023</td>
    <td class="py-3 px-6">
    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary-container/10 text-primary uppercase tracking-wider">New</span>
    </td>
    <td class="py-3 px-6 text-right">
    <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors" title="View Profile"><UIcon name="i-lucide-eye" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors" title="Download Resume"><UIcon name="i-lucide-download" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-secondary hover:bg-secondary-container/20 transition-colors" title="Shortlist"><UIcon name="i-lucide-thumbs-up" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container transition-colors" title="Reject"><UIcon name="i-lucide-thumbs-down" class="text-[18px]" /></button>
    </div>
    </td>
    </tr>
    <!-- Row 2 -->
    <tr class="hover:bg-surface-container-low/30 transition-colors group">
    <td class="py-3 px-6">
    <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary font-bold text-label-md border border-tertiary-container">PK</div>
    <span class="font-medium">Priya Kapoor</span>
    </div>
    </td>
    <td class="py-3 px-6 text-on-surface-variant">Frontend Developer</td>
    <td class="py-3 px-6 text-on-surface-variant">3 Years</td>
    <td class="py-3 px-6 text-on-surface-variant">MCA</td>
    <td class="py-3 px-6 text-on-surface-variant">23 Oct 2023</td>
    <td class="py-3 px-6">
    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-secondary-container/20 text-secondary uppercase tracking-wider">Shortlisted</span>
    </td>
    <td class="py-3 px-6 text-right">
    <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors" title="View Profile"><UIcon name="i-lucide-eye" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors" title="Download Resume"><UIcon name="i-lucide-download" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-secondary hover:bg-secondary-container/20 transition-colors" title="Shortlist"><UIcon name="i-lucide-thumbs-up" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container transition-colors" title="Reject"><UIcon name="i-lucide-thumbs-down" class="text-[18px]" /></button>
    </div>
    </td>
    </tr>
    <!-- Row 3 -->
    <tr class="hover:bg-surface-container-low/30 transition-colors group">
    <td class="py-3 px-6">
    <div class="flex items-center gap-3">
    <img class="w-10 h-10 rounded-full object-cover border border-surface-variant" data-alt="A professional headshot of an older Indian male executive. He wears glasses and a dark navy suit. The lighting is soft and corporate. The background is a plain light grey wall." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj89s4DrZGWUbdYZtG1Qwftl9UOY9QRAeHp6IRgdRfNe5TS2wA_QAgpcpq1c7T1A7ZByaEyFYIpTgY_7IkvMC9xBO1lIgeenk9fIN5brL23ea1gS9vvu_6d0b3RJJMFjbygP5rq5wdeq7gNOaw6kcynvaG94YCPn2sVbZKl7CHqWV1LSFKwCNUfm8Kcx-TXuFDA7zxwfg-eE5Nwh3zc3y0IIITBAI_LuzbpfjyYbCmfkc4AOcNgXxlELzN-lEw4RGLcuhyAIdnWsO9"/>
    <span class="font-medium">Amit Verma</span>
    </div>
    </td>
    <td class="py-3 px-6 text-on-surface-variant">Marketing Manager</td>
    <td class="py-3 px-6 text-on-surface-variant">8 Years</td>
    <td class="py-3 px-6 text-on-surface-variant">MBA</td>
    <td class="py-3 px-6 text-on-surface-variant">21 Oct 2023</td>
    <td class="py-3 px-6">
    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#fff8e1] text-[#f57f17] uppercase tracking-wider">Under Review</span>
    </td>
    <td class="py-3 px-6 text-right">
    <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors" title="View Profile"><UIcon name="i-lucide-eye" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-primary-container/10 transition-colors" title="Download Resume"><UIcon name="i-lucide-download" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-secondary hover:bg-secondary-container/20 transition-colors" title="Shortlist"><UIcon name="i-lucide-thumbs-up" class="text-[18px]" /></button>
    <button class="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container transition-colors" title="Reject"><UIcon name="i-lucide-thumbs-down" class="text-[18px]" /></button>
    </div>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <div class="px-6 py-4 border-t border-surface-variant flex items-center justify-between text-body-md font-body-md text-on-surface-variant bg-surface-container-lowest">
    <div>Showing 1 to 3 of 248 entries</div>
    <div class="flex gap-1">
    <button class="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container disabled:opacity-50" disabled="">Prev</button>
    <button class="px-3 py-1 rounded bg-primary-container text-on-primary-container font-medium">1</button>
    <button class="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container">2</button>
    <button class="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container">3</button>
    <span class="px-2 py-1">...</span>
    <button class="px-3 py-1 rounded border border-outline-variant hover:bg-surface-container">Next</button>
    </div>
    </div>
    </div>
    </div>
    <!-- Right Sidebar: Recent Activity -->
    <div class="w-full lg:w-80 flex-shrink-0">
    <div class="bg-surface-container-lowest rounded-xl shadow-soft border border-surface-container-low p-md sticky top-6">
    <h3 class="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2">
    <UIcon name="i-lucide-history" class="text-primary-container" />
                                    Recent Activity
                                </h3>
    <div class="relative border-l-2 border-surface-variant ml-3 space-y-6">
    <!-- Item 1 -->
    <div class="relative pl-6">
    <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-container border-2 border-surface-container-lowest"></div>
    <p class="text-body-md font-body-md text-on-surface">New application received for <span class="font-medium">Frontend Developer</span></p>
    <span class="text-label-sm font-label-sm text-outline mt-1 block">Just now</span>
    </div>
    <!-- Item 2 -->
    <div class="relative pl-6">
    <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-secondary border-2 border-surface-container-lowest"></div>
    <p class="text-body-md font-body-md text-on-surface">Candidate <span class="font-medium">Amit V.</span> shortlisted</p>
    <span class="text-label-sm font-label-sm text-outline mt-1 block">2 hours ago</span>
    </div>
    <!-- Item 3 -->
    <div class="relative pl-6">
    <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-variant border-2 border-surface-container-lowest"></div>
    <p class="text-body-md font-body-md text-on-surface">Candidate selected for <span class="font-medium">Marketing Manager</span></p>
    <span class="text-label-sm font-label-sm text-outline mt-1 block">Yesterday, 4:30 PM</span>
    </div>
    <!-- Item 4 -->
    <div class="relative pl-6">
    <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-variant border-2 border-surface-container-lowest"></div>
    <p class="text-body-md font-body-md text-on-surface">Job posting <span class="font-medium">Senior UI Designer</span> published</p>
    <span class="text-label-sm font-label-sm text-outline mt-1 block">Oct 20, 2023</span>
    </div>
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
body { font-family: 'Inter', sans-serif; background-color: var(--color-surface); }
        h1, h2, h3, h4, h5, h6, .font-headline-lg, .font-headline-md, .font-display-lg { font-family: 'Hanken Grotesk', sans-serif; }
        
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--color-outline-variant); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #727785; }

        .shadow-soft { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
        .shadow-hover { box-shadow: 0px 8px 30px rgba(26, 115, 232, 0.12); }
</style>

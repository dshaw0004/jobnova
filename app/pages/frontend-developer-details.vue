<script setup>
useHead({
  title: "Frontend Developer | NovaStream Technologies - Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Micro-interaction for primary button
          document.querySelectorAll('button.bg-primary').forEach(button => {
              button.addEventListener('mousedown', () => button.style.transform = 'scale(0.95)');
              button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');
              button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Top Navigation Bar -->
    <header class="w-full sticky top-0 z-50 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <nav class="flex items-center justify-between px-lg py-sm max-w-container-max mx-auto h-16">
    <div class="flex items-center gap-xl">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    <div class="hidden md:flex items-center gap-lg">
    <a class="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors" href="#">Home</a>
    <a class="text-primary font-semibold border-b-2 border-primary font-body-md text-body-md" href="#">Private Jobs</a>
    <a class="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors" href="#">Govt Jobs</a>
    <a class="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors" href="#">Resources</a>
    </div>
    </div>
    <div class="flex items-center gap-md">
    <button class="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
    <UIcon name="i-lucide-bell" data-icon="notifications" />
    </button>
    <button class="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
    <UIcon name="i-lucide-user" data-icon="person" />
    </button>
    </div>
    </nav>
    </header>
    <main class="max-w-container-max mx-auto px-lg py-xl">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-xs text-on-surface-variant mb-xl font-label-md text-label-md">
    <a class="hover:text-primary transition-colors" href="#">Home</a>
    <UIcon name="i-lucide-chevron-right" class="text-sm" data-icon="chevron_right" />
    <a class="hover:text-primary transition-colors" href="#">Private Jobs</a>
    <UIcon name="i-lucide-chevron-right" class="text-sm" data-icon="chevron_right" />
    <span class="text-primary font-semibold">Frontend Developer</span>
    </nav>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
    <!-- Main Content Area -->
    <div class="lg:col-span-8 space-y-xl">
    <!-- Job Hero Section -->
    <section class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow border border-surface-variant/30">
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-lg mb-lg">
    <div class="flex gap-lg">
    <div class="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-variant overflow-hidden">
    <img alt="NovaStream logo" class="w-12 h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyvQvPli23NTWpOBFkJ-28bQ00DLlcUx_lGB3qmBGJH-zVmX1FnLa_pqGBO0PyHdBXNcj_d5DLivW5-VGRc3oVhkonNFQiU0U-ZbzMuc9-MrvflR4-JbdOFxQxhDa-isNdcf8oNqBsCDL4RaPKaTucqwkHixO2tJxRJ1lkLPDh0960tCnkliy9oN8QkikmsYJcm-yapdDttv3I9R-GFPYTslVJrZObRouLxQz7QABvLIdD728AfUnTHHQIL13QtG8Yzco0IvLyEaWK">
    </div>
    <div>
    <div class="flex flex-wrap gap-sm mb-sm">
    <span class="px-sm py-xs rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm uppercase">Urgent Hiring</span>
    <span class="px-sm py-xs rounded-full premium-badge-gradient text-white font-label-sm text-label-sm uppercase">Featured</span>
    </div>
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Frontend Developer</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant">NovaStream Technologies • <span class="text-primary">FinTech</span></p>
    </div>
    </div>
    <div class="flex gap-sm">
    <button class="px-lg h-11 bg-primary text-white rounded-xl font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all">Apply Now</button>
    <button class="p-sm border border-outline-variant text-on-surface-variant rounded-xl hover:bg-surface-container-low transition-colors">
    <UIcon name="i-lucide-bookmark" data-icon="bookmark" />
    </button>
    </div>
    </div>
    <div class="flex flex-wrap gap-md">
    <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-primary text-[20px]" data-icon="payments" />
    <span class="font-label-md text-label-md">₹18L - ₹28L PA</span>
    </div>
    <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
    <UIcon name="i-lucide-history" class="text-primary text-[20px]" data-icon="work_history" />
    <span class="font-label-md text-label-md">3-5 Years</span>
    </div>
    <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-primary text-[20px]" data-icon="location_on" />
    <span class="font-label-md text-label-md">Bengaluru</span>
    </div>
    <div class="flex items-center gap-xs px-md py-sm bg-surface-container-low rounded-xl text-on-surface-variant">
    <UIcon name="i-lucide-distance" class="text-primary text-[20px]" data-icon="distance" />
    <span class="font-label-md text-label-md">Hybrid</span>
    </div>
    </div>
    </section>
    <!-- Job Overview Grid -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-lg p-lg bg-surface-container-low rounded-xl">
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Employment Type</span>
    <p class="font-body-md text-body-md font-semibold">Full-time</p>
    </div>
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Department</span>
    <p class="font-body-md text-body-md font-semibold">Engineering</p>
    </div>
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Team Size</span>
    <p class="font-body-md text-body-md font-semibold">15+ members</p>
    </div>
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Joining</span>
    <p class="font-body-md text-body-md font-semibold">Immediate</p>
    </div>
    </section>
    <!-- Job Description -->
    <article class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow space-y-xl">
    <div>
    <h2 class="font-headline-md text-headline-md text-on-surface mb-md">About the Role</h2>
    <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                We are looking for a highly skilled Frontend Developer to join our core engineering team at NovaStream Technologies. You will be responsible for building the next generation of our wealth management platform, focusing on performance, scalability, and an exceptional user experience for millions of users across India.
                            </p>
    </div>
    <div>
    <h2 class="font-headline-md text-headline-md text-on-surface mb-md">Responsibilities</h2>
    <ul class="space-y-sm">
    <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
    <UIcon name="i-lucide-check-circle" class="text-primary" data-icon="check_circle" />
                                    Develop high-quality, reusable components using React and TypeScript.
                                </li>
    <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
    <UIcon name="i-lucide-check-circle" class="text-primary" data-icon="check_circle" />
                                    Optimize application performance and ensure high lighthouse scores.
                                </li>
    <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
    <UIcon name="i-lucide-check-circle" class="text-primary" data-icon="check_circle" />
                                    Collaborate with product designers to translate Figma designs into pixel-perfect code.
                                </li>
    </ul>
    </div>
    <div>
    <h2 class="font-headline-md text-headline-md text-on-surface mb-md">Day-to-Day Tasks</h2>
    <ul class="space-y-sm">
    <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                    Participating in daily stand-ups and sprint planning sessions.
                                </li>
    <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                    Conducting thorough code reviews to maintain high engineering standards.
                                </li>
    <li class="flex gap-md font-body-md text-body-md text-on-surface-variant">
    <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></span>
                                    Integrating complex GraphQL APIs with frontend state management.
                                </li>
    </ul>
    </div>
    </article>
    <!-- Required Skills -->
    <section class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow">
    <h2 class="font-headline-md text-headline-md text-on-surface mb-lg">Required Skills</h2>
    <div class="flex flex-wrap gap-md">
    <span class="px-lg py-sm bg-primary/10 text-primary rounded-xl font-label-md text-label-md">React</span>
    <span class="px-lg py-sm bg-primary/10 text-primary rounded-xl font-label-md text-label-md">TypeScript</span>
    <span class="px-lg py-sm bg-primary/10 text-primary rounded-xl font-label-md text-label-md">Next.js</span>
    <span class="px-lg py-sm bg-primary/10 text-primary rounded-xl font-label-md text-label-md">Tailwind CSS</span>
    <span class="px-lg py-sm bg-primary/10 text-primary rounded-xl font-label-md text-label-md">GraphQL</span>
    </div>
    </section>
    <!-- Qualifications -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-lg">
    <div class="p-lg bg-surface-container-lowest border border-surface-variant/30 rounded-xl job-card-shadow flex flex-col items-center text-center gap-md">
    <UIcon name="i-lucide-graduation-cap" class="text-primary text-4xl" data-icon="school" />
    <div class="space-y-xs">
    <h3 class="font-body-md text-body-md font-bold">Education</h3>
    <p class="font-label-md text-label-md text-on-surface-variant">B.Tech/B.E in CS or related field</p>
    </div>
    </div>
    <div class="p-lg bg-surface-container-lowest border border-surface-variant/30 rounded-xl job-card-shadow flex flex-col items-center text-center gap-md">
    <UIcon name="i-lucide-verified-user" class="text-primary text-4xl" data-icon="verified_user" />
    <div class="space-y-xs">
    <h3 class="font-body-md text-body-md font-bold">Experience</h3>
    <p class="font-label-md text-label-md text-on-surface-variant">Min 3 years in React ecosystem</p>
    </div>
    </div>
    <div class="p-lg bg-surface-container-lowest border border-surface-variant/30 rounded-xl job-card-shadow flex flex-col items-center text-center gap-md">
    <UIcon name="i-lucide-award" class="text-primary text-4xl" data-icon="workspace_premium" />
    <div class="space-y-xs">
    <h3 class="font-body-md text-body-md font-bold">Certifications</h3>
    <p class="font-label-md text-label-md text-on-surface-variant">AWS or Meta React Certification preferred</p>
    </div>
    </div>
    </section>
    <!-- Application Process -->
    <section class="bg-surface-container-lowest rounded-xl p-xl job-card-shadow">
    <h2 class="font-headline-md text-headline-md text-on-surface mb-xl">Application Process</h2>
    <div class="relative">
    <div class="absolute top-1/2 left-0 w-full h-0.5 bg-surface-variant -translate-y-1/2 hidden md:block"></div>
    <div class="flex flex-col md:flex-row justify-between gap-xl relative">
    <!-- Step 1 -->
    <div class="flex flex-col items-center gap-md bg-surface-container-lowest px-md z-10">
    <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
    <span class="font-label-md text-label-md text-on-surface text-center">Application Review</span>
    </div>
    <!-- Step 2 -->
    <div class="flex flex-col items-center gap-md bg-surface-container-lowest px-md z-10">
    <div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">2</div>
    <span class="font-label-md text-label-md text-on-surface-variant text-center">HR Screening</span>
    </div>
    <!-- Step 3 -->
    <div class="flex flex-col items-center gap-md bg-surface-container-lowest px-md z-10">
    <div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">3</div>
    <span class="font-label-md text-label-md text-on-surface-variant text-center">Technical Round</span>
    </div>
    <!-- Step 4 -->
    <div class="flex flex-col items-center gap-md bg-surface-container-lowest px-md z-10">
    <div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">4</div>
    <span class="font-label-md text-label-md text-on-surface-variant text-center">Final Interview</span>
    </div>
    <!-- Step 5 -->
    <div class="flex flex-col items-center gap-md bg-surface-container-lowest px-md z-10">
    <div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">5</div>
    <span class="font-label-md text-label-md text-on-surface-variant text-center">Offer Letter</span>
    </div>
    </div>
    </div>
    </section>
    <!-- Company Overview -->
    <section class="bg-surface-container-low rounded-xl p-xl overflow-hidden relative">
    <div class="relative z-10">
    <h2 class="font-headline-md text-headline-md text-on-surface mb-md">About NovaStream Technologies</h2>
    <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-lg max-w-2xl">
                                NovaStream Technologies is a pioneering FinTech firm reimagining wealth management for India's digital generation. We believe in transparent finance, radical simplicity, and the power of engineering to solve real-world problems.
                            </p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-lg">
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Headquarters</span>
    <p class="font-body-md text-body-md font-semibold">Bengaluru, KA</p>
    </div>
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Company Size</span>
    <p class="font-body-md text-body-md font-semibold">200-500 Employees</p>
    </div>
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Industry</span>
    <p class="font-body-md text-body-md font-semibold">Financial Services</p>
    </div>
    <div class="space-y-xs">
    <span class="text-on-surface-variant font-label-sm text-label-sm uppercase block">Founded</span>
    <p class="font-body-md text-body-md font-semibold">2018</p>
    </div>
    </div>
    </div>
    <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
    </div>
    <!-- Sticky Sidebar -->
    <aside class="lg:col-span-4 space-y-lg">
    <div class="sticky top-24 space-y-lg">
    <!-- CTA Card -->
    <div class="bg-surface-container-lowest rounded-xl p-lg job-card-shadow border border-surface-variant/30">
    <div class="flex items-center gap-md mb-lg p-md bg-error-container/20 rounded-xl border border-error/10">
    <UIcon name="i-lucide-timer" class="text-error" data-icon="timer" />
    <div class="flex flex-col">
    <span class="font-label-sm text-label-sm text-error uppercase">Apply Before</span>
    <span class="font-body-md text-body-md font-bold text-on-surface">15 Days Remaining</span>
    </div>
    </div>
    <div class="space-y-md">
    <button class="w-full h-[56px] bg-primary text-white rounded-xl font-label-md text-label-md hover:shadow-lg active:scale-95 transition-all">Apply for this Job</button>
    <button class="w-full h-[44px] border border-outline-variant text-on-surface-variant rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-md">
    <UIcon name="i-lucide-share-2" data-icon="share" />
                                    Share Job Post
                                </button>
    </div>
    <div class="mt-lg pt-lg border-t border-surface-variant">
    <div class="flex justify-between items-center mb-md">
    <span class="font-label-md text-label-md text-on-surface-variant">Applicants</span>
    <span class="font-body-md text-body-md font-bold">124 Applied</span>
    </div>
    <div class="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
    <div class="bg-primary h-full w-[45%]"></div>
    </div>
    </div>
    </div>
    <!-- Benefits & Perks -->
    <div class="bg-surface-container-lowest rounded-xl p-lg job-card-shadow border border-surface-variant/30">
    <h3 class="font-headline-md text-[18px] text-on-surface mb-lg">Benefits &amp; Perks</h3>
    <div class="grid grid-cols-1 gap-md">
    <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
    <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary">
    <UIcon name="i-lucide-medical-services" data-icon="medical_services" />
    </div>
    <span class="font-body-md text-body-md text-on-surface-variant">Health Insurance</span>
    </div>
    <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
    <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary">
    <UIcon name="i-lucide-clock" data-icon="schedule" />
    </div>
    <span class="font-body-md text-body-md text-on-surface-variant">Flexible Hours</span>
    </div>
    <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
    <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary">
    <UIcon name="i-lucide-graduation-cap" data-icon="school" />
    </div>
    <span class="font-body-md text-body-md text-on-surface-variant">Learning Budget</span>
    </div>
    <div class="flex items-center gap-md p-md bg-surface-container-low rounded-xl">
    <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-primary">
    <UIcon name="i-lucide-paid" data-icon="paid" />
    </div>
    <span class="font-body-md text-body-md text-on-surface-variant">Performance Bonus</span>
    </div>
    </div>
    </div>
    </div>
    </aside>
    </div>
    <!-- Related Jobs Section -->
    <section class="mt-xl">
    <div class="flex items-center justify-between mb-xl">
    <h2 class="font-headline-lg text-headline-lg text-on-surface">Related Jobs</h2>
    <a class="text-primary font-label-md text-label-md flex items-center gap-xs hover:underline" href="#">
                        View All Jobs
                        <UIcon name="i-lucide-arrow-right" data-icon="arrow_forward" />
    </a>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
    <!-- Related Job 1 -->
    <div class="p-lg bg-surface-container-lowest rounded-xl job-card-shadow border border-surface-variant/30 hover:border-primary/50 transition-colors">
    <div class="flex items-center gap-md mb-md">
    <div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
    <img alt="Company Logo" class="w-8 h-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0miXGl6R1jgyAWpA_gjZdugdoc83ccyTVy5crrcjUOTONpjSdrZrwn6QX62mC0wpfSOZ2mJUlmuS3V55HaMRPNPAXTdpHUydvNzS778u9r_KXNPfPGYt7Z4OplWjSFPe031m6RsRAtnmillVJGBlledQuwq6sxFB-U6WVpI11pg5xNH6N1T645LjNJi6ccOQU_KsfBXXL-V7KQ5ThTdejqp8OaiJ0SzC7GRtVwRpZEqYrAlLXLEPR3Nu9E5alyqw1Yobjw41Vrxgm">
    </div>
    <div>
    <h4 class="font-body-md text-body-md font-bold truncate">UI/UX Designer</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant">PayZapp</p>
    </div>
    </div>
    <div class="space-y-md">
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" data-icon="location_on" />
    <span class="font-label-sm text-label-sm">Pune, Maharashtra</span>
    </div>
    <div class="flex items-center justify-between">
    <span class="font-label-md text-label-md font-bold text-primary">₹12L - ₹18L</span>
    <span class="px-sm py-xs bg-surface-container-low rounded-full font-label-sm text-label-sm">Full-time</span>
    </div>
    </div>
    </div>
    <!-- Related Job 2 -->
    <div class="p-lg bg-surface-container-lowest rounded-xl job-card-shadow border border-surface-variant/30 hover:border-primary/50 transition-colors">
    <div class="flex items-center gap-md mb-md">
    <div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
    <img alt="Company Logo" class="w-8 h-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzXELMIiME7f1sW7vxBdWHSn16DocsJZRkH5dtep6ATnd4eh0nzaGRl8reUYWZk0SFk68xHtnwkL-qonLUn15XBnRFMO31Iqyp9vcfn44u_T1u-C_BavoD_M1_Flb1bqZwr9oqdjtle5AbUMI7sRZsOSl0aNHrO23HQ5DcD7TSLh3WLr3_57CVu9uk7iUuQhs-5bA6C9JOv6hl-LcgS6XGQn6941RRKJ_K-jcfxftBNUAK94cZbVvSmvQDXtvCzpY6o6gVncdtoJvW">
    </div>
    <div>
    <h4 class="font-body-md text-body-md font-bold truncate">Backend Engineer</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Cred</p>
    </div>
    </div>
    <div class="space-y-md">
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" data-icon="location_on" />
    <span class="font-label-sm text-label-sm">Bengaluru, Remote</span>
    </div>
    <div class="flex items-center justify-between">
    <span class="font-label-md text-label-md font-bold text-primary">₹25L - ₹35L</span>
    <span class="px-sm py-xs bg-surface-container-low rounded-full font-label-sm text-label-sm">Full-time</span>
    </div>
    </div>
    </div>
    <!-- Related Job 3 -->
    <div class="p-lg bg-surface-container-lowest rounded-xl job-card-shadow border border-surface-variant/30 hover:border-primary/50 transition-colors">
    <div class="flex items-center gap-md mb-md">
    <div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
    <img alt="Company Logo" class="w-8 h-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0wc2g7DUmiL09ph_GmMAHwGiAkeFgAvZznj4eBXJC-3-6EPHAhzml9x-mm9Y6e5RgesrrYOayUFAshxpUPmvfozvGyyxcOe6I4KKN9xQBanrLws7Vx9Helidl2PcYPqf8iE7dDkjaoD6lZx-jHoQXB7_0yo-GoHNa6ZKiffH4oQG4wZWSB4PmMa-hKoceY6QcOuKOyWT-cwffdab9px0KHa3gCIItVIw8Nkkko9AXmwJpoCP_o-VGptDlFPc-rdItMiv74K1uVaoH">
    </div>
    <div>
    <h4 class="font-body-md text-body-md font-bold truncate">SDE - II (Frontend)</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Zerodha</p>
    </div>
    </div>
    <div class="space-y-md">
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" data-icon="location_on" />
    <span class="font-label-sm text-label-sm">Mumbai, Remote</span>
    </div>
    <div class="flex items-center justify-between">
    <span class="font-label-md text-label-md font-bold text-primary">₹20L - ₹30L</span>
    <span class="px-sm py-xs bg-surface-container-low rounded-full font-label-sm text-label-sm">Full-time</span>
    </div>
    </div>
    </div>
    <!-- Related Job 4 -->
    <div class="p-lg bg-surface-container-lowest rounded-xl job-card-shadow border border-surface-variant/30 hover:border-primary/50 transition-colors">
    <div class="flex items-center gap-md mb-md">
    <div class="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center">
    <img alt="Company Logo" class="w-8 h-8" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOjZ7lptfypUHS0TiZ2353yNIhezDxuEoQ7iwb6z2c6qEY2iGp3wyL5amUlbjgfERcDY-f42o14nKkwuFaK5wWf22EaqY00Eidnma678eZUyIncVK4ZVs474BJ-8OS0lFxbaeQiJhmKPLyGsMMRslT3Gz13A3ZYFZZYtWhhmp-Vvg6hY2dfdLxjAtGDYx_F9yLKAtxKlxyT2-Pe9JzDwfOqprQGeKfBdp6lwjAd89yLSeibfZoazx7LVmEU0H4bkxWF3P3-CMhaYmi">
    </div>
    <div>
    <h4 class="font-body-md text-body-md font-bold truncate">React Developer</h4>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Upstox</p>
    </div>
    </div>
    <div class="space-y-md">
    <div class="flex items-center gap-xs text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-sm" data-icon="location_on" />
    <span class="font-label-sm text-label-sm">Bengaluru, KA</span>
    </div>
    <div class="flex items-center justify-between">
    <span class="font-label-md text-label-md font-bold text-primary">₹15L - ₹22L</span>
    <span class="px-sm py-xs bg-surface-container-low rounded-full font-label-sm text-label-sm">Full-time</span>
    </div>
    </div>
    </div>
    </div>
    </section>
    </main>
    <!-- Footer -->
    <footer class="w-full rounded-t-xl bg-surface-container-highest mt-xl">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-xl px-lg py-xl max-w-container-max mx-auto">
    <div class="col-span-2 lg:col-span-1">
    <span class="font-headline-md text-headline-md font-bold text-primary mb-md block">Job Nova</span>
    <p class="font-body-md text-body-md text-on-surface-variant pr-md">The most trusted destination for premium and government job seekers in India.</p>
    </div>
    <div class="space-y-md">
    <h5 class="font-body-md text-body-md font-bold text-on-surface">Company</h5>
    <ul class="space-y-sm">
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">About Us</a></li>
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Careers</a></li>
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Resources</a></li>
    </ul>
    </div>
    <div class="space-y-md">
    <h5 class="font-body-md text-body-md font-bold text-on-surface">Jobs</h5>
    <ul class="space-y-sm">
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Remote Jobs</a></li>
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Tech Jobs</a></li>
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Private Jobs</a></li>
    </ul>
    </div>
    <div class="space-y-md">
    <h5 class="font-body-md text-body-md font-bold text-on-surface">Support</h5>
    <ul class="space-y-sm">
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Help Center</a></li>
    <li><a class="text-on-surface-variant hover:text-primary transition-all hover:underline font-body-md text-body-md" href="#">Contact Us</a></li>
    </ul>
    </div>
    </div>
    <div class="px-lg py-lg border-t border-outline-variant/30 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
    <span class="text-on-surface-variant font-body-md text-body-md">© 2024 Job Nova. All rights reserved.</span>
    <div class="flex gap-lg">
    <a class="text-on-surface-variant hover:text-primary" href="#"><UIcon name="i-lucide-globe" data-icon="language" /></a>
    <a class="text-on-surface-variant hover:text-primary" href="#"><UIcon name="i-lucide-rss-feed" data-icon="rss_feed" /></a>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4 { font-family: 'Hanken Grotesk', sans-serif; }
        
        .job-card-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .premium-badge-gradient {
            background: linear-gradient(135deg, #2b5bb5 0%, #005bbf 100%);
        }
</style>

<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: "My Career Hub | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Micro-interactions and Tab Logic
          document.querySelectorAll('a, button').forEach(el => {
              el.addEventListener('mousedown', () => {
                  el.classList.add('scale-95');
                  setTimeout(() => el.classList.remove('scale-95'), 150);
              });
          });
  
          // Simple Sticky Header Shadow on Scroll
          const mainContent = document.querySelector('main');
          const header = document.querySelector('header');
          mainContent.addEventListener('scroll', () => {
              if (mainContent.scrollTop > 10) {
                  header.classList.add('shadow-sm');
              } else {
                  header.classList.remove('shadow-sm');
              }
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Sidebar (SideNavBar) -->
    <aside class="h-full w-64 fixed left-0 top-0 bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col py-lg px-md z-50">
    <div class="mb-xl flex items-center gap-2">
    <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
    <UIcon name="i-lucide-rocket-launch" class="text-on-primary text-xl" />
    </div>
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    </div>
    <nav class="flex-1 space-y-2">
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="/jobseeker-dashboard">
    <UIcon name="i-lucide-layout-dashboard" />
    <span class="font-label-md text-label-md">Dashboard</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 bg-secondary-fixed text-on-secondary-fixed-variant rounded-lg font-bold" href="/my-career-hub">
    <UIcon name="i-lucide-history" />
    <span class="font-label-md text-label-md">My Career Hub</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="/login">
    <UIcon name="i-lucide-file-text" />
    <span class="font-label-md text-label-md">Applications</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="/selected-jobs-dashboard">
    <UIcon name="i-lucide-bookmark" />
    <span class="font-label-md text-label-md">Saved Jobs</span>
    </a>
    </nav>
    <div class="mt-auto pt-lg border-t border-outline-variant">
    <div class="flex items-center gap-3 mb-6 px-2">
    <img alt="Candidate Profile Avatar" class="w-10 h-10 rounded-full object-cover border-2 border-primary-fixed" data-alt="A professional headshot of a young male professional with a confident smile, wearing a modern navy blazer. The background is a soft-focus office environment with warm natural light filtering through large windows. The image has a premium, high-resolution aesthetic with crisp details and a clean, light-mode friendly color palette of soft whites and blues." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu_CaApkJoGo0numpyboV7T2ED2orr2wqy1oDnwokZ98kc6sEGPcxqTTfGW5Oa0-mCKAVJs8a4MX3kvl4wk3aklC7JF4ICa2AfFZGjt-YfZWwrUroMjdEhE9FjeF8xz-dHkGnOUpxGclD1F-fgKuzyLhr5TiGl5StbSdOFbYZdJh-RyYnpMLkv5tfEX2seLqQW1x6hj8UPxXWz7mzdUce9eEp9GQ1LgsAK5ewKs93sHJ5ZEMtXcR0KlEWumWqpahfOeS0BOiFbvvh9">
    <div>
    <p class="font-label-md text-label-md font-bold">Candidate Name</p>
    <p class="text-xs text-on-surface-variant">Premium Member</p>
    </div>
    </div>
    <a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg mb-1" href="/jobseeker-dashboard">
    <UIcon name="i-lucide-settings" />
    <span class="font-label-md text-label-md">Settings</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="/">
    <UIcon name="i-lucide-help-circle" />
    <span class="font-label-md text-label-md">Help Center</span>
    </a>
    </div>
    </aside>
    <!-- Main Content (Center Column) -->
    <main class="ml-64 mr-80 flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
    <!-- Top App Bar Content (Embedded) -->
    <header class="sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md px-xl h-16 flex items-center justify-between border-b border-outline-variant">
    <div class="flex items-center gap-md">
    <h1 class="font-headline-md text-headline-md text-on-background">My Career Hub</h1>
    </div>
    <div class="flex items-center gap-4">
    <div class="relative">
    <UIcon name="i-lucide-bell" class="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full cursor-pointer" />
    <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
    </div>
    <UIcon name="i-lucide-mail" class="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full cursor-pointer" />
    </div>
    </header>
    <div class="p-xl space-y-xl max-w-5xl mx-auto">
    <!-- Welcome Card -->
    <section class="relative overflow-hidden rounded-2xl bg-primary p-lg text-on-primary shadow-lg">
    <div class="relative z-10 flex justify-between items-center">
    <div>
    <h2 class="font-headline-lg text-headline-lg mb-xs">Welcome Back 👋</h2>
    <p class="font-body-md opacity-90 max-w-md">Your profile is looking great! You've had 12 new views in the last 48 hours. Let's find your next big break.</p>
    </div>
    <div class="hidden md:block">
    <button class="bg-surface-container-lowest text-primary px-lg py-md rounded-xl font-bold hover:scale-95 transition-transform">
                                Optimize Resume
                            </button>
    </div>
    </div>
    <!-- Abstract Decorative Element -->
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-surface-container-lowest/10 rounded-full blur-3xl"></div>
    <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
    </section>
    <!-- Profile & Resume Health Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-lg">
    <!-- Circular Profile Strength -->
    <div class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col items-center text-center">
    <h3 class="font-headline-md text-headline-md mb-md self-start">Profile Strength</h3>
    <div class="relative w-32 h-32 flex items-center justify-center mb-md">
    <svg class="w-full h-full transform -rotate-90">
    <circle class="text-surface-container-high" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" stroke-width="8"></circle>
    <circle class="text-primary transition-all duration-1000" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" stroke-dasharray="351.8" stroke-dashoffset="52.7" stroke-width="8"></circle>
    </svg>
    <span class="absolute font-headline-lg text-headline-lg text-primary">85%</span>
    </div>
    <p class="text-on-surface-variant font-body-md">Complete your portfolio to reach 100% and get 5x more visibility.</p>
    </div>
    <!-- AI Resume Quality Meter -->
    <div class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex justify-between items-center mb-md">
    <h3 class="font-headline-md text-headline-md">AI Resume Quality</h3>
    <span class="text-2xl font-bold text-primary">82/100</span>
    </div>
    <div class="space-y-4">
    <div>
    <div class="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider text-on-surface-variant">
    <span>Education</span>
    <span>95%</span>
    </div>
    <div class="h-2 bg-surface-container-high rounded-full overflow-hidden">
    <div class="h-full bg-primary w-[95%]"></div>
    </div>
    </div>
    <div>
    <div class="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider text-on-surface-variant">
    <span>Skills Matching</span>
    <span>78%</span>
    </div>
    <div class="h-2 bg-surface-container-high rounded-full overflow-hidden">
    <div class="h-full bg-secondary w-[78%]"></div>
    </div>
    </div>
    <div>
    <div class="flex justify-between text-xs font-bold mb-1 uppercase tracking-wider text-on-surface-variant">
    <span>Formatting</span>
    <span>88%</span>
    </div>
    <div class="h-2 bg-surface-container-high rounded-full overflow-hidden">
    <div class="h-full bg-primary-container w-[88%]"></div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- AI Insights -->
    <section class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex items-center gap-2 mb-lg">
    <UIcon name="i-lucide-auto-awesome" class="text-primary" style="font-variation-settings: 'FILL' 1;" />
    <h3 class="font-headline-md text-headline-md">Nova AI Insights</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
    <div class="p-md rounded-xl bg-green-50 border border-green-100">
    <h4 class="font-bold text-green-800 mb-md flex items-center gap-2">
    <UIcon name="i-lucide-check-circle" />
                                Key Strengths
                            </h4>
    <ul class="space-y-2 text-green-700 font-body-md">
    <li class="flex items-start gap-2">• Strong full-stack development background.</li>
    <li class="flex items-start gap-2">• Recent certifications in AI/ML align with market trends.</li>
    <li class="flex items-start gap-2">• Consistent career growth in last 3 roles.</li>
    </ul>
    </div>
    <div class="p-md rounded-xl bg-amber-50 border border-amber-100">
    <h4 class="font-bold text-amber-800 mb-md flex items-center gap-2">
    <UIcon name="i-lucide-alert-triangle" />
                                Needs Improvement
                            </h4>
    <ul class="space-y-2 text-amber-700 font-body-md">
    <li class="flex items-start gap-2">• Quantify your impact in the Lead Developer role.</li>
    <li class="flex items-start gap-2">• Project descriptions are missing GitHub links.</li>
    <li class="flex items-start gap-2">• Skills list is broad; specialize for "Senior" roles.</li>
    </ul>
    </div>
    </div>
    </section>
    <!-- Profile Details -->
    <section class="space-y-lg">
    <div class="flex justify-between items-center">
    <h3 class="font-headline-md text-headline-md">Professional Profile</h3>
    <button class="text-primary font-bold flex items-center gap-1 hover:underline">
                            Edit Profile <UIcon name="i-lucide-pencil" class="text-sm" />
    </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-lg">
    <div class="lg:col-span-2 space-y-lg">
    <!-- Education -->
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant">
    <h4 class="font-bold mb-md">Education</h4>
    <div class="flex gap-md">
    <div class="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center shrink-0">
    <UIcon name="i-lucide-graduation-cap" class="text-primary" />
    </div>
    <div>
    <p class="font-bold">Masters in Computer Applications (MCA)</p>
    <p class="text-on-surface-variant text-sm">Indian Institute of Technology • 2021 - 2023</p>
    <p class="mt-2 text-sm">Specialized in Cloud Computing and Artificial Intelligence. CGPA: 9.2/10</p>
    </div>
    </div>
    </div>
    <!-- Projects -->
    <div class="space-y-md">
    <h4 class="font-bold">Featured Projects</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group">
    <div class="flex justify-between mb-sm">
    <UIcon name="i-lucide-folder" class="text-primary" />
    <a class="text-on-surface-variant hover:text-primary" href="/"><UIcon name="i-lucide-link-2" /></a>
    </div>
    <p class="font-bold group-hover:text-primary transition-colors">AI Content Engine</p>
    <p class="text-xs text-on-surface-variant mt-1">Built with React, Python, and OpenAI API.</p>
    </div>
    <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group">
    <div class="flex justify-between mb-sm">
    <UIcon name="i-lucide-folder" class="text-primary" />
    <a class="text-on-surface-variant hover:text-primary" href="/"><UIcon name="i-lucide-link-2" /></a>
    </div>
    <p class="font-bold group-hover:text-primary transition-colors">Distributed Cloud DB</p>
    <p class="text-xs text-on-surface-variant mt-1">Go-lang based high-performance NoSQL DB.</p>
    </div>
    </div>
    </div>
    </div>
    <!-- Skills & Certs Column -->
    <div class="space-y-lg">
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant">
    <h4 class="font-bold mb-md">Skills</h4>
    <div class="flex flex-wrap gap-2">
    <span class="px-3 py-1 bg-surface-container rounded-full text-sm font-medium">React.js</span>
    <span class="px-3 py-1 bg-surface-container rounded-full text-sm font-medium">Node.js</span>
    <span class="px-3 py-1 bg-surface-container rounded-full text-sm font-medium">Python</span>
    <span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-sm font-bold">AWS Cloud</span>
    <span class="px-3 py-1 bg-surface-container rounded-full text-sm font-medium">TypeScript</span>
    <span class="px-3 py-1 bg-surface-container rounded-full text-sm font-medium">MongoDB</span>
    </div>
    </div>
    <div class="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant">
    <h4 class="font-bold mb-md">Certifications</h4>
    <div class="space-y-md">
    <div class="flex items-center gap-3">
    <UIcon name="i-lucide-badge-check" class="text-tertiary" />
    <div>
    <p class="text-sm font-bold">AWS Solutions Architect</p>
    <p class="text-[10px] text-on-surface-variant uppercase">Issued Dec 2023</p>
    </div>
    </div>
    <div class="flex items-center gap-3">
    <UIcon name="i-lucide-badge-check" class="text-tertiary" />
    <div>
    <p class="text-sm font-bold">Google Data Analytics</p>
    <p class="text-[10px] text-on-surface-variant uppercase">Issued Aug 2023</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    <!-- Recommended Jobs -->
    <section class="space-y-lg">
    <div class="flex justify-between items-center">
    <h3 class="font-headline-md text-headline-md">Recommended For You</h3>
    <button class="text-primary font-bold">View All Jobs</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
    <!-- Job Card 1 -->
    <div class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant hover:border-primary/20 transition-all group">
    <div class="flex justify-between items-start mb-md">
    <div class="flex gap-md">
    <div class="w-12 h-12 bg-surface-container rounded-lg p-2 flex items-center justify-center overflow-hidden border border-outline-variant">
    <img alt="Company Logo" class="w-full h-full object-contain" data-alt="A minimalist tech company logo with a clean blue and white geometric emblem. The image is captured in a high-quality product photography style, presented as a crisp asset on a light gray background, suggesting a modern, forward-thinking software brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkHsnhmxF3dN5KrsEZFRX2bBMVK-r8qFIYCLK7bAJ6by8CRiUC_j-ly-nK2r2QfkPa0NL5dy_Wp7XsMgxrS-DoADrQB2FJHho1rRM7jZaqhYyAS3OwvlyP2evqElnT0bQTE2DtLTYGER_ITUOt3TyoG8RBi5T2E-7SdUhZN_Nsk5VnM842mZsI9sZurM_wvZmVTZjjUEOK8x-o5aAUPtyN6juLlLHNtVEh7hMML_FppGvLHCvcuzaY6G74Gbxg0v4p2Q56u8BYve_L">
    </div>
    <div>
    <h4 class="font-bold text-lg group-hover:text-primary">Senior Frontend Engineer</h4>
    <p class="text-sm text-on-surface-variant">TechNova Systems • Bengaluru</p>
    </div>
    </div>
    <div class="flex flex-col items-end">
    <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1">95% Match</span>
    <span class="text-sm font-bold">₹28L - ₹45L</span>
    </div>
    </div>
    <div class="flex gap-2">
    <span class="status-chip bg-green-100 text-green-800">Full Time</span>
    <span class="status-chip bg-surface-container text-on-surface-variant">Remote</span>
    </div>
    </div>
    <!-- Job Card 2 -->
    <div class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-outline-variant hover:border-primary/20 transition-all group">
    <div class="flex justify-between items-start mb-md">
    <div class="flex gap-md">
    <div class="w-12 h-12 bg-surface-container rounded-lg p-2 flex items-center justify-center overflow-hidden border border-outline-variant">
    <img alt="Company Logo" class="w-full h-full object-contain" data-alt="A professional corporate logo featuring a sleek, minimalist infinity symbol in gradient shades of deep blue. The background is a sterile, bright white studio setting, creating a high-contrast and premium look that fits a leading global financial technology firm." src="https://lh3.googleusercontent.com/aida-public/AB6AXuByoQn83KHVRDF5E3rGhHFDO3zij5b1oj6ilBmUTsWw4SiuTO-nhQWWgqaIIO5-If2V2oUffIMchKEWPfPXco5SNtNwIUKupbXDqCg7eEcMHPv7GCArqN6YVroaejA8Qusgs2uD_lLhy2BmXcv87NIAZd7G-tKnQuG6Kl5cf5lLFBGk0Z6rqfTvynTjMAKv_7LtNGDEcflShiMHbpEkxt0lz3UpC4K340TruDCU3lMy_0ToTJWSnYqWMnFcN49IbtGQIXSPSsJffufA">
    </div>
    <div>
    <h4 class="font-bold text-lg group-hover:text-primary">Full Stack Developer</h4>
    <p class="text-sm text-on-surface-variant">FinEdge Global • Hyderabad</p>
    </div>
    </div>
    <div class="flex flex-col items-end">
    <span class="bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1">89% Match</span>
    <span class="text-sm font-bold">₹22L - ₹35L</span>
    </div>
    </div>
    <div class="flex gap-2">
    <span class="status-chip bg-green-100 text-green-800">Full Time</span>
    <span class="status-chip bg-surface-container text-on-surface-variant">On-site</span>
    </div>
    </div>
    </div>
    </section>
    <!-- Tracking Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-lg pb-xl">
    <!-- Recent Applications -->
    <section class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <h3 class="font-headline-md text-headline-md mb-lg">Recent Applications</h3>
    <div class="space-y-4">
    <div class="flex items-center justify-between p-md border border-outline-variant rounded-xl hover:bg-surface transition-colors cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-secondary-fixed rounded-lg flex items-center justify-center">
    <UIcon name="i-lucide-code" class="text-on-secondary-fixed-variant" />
    </div>
    <div>
    <p class="font-bold">Software Engineer</p>
    <p class="text-xs text-on-surface-variant">Applied 2 days ago</p>
    </div>
    </div>
    <span class="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-bold uppercase">Interviewing</span>
    </div>
    <div class="flex items-center justify-between p-md border border-outline-variant rounded-xl hover:bg-surface transition-colors cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-surface-container rounded-lg flex items-center justify-center">
    <UIcon name="i-lucide-cloud-done" class="text-primary" />
    </div>
    <div>
    <p class="font-bold">Cloud Architect</p>
    <p class="text-xs text-on-surface-variant">Applied 1 week ago</p>
    </div>
    </div>
    <span class="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-bold uppercase">Pending</span>
    </div>
    </div>
    </section>
    <!-- Saved Jobs -->
    <section class="bg-surface-container-lowest p-lg rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <h3 class="font-headline-md text-headline-md mb-lg">Saved Jobs</h3>
    <div class="space-y-4">
    <div class="flex items-center justify-between p-md border border-outline-variant rounded-xl group cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-tertiary-fixed rounded-lg flex items-center justify-center">
    <UIcon name="i-lucide-star" class="text-on-tertiary-fixed-variant" />
    </div>
    <div>
    <p class="font-bold group-hover:text-primary">AI Ethics Lead</p>
    <p class="text-xs text-on-surface-variant">Saved Oct 24, 2023</p>
    </div>
    </div>
    <button class="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary/90 transition-colors">
    <UIcon name="i-lucide-send" class="text-sm" />
    </button>
    </div>
    <div class="flex items-center justify-between p-md border border-outline-variant rounded-xl group cursor-pointer">
    <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-tertiary-fixed rounded-lg flex items-center justify-center">
    <UIcon name="i-lucide-star" class="text-on-tertiary-fixed-variant" />
    </div>
    <div>
    <p class="font-bold group-hover:text-primary">DevOps Manager</p>
    <p class="text-xs text-on-surface-variant">Saved Oct 20, 2023</p>
    </div>
    </div>
    <button class="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary/90 transition-colors">
    <UIcon name="i-lucide-send" class="text-sm" />
    </button>
    </div>
    </div>
    </section>
    </div>
    </div>
    </main>
    <!-- Right Sidebar (NavigationDrawer / Nova AI) -->
    <aside class="h-full w-80 fixed right-0 top-0 bg-surface-container-low shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col border-l border-outline-variant">
    <div class="p-lg border-b border-outline-variant">
    <div class="flex items-center gap-3 mb-2">
    <div class="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center shadow-md">
    <UIcon name="i-lucide-auto-awesome" class="text-on-primary" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <div>
    <h3 class="font-headline-md text-headline-md leading-tight">Nova AI</h3>
    <p class="text-xs text-on-surface-variant">Your Career Assistant</p>
    </div>
    </div>
    <button class="w-full mt-4 flex items-center justify-center gap-2 py-md bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-colors">
    <UIcon name="i-lucide-add-comment" />
                    New Chat
                </button>
    </div>
    <div class="flex-1 p-lg flex flex-col gap-6 overflow-y-auto custom-scrollbar">
    <!-- AI Chat Bubble Placeholder -->
    <div class="space-y-4">
    <div class="bg-primary-fixed p-md rounded-2xl rounded-tr-none text-on-primary-fixed">
    <p class="text-sm">Hello Candidate! How can I help you accelerate your career today?</p>
    </div>
    <div class="space-y-3">
    <p class="text-[10px] uppercase font-bold text-on-surface-variant px-2">Suggestions</p>
    <button class="w-full text-left p-md bg-surface-container-lowest border border-outline-variant rounded-xl text-sm hover:border-primary transition-all flex items-center justify-between group">
                            How can I improve my resume?
                            <UIcon name="i-lucide-arrow-right" class="text-sm text-outline group-hover:text-primary" />
    </button>
    <button class="w-full text-left p-md bg-surface-container-lowest border border-outline-variant rounded-xl text-sm hover:border-primary transition-all flex items-center justify-between group">
                            Suggest jobs for MCA students.
                            <UIcon name="i-lucide-arrow-right" class="text-sm text-outline group-hover:text-primary" />
    </button>
    <button class="w-full text-left p-md bg-surface-container-lowest border border-outline-variant rounded-xl text-sm hover:border-primary transition-all flex items-center justify-between group">
                            Tell me about salary trends.
                            <UIcon name="i-lucide-arrow-right" class="text-sm text-outline group-hover:text-primary" />
    </button>
    </div>
    </div>
    <!-- Recent AI Insight Links -->
    <div class="mt-auto space-y-4">
    <p class="text-[10px] uppercase font-bold text-on-surface-variant px-2">Resources</p>
    <nav class="space-y-1">
    <a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg text-sm" href="/my-career-hub">
    <UIcon name="i-lucide-auto-awesome" class="text-primary" /> Resume Tips
                        </a>
    <a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg text-sm" href="/my-career-hub">
    <UIcon name="i-lucide-groups" class="text-primary" /> Interview Prep
                        </a>
    <a class="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg text-sm" href="/my-career-hub">
    <UIcon name="i-lucide-trending-up" class="text-primary" /> Market Insights
                        </a>
    </nav>
    </div>
    </div>
    <div class="p-lg bg-surface-container-lowest border-t border-outline-variant">
    <div class="relative">
    <input class="w-full bg-surface-container-low border-none rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-primary text-sm" placeholder="Ask Nova anything..." type="text">
    <button class="absolute right-2 top-1.5 p-2 text-primary">
    <UIcon name="i-lucide-send" />
    </button>
    </div>
    </div>
    </aside>
    
  </div>
</template>

<style scoped>
body {
            font-family: 'Inter', sans-serif;
            background-color: var(--color-surface);
            color: var(--color-on-surface);
        }
        .font-hanken { font-family: 'Hanken Grotesk', sans-serif; }
        .glass-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.2);
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
        .status-chip {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 700;
        }
</style>

<script setup>
useHead({
  title: "Job Nova - My Profile"
})
</script>

<template>
  <div>
    <!-- SideNavBar (Shared Component) -->
    <nav class="bg-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)] h-screen w-72 fixed left-0 top-0 flex flex-col py-md px-md z-50 hidden md:flex">
    <div class="mb-xl flex items-center gap-md px-md">
    <div class="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-headline-md font-headline-md">
                    JN
                </div>
    <div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
    <p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Premium Candidate</p>
    </div>
    </div>
    <ul class="flex-1 space-y-2">
    <li class="">
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200" href="#">
    <UIcon name="i-lucide-layout-dashboard" />
    <span class="font-label-md text-label-md">Dashboard</span>
    </a>
    </li>
    <li class="">
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low" href="#">
    <UIcon name="i-lucide-user" class="fill-icon" />
    <span class="font-label-md text-label-md">My Profile</span>
    </a>
    </li>
    <li class="">
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200" href="#">
    <UIcon name="i-lucide-history" />
    <span class="font-label-md text-label-md">Applied Jobs</span>
    </a>
    </li>
    <li class="">
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200" href="#">
    <UIcon name="i-lucide-check-circle" />
    <span class="font-label-md text-label-md">Selected Jobs</span>
    </a>
    </li>
    </ul>
    <div class="mt-auto pt-xl border-t border-outline-variant">
    <a class="flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors duration-200" href="#">
    <UIcon name="i-lucide-log-out" />
    <span class="font-label-md text-label-md">Logout</span>
    </a>
    </div>
    </nav>
    <!-- Main Content Wrapper -->
    <div class="flex-1 ml-0 md:ml-72 flex flex-col min-h-screen">
    <!-- TopAppBar (Shared Component) -->
    <header class="bg-surface/80 backdrop-blur-md fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 flex justify-between items-center h-16 px-gutter ml-auto border-b border-outline-variant md:border-none">
    <h2 class="font-headline-md text-headline-md font-bold text-primary">My Profile</h2>
    <div class="flex items-center gap-md">
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
    <UIcon name="i-lucide-bell" />
    </button>
    <button class="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
    <UIcon name="i-lucide-settings" />
    </button>
    <div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden ml-sm border border-outline-variant">
    <img alt="Candidate profile thumbnail" class="w-full h-full object-cover" data-alt="A professional headshot of a young Indian man with neat hair and a warm, confident smile, wearing a modern business casual navy blue button-down shirt. The lighting is soft, natural, and flattering, typical of a high-quality corporate profile photo. The background is a slightly blurred, bright, modern office space with white walls and subtle hints of indoor greenery, contributing to a premium, aspirational professional aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM1qlpkExIhsyO5NMJq2iLnbFmxfuUoUoy7FRUeIEcT3pibEjPdwjn9DZuciDx382CMs9RWe_XHR3q-oOwm_o0dK6V64ele_K1XMo9wblR33Lb9mWWYHecR2RhMDvelTYQiq5O4BHURHCLqhKrbwwp_hi3tpInZxJI3Diq3M8A3eWcqTLJrFAuDZIwSPWwC34TUtTp4M6snt9LbuQYIHXTCsyB17A2uG3rNUsibx0bf6n5ikzth23XV0si1Y77AehHuueCBFLwb1Ap">
    </div>
    </div>
    </header>
    <!-- Scrollable Canvas -->
    <main class="flex-1 pt-24 pb-xl px-gutter md:px-xl max-w-container-max mx-auto w-full">
    <div class="mb-xl">
    <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage your personal, educational and professional information.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl">
    <!-- Left Column (Profile Header & Save) -->
    <div class="lg:col-span-1 space-y-xl">
    <!-- Profile Header Card -->
    <div class="bg-surface-container-lowest rounded-xl p-xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col items-center text-center">
    <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container mb-md relative group">
    <img alt="Asif Shohood" class="w-full h-full object-cover" data-alt="A professional headshot of a young Indian man with neat hair and a warm, confident smile, wearing a modern business casual navy blue button-down shirt. The lighting is soft, natural, and flattering, typical of a high-quality corporate profile photo. The background is a slightly blurred, bright, modern office space with white walls and subtle hints of indoor greenery, contributing to a premium, aspirational professional aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBarlDTfPpvfrtBZt0HTBUB5CJidCRfSG5Ux_SRQir_9E0ubxsVQ82T940vH7VcK81yEOUvIFx2_9eZuCzNUBQ56oJPN7ww9RnsnnHjpK-MWq_v5DvG8lCqIl9-ZhOBeunUpKWy5WXx6v5oazyE0Nu3cBUzQQQ7mCA3Jps7fPrLyGuZK55B3_TckM91te9pZIFQlfLMS-9hdZhwBdtDgwJboMHIKq40cqLqS6ql3AToZba6vJ9ITM9yZY8FxKZX7i_UqkgV9iwiZ_O6">
    <div class="absolute inset-0 bg-on-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
    <UIcon name="i-lucide-camera" class="text-surface" />
    </div>
    </div>
    <h3 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mb-xs">Asif Shohood</h3>
    <div class="flex flex-col gap-2 text-on-surface-variant font-label-md text-label-md mb-lg">
    <span class="flex items-center justify-center gap-xs"><UIcon name="i-lucide-mail" class="text-[18px]" /> asif.shohood@example.com</span>
    <span class="flex items-center justify-center gap-xs"><UIcon name="i-lucide-phone" class="text-[18px]" /> +91 98765 43210</span>
    <span class="flex items-center justify-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-[18px]" /> Bangalore, India</span>
    </div>
    <div class="flex w-full gap-md">
    <button class="flex-1 py-2 px-4 rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors">Upload Photo</button>
    <button class="flex-1 py-2 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md hover:scale-[0.98] transition-transform shadow-sm">Edit Profile</button>
    </div>
    </div>
    <!-- Resume Section -->
    <div class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <h4 class="font-headline-md text-headline-md font-semibold text-on-surface mb-md flex items-center gap-sm">
    <UIcon name="i-lucide-file-text" class="text-primary" />
                                Resume
                            </h4>
    <div class="bg-surface-container-low rounded-lg p-md mb-md border border-outline-variant flex items-center gap-md">
    <div class="bg-primary/10 p-2 rounded text-primary">
    <UIcon name="i-lucide-picture-as-pdf" />
    </div>
    <div class="flex-1 min-w-0">
    <p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Status: Uploaded</p>
    <p class="font-label-md text-label-md text-on-surface truncate font-semibold">Asif_Shohood_Resume.pdf</p>
    </div>
    </div>
    <div class="flex flex-col gap-sm">
    <button class="w-full py-2 px-4 rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-sm">
    <UIcon name="i-lucide-upload" class="text-[18px]" /> Upload New
                                </button>
    <div class="flex gap-sm">
    <button class="flex-1 py-2 px-4 rounded-lg border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors text-center">Replace</button>
    <button class="flex-1 py-2 px-4 rounded-lg border border-outline-variant text-primary font-label-md text-label-md hover:bg-primary/5 transition-colors text-center">Download</button>
    </div>
    </div>
    </div>
    </div>
    <!-- Right Column (Forms & Details) -->
    <div class="lg:col-span-2 space-y-xl">
    <!-- Personal Information -->
    <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <h4 class="font-headline-md text-headline-md font-semibold text-on-surface mb-lg pb-sm border-b border-surface-container-high">Personal Information</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-md">
    <div class="flex flex-col gap-1">
    <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Full Name</label>
    <input class="w-full rounded-lg bg-surface-container-low border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors" type="text" value="Asif Shohood">
    </div>
    <div class="flex flex-col gap-1">
    <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Email Address</label>
    <input class="w-full rounded-lg bg-surface-container-low border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors" type="email" value="asif.shohood@example.com">
    </div>
    <div class="flex flex-col gap-1">
    <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Phone Number</label>
    <input class="w-full rounded-lg bg-surface-container-low border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors" type="tel" value="+91 98765 43210">
    </div>
    <div class="flex flex-col gap-1">
    <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Date of Birth</label>
    <input class="w-full rounded-lg bg-surface-container-low border-transparent focus:border-primary focus:bg-surface focus:ring-0 px-4 py-3 font-body-md text-body-md text-on-surface transition-colors text-on-surface-variant" type="date" value="1995-08-15">
    </div>
    <div class="flex flex-col gap-1 md:col-span-2">
    <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">Gender</label>
    <div class="flex gap-md mt-sm">
    <label class="flex items-center gap-2 cursor-pointer">
    <input checked="" class="text-primary focus:ring-primary border-outline-variant" name="gender" type="radio" value="male">
    <span class="font-body-md text-body-md text-on-surface">Male</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
    <input class="text-primary focus:ring-primary border-outline-variant" name="gender" type="radio" value="female">
    <span class="font-body-md text-body-md text-on-surface">Female</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
    <input class="text-primary focus:ring-primary border-outline-variant" name="gender" type="radio" value="other">
    <span class="font-body-md text-body-md text-on-surface">Other</span>
    </label>
    </div>
    </div>
    </div>
    </section>
    <!-- Education -->
    <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex justify-between items-center mb-lg pb-sm border-b border-surface-container-high">
    <h4 class="font-headline-md text-headline-md font-semibold text-on-surface">Education</h4>
    <button class="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs">
    <UIcon name="i-lucide-plus" class="text-[18px]" /> Add Education
                                </button>
    </div>
    <div class="space-y-md">
    <!-- PG -->
    <div class="bg-surface rounded-lg p-md border border-outline-variant flex items-start gap-md">
    <div class="bg-secondary/10 p-3 rounded-lg text-secondary mt-1">
    <UIcon name="i-lucide-graduation-cap" />
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-start">
    <div>
    <p class="font-label-sm text-label-sm text-secondary uppercase mb-1">Postgraduate</p>
    <h5 class="font-headline-sm text-headline-sm font-bold text-on-surface">Master of Computer Applications</h5>
    <p class="font-body-md text-body-md text-on-surface-variant">National Institute of Technology</p>
    </div>
    <div class="flex items-center gap-2">
    <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">2020</span>
    <button class="text-on-surface-variant hover:text-primary"><UIcon name="i-lucide-pencil" class="text-[20px]" /></button>
    </div>
    </div>
    </div>
    </div>
    <!-- UG -->
    <div class="bg-surface rounded-lg p-md border border-outline-variant flex items-start gap-md">
    <div class="bg-secondary/10 p-3 rounded-lg text-secondary mt-1">
    <UIcon name="i-lucide-graduation-cap" />
    </div>
    <div class="flex-1">
    <div class="flex justify-between items-start">
    <div>
    <p class="font-label-sm text-label-sm text-secondary uppercase mb-1">Undergraduate</p>
    <h5 class="font-headline-sm text-headline-sm font-bold text-on-surface">B.Sc. Computer Science</h5>
    <p class="font-body-md text-body-md text-on-surface-variant">Bangalore University</p>
    </div>
    <div class="flex items-center gap-2">
    <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">2018</span>
    <button class="text-on-surface-variant hover:text-primary"><UIcon name="i-lucide-pencil" class="text-[20px]" /></button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    <!-- Work Experience -->
    <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex justify-between items-center mb-lg pb-sm border-b border-surface-container-high">
    <h4 class="font-headline-md text-headline-md font-semibold text-on-surface">Work Experience</h4>
    <button class="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs">
    <UIcon name="i-lucide-plus" class="text-[18px]" /> Add Experience
                                </button>
    </div>
    <div class="space-y-md">
    <div class="relative pl-6 border-l-2 border-surface-container-high pb-xl last:pb-0">
    <div class="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-surface-container-lowest"></div>
    <div class="flex justify-between items-start mb-sm">
    <div>
    <h5 class="font-headline-sm text-headline-sm font-bold text-on-surface">Senior Frontend Developer</h5>
    <p class="font-body-md text-body-md text-primary font-medium">TechNova Solutions</p>
    </div>
    <div class="flex flex-col items-end gap-1">
    <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">2021 - Present</span>
    <button class="text-on-surface-variant hover:text-primary"><UIcon name="i-lucide-pencil" class="text-[20px]" /></button>
    </div>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant">Leading the frontend architecture for an enterprise SaaS product. Implementing responsive UI components using React and Tailwind CSS. Mentoring junior developers.</p>
    </div>
    <div class="relative pl-6 border-l-2 border-surface-container-high pb-xl last:pb-0 border-transparent">
    <div class="absolute w-3 h-3 bg-surface-container-high rounded-full -left-[7px] top-1.5 ring-4 ring-surface-container-lowest"></div>
    <div class="flex justify-between items-start mb-sm">
    <div>
    <h5 class="font-headline-sm text-headline-sm font-bold text-on-surface">UI Developer</h5>
    <p class="font-body-md text-body-md text-on-surface-variant font-medium">Creative Web Agency</p>
    </div>
    <div class="flex flex-col items-end gap-1">
    <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">2019 - 2021</span>
    </div>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant">Developed accessible and performant web interfaces for various client projects. Collaborated closely with design teams to ensure pixel-perfect implementation.</p>
    </div>
    </div>
    </section>
    <!-- Skills -->
    <section class="bg-surface-container-lowest rounded-xl p-lg shadow-[0px_4px_20px_rgba(26,115,232,0.08)]">
    <div class="flex justify-between items-center mb-lg pb-sm border-b border-surface-container-high">
    <h4 class="font-headline-md text-headline-md font-semibold text-on-surface">Skills</h4>
    <button class="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs">
    <UIcon name="i-lucide-plus" class="text-[18px]" /> Add Skills
                                </button>
    </div>
    <div class="flex flex-wrap gap-sm">
    <span class="bg-surface-container-low border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-xs">
                                    React <button class="hover:text-error ml-1 focus:outline-none"><UIcon name="i-lucide-x" class="text-[16px]" /></button>
    </span>
    <span class="bg-surface-container-low border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-xs">
                                    Tailwind CSS <button class="hover:text-error ml-1 focus:outline-none"><UIcon name="i-lucide-x" class="text-[16px]" /></button>
    </span>
    <span class="bg-surface-container-low border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-xs">
                                    UI Design <button class="hover:text-error ml-1 focus:outline-none"><UIcon name="i-lucide-x" class="text-[16px]" /></button>
    </span>
    <span class="bg-surface-container-low border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-xs">
                                    JavaScript <button class="hover:text-error ml-1 focus:outline-none"><UIcon name="i-lucide-x" class="text-[16px]" /></button>
    </span>
    <span class="bg-surface-container-low border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-xs">
                                    TypeScript <button class="hover:text-error ml-1 focus:outline-none"><UIcon name="i-lucide-x" class="text-[16px]" /></button>
    </span>
    </div>
    </section>
    <!-- Save Action -->
    <div class="flex justify-end pt-md">
    <button class="bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-semibold py-3 px-8 rounded-lg hover:scale-[0.98] transition-transform shadow-md flex items-center gap-sm">
    <UIcon name="i-lucide-save" /> Save All Changes
                            </button>
    </div>
    </div>
    </div>
    </main>
    </div>
  </div>
</template>

<style scoped>

        .material-symbols-outlined.fill-icon {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
</style>

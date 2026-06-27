<script setup>
useHead({
  title: "Job Nova - Applied Jobs"
})
</script>

<template>
  <div>
    <!-- SideNavBar (Shared Component) -->
    <nav class="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-surface dark:bg-inverse-surface shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex-col h-full py-lg px-md z-50">
    <!-- Header -->
    <div class="mb-xl flex items-center gap-sm px-sm">
    <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md shadow-sm">
                    JN
                </div>
    <div>
    <h1 class="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary leading-tight">Job Nova</h1>
    <p class="font-label-sm text-label-sm text-on-surface-variant">Premium Career Hub</p>
    </div>
    </div>
    <!-- Main Navigation -->
    <div class="flex-1 space-y-sm">
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-on-surface-variant/10 transition-colors font-label-md text-label-md group" href="#">
    <UIcon name="i-lucide-layout-dashboard" class="text-[20px] group-hover:text-primary transition-colors" />
                    Dashboard
                </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-on-surface-variant/10 transition-colors font-label-md text-label-md group" href="#">
    <UIcon name="i-lucide-user" class="text-[20px] group-hover:text-primary transition-colors" />
                    My Profile
                </a>
    <!-- ACTIVE TAB -->
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-primary dark:text-primary-fixed-dim font-bold border-r-4 border-primary dark:border-primary-fixed-dim bg-primary-fixed/20 scale-98 transition-transform duration-200 font-label-md text-label-md" href="#">
    <UIcon name="i-lucide-history" class="text-[20px]" style="font-variation-settings: 'FILL' 1;" />
                    Applied Jobs
                </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-on-surface-variant/10 transition-colors font-label-md text-label-md group" href="#">
    <UIcon name="i-lucide-check-circle" class="text-[20px] group-hover:text-primary transition-colors" />
                    Selected Jobs
                </a>
    </div>
    <!-- Footer Navigation -->
    <div class="mt-auto space-y-sm pt-md border-t border-surface-variant/50">
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-on-surface-variant/10 transition-colors font-label-md text-label-md group" href="#">
    <UIcon name="i-lucide-settings" class="text-[20px] group-hover:text-primary transition-colors" />
                    Settings
                </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-on-surface-variant/10 transition-colors font-label-md text-label-md group" href="#">
    <UIcon name="i-lucide-help-circle" class="text-[20px] group-hover:text-primary transition-colors" />
                    Help
                </a>
    <a class="flex items-center gap-md px-md py-sm rounded-lg text-error hover:bg-error-container/50 transition-colors font-label-md text-label-md group mt-sm" href="#">
    <UIcon name="i-lucide-log-out" class="text-[20px]" />
                    Logout
                </a>
    </div>
    </nav>
    <!-- TopAppBar (Shared Component) -->
    <header class="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 z-40 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md shadow-sm flex justify-between items-center px-lg w-full transition-all">
    <!-- Mobile Menu Trigger -->
    <button class="md:hidden p-sm text-on-surface hover:bg-surface-container rounded-full transition-colors">
    <UIcon name="i-lucide-menu" />
    </button>
    <!-- Search Bar (Top App Bar Context) -->
    <div class="hidden md:flex flex-1 max-w-md mx-md relative group">
    <UIcon name="i-lucide-search" class="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
    <input class="w-full h-10 pl-xl pr-sm rounded-full bg-surface-container-low border border-transparent focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/70 outline-none" placeholder="Quick search..." type="text"/>
    </div>
    <!-- Trailing Actions -->
    <div class="flex items-center gap-sm ml-auto">
    <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors relative">
    <UIcon name="i-lucide-bell" />
    <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-error border-2 border-surface"></span>
    </button>
    <button class="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors">
    <UIcon name="i-lucide-mail" />
    </button>
    <div class="w-px h-8 bg-surface-variant/50 mx-xs hidden md:block"></div>
    <!-- Profile -->
    <button class="flex items-center gap-sm p-xs pr-sm rounded-full hover:bg-surface-container-high transition-colors ml-xs">
    <div class="w-8 h-8 rounded-full overflow-hidden bg-primary-fixed border border-primary-fixed-dim">
    <img alt="User profile" class="w-full h-full object-cover" data-alt="A professional headshot of an Indian man in his late 20s, wearing a crisp light blue button-down shirt. The background is a soft, blurred modern office environment with bright, natural daylight. The mood is approachable, confident, and professional, aligning with a high-end career platform aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7FiTWxkHQoxdksgIQvTneZkCuYZX1vY6qEGlJQ1GYc_cKkd11JKfi0sJORTi_fuwGJmwV2yXMdL2OOcPpC5L8l7Bj48TG0vHM1rgwFhndHkfzMZwDHRfEhz-f9i3ZKQwl294OgUfQoWM6YBzmYUTVWIVY_RcrTukFWnWPxjsHcqY2eA2DdWusJ-ShDFg_ppLAvYIAxglhP9H3FZ1n_4Xp4eh6R17liYVSj_10ZxfO-IOClT5UphmRplO8lRE5rWI7mb2o2DfugVlG"/>
    </div>
    <span class="hidden lg:block font-label-md text-label-md text-on-surface font-medium">Asif Shohood</span>
    <UIcon name="i-lucide-chevron-down" class="text-[18px] text-on-surface-variant hidden lg:block" />
    </button>
    </div>
    </header>
    <!-- Main Content Area -->
    <main class="pt-24 pb-xl px-md md:px-lg md:ml-64 max-w-container-max mx-auto min-h-screen">
    <!-- Page Header -->
    <div class="mb-xl">
    <h2 class="font-headline-lg text-headline-lg text-on-background mb-xs">Applied Jobs</h2>
    <p class="font-body-md text-body-md text-on-surface-variant">Track all jobs you have applied for.</p>
    </div>
    <!-- Application Summary Cards (Bento-style row) -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
    <!-- Total -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow">
    <div class="flex items-center justify-between mb-sm">
    <span class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
    <UIcon name="i-lucide-briefcase" class="text-[18px]" />
    </span>
    </div>
    <div>
    <p class="font-display-lg text-display-lg text-on-background">24</p>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Total Applications</p>
    </div>
    </div>
    <!-- Under Review -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
    <div class="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-container/10 rounded-full blur-xl"></div>
    <div class="flex items-center justify-between mb-sm relative">
    <span class="w-8 h-8 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary">
    <UIcon name="i-lucide-hourglass-empty" class="text-[18px]" />
    </span>
    </div>
    <div class="relative">
    <p class="font-display-lg text-display-lg text-on-background">08</p>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Under Review</p>
    </div>
    </div>
    <!-- Shortlisted -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
    <div class="absolute -right-4 -top-4 w-24 h-24 bg-secondary-fixed-dim/20 rounded-full blur-xl"></div>
    <div class="flex items-center justify-between mb-sm relative">
    <span class="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
    <UIcon name="i-lucide-badge-check" class="text-[18px]" />
    </span>
    </div>
    <div class="relative">
    <p class="font-display-lg text-display-lg text-on-background">03</p>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Shortlisted</p>
    </div>
    </div>
    <!-- Rejected -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-sm flex flex-col justify-between hover:shadow-[0px_4px_20px_rgba(26,115,232,0.08)] transition-shadow relative overflow-hidden">
    <div class="flex items-center justify-between mb-sm relative">
    <span class="w-8 h-8 rounded-lg bg-error-container/50 flex items-center justify-center text-on-error-container">
    <UIcon name="i-lucide-cancel" class="text-[18px]" />
    </span>
    </div>
    <div class="relative">
    <p class="font-display-lg text-display-lg text-on-background">13</p>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Rejected</p>
    </div>
    </div>
    </div>
    <!-- Filters Section -->
    <div class="flex flex-col md:flex-row gap-md mb-lg bg-surface-container-lowest p-sm rounded-xl shadow-sm border border-outline-variant/20">
    <!-- Search -->
    <div class="flex-1 relative group">
    <UIcon name="i-lucide-search" class="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" />
    <input class="w-full h-11 pl-xl pr-sm rounded-lg bg-surface focus:bg-surface-container-lowest border border-transparent focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/70 outline-none" placeholder="Search applied jobs by title or company..." type="text"/>
    </div>
    <div class="flex gap-sm">
    <!-- Status Filter -->
    <div class="relative">
    <select class="appearance-none h-11 pl-md pr-xl py-sm rounded-lg bg-surface border border-outline-variant/50 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/10 text-body-md font-body-md text-on-surface cursor-pointer outline-none transition-all">
    <option value="">All Statuses</option>
    <option value="applied">Applied</option>
    <option value="review">Under Review</option>
    <option value="shortlisted">Shortlisted</option>
    <option value="rejected">Rejected</option>
    </select>
    <UIcon name="i-lucide-chevron-down" class="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
    </div>
    <!-- Date Filter -->
    <div class="relative">
    <select class="appearance-none h-11 pl-md pr-xl py-sm rounded-lg bg-surface border border-outline-variant/50 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/10 text-body-md font-body-md text-on-surface cursor-pointer outline-none transition-all">
    <option value="">Any Date</option>
    <option value="7">Past 7 Days</option>
    <option value="30">Past 30 Days</option>
    <option value="90">Past 3 Months</option>
    </select>
    <UIcon name="i-lucide-calendar" class="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
    </div>
    </div>
    </div>
    <!-- Applied Jobs List -->
    <div class="space-y-sm">
    <!-- Job Card 1 -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.04)] hover:shadow-[0px_4px_20px_rgba(26,115,232,0.12)] transition-all flex flex-col md:flex-row items-start md:items-center gap-md group relative overflow-hidden">
    <!-- Status Bar Indicator -->
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
    <!-- Logo -->
    <div class="w-12 h-12 rounded-lg border border-surface-variant bg-surface flex items-center justify-center shrink-0 p-xs ml-sm">
    <img alt="Company Logo" class="w-full h-full object-contain" data-alt="A modern, minimalist corporate logo for a technology company named NovaStream. The logo features a sleek, abstract geometric wave icon in vibrant cyan and deep blue gradients, set against a pristine white background. The aesthetic is clean, professional, and typical of a modern SaaS brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0PlJVB5TUFblDLoTctfzsCbDN2C6LTiWVbNBvRvbOGxWPTaygtM1brsvhlUN-CtL2-_uVO4wdHxZrntfd3toWGz_iwnlvoBC7B9HmzxVXwoBQdiFjZ7HZMY1HsCu-6Ursf8E8sr0afR2Bz4lvnyzEVL1gUo2tIjan-NoodF8C3FD3r0F3oU2cn4VHD4suRX0SxiHu3hYS2X1GmiZj-1469NYGIpjpdtTizbt4B0gRQu_flH9ExIVzloZ7_rG0HveaJiAxSLuW-4IY"/>
    </div>
    <!-- Job Info -->
    <div class="flex-1">
    <div class="flex flex-wrap items-center gap-xs mb-xs">
    <h3 class="font-headline-md text-headline-md text-on-background text-[18px] group-hover:text-primary transition-colors cursor-pointer">Senior UI Designer</h3>
    <!-- Badge: Applied -->
    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container/20 text-on-secondary-container font-label-sm text-label-sm ml-sm">
    <span class="w-1.5 h-1.5 rounded-full bg-secondary-container mr-1.5"></span>
                                Applied
                            </span>
    </div>
    <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-[14px]">
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-building-2" class="text-[16px]" /> NovaStream Tech</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Bangalore, India</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-calendar-month" class="text-[16px]" /> Applied 12 Oct 2023</span>
    </div>
    </div>
    <!-- Actions -->
    <div class="flex flex-row md:flex-col gap-sm w-full md:w-auto mt-sm md:mt-0">
    <button class="flex-1 md:flex-none px-md py-2 rounded-lg border border-outline-variant/50 text-primary font-label-md text-label-md hover:bg-surface-container-low hover:border-primary/50 transition-colors text-center">
                            View Job
                        </button>
    <button class="flex-1 md:flex-none px-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:scale-98 hover:bg-primary/90 transition-all text-center shadow-sm">
                            View Application
                        </button>
    </div>
    </div>
    <!-- Job Card 2 -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.04)] hover:shadow-[0px_4px_20px_rgba(26,115,232,0.12)] transition-all flex flex-col md:flex-row items-start md:items-center gap-md group relative overflow-hidden">
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container"></div>
    <div class="w-12 h-12 rounded-lg border border-surface-variant bg-surface flex items-center justify-center shrink-0 p-xs ml-sm">
    <img alt="Company Logo" class="w-full h-full object-contain" data-alt="A clean, typographic logo for a financial services firm. The logo uses a bold, serif font in dark navy blue on a white background, projecting trust, stability, and premium corporate identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDqR2zXsfe2tgfBTC9fY055h1_fJKb85PVUhOtHkmM7HBpjc205uN96C3v1PH7J6jL1eix0X9PMAnhQowjj6yLP7KvP9ACi-ijApsQsClzYG7n-8sSQ2O_Ndnv5GONN-WxmZJhnKL_e6OHfqzq4Gga-Os4-wNWDwjE9VpRBmSGdgvqN6rJ9xP-NPfBrMvs4TzciQpWMjdRGuuP2T8DV_OyCfGo7J15qYf1UudWRNJcHbbH93mdCmlDXSvursfarLA7PCDYJVzlL_3"/>
    </div>
    <div class="flex-1">
    <div class="flex flex-wrap items-center gap-xs mb-xs">
    <h3 class="font-headline-md text-headline-md text-on-background text-[18px] group-hover:text-primary transition-colors cursor-pointer">Product Designer</h3>
    <!-- Badge: Under Review -->
    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm ml-sm">
    <span class="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5"></span>
                                Under Review
                            </span>
    </div>
    <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-[14px]">
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-building-2" class="text-[16px]" /> FinEdge Solutions</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Mumbai, India (Remote)</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-calendar-month" class="text-[16px]" /> Applied 05 Oct 2023</span>
    </div>
    </div>
    <div class="flex flex-row md:flex-col gap-sm w-full md:w-auto mt-sm md:mt-0">
    <button class="flex-1 md:flex-none px-md py-2 rounded-lg border border-outline-variant/50 text-primary font-label-md text-label-md hover:bg-surface-container-low hover:border-primary/50 transition-colors text-center">
                            View Job
                        </button>
    <button class="flex-1 md:flex-none px-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:scale-98 hover:bg-primary/90 transition-all text-center shadow-sm">
                            View Application
                        </button>
    </div>
    </div>
    <!-- Job Card 3 -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.04)] hover:shadow-[0px_4px_20px_rgba(26,115,232,0.12)] transition-all flex flex-col md:flex-row items-start md:items-center gap-md group relative overflow-hidden bg-gradient-to-r from-surface-container-lowest to-secondary-fixed/5">
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed-dim"></div>
    <div class="w-12 h-12 rounded-lg border border-surface-variant bg-surface flex items-center justify-center shrink-0 p-xs ml-sm">
    <img alt="Company Logo" class="w-full h-full object-contain" data-alt="An abstract, modern startup logo consisting of interlocking colorful geometric shapes on a white background. The design is energetic, youthful, and highly polished, suitable for a fast-growing tech company." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsQGgoGntixXxXohOWNLi_U0FFV8YuBPjw1zgBp13nEC2c12frroCkrtq_dFeCR0x9ao6nO0GZAE1vNmD_1kjzc3Dzka6tRKrXY5WFKfwb6keqACQk933nn3E-UKVI643SZg0FuNpoBUixWEspYRPM2FJusMQqVfsq1hWsaUtevZlxtyM3taWEv25BNNuyny8TDAoj4y_-sgKp5smf40bGV5UIwMeK9Bdo3edK8tf13cU8jDEuG3SUcntOEUXT4bk8ScH-6AoI4Q9"/>
    </div>
    <div class="flex-1">
    <div class="flex flex-wrap items-center gap-xs mb-xs">
    <h3 class="font-headline-md text-headline-md text-on-background text-[18px] group-hover:text-primary transition-colors cursor-pointer">Lead UX Researcher</h3>
    <!-- Badge: Shortlisted -->
    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed-dim/30 text-on-secondary-fixed-variant font-label-sm text-label-sm ml-sm">
    <UIcon name="i-lucide-star" class="text-[12px] mr-1" />
                                Shortlisted
                            </span>
    </div>
    <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-[14px]">
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-building-2" class="text-[16px]" /> Innovate Studio</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Pune, India</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-calendar-month" class="text-[16px]" /> Applied 28 Sep 2023</span>
    </div>
    </div>
    <div class="flex flex-row md:flex-col gap-sm w-full md:w-auto mt-sm md:mt-0">
    <button class="flex-1 md:flex-none px-md py-2 rounded-lg border border-outline-variant/50 text-primary font-label-md text-label-md hover:bg-surface-container-low hover:border-primary/50 transition-colors text-center">
                            View Job
                        </button>
    <button class="flex-1 md:flex-none px-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:scale-98 hover:bg-primary/90 transition-all text-center shadow-sm">
                            View Application
                        </button>
    </div>
    </div>
    <!-- Job Card 4 -->
    <div class="bg-surface-container-lowest rounded-xl p-md border border-outline-variant/30 shadow-[0px_4px_20px_rgba(26,115,232,0.04)] hover:shadow-[0px_4px_20px_rgba(26,115,232,0.12)] transition-all flex flex-col md:flex-row items-start md:items-center gap-md group relative overflow-hidden opacity-75 hover:opacity-100">
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
    <div class="w-12 h-12 rounded-lg border border-surface-variant bg-surface flex items-center justify-center shrink-0 p-xs ml-sm grayscale">
    <img alt="Company Logo" class="w-full h-full object-contain" data-alt="A simple, minimalist logo icon for a legacy corporation, rendered in subtle greyscale to indicate inactivity. The design is clean but unremarkable, sitting on a plain white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzUtNm6FVTQlZCroUP4x6CUjBwQvP6w2N6THmCoPiqFBYN4KhSUNNlRgNPYhugVcHlT6k5z3Dy1KswH85W0Z89o3hadCVvGIkuO7YN2Ny0Fuh2cF6F2asDE0y66Gpgx54Ip-jpSBws_oDqDio2bljzynaomBHgKXjzNMDobytZ5Mlj0gGZWwFp_YStGMNKimOt3A9SZ1k04ILThfdY-Mxk5tJHr11PQoD_GSexuh0QyF0tgTGxsumYoxGpAfGAb7Zak8-t-fxd0_mc"/>
    </div>
    <div class="flex-1">
    <div class="flex flex-wrap items-center gap-xs mb-xs">
    <h3 class="font-headline-md text-headline-md text-on-background text-[18px] group-hover:text-primary transition-colors cursor-pointer text-on-surface-variant">UX/UI Designer</h3>
    <!-- Badge: Rejected -->
    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-error-container/30 text-error font-label-sm text-label-sm ml-sm">
    <span class="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                                Rejected
                            </span>
    </div>
    <div class="flex flex-wrap items-center gap-x-md gap-y-xs text-on-surface-variant font-body-md text-[14px]">
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-building-2" class="text-[16px]" /> GlobalTech Corp</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-map-pin" class="text-[16px]" /> Hyderabad, India</span>
    <span class="hidden md:inline text-outline-variant">•</span>
    <span class="flex items-center gap-xs"><UIcon name="i-lucide-calendar-month" class="text-[16px]" /> Applied 15 Aug 2023</span>
    </div>
    </div>
    <div class="flex flex-row gap-sm w-full md:w-auto mt-sm md:mt-0 justify-end">
    <button class="px-md py-2 rounded-lg border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors text-center">
                            Archive
                        </button>
    </div>
    </div>
    </div>
    <!-- Pagination (Implicit for list views) -->
    <div class="mt-lg flex justify-center items-center gap-sm">
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled="">
    <UIcon name="i-lucide-chevron-left" class="text-[20px]" />
    </button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md shadow-sm">1</button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md">2</button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low transition-colors font-label-md text-label-md">3</button>
    <button class="w-10 h-10 rounded-lg flex items-center justify-center border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-low transition-colors">
    <UIcon name="i-lucide-chevron-right" class="text-[20px]" />
    </button>
    </div>
    </main>
  </div>
</template>


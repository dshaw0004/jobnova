<script setup>
useHead({
  title: "Job Nova - Jobseeker Dashboard"
})
</script>

<template>
  <div>
    <!-- SideNavBar (Shared Component JSON) -->
    <nav class="hidden md:flex h-screen w-64 fixed left-0 top-0 shadow-sm dark:shadow-none bg-surface dark:bg-inverse-surface flex-col py-6 border-r border-outline-variant/30 z-50">
    <!-- Brand/Profile -->
    <div class="px-gutter mb-xl flex flex-col items-center text-center">
    <div class="w-20 h-20 rounded-full mb-md overflow-hidden border-2 border-surface-container-high shadow-sm">
    <img alt="User profile photo" class="w-full h-full object-cover" data-alt="A professional headshot of an Indian male UI designer in his early thirties, named Arjun Sharma. He is wearing a crisp light blue button-down shirt, smiling warmly against a bright, clean white studio background. The lighting is soft and corporate, evoking trust and approachability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYCzqBMFG79QhB6T3JvBOR7DLdTHMDRTC6eYxYDIazDO-M0kALFdR6ie1PtVdLESBWrKXElc1KOAsA14lDMe-faE4RUlfe_VygvRPqInMXyQHgmn-TZhlZkX8NfX8Fpqr9C0AQrZYf3uwWhNyIv9a8C8Dha8bSirPITaC8KfCyBymecW00HNBFsvqVWqRs-EFmKonasdudpP4rSlFFrF5Vio4veD1JtObH4m0hZX1N83aR-372pW0JjKx7Gv-VwtA76SfXPqVx5VSG">
    </div>
    <h2 class="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">Asif Shohood</h2>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">Senior UI Designer</p>
    </div>
    <!-- Navigation Links -->
    <div class="flex-1 flex flex-col gap-sm">
    <!-- Active Tab -->
    <a class="flex items-center gap-3 px-4 py-3 text-primary bg-secondary-container/10 border-r-4 border-primary font-bold hover:bg-surface-container-high transition-all" href="#">
    <UIcon name="i-lucide-layout-dashboard" style="font-variation-settings: 'FILL' 1;" />
    <span class="font-body-md text-body-md">Dashboard</span>
    </a>
    <!-- Inactive Tabs -->
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all" href="#">
    <UIcon name="i-lucide-user" />
    <span class="font-body-md text-body-md">My Profile</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all" href="#">
    <UIcon name="i-lucide-history" />
    <span class="font-body-md text-body-md">Applied Jobs</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all" href="#">
    <UIcon name="i-lucide-check-circle" />
    <span class="font-body-md text-body-md">Selected Jobs</span>
    </a>
    </div>
    <!-- Footer Links -->
    <div class="mt-auto flex flex-col gap-sm border-t border-outline-variant/30 pt-md">
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all" href="#">
    <UIcon name="i-lucide-settings" />
    <span class="font-body-md text-body-md">Settings</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high transition-all" href="#">
    <UIcon name="i-lucide-help-circle" />
    <span class="font-body-md text-body-md">Help</span>
    </a>
    <a class="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 transition-all font-label-md text-label-md mt-md" href="#">
    <UIcon name="i-lucide-log-out" />
                    Logout
                </a>
    </div>
    </nav>
    <!-- Main Content Canvas -->
    <main class="flex-1 md:ml-64 p-gutter md:p-xl max-w-container-max mx-auto w-full flex flex-col gap-xl">
    <!-- Top Section: Welcome & Quick Actions -->
    <section class="flex flex-col md:flex-row gap-lg items-start md:items-center justify-between bg-surface-container-lowest p-lg rounded-xl shadow-level-1">
    <div class="flex-1">
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-sm">Welcome Back,&nbsp;<div>Asif!</div></h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant">Manage your profile and track your job applications.</p>
    </div>
    <div class="flex flex-wrap gap-md">
    <button class="h-11 px-6 bg-primary-container text-on-primary-container font-label-md text-label-md rounded-xl hover:scale-98 transition-transform shadow-sm flex items-center gap-2">
    <UIcon name="i-lucide-plus-circle" class="text-[18px]" /> Complete Profile
                    </button>
    <button class="h-11 px-6 border border-outline text-primary font-label-md text-label-md rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-2">
    <UIcon name="i-lucide-upload" class="text-[18px]" /> Upload Resume
                    </button>
    <button class="h-11 px-6 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-xl hover:scale-98 transition-transform flex items-center gap-2">
    <UIcon name="i-lucide-search" class="text-[18px]" /> Search Jobs
                    </button>
    </div>
    </section>
    <!-- Analytics Row -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-md">
    <!-- Stat Card 1 -->
    <div class="bg-surface-container-lowest p-md rounded-xl shadow-level-1 flex flex-col justify-center border border-outline-variant/20 hover:shadow-level-2 transition-shadow">
    <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
    <UIcon name="i-lucide-file-text" class="text-primary text-[20px]" />
    <span class="font-label-md text-label-md uppercase tracking-wider text-[10px]">Total Applications</span>
    </div>
    <div class="font-display-lg text-display-lg text-primary">12</div>
    </div>
    <!-- Stat Card 2 -->
    <div class="bg-surface-container-lowest p-md rounded-xl shadow-level-1 flex flex-col justify-center border border-outline-variant/20 hover:shadow-level-2 transition-shadow">
    <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
    <UIcon name="i-lucide-pending-actions" class="text-tertiary text-[20px]" />
    <span class="font-label-md text-label-md uppercase tracking-wider text-[10px]">Under Review</span>
    </div>
    <div class="font-display-lg text-display-lg text-tertiary">5</div>
    </div>
    <!-- Stat Card 3 -->
    <div class="bg-surface-container-lowest p-md rounded-xl shadow-level-1 flex flex-col justify-center border border-outline-variant/20 hover:shadow-level-2 transition-shadow">
    <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
    <UIcon name="i-lucide-thumbs-up" class="text-secondary text-[20px]" />
    <span class="font-label-md text-label-md uppercase tracking-wider text-[10px]">Shortlisted</span>
    </div>
    <div class="font-display-lg text-display-lg text-secondary">3</div>
    </div>
    <!-- Stat Card 4 -->
    <div class="bg-surface-container-lowest p-md rounded-xl shadow-level-1 flex flex-col justify-center border border-outline-variant/20 hover:shadow-level-2 transition-shadow">
    <div class="flex items-center gap-2 mb-xs text-on-surface-variant">
    <UIcon name="i-lucide-award" class="text-primary-container text-[20px]" />
    <span class="font-label-md text-label-md uppercase tracking-wider text-[10px]">Selected</span>
    </div>
    <div class="font-display-lg text-display-lg text-primary-container">1</div>
    </div>
    </section>
    </main>
  </div>
</template>

<style scoped>
body { font-family: 'Inter', sans-serif; background-color: #f9f9ff; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Hanken Grotesk', sans-serif; }
</style>

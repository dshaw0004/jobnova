<script setup>
definePageMeta({
  layout: false
})

useHead({
  title: "Pending Approval | Job Nova Employer"
})
</script>

<template>
  <div>
    <!-- TopNavBar (Simplified for Transactional State) -->
    <header class="w-full top-0 sticky bg-surface-container-lowest border-b border-outline-variant z-50">
    <div class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary">Job Nova</div>
    <div class="flex items-center gap-md">
    <span class="font-label-md text-label-md text-on-surface-variant px-md py-sm bg-surface-container-low rounded-full">Employer Portal</span>
    </div>
    </div>
    </header>
    <main class="flex-grow flex items-center justify-center p-lg relative">
    <!-- Success Container -->
    <div class="max-w-[640px] w-full bg-surface-container-lowest rounded-xl status-card p-lg md:p-xl flex flex-col items-center relative z-10">
    <!-- Success Icon -->
    <div class="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mb-lg">
    <UIcon name="i-lucide-check-circle" class="text-on-primary text-[40px]" style="font-variation-settings: 'FILL' 1;" />
    </div>
    <!-- Main Heading -->
    <h1 class="font-headline-lg text-headline-lg text-center text-on-surface mb-md">
                    Registration Submitted Successfully
                </h1>
    <!-- Status Card -->
    <div class="w-full bg-primary-fixed/30 rounded-xl p-lg border border-primary-fixed mb-xl">
    <div class="flex items-center gap-sm mb-sm text-primary font-label-md">
    <UIcon name="i-lucide-hourglass-empty" class="text-[20px]" />
    <span class="uppercase tracking-wider">Status: Pending Approval</span>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant">
                        Your company profile has been submitted for verification. Our team will review your company information and activate your employer account once approved. You will receive an email notification after approval.
                    </p>
    </div>
    <!-- Timeline Section -->
    <div class="w-full mb-xl">
    <h2 class="font-label-md text-label-md text-on-surface mb-lg uppercase tracking-widest text-center">Verification Progress</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-md">
    <div class="flex flex-col items-center text-center gap-xs">
    <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center mb-xs">
    <UIcon name="i-lucide-check" class="text-[20px]" />
    </div>
    <span class="font-label-sm text-label-sm text-primary">Registration Submitted</span>
    </div>
    <div class="flex flex-col items-center text-center gap-xs">
    <div class="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-xs animate-pulse">
    <UIcon name="i-lucide-hourglass-top" class="text-[20px]" />
    </div>
    <span class="font-label-sm text-label-sm text-on-surface font-semibold">Verification In Progress</span>
    </div>
    <div class="flex flex-col items-center text-center gap-xs">
    <div class="w-10 h-10 rounded-full bg-surface-container-high text-outline flex items-center justify-center mb-xs">
    <UIcon name="i-lucide-circle" class="text-[20px]" />
    </div>
    <span class="font-label-sm text-label-sm text-on-surface-variant">Account Approval</span>
    </div>
    <div class="flex flex-col items-center text-center gap-xs">
    <div class="w-10 h-10 rounded-full bg-surface-container-high text-outline flex items-center justify-center mb-xs">
    <UIcon name="i-lucide-circle" class="text-[20px]" />
    </div>
    <span class="font-label-sm text-label-sm text-on-surface-variant">Access Dashboard</span>
    </div>
    </div>
    </div>
    <!-- Info Box -->
    <div class="w-full flex items-start gap-md p-md bg-surface-container-low rounded-lg mb-xl border-l-4 border-primary">
    <UIcon name="i-lucide-info" class="text-primary mt-xs" />
    <p class="font-body-md text-body-md text-on-surface-variant">
                        Verification may take up to 24–48 hours. Please ensure your company details are accurate.
                    </p>
    </div>
    <!-- Action Area -->
    <div class="w-full flex flex-col sm:flex-row gap-md">
    <button class="flex-1 h-[56px] bg-primary text-on-primary font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-150 shadow-lg hover:shadow-primary/20" onclick="window.location.href='#login'">
                        Back to Login
                    </button>
    <button class="flex-1 h-[56px] bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-150 hover:bg-surface-variant" onclick="window.location.href='#support'">
    <UIcon name="i-lucide-support-agent" class="text-body-md" />
                        Contact Support
                    </button>
    </div>
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full bg-surface-container-low border-t border-outline-variant">
    <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-7xl mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary mb-md md:mb-0">Job Nova</div>
    <div class="flex gap-lg flex-wrap justify-center">
    <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="/">Help Center</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="/">Privacy Policy</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="/">Terms of Service</a>
    </div>
    <div class="font-label-md text-label-md text-on-surface-variant mt-md md:mt-0">
                    © 2024 Job Nova India. All rights reserved.
                </div>
    </div>
    </footer>
  </div>
</template>

<style scoped>
body {
            background-color: var(--color-surface-container-lowest);
            color: var(--color-on-surface);
        }
        .status-card {
            box-shadow: 0px 4px 24px rgba(0, 91, 191, 0.08);
        }
</style>

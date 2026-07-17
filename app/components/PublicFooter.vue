<template>
  <footer class="bg-surface-container-low w-full pt-xl pb-md border-t border-outline-variant/30 mt-auto">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-lg px-gutter max-w-7xl mx-auto mb-xl">
      <div class="col-span-2 md:col-span-1">
        <AppLogo class="h-8 w-auto text-primary mb-6" />
        <p class="text-on-surface-variant text-label-md leading-relaxed">
          India's leading job platform for Government, Private, and MSME sector opportunities.
        </p>
      </div>
      <div>
        <h6 class="font-headline font-bold text-primary mb-6">Company</h6>
        <ul class="space-y-4">
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/">About Us</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/register-choose-account-type">Careers</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/">Press</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h6 class="font-headline font-bold text-primary mb-6">Resources</h6>
        <ul class="space-y-4">
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/my-career-hub">Blog</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/my-career-hub">Guides</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/my-career-hub">Help Center</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h6 class="font-headline font-bold text-primary mb-6">Jobs</h6>
        <ul class="space-y-4">
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/government-jobs">Govt Jobs</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/private-jobs">Private Jobs</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-amber-700 font-semibold hover:text-amber-600 transition-colors text-label-md" to="/msme-jobs">MSME Jobs <span class="text-[10px] uppercase bg-amber-100 px-1 py-0.5 rounded">New</span></NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h6 class="font-headline font-bold text-primary mb-6">Support</h6>
        <ul class="space-y-4">
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/login">Contact Us</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/">Privacy Policy</NuxtLink>
          </li>
          <li>
            <NuxtLink class="text-on-surface-variant hover:text-primary transition-colors text-label-md" to="/">Terms</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-outline-variant px-gutter max-w-7xl mx-auto pt-md flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-on-surface-variant text-label-sm">
        © 2024 Job Nova. All rights reserved.
      </p>
      <div class="flex gap-6">
        <a class="text-on-surface-variant hover:text-primary transition-colors" href="https://linkedin.com" target="_blank" rel="noopener">
          <UIcon name="i-lucide-linkedin" />
        </a>
        <a class="text-on-surface-variant hover:text-primary transition-colors" href="https://twitter.com" target="_blank" rel="noopener">
          <UIcon name="i-lucide-twitter" />
        </a>
        <a class="text-on-surface-variant hover:text-primary transition-colors" href="mailto:contact@jobnova.in">
          <UIcon name="i-lucide-mail" />
        </a>
      </div>
    </div>
  </footer>
</template>

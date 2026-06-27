<script setup>
useHead({
  title: 'Job Nova UI Showcase | Demo Directory'
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-12 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8 text-center">
        <h1 class="text-3xl font-extrabold text-slate-900 mb-2">Job Nova Page Showcase</h1>
        <p class="text-slate-600 max-w-lg mx-auto">
          We have integrated all UI mockups as Nuxt pages in this project.
          Select any of the links below to view and interact with the page.
        </p>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div class="divide-y divide-slate-100">
          <NuxtLink to="/applicants-tracking-employer-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Applicants Tracking Employer Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/applicants-tracking-employer-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/applied-jobs-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Applied Jobs Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/applied-jobs-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/candidate-profile-employer-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Candidate Profile Employer Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/candidate-profile-employer-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/career-portal-flow" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Career Portal Flow</h3>
              <p class="text-xs text-slate-500 font-mono">/career-portal-flow</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/company-profile-employer-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Company Profile Employer Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/company-profile-employer-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/employer-dashboard-1" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Employer Dashboard 1</h3>
              <p class="text-xs text-slate-500 font-mono">/employer-dashboard-1</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/employer-dashboard-2" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Employer Dashboard 2</h3>
              <p class="text-xs text-slate-500 font-mono">/employer-dashboard-2</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/employer-pending-approval" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Employer Pending Approval</h3>
              <p class="text-xs text-slate-500 font-mono">/employer-pending-approval</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/employer-registration-pending-1" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Employer Registration Pending 1</h3>
              <p class="text-xs text-slate-500 font-mono">/employer-registration-pending-1</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/employer-registration-pending-2" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Employer Registration Pending 2</h3>
              <p class="text-xs text-slate-500 font-mono">/employer-registration-pending-2</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/frontend-developer-details" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Frontend Developer Details</h3>
              <p class="text-xs text-slate-500 font-mono">/frontend-developer-details</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/government-jobs" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Government Jobs</h3>
              <p class="text-xs text-slate-500 font-mono">/government-jobs</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Homepage</h3>
              <p class="text-xs text-slate-500 font-mono">/</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/job-search" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Job Search</h3>
              <p class="text-xs text-slate-500 font-mono">/job-search</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/jobseeker-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Jobseeker Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/jobseeker-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/login" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Login</h3>
              <p class="text-xs text-slate-500 font-mono">/login</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/login-attempt-pending" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Login Attempt Pending</h3>
              <p class="text-xs text-slate-500 font-mono">/login-attempt-pending</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/manage-jobs-employer-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Manage Jobs Employer Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/manage-jobs-employer-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/my-career-hub" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">My Career Hub</h3>
              <p class="text-xs text-slate-500 font-mono">/my-career-hub</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/my-profile-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">My Profile Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/my-profile-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/post-a-new-job-employer-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Post A New Job Employer Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/post-a-new-job-employer-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/premium-modern-homepage" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Premium Modern Homepage</h3>
              <p class="text-xs text-slate-500 font-mono">/premium-modern-homepage</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/private-jobs" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Private Jobs</h3>
              <p class="text-xs text-slate-500 font-mono">/private-jobs</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/professional-homepage" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Professional Homepage</h3>
              <p class="text-xs text-slate-500 font-mono">/professional-homepage</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-choose-account-type" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Choose Account Type</h3>
              <p class="text-xs text-slate-500 font-mono">/register-choose-account-type</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-employer-step-1" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Employer Step 1</h3>
              <p class="text-xs text-slate-500 font-mono">/register-employer-step-1</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-employer-step-2" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Employer Step 2</h3>
              <p class="text-xs text-slate-500 font-mono">/register-employer-step-2</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-2-step-1" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker 2 Step 1</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-2-step-1</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-2-step-2" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker 2 Step 2</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-2-step-2</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-2-step-3" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker 2 Step 3</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-2-step-3</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-step-2" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker Step 2</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-step-2</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-step-2-variant-1-detailed-education" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker Step 2 Variant 1 Detailed Education</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-step-2-variant-1-detailed-education</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-step-2-variant-2-grouped-education" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker Step 2 Variant 2 Grouped Education</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-step-2-variant-2-grouped-education</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-job-seeker-step-2-variant-3-institution-focus" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Job Seeker Step 2 Variant 3 Institution Focus</h3>
              <p class="text-xs text-slate-500 font-mono">/register-job-seeker-step-2-variant-3-institution-focus</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/register-recruiter" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Register Recruiter</h3>
              <p class="text-xs text-slate-500 font-mono">/register-recruiter</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/selected-jobs-dashboard" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Selected Jobs Dashboard</h3>
              <p class="text-xs text-slate-500 font-mono">/selected-jobs-dashboard</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/ssc-cgl-2026-details" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Ssc Cgl 2026 Details</h3>
              <p class="text-xs text-slate-500 font-mono">/ssc-cgl-2026-details</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
          <NuxtLink to="/success" class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
            <div>
              <h3 class="font-semibold text-slate-850 group-hover:text-primary transition-colors">Success</h3>
              <p class="text-xs text-slate-500 font-mono">/success</p>
            </div>
            <UIcon name="i-lucide-arrow-right" class="text-slate-450 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

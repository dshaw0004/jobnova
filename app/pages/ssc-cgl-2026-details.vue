<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

useHead({
  title: "Govt Job Details | Job Nova"
})

const route = useRoute()
const jobId = computed(() => route.query.id)

const { data: res } = await useFetch<{ success: boolean; jobs: any[] }>('/api/jobs/govt-list')

const job = computed(() => {
  const list = res.value?.jobs || []
  if (jobId.value) {
    return list.find(j => j.id === Number(jobId.value))
  }
  return list[0]
})

const mockJob = {
  id: null,
  organisation: "Staff Selection Commission (SSC)",
  post: "SSC CGL 2026 - Combined Graduate Level Examination",
  method: "Combined Graduate Level",
  last_date: "Oct 15, 2025",
  issued_date: "Aug 1, 2025",
  vacancies: "15,000+",
  salary: "₹47k - 1.5L",
  location: "All India",
  qualification: "Graduate",
  description: "The Staff Selection Commission (SSC) has released the official notification for the Combined Graduate Level (CGL) Examination 2026. This prestigious recruitment drive aims to fill over 15,000 Grade 'B' and 'C' posts in various Ministries, Departments, and Organizations of the Government of India. Selected candidates will be placed in diverse roles including Assistant Audit Officer, Assistant Section Officer, Inspector of Income Tax, and more."
}

const activeJob = computed(() => {
  if (job.value) {
    return {
      id: job.value.id,
      organisation: job.value.organisation || 'Government Department',
      post: job.value.post || 'Recruitment Examination',
      method: job.value.method || 'Direct Recruitment',
      last_date: job.value.last_date || 'Check Notification',
      issued_date: job.value.issued_date || 'Refer Notification',
      vacancies: 'See PDF Notification',
      salary: 'As Per Government Norms',
      location: 'India',
      qualification: 'As Per Post Rules',
      description: `The recruitment notice for "${job.value.post}" has been officially published by "${job.value.organisation}". This notification was issued on ${job.value.issued_date || 'recent date'} with the application submission closing on ${job.value.last_date}. Please review the official recruitment guidelines, scheme of examination, and eligibility parameters detailed within the official recruitment notification file.`
    }
  }
  return mockJob
})

const relatedJobs = computed(() => {
  const list = res.value?.jobs || []
  const currentId = activeJob.value?.id
  return list.filter(j => j.id !== currentId).slice(0, 4)
})

const getOrgIcon = (org: string): string => {
  const o = (org || '').toLowerCase();
  if (o.includes("railway") || o.includes("rrb")) return "i-lucide-train";
  if (o.includes("defence") || o.includes("sainik") || o.includes("military") || o.includes("aerospace")) return "i-lucide-shield";
  if (o.includes("bank") || o.includes("rbi") || o.includes("sbi") || o.includes("cooperative")) return "i-lucide-landmark";
  if (o.includes("audit") || o.includes("account") || o.includes("finance")) return "i-lucide-landmark";
  if (o.includes("forest") || o.includes("envir") || o.includes("krishi") || o.includes("kvk")) return "i-lucide-trees";
  if (o.includes("research") || o.includes("science") || o.includes("nihr") || o.includes("icmr") || o.includes("power")) return "i-lucide-flask-conical";
  return "i-lucide-building-2";
}

onMounted(() => {
  try {
    // Simple Countdown logic
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl && hoursEl && minutesEl && secondsEl) {
      function updateTimer() {
        let d = parseInt(daysEl!.innerText);
        let h = parseInt(hoursEl!.innerText);
        let m = parseInt(minutesEl!.innerText);
        let s = parseInt(secondsEl!.innerText);
        
        if (s > 0) s--;
        else {
          s = 59;
          if (m > 0) m--;
          else {
            m = 59;
            if (h > 0) h--;
            else {
              h = 23;
              if (d > 0) d--;
            }
          }
        }
        
        daysEl!.innerText = d.toString().padStart(2, '0');
        hoursEl!.innerText = h.toString().padStart(2, '0');
        minutesEl!.innerText = m.toString().padStart(2, '0');
        secondsEl!.innerText = s.toString().padStart(2, '0');
      }
      
      setInterval(updateTimer, 1000);
    }
  } catch (e) {
    console.error('Error in countdown script:', e)
  }
})
</script>

<template>
  <div>
    <main class="max-w-7xl mx-auto px-lg py-sm md:py-md">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-sm mb-lg text-on-surface-variant font-label-md">
        <a class="hover:text-primary" href="/">Home</a>
        <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
        <a class="hover:text-primary" href="/government-jobs">Government Jobs</a>
        <UIcon name="i-lucide-chevron-right" class="text-[16px]" />
        <span class="text-primary font-bold">{{ activeJob.organisation }}</span>
      </nav>

      <div class="flex flex-col lg:flex-row gap-lg">
        <!-- Main Content (75%) -->
        <div class="w-full lg:w-3/4 space-y-lg">
          <!-- Hero Card -->
          <section class="bg-surface-container-lowest p-lg md:p-xl rounded-2xl premium-shadow border border-outline-variant/30">
            <div class="flex flex-col md:flex-row justify-between items-start gap-md mb-lg">
              <div class="flex-1">
                <div class="flex items-center gap-sm mb-sm">
                  <div class="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-variant overflow-hidden">
                    <UIcon :name="getOrgIcon(activeJob.organisation)" class="text-primary text-[28px]" />
                  </div>
                  <span class="font-label-md text-secondary uppercase tracking-wider font-bold">{{ activeJob.organisation }}</span>
                </div>
                <h1 class="font-headline-lg text-headline-lg hanken text-on-surface mb-md">{{ activeJob.post }}</h1>
                <div class="flex flex-wrap gap-sm">
                  <span class="px-3 py-1.5 bg-green-100 text-green-800 rounded-full font-label-sm flex items-center gap-1">
                    <UIcon name="i-lucide-check-circle" class="text-[14px]" />
                    Open
                  </span>
                  <span class="px-3 py-1.5 bg-primary-container/10 text-primary rounded-full font-label-sm border border-primary-container/20">{{ activeJob.method }}</span>
                  <span class="px-3 py-1.5 gradient-chip rounded-full font-label-sm shadow-sm">Official Listing</span>
                </div>
              </div>
              <div class="flex flex-row md:flex-col gap-sm w-full md:w-auto">
                <a href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All" target="_blank" class="flex-1 md:w-44 h-11 bg-primary text-on-primary rounded-xl font-label-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center">Apply Now</a>
                <button class="flex-1 md:w-44 h-11 border border-outline text-on-surface rounded-xl font-label-md hover:bg-surface-container transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <UIcon name="i-lucide-bookmark" class="text-[20px]" /> Save Job
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-md pt-lg border-t border-outline-variant/30">
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant font-label-sm uppercase">Vacancies</span>
                <span class="text-on-surface font-bold font-body-md text-primary">{{ activeJob.vacancies }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant font-label-sm uppercase">Salary</span>
                <span class="text-on-surface font-bold font-body-md">{{ activeJob.salary }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant font-label-sm uppercase">Location</span>
                <span class="text-on-surface font-bold font-body-md">{{ activeJob.location }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant font-label-sm uppercase">Qualification</span>
                <span class="text-on-surface font-bold font-body-md">{{ activeJob.qualification }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-on-surface-variant font-label-sm uppercase">Last Date</span>
                <span class="text-error font-bold font-body-md">{{ activeJob.last_date }}</span>
              </div>
            </div>
          </section>

          <!-- Important Dates -->
          <section class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow">
            <h2 class="font-headline-md text-headline-md hanken mb-lg flex items-center gap-2">
              <UIcon name="i-lucide-calendar" class="text-primary" /> Important Dates
            </h2>
            <div class="relative flex flex-col md:flex-row justify-between items-center gap-md">
              <!-- Desktop Line -->
              <div class="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-surface-container-high -z-10 translate-y-[-50%]"></div>
              <div class="flex flex-col items-center text-center gap-2 bg-surface-container-lowest px-2">
                <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">1</div>
                <div>
                  <p class="font-label-sm text-on-surface-variant">Notification</p>
                  <p class="font-body-md font-bold">{{ activeJob.issued_date }}</p>
                </div>
              </div>
              <div class="flex flex-col items-center text-center gap-2 bg-surface-container-lowest px-2">
                <div class="w-10 h-10 rounded-full bg-error flex items-center justify-center text-on-primary font-bold">2</div>
                <div>
                  <p class="font-label-sm text-on-surface-variant">App Ends</p>
                  <p class="font-body-md font-bold text-error">{{ activeJob.last_date }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Overview -->
          <section class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow">
            <h2 class="font-headline-md text-headline-md hanken mb-md">Recruitment Overview</h2>
            <p class="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
              {{ activeJob.description }}
            </p>
          </section>

          <!-- Selection Process -->
          <section class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow">
            <h2 class="font-headline-md text-headline-md hanken mb-lg">Selection Process</h2>
            <div class="relative pl-10 space-y-lg timeline-line">
              <div class="relative">
                <div class="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
                <h4 class="font-body-md font-bold text-on-surface">Step 1: CBT Written Examination</h4>
                <p class="font-body-md text-on-surface-variant">Objective Multiple Choice (CBT). Mandatory for all candidates.</p>
              </div>
              <div class="relative">
                <div class="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></div>
                <h4 class="font-body-md font-bold text-on-surface">Step 2: Document Verification & Merit List</h4>
                <p class="font-body-md text-on-surface-variant">Verify academic and category credentials followed by final selection ranking.</p>
              </div>
            </div>
          </section>

          <!-- Important Links Grid -->
          <section class="grid grid-cols-1 md:grid-cols-2 gap-md">
            <a class="group flex items-center justify-between p-md bg-primary-container text-on-primary rounded-2xl hover:shadow-xl transition-all active:scale-[0.98]" href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All" target="_blank">
              <div class="flex items-center gap-md">
                <UIcon name="i-lucide-download" class="text-4xl opacity-80" />
                <div>
                  <p class="font-label-sm opacity-80 uppercase">Official Portal</p>
                  <p class="font-headline-md text-[18px] hanken">Download Notification</p>
                </div>
              </div>
              <UIcon name="i-lucide-arrow-right" class="group-hover:translate-x-1 transition-transform" />
            </a>
            <a class="group flex items-center justify-between p-md bg-secondary text-on-primary rounded-2xl hover:shadow-xl transition-all active:scale-[0.98]" href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All" target="_blank">
              <div class="flex items-center gap-md">
                <UIcon name="i-lucide-mouse-pointer" class="text-4xl opacity-80" />
                <div>
                  <p class="font-label-sm opacity-80 uppercase">Registration</p>
                  <p class="font-headline-md text-[18px] hanken">Apply Online Link</p>
                </div>
              </div>
              <UIcon name="i-lucide-arrow-right" class="group-hover:translate-x-1 transition-transform" />
            </a>
          </section>

          <!-- Similar Opportunities -->
          <section class="space-y-md">
            <h2 class="font-headline-md text-headline-md hanken">Similar Opportunities</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div v-if="relatedJobs.length === 0" class="col-span-full py-8 text-center text-on-surface-variant/60 font-body-sm bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
                No similar government opportunities listed.
              </div>
              <NuxtLink 
                v-for="rj in relatedJobs" 
                :key="rj.id"
                :to="`/ssc-cgl-2026-details?id=${rj.id}`"
                class="bg-surface-container-lowest p-md rounded-2xl premium-shadow border border-outline-variant/30 hover:border-primary transition-all cursor-pointer block"
              >
                <div class="flex justify-between items-start mb-sm">
                  <span class="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] rounded font-bold uppercase truncate max-w-[80%]">{{ rj.organisation }}</span>
                  <UIcon name="i-lucide-bookmark" class="text-outline-variant text-[20px]" />
                </div>
                <h4 class="font-body-md font-bold mb-xs truncate">{{ rj.post }}</h4>
                <p class="text-[12px] text-on-surface-variant mb-md truncate">Last Date: {{ rj.last_date }}</p>
                <span class="w-full py-2 bg-surface-container-low text-primary rounded-lg font-label-sm hover:bg-primary-container hover:text-on-primary transition-all text-center block">View Details</span>
              </NuxtLink>
            </div>
          </section>
        </div>

        <!-- Sidebar (25%) -->
        <aside class="w-full lg:w-1/4">
          <div class="sticky-sidebar space-y-md">
            <!-- Timer Card -->
            <div class="bg-surface-container-lowest p-lg rounded-2xl premium-shadow border border-error/20">
              <p class="font-label-sm text-error uppercase font-bold text-center mb-md">Time Remaining to Apply</p>
              <div class="grid grid-cols-4 gap-2 text-center mb-lg">
                <div class="bg-error/5 p-2 rounded-xl">
                  <p class="text-headline-md font-bold text-error" id="days">30</p>
                  <p class="text-[10px] text-on-surface-variant uppercase">Days</p>
                </div>
                <div class="bg-error/5 p-2 rounded-xl">
                  <p class="text-headline-md font-bold text-error" id="hours">12</p>
                  <p class="text-[10px] text-on-surface-variant uppercase">Hrs</p>
                </div>
                <div class="bg-error/5 p-2 rounded-xl">
                  <p class="text-headline-md font-bold text-error" id="minutes">00</p>
                  <p class="text-[10px] text-on-surface-variant uppercase">Min</p>
                </div>
                <div class="bg-error/5 p-2 rounded-xl">
                  <p class="text-headline-md font-bold text-error" id="seconds">00</p>
                  <p class="text-[10px] text-on-surface-variant uppercase">Sec</p>
                </div>
              </div>
              <a href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All" target="_blank" class="w-full h-12 bg-primary text-on-primary rounded-xl font-headline-md text-[18px] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center">Apply Now</a>
            </div>
            <!-- Actions Card -->
            <div class="bg-surface-container-lowest p-md rounded-2xl premium-shadow">
              <div class="flex flex-col gap-sm">
                <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all cursor-pointer">
                  <UIcon name="i-lucide-share-2" class="text-primary" />
                  <span class="font-label-md text-on-surface">Share Notification</span>
                </button>
                <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all cursor-pointer">
                  <UIcon name="i-lucide-bookmark" class="text-primary" />
                  <span class="font-label-md text-on-surface">Already Saved</span>
                </button>
                <button class="flex items-center gap-md p-md hover:bg-surface-container-low rounded-xl transition-all cursor-pointer">
                  <UIcon name="i-lucide-download" class="text-primary" />
                  <span class="font-label-md text-on-surface">Save for Offline</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<style scoped>
.premium-shadow { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
.sticky-sidebar { position: sticky; top: 100px; height: fit-content; }
.timeline-line::before { content: ''; position: absolute; left: 16px; top: 0; bottom: 0; width: 2px; background: #d8e2ff; }
.gradient-chip { background: linear-gradient(90deg, #2b5bb5 0%, var(--color-primary) 100%); color: white; }
</style>

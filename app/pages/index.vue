<script setup>
useHead({
  title: "Job Nova | Find the Right Job, Faster",
});

import { onMounted, computed } from "vue";

// Fetch the latest 3 government jobs from the D1 database binding
const { data: govtJobsData } = await useFetch('/api/jobs/govt-list', {
  query: { limit: 3 }
})
const govtJobs = computed(() => govtJobsData.value?.jobs || [])

// Determine dynamic icon based on organisation
const getOrgIcon = (org) => {
  if (!org) return 'i-lucide-building-2'
  const o = org.toLowerCase()
  if (o.includes('railway') || o.includes('rrb')) return 'i-lucide-train'
  if (o.includes('defence') || o.includes('sainik') || o.includes('military') || o.includes('aerospace')) return 'i-lucide-shield'
  if (o.includes('bank') || o.includes('rbi') || o.includes('sbi') || o.includes('cooperative')) return 'i-lucide-landmark'
  if (o.includes('audit') || o.includes('account') || o.includes('finance')) return 'i-lucide-landmark'
  if (o.includes('forest') || o.includes('envir') || o.includes('krishi') || o.includes('kvk')) return 'i-lucide-trees'
  if (o.includes('research') || o.includes('science') || o.includes('nihr') || o.includes('icmr') || o.includes('power')) return 'i-lucide-flask-conical'
  return 'i-lucide-building-2'
}

onMounted(() => {
  try {
    // Simple intersection observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    document.querySelectorAll("section").forEach((section) => {
      section.classList.add(
        "transition-all",
        "duration-700",
        "opacity-0",
        "translate-y-10",
      );
      observer.observe(section);
    });
  } catch (e) {
    console.error("Error in page script:", e);
  }
});
</script>

<template>
  <div>
    
    <!-- 2. Hero Section -->
    <header class="relative overflow-hidden pt-xl pb-20 px-gutter">
      <div
        class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div class="z-10">
          <h1
            class="font-headline text-display-lg text-on-surface mb-md leading-tight"
          >
            Find the Right <span class="text-primary">Job, Faster</span>
          </h1>
          <p class="font-body text-body-lg text-on-surface-variant mb-xl">
            Explore thousands of Government and Private sector opportunities
            across India. Your dream career starts with a single click.
          </p>
          <!-- Signature Search Bar -->
          <div
            class="bg-surface-container-low p-2 rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col md:flex-row gap-2 mb-lg"
          >
            <div
              class="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant focus-within:border-primary"
            >
              <UIcon name="i-lucide-search" class="text-outline" />
              <input
                class="w-full bg-transparent border-none focus:ring-0 font-body text-body-md"
                placeholder="Job title, keywords..."
                type="text"
              />
            </div>
            <div
              class="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-container-lowest rounded-xl border border-outline-variant focus-within:border-primary"
            >
              <UIcon name="i-lucide-map-pin" class="text-outline" />
              <input
                class="w-full bg-transparent border-none focus:ring-0 font-body text-body-md"
                placeholder="City or state"
                type="text"
              />
            </div>
            <button
              class="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold hover:bg-secondary transition-colors"
            >
              Search
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >SSC</span
            >
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >UPSC</span
            >
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >Railway</span
            >
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >Banking</span
            >
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >IT</span
            >
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >Marketing</span
            >
            <span
              class="text-label-sm text-on-surface-variant font-semibold px-3 py-1 bg-surface-container-high rounded-full hover:bg-primary-fixed-dim cursor-pointer transition-colors"
              >Remote</span
            >
          </div>
        </div>
        <div class="relative hidden md:block">
          <div
            class="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          ></div>
          <div
            class="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          ></div>
          <img
            class="rounded-2xl shadow-2xl relative z-10 w-full h-[500px] object-cover border-8 border-outline-variant"
            data-alt="A modern, high-end office environment featuring diverse young professionals collaborating in a brightly lit, open-concept workspace. The setting is clean and professional with soft blue accents, reflecting a premium career-oriented ecosystem. Large windows in the background allow for natural sunlight, creating an aspirational and productive atmosphere typical of a leading corporate headquarters in a tech-driven city."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVhj7Sw2V4VlY073iUnjWxl4ozaNwBzSWKwCTi9uBjqXBknjXcdv6SO4ZTzFJKID9ewIZwIBc6Er0QoI43iVH94ET1OEpdLKP31sKGvwsEdNObmVHqehxB_A5b4yrxi_2ibknA2BtOBBbHk5UJiVWIlj0Cifz9o0c6Z0qJdxt8e7Eez-uP-uOasW0d3c7gZQc9PsLUCw-ZTSxsEDlqWowH4mJ8mBEdWmiw0qUwUKFBeyObsqnM4Of-amtumPU5Egg_adZ4S6Ml-jXo"
          />
          <div
            class="absolute -bottom-6 -right-6 bg-surface-container-lowest p-4 rounded-xl shadow-lg z-20 animate-bounce"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
              >
                <UIcon name="i-lucide-check-circle" class="text-green-600" />
              </div>
              <div>
                <p class="text-label-sm font-bold">1.2k+ New Jobs</p>
                <p class="text-[10px] text-on-surface-variant">
                  Added in last 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- 3. Split Section: Career Path -->
    <section class="py-xl px-gutter bg-surface-container-lowest">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-headline text-headline-lg text-center mb-xl">
          Choose Your Career Path
        </h2>
        <div class="grid md:grid-cols-2 gap-lg">
          <!-- Govt Jobs Card -->
          <div
            class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-1"
          >
            <div
              class="bg-surface-container-lowest rounded-[14px] p-8 h-full transition-all group-hover:bg-surface-container-lowest/95"
            >
              <div
                class="mb-6 inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl text-primary"
              >
                <UIcon name="i-lucide-landmark" class="text-[32px]" />
              </div>
              <h3 class="font-headline text-headline-md mb-3">
                Government Jobs
              </h3>
              <p class="font-body text-body-md text-on-surface-variant mb-6">
                Secure your future with stable and prestigious careers in Public
                Sector Undertakings and Government departments.
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >SSC</span
                >
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >UPSC</span
                >
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >Railways</span
                >
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >State PSC</span
                >
              </div>
              <NuxtLink
                class="inline-flex items-center gap-2 font-Inter font-bold text-primary hover:gap-4 transition-all"
                to="/government-jobs"
              >
                Explore Govt Jobs <UIcon name="i-lucide-arrow-right" />
              </NuxtLink>
            </div>
          </div>
          <!-- Private Jobs Card -->
          <div
            class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-tertiary to-secondary p-1"
          >
            <div
              class="bg-surface-container-lowest rounded-[14px] p-8 h-full transition-all group-hover:bg-surface-container-lowest/95"
            >
              <div
                class="mb-6 inline-flex items-center justify-center w-14 h-14 bg-tertiary/10 rounded-xl text-tertiary"
              >
                <UIcon name="i-lucide-business-center" class="text-[32px]" />
              </div>
              <h3 class="font-headline text-headline-md mb-3">Private Jobs</h3>
              <p class="font-body text-body-md text-on-surface-variant mb-6">
                Accelerate your career in fast-growing industries with top MNCs
                and innovative Indian startups.
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >IT &amp; Software</span
                >
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >Marketing</span
                >
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >Fintech</span
                >
                <span
                  class="px-3 py-1 bg-surface-container-low border border-outline-variant rounded-lg text-label-md"
                  >Sales</span
                >
              </div>
              <NuxtLink
                class="inline-flex items-center gap-2 font-Inter font-bold text-tertiary hover:gap-4 transition-all"
                to="/private-jobs"
              >
                Explore Private Jobs <UIcon name="i-lucide-arrow-right" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 4. Featured Govt Jobs -->
    <section class="py-xl px-gutter">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-lg">
          <div>
            <h2 class="font-headline text-headline-lg mb-2">
              Featured Govt Jobs
            </h2>
            <p class="text-on-surface-variant">
              Latest openings from top Government departments
            </p>
          </div>
          <NuxtLink
            class="text-primary font-bold hover:underline"
            to="/government-jobs"
            >View All</NuxtLink
          >
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
          <!-- Dynamic Job Cards from D1 -->
          <div
            v-for="job in govtJobs"
            :key="job.id"
            class="bg-surface-container-lowest p-md rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] border border-transparent hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div class="flex justify-between items-start mb-4">
                <div class="bg-primary/5 p-3 rounded-xl">
                  <UIcon :name="getOrgIcon(job.organisation)" class="text-primary text-xl" />
                </div>
                <span
                  class="bg-green-100 text-green-700 text-label-sm px-2.5 py-1 rounded font-bold uppercase tracking-wider"
                  >Scraped</span
                >
              </div>
              <h4 class="font-headline font-bold text-lg mb-1 line-clamp-2">
                {{ job.post }}
              </h4>
              <p class="text-on-surface-variant text-label-md mb-4 font-semibold">
                {{ job.organisation }}
              </p>
              <div class="space-y-2 mb-6">
                <div
                  class="flex items-center gap-2 text-on-surface-variant text-label-sm"
                >
                  <UIcon name="i-lucide-settings" class="text-outline text-sm" />
                  Method: {{ job.method }}
                </div>
                <div
                  class="flex items-center gap-2 text-on-surface-variant text-label-sm"
                >
                  <UIcon name="i-lucide-calendar" class="text-outline text-sm" />
                  Last Date: {{ job.last_date }}
                </div>
              </div>
            </div>
            <a
              href="https://employmentnews.gov.in/newemp/AllJobs.aspx?k=All"
              target="_blank"
              class="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all text-center block"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- 5. Featured Private Jobs -->
    <section class="py-xl px-gutter bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-lg">
          <div>
            <h2 class="font-headline text-headline-lg mb-2">
              Featured Private Jobs
            </h2>
            <p class="text-on-surface-variant">
              Opportunity knocking from top global and local tech leaders
            </p>
          </div>
          <NuxtLink
            class="text-primary font-bold hover:underline"
            to="/job-search"
            >View All</NuxtLink
          >
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-md">
          <!-- Private Job Card 1 -->
          <div
            class="bg-surface-container-lowest p-md rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] group hover:-translate-y-1 transition-all"
          >
            <div class="flex gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center p-2"
              >
                <img
                  alt="Microsoft"
                  class="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8RtJKLz4u8ZBGsGzTR4zz-3jUGiovuqRqZVvvLzptR-WWl25-0Cp9mk0yfZIIwW6KVkpm3EbOCfMOqviBC6UsNytEdPg9y2jgHWfl71-u7f04B2zKOHxjOqrAw1--kPQpWMPGEc4eTt1HS_xwhgJiLEVAHQfvbFcpyT_gt0WlubSiCgYoWi-zOiYHY6fuvfk_bRWyT0E_JBi8advBS4Jb5hAD-DGNKEFV1mSmSedZEatkf-dMmIghwJPAp6KO6rpMOvD0lip4oWQh"
                />
              </div>
              <div>
                <h4 class="font-headline font-semibold">
                  Software Engineer II
                </h4>
                <p class="text-on-surface-variant text-label-md">Microsoft</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="bg-primary/10 text-primary text-label-sm px-2 py-1 rounded"
                >Remote</span
              >
              <span
                class="bg-surface-container-high text-on-surface-variant text-label-sm px-2 py-1 rounded"
                >Full-time</span
              >
            </div>
            <div class="flex justify-between items-center">
              <p class="text-on-surface font-bold">
                ₹18L - 25L
                <span class="text-on-surface-variant font-normal text-xs"
                  >/yr</span
                >
              </p>
              <button
                class="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-bold group-hover:bg-secondary transition-all"
              >
                Apply
              </button>
            </div>
          </div>
          <!-- Repeat for others -->
          <div
            class="bg-surface-container-lowest p-md rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] group hover:-translate-y-1 transition-all"
          >
            <div class="flex gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center p-2"
              >
                <img
                  alt="Amazon"
                  class="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRzCmAwdWfn33lp9OHWWRqWM587kc8M4HawbOT1ovx1pJ6ekiAZa-y5Wj3SCopUBXM1-r_BRkFhmPzBF5olbvtKzek6e0NRCVo8pDPIpTtQh0NcWIUaY7n8CdW8Kb1SU0i31qOFECtkUvqG5pz4gjPHzGnjrrEaYLGbELTYlyjzQPgyrGB4KHQ_JzNl8r3jVqPuUFZz8xAIavTFQGFztGHq5a2GoJP1qxCGirFvygncAbhtTe6BJhUu8WjdLsCBwOq2sPr28EtnZtp"
                />
              </div>
              <div>
                <h4 class="font-headline font-semibold">Product Manager</h4>
                <p class="text-on-surface-variant text-label-md">Amazon</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="bg-primary/10 text-primary text-label-sm px-2 py-1 rounded"
                >Hyderabad</span
              >
              <span
                class="bg-surface-container-high text-on-surface-variant text-label-sm px-2 py-1 rounded"
                >On-site</span
              >
            </div>
            <div class="flex justify-between items-center">
              <p class="text-on-surface font-bold">
                ₹22L - 30L
                <span class="text-on-surface-variant font-normal text-xs"
                  >/yr</span
                >
              </p>
              <button
                class="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-bold group-hover:bg-secondary transition-all"
              >
                Apply
              </button>
            </div>
          </div>
          <div
            class="bg-surface-container-lowest p-md rounded-2xl shadow-[0px_4px_20px_rgba(26,115,232,0.08)] group hover:-translate-y-1 transition-all"
          >
            <div class="flex gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center p-2"
              >
                <img
                  alt="Infosys"
                  class="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBesjQdnVwj10pKNJ9dFCyZy8omcBVRoFHbF-YPgdD7MGj_wopbtT4yyIvkQP04s7RtGUcUwb4VBzLCuoWg3WFMlWAso8hsvggEKaJNc4fNrSr_xn0-jQwMzMlTeYv67qpatzl1SPSdb0utqK8jxDaEkS-IMd0XhO7-GF8Zg_5rsSra15bqgrVedaepveEqV_4bj-yo5mOuuVbrhhMj70SNNfrW59Gw8G8vrUfeosfatKsqBM3ZqPkV-Rf5Ll9qvQFp2NsxMATXjAAs"
                />
              </div>
              <div>
                <h4 class="font-headline font-semibold">Cloud Architect</h4>
                <p class="text-on-surface-variant text-label-md">Infosys</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                class="bg-primary/10 text-primary text-label-sm px-2 py-1 rounded"
                >Bengaluru</span
              >
              <span
                class="bg-surface-container-high text-on-surface-variant text-label-sm px-2 py-1 rounded"
                >Hybrid</span
              >
            </div>
            <div class="flex justify-between items-center">
              <p class="text-on-surface font-bold">
                ₹15L - 20L
                <span class="text-on-surface-variant font-normal text-xs"
                  >/yr</span
                >
              </p>
              <button
                class="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-bold group-hover:bg-secondary transition-all"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 6. Trusted Companies Logo Grid -->
    <section class="py-xl px-gutter">
      <div class="max-w-7xl mx-auto text-center">
        <p
          class="text-label-md text-outline font-semibold mb-lg uppercase tracking-widest"
        >
          Hiring at world class companies
        </p>
        <div
          class="flex flex-wrap justify-center items-center gap-xl opacity-60 grayscale hover:grayscale-0 transition-all"
        >
          <img
            alt="Google"
            class="h-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4WT-ao_Wx6rLtgFi1qDaLQZAmQWc8An_otqzkd59AwU60IQy7l9xmSxu-GzIdWbIig8nsxCN8fSqXOovwhjKpymrDBXug3XSfdjQE-N025OsYFx8ryBkJ74SKwBCEn0uTEDGGFRPVdrIEo86ohA13eAMB6XdTVif5fLWz20dmj8j6s_dKOLQq3Wa0J5DAsHuH0s40lBTa1cE41BA60ZvVbMYtYNATb97L_HgK3X1zecOu75FbMN5NcxlxnarPdj__zIs_M4CyZGBI"
          />
          <img
            alt="Microsoft"
            class="h-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf_CPY7Dz0BBIJQHE7vAn-DIfEGPnqoKZetEj6pjWERasB6wHIXDhH31Z3He56b_3fxED8-D7n6bdTgBuVr7djmA3wquOQqoA2HEqhQJaisnUZ-DjAn_lWZ9yq5JI0WKdW9Ct5LpvdP0tmCQY4PVfwlbWSJsDsPMJ68NQNr1f4ArDqovogMQd66I6DrjsDVt24M2zlFXNVIBqjvWItOm_61XZuCEQ4xeX827CdHsDhrQNpI0eI8pIa9jQH5vWd9N2fXpE08e_F9JZF"
          />
          <img
            alt="Amazon"
            class="h-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi_nJvoeqkPQk7bFHW7K5wwC0vQE0D7xd3e-d8o-rIg4G8x-ZHIuqa_dLsajzZroav9eJwTnCau6gBsY9_s1S719-597Gu1UeRyXWQlT8l3XxmBA8LtIM23xju63MCEgEhiURjcV7gM-5b4q-SpSlrGndiFK9DO7Krl6WC3GlAFyaOt7a2rX8Q-h5uThG_w3X12YUWhYe9tr_waQDpRaY5whK8AXim2uLS-3XI5ZfXBJVZmqax5WfS0pXB53HXX9bRFlvABopHuO_X"
          />
          <img
            alt="Infosys"
            class="h-10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUiGIMjW-KC_kD8xqYYKFza5nD79wN_NEaXrAr2ZYAjxoSAwrzID1U4sPKsjBHbFZrRs7jt4RtBsxrCgHWYWQY_iv7tUqf9oQtueUa1l8zARS-yFuRBvgdIEAjpd9t5UP6QX6adZYo4oX3-G-AJUPyxbdA20_V9rnbxTDWJCiiflut3hp8kSbj9SlDfjoamZvDMBNpRK6pGLVAfxWTzyFc0YrhAG3pMmjhYjGBmMiW_kjurszygg8P-pgnq1QXBJ5hzF5kMXHcv7OV"
          />
          <img
            alt="TCS"
            class="h-10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_wwB_FiwASfKTsXuvhS5Kl8UTDEVoFNCDbu3ADr9W3xHlhojTQMmoEwZ4CBuZK3IoziZM60MV0MWtsAj6RqOq9w9VDVktIetMZNAYj3OgNB0HYkJl84gnpDj3w89VR-DZQCmjF-FuBXghtyNGz7U6vay4TiD3727BdEu7h86yM680Q3AFavhz0eVXid-6CVsdIOIvO0kQNaG8D9gNhRWNxaUJGX5PGAfkayn8gVqAsOflTr6Q_MHrluS8DzsEYW0qtzVThdGCugSt"
          />
          <img
            alt="Wipro"
            class="h-10"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARqI_WmyffXtSz99zJD9gyERf-nT0jw55H_PZzHdWzgOeBtuVfRKupFEvzRBwI-eXqvqIlAp2EiP-Krfj_OOetNPrJc3XTuzYRshGxUzK70Ek4wARUVvbVqsZdJUeR1yHrEolH4h3l-d1mrQWEiRqN2iXFnu_PQsYXCCggNIrL4ib8QAFtFvPm0Bej3zL3ZPeZrjulf4KtqW6LzWzm8jn-5Qdfi7wk8ieh_gTB0f_u0V7DXN-9Dhm_NJGTCkotNztw_8B48VclTpdn"
          />
          <img
            alt="Accenture"
            class="h-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc-ePejgzmslWH06RtZ5zpknPUivDeaY30fhFb8JA8X7UNwkEOAN8kT2786GcK_zWdk0umt-yuHOgWvLRp6sVrgcdP_H1k8Bmboo0MDejgKRIQ0rBLy9POyy-3E-mR7DgOBgCbRU-Rp1jX_HkrtsNxFQdxUhmJhyz-3RLiD5YSuzvrHvYhxf-TuZuj9AqwYd_3O0d4qpBKmG0oc_BIXtrOO7nli8_gDl8fQ0MH0XFGl3LZxK2tw5ihMDxwSIaLknB-qgvaUTBgJq69"
          />
        </div>
      </div>
    </section>
    <!-- 7. Why Choose -->
    <section class="py-xl px-gutter bg-surface-container-lowest">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-headline text-headline-lg text-center mb-xl">
          Why Professionals Choose Job Nova
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg">
          <div class="p-lg bg-surface-container-low rounded-2xl text-center">
            <UIcon name="i-lucide-hub" class="text-[48px] text-primary mb-4" />
            <h4 class="font-headline text-lg font-bold mb-2">One Platform</h4>
            <p class="text-on-surface-variant text-body-md">
              Both Government &amp; Private sectors in one integrated dashboard.
            </p>
          </div>
          <div class="p-lg bg-surface-container-low rounded-2xl text-center">
            <UIcon name="i-lucide-bolt" class="text-[48px] text-primary mb-4" />
            <h4 class="font-headline text-lg font-bold mb-2">Fast Search</h4>
            <p class="text-on-surface-variant text-body-md">
              Intelligent matching system that understands your career goals.
            </p>
          </div>
          <div class="p-lg bg-surface-container-low rounded-2xl text-center">
            <UIcon
              name="i-lucide-verified-user"
              class="text-[48px] text-primary mb-4"
            />
            <h4 class="font-headline text-lg font-bold mb-2">
              Verified Listings
            </h4>
            <p class="text-on-surface-variant text-body-md">
              Every job posting is manually reviewed for authenticity and
              safety.
            </p>
          </div>
          <div class="p-lg bg-surface-container-low rounded-2xl text-center">
            <UIcon
              name="i-lucide-trending-up"
              class="text-[48px] text-primary mb-4"
            />
            <h4 class="font-headline text-lg font-bold mb-2">Career Growth</h4>
            <p class="text-on-surface-variant text-body-md">
              Resources, resume tools, and expert guidance for every stage.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- 8. How It Works -->
    <section class="py-xl px-gutter">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-headline text-headline-lg text-center mb-xl">
          Your Path to Success
        </h2>
        <div class="relative">
          <div
            class="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant -translate-y-1/2 z-0"
          ></div>
          <div class="grid lg:grid-cols-4 gap-xl relative z-10">
            <div class="flex flex-col items-center text-center">
              <div
                class="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center text-headline-md mb-6 shadow-lg"
              >
                1
              </div>
              <h4 class="font-headline font-bold mb-2">Create Account</h4>
              <p class="text-on-surface-variant text-label-md">
                Join thousands of seekers and set up your preferences.
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <div
                class="w-16 h-16 bg-surface-container-lowest text-primary border-2 border-primary rounded-full flex items-center justify-center text-headline-md mb-6 shadow-lg"
              >
                2
              </div>
              <h4 class="font-headline font-bold mb-2">Build Profile</h4>
              <p class="text-on-surface-variant text-label-md">
                Showcase your skills with our smart resume builder.
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <div
                class="w-16 h-16 bg-surface-container-lowest text-primary border-2 border-primary rounded-full flex items-center justify-center text-headline-md mb-6 shadow-lg"
              >
                3
              </div>
              <h4 class="font-headline font-bold mb-2">Apply Smart</h4>
              <p class="text-on-surface-variant text-label-md">
                Use one-click apply for thousands of matching roles.
              </p>
            </div>
            <div class="flex flex-col items-center text-center">
              <div
                class="w-16 h-16 bg-surface-container-lowest text-primary border-2 border-primary rounded-full flex items-center justify-center text-headline-md mb-6 shadow-lg"
              >
                4
              </div>
              <h4 class="font-headline font-bold mb-2">Get Hired</h4>
              <p class="text-on-surface-variant text-label-md">
                Land your dream job and start your new chapter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 9. Success Stories -->
    <section class="py-xl px-gutter bg-surface-container-low">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-headline text-headline-lg text-center mb-xl">
          Success Stories
        </h2>
        <div class="grid md:grid-cols-3 gap-lg">
          <div
            class="bg-surface-container-lowest p-lg rounded-2xl shadow-sm border border-outline-variant"
          >
            <div class="flex items-center gap-4 mb-6">
              <img
                class="w-14 h-14 rounded-full object-cover"
                data-alt="Close up portrait of a smiling young Indian professional man in a formal white shirt, set against a clean, light office backdrop. The lighting is soft and natural, emphasizing a look of confidence and professional success. The overall aesthetic is clean and high-key, aligning with a modern career-focused website."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBeuhfLqEbZ9z07ss-89JkapAhbtPrZzhwZqJTo4BOJeAL7V6J3ZV-qETLh-7LQQ2vXWWA2bUeiZpyNRh1U7x4YNsZP0F9hzlLu0-j9qDfLWw0VHVXQZFpMJjJGmaIC8EADoZot5KogIL1HJfH0DTcEHBwUiVCypNChahw4sthxJjzpyjCyX0nirL1WB8LSr_6q-W0t6hn4suNJ-jiFvNXIDLb3UQXQqR9MvQaYzRrkWiQvHj6pTClddynZmr1m2P36oTLQdtWF5VI"
              />
              <div>
                <h5 class="font-headline font-bold">Rahul Sharma</h5>
                <p class="text-xs text-on-surface-variant">Placed at TCS</p>
              </div>
            </div>
            <p class="text-body-md text-on-surface italic">
              "Job Nova helped me find the perfect balance. I was looking for IT
              roles but also considering PSU exams. The platform gave me clarity
              and the resources to land my current role at TCS."
            </p>
          </div>
          <div
            class="bg-surface-container-lowest p-lg rounded-2xl shadow-sm border border-outline-variant"
          >
            <div class="flex items-center gap-4 mb-6">
              <img
                class="w-14 h-14 rounded-full object-cover"
                data-alt="A professional young Indian woman smiling warmly, wearing a smart casual blazer. She is standing in a brightly lit, modern co-working space with subtle plants and architectural elements in the background. The photo conveys approachable expertise and career achievement in a light-mode, premium UI context."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ8A21welXVcCGomKrIFMkq8Xo2liN1Yp5aV8rJpgrBhV30IGtn0Vi5LDhL6QO7P7RME9zw7eRqyYGEbuDqxL_4jDCpRpQiGvvMzP2-u08bG_DbquJKFeP6QTmUty4eHe5whY5ALIXCwrZHy9pIrHcLgUSck6v-_ehn4EMnZTnlnJj1Q1PBzrLwYxio_IsvR0cCmRMS-KSPVEjo7FFs_l05_80C6s7W4e-7CYi3mWdD3BviGBPFDz7a52_95-xMKkFuJzlfuRmk8oG"
              />
              <div>
                <h5 class="font-headline font-bold">Priya Verma</h5>
                <p class="text-xs text-on-surface-variant">SBI PO Candidate</p>
              </div>
            </div>
            <p class="text-body-md text-on-surface italic">
              "The Govt Job alerts on this platform are second to none. I never
              missed a deadline, and the previous year papers provided in the
              resources section were a game changer."
            </p>
          </div>
          <div
            class="bg-surface-container-lowest p-lg rounded-2xl shadow-sm border border-outline-variant"
          >
            <div class="flex items-center gap-4 mb-6">
              <img
                class="w-14 h-14 rounded-full object-cover"
                data-alt="A portrait of a cheerful young man with a beard, looking directly at the camera with an expression of friendly confidence. He is in a clean, minimalist setting with high-key lighting that creates a bright, energetic feel. The style is professional yet accessible, perfect for a modern job platform success story."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfVEymvLz3mnuaDMxFKH_t-RwOyxQQMMsmEHv-MZ761-hfxKqZlOxzceJZJYfu_afY_MaXj05XH_djqOGZrtChW-ljcfrK37FjujJx4nUDIxAjt4i--52nsn2Sw3hE6HtsC84mF5ksuHwsOHrVRa8ezBY0ObiH1-7P5-dHtPQwhx4MhPx7kqxmjC2DD8MwH7zk7ViUtzID64n9dIiBrvHLCDX9ikJ5ameRXuc5GsSnZHg-JoMpKjcfIOYLnw0TQ9vCm-jzYgojr24s"
              />
              <div>
                <h5 class="font-headline font-bold">Arjun Iyer</h5>
                <p class="text-xs text-on-surface-variant">
                  Marketing Lead, Zomato
                </p>
              </div>
            </div>
            <p class="text-body-md text-on-surface italic">
              "Found my latest role through Job Nova's personalized
              recommendations. It's refreshing to see a platform that actually
              understands the Indian private sector landscape so well."
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- 10. CTA Banner -->
    <section class="py-xl px-gutter">
      <div
        class="max-w-7xl mx-auto bg-primary rounded-[32px] p-xl text-center relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-surface-container-lowest/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"
        ></div>
        <div class="relative z-10">
          <h2 class="font-headline text-display-lg text-on-primary mb-md">
            Ready to Start Your Career Journey?
          </h2>
          <p
            class="text-primary-fixed-dim text-body-lg mb-xl max-w-2xl mx-auto"
          >
            Join over 1 million job seekers who have found their dream careers
            with Job Nova.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button
              class="bg-surface-container-lowest text-primary px-8 py-4 rounded-xl font-bold hover:bg-primary-fixed-dim transition-colors"
            >
              Browse Govt Jobs
            </button>
            <button
              class="bg-primary-container text-on-primary border border-outline-variant/30 px-8 py-4 rounded-xl font-bold hover:bg-surface-container-lowest/10 transition-colors"
            >
              Browse Private Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-outline-variant);
  border-radius: 10px;
}
</style>

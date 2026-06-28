<script setup>
useHead({
  title: "Post a New Job - Job Nova Employer Dashboard"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Simple script to demonstrate live preview capability (vanilla JS micro-interaction)
          document.addEventListener('DOMContentLoaded', () => {
              const titleInput = document.getElementById('jobTitleInput');
              const previewTitle = document.getElementById('previewTitle');
              
              const cityInput = document.getElementById('cityInput');
              const previewCity = document.getElementById('previewCity');
  
              const expMinInput = document.getElementById('expMinInput');
              const previewExp = document.getElementById('previewExp');
  
              titleInput.addEventListener('input', (e) => {
                  previewTitle.textContent = e.target.value || 'Job Title Placeholder';
                  if(e.target.value === '') {
                      titleInput.classList.add('border-error');
                  } else {
                      titleInput.classList.remove('border-error');
                  }
              });
  
              cityInput.addEventListener('input', (e) => {
                  previewCity.textContent = e.target.value ? `${e.target.value}, India` : 'City, India';
              });
  
               expMinInput.addEventListener('input', (e) => {
                  previewExp.textContent = e.target.value ? `${e.target.value}+ Yrs` : '0-5 Yrs';
              });
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- SideNavBar -->
    <nav class="h-screen w-64 fixed left-0 top-0 bg-surface shadow-md flex flex-col h-full p-4 border-r border-outline-variant z-50 hidden md:flex">
    <div class="mb-8 px-4 py-2">
    <h1 class="font-headline-md text-headline-md font-bold text-primary">Job Nova</h1>
    <p class="font-label-md text-label-md text-on-surface-variant">Employer Portal</p>
    </div>
    <div class="flex flex-col gap-2 flex-grow">
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-lg font-label-md text-label-md" href="/employer-dashboard-2">
    <UIcon name="i-lucide-layout-dashboard" data-icon="dashboard" />
                    Dashboard
                </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-lg font-label-md text-label-md" href="/company-profile-employer-dashboard">
    <UIcon name="i-lucide-building-2" data-icon="business" />
                    Company Profile
                </a>
    <a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold hover:bg-surface-container-high scale-[0.98] transition-transform duration-200 font-label-md text-label-md" href="/post-a-new-job-employer-dashboard">
    <UIcon name="i-lucide-plus-square" data-icon="add_box" />
                    Post Job
                </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-lg font-label-md text-label-md" href="/manage-jobs-employer-dashboard">
    <UIcon name="i-lucide-briefcase" data-icon="work" />
                    Manage Jobs
                </a>
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-lg font-label-md text-label-md" href="/applicants-tracking-employer-dashboard">
    <UIcon name="i-lucide-groups" data-icon="groups" />
                    Applicants
                </a>
    </div>
    <div class="mt-auto">
    <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-high rounded-lg font-label-md text-label-md" href="/login">
    <UIcon name="i-lucide-log-out" data-icon="logout" />
                    Logout
                </a>
    </div>
    </nav>
    <!-- Main Content Area -->
    <main class="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
    <!-- TopAppBar -->
    <header class="flex justify-between items-center w-full h-16 pl-4 md:pl-8 pr-4 md:pr-8 z-40 sticky top-0 bg-surface/80 backdrop-blur-md shadow-sm">
    <div class="flex items-center gap-4">
    <h2 class="font-headline-md text-headline-md font-bold text-on-surface hidden md:block">Post a New Job</h2>
    <div class="relative hidden md:block w-64 lg:w-96">
    <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
    <input class="w-full pl-10 pr-4 py-2 bg-surface-container-high border-none rounded-full focus:ring-2 focus:ring-primary focus:bg-surface transition-colors font-body-md text-body-md text-on-surface" placeholder="Search..." type="text"/>
    </div>
    </div>
    <div class="flex items-center gap-4">
    <button class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-high relative">
    <UIcon name="i-lucide-bell" data-icon="notifications" />
    <span class="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
    </button>
    <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-surface-container-high">
    <img alt="Employer Profile" class="w-full h-full object-cover" data-alt="Professional headshot of a corporate manager, soft studio lighting, light blue background, modern corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDULcHEcF1rtrjEyHUr3Np6mj4YcOlI26YBtFbJ_VcPwvBO1PHmZQxj8Ew11VNRi0CUwylr71oRezmuY5T2pNgrMj82N9GUmqERgYyaNA_iVTr9qMyHrFYgw273bg_eaL9A1QSrKS5ka8DI_ls2EJHdkBKKzDrATsH8bt3RXhpiLvYMfsl_ePvpdBvMNp6W9oyclLOTgdzzVxCGzqYX4pX09B9tJvFUskBFoI90UCbyhMN46VVwDMmseWHNOepvQdrmGaM5lli0rKPB"/>
    </div>
    </div>
    </header>
    <div class="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
    <div class="mb-xl">
    <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface">Post a New Job</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant mt-2">Create a job posting and start receiving applications.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
    <!-- Left Column: Form -->
    <div class="lg:col-span-2 space-y-gutter">
    <!-- Job Information -->
    <div class="bg-surface rounded-xl shadow-level-1 p-md md:p-lg border border-surface-container-high">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-surface-container-high">Job Information</h3>
    <div class="space-y-4">
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Job Title *</label>
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" id="jobTitleInput" placeholder="e.g. Senior Software Engineer" type="text"/>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Functional Area *</label>
    <select class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface">
    <option value="">Select Area</option>
    <option value="engineering">Engineering</option>
    <option value="design">Design</option>
    <option value="marketing">Marketing</option>
    </select>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Industry *</label>
    <select class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface">
    <option value="">Select Industry</option>
    <option value="it">Information Technology</option>
    <option value="finance">Finance</option>
    <option value="healthcare">Healthcare</option>
    </select>
    </div>
    </div>
    </div>
    </div>
    <!-- Job Description -->
    <div class="bg-surface rounded-xl shadow-level-1 p-md md:p-lg border border-surface-container-high">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-surface-container-high">Job Description</h3>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Detailed Description *</label>
    <p class="font-label-sm text-label-sm text-on-surface-variant mb-2 font-normal opacity-70">Include roles, responsibilities, and benefits.</p>
    <!-- Fake Rich Text Editor -->
    <div class="border border-surface-container-highest rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
    <div class="bg-surface-container-high px-3 py-2 flex items-center gap-2 border-b border-surface-container-highest flex-wrap">
    <button class="p-1 hover:bg-surface rounded text-on-surface-variant"><UIcon name="i-lucide-format-bold" style="font-size: 18px;" /></button>
    <button class="p-1 hover:bg-surface rounded text-on-surface-variant"><UIcon name="i-lucide-format-italic" style="font-size: 18px;" /></button>
    <button class="p-1 hover:bg-surface rounded text-on-surface-variant"><UIcon name="i-lucide-format-underlined" style="font-size: 18px;" /></button>
    <div class="w-px h-4 bg-outline-variant mx-1"></div>
    <button class="p-1 hover:bg-surface rounded text-on-surface-variant"><UIcon name="i-lucide-format-list-bulleted" style="font-size: 18px;" /></button>
    <button class="p-1 hover:bg-surface rounded text-on-surface-variant"><UIcon name="i-lucide-format-list-numbered" style="font-size: 18px;" /></button>
    </div>
    <textarea class="w-full px-4 py-3 bg-surface-container-highest border-none focus:ring-0 font-body-md text-on-surface resize-y" placeholder="Enter job description here..." rows="6"></textarea>
    </div>
    </div>
    </div>
    <!-- Details, Location, Education (Grid) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
    <!-- Vacancy Details -->
    <div class="bg-surface rounded-xl shadow-level-1 p-md md:p-lg border border-surface-container-high">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-surface-container-high">Details</h3>
    <div class="space-y-4">
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Vacancies</label>
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" min="1" placeholder="e.g. 3" type="number"/>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Experience (Years)</label>
    <div class="flex gap-2 items-center">
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" id="expMinInput" min="0" placeholder="Min" type="number"/>
    <span class="text-on-surface-variant">-</span>
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" min="0" placeholder="Max" type="number"/>
    </div>
    </div>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Salary Range (LPA)</label>
    <div class="flex gap-2 items-center">
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" id="salMinInput" min="0" placeholder="Min" type="number"/>
    <span class="text-on-surface-variant">-</span>
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" min="0" placeholder="Max" type="number"/>
    </div>
    </div>
    </div>
    </div>
    <!-- Location & Education -->
    <div class="space-y-gutter flex flex-col justify-between">
    <div class="bg-surface rounded-xl shadow-level-1 p-md md:p-lg border border-surface-container-high flex-1">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-surface-container-high">Location</h3>
    <div class="space-y-4">
    <select class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface">
    <option value="">Country</option>
    <option value="in">India</option>
    </select>
    <div class="grid grid-cols-2 gap-2">
    <select class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface">
    <option value="">State</option>
    <option value="mh">Maharashtra</option>
    <option value="ka">Karnataka</option>
    </select>
    <input class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" id="cityInput" placeholder="City" type="text"/>
    </div>
    </div>
    </div>
    <div class="bg-surface rounded-xl shadow-level-1 p-md md:p-lg border border-surface-container-high flex-1">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-surface-container-high">Education</h3>
    <div class="space-y-4">
    <select class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface">
    <option value="">UG Qualification</option>
    <option value="btech">B.Tech/B.E.</option>
    <option value="bsc">B.Sc</option>
    </select>
    <select class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface">
    <option value="">PG Qualification</option>
    <option value="mtech">M.Tech</option>
    <option value="mba">MBA</option>
    <option value="none">Not Required</option>
    </select>
    </div>
    </div>
    </div>
    </div>
    <!-- Skills -->
    <div class="bg-surface rounded-xl shadow-level-1 p-md md:p-lg border border-surface-container-high">
    <h3 class="font-headline-md text-headline-md text-on-surface mb-md pb-sm border-b border-surface-container-high">Skills Required</h3>
    <div>
    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Add Tags</label>
    <div class="flex flex-wrap gap-2 mb-3">
    <span class="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-highest text-on-surface rounded-full font-label-sm text-label-sm">Java <button class="hover:text-error material-symbols-outlined text-[14px]">close</button></span>
    <span class="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-highest text-on-surface rounded-full font-label-sm text-label-sm">React <button class="hover:text-error material-symbols-outlined text-[14px]">close</button></span>
    </div>
    <div class="relative">
    <UIcon name="i-lucide-tag" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" />
    <input class="w-full pl-10 pr-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-on-surface" placeholder="Type a skill and press Enter (e.g. Python)" type="text"/>
    </div>
    </div>
    </div>
    <!-- Actions Bottom Mobile (hidden on desktop) -->
    <div class="flex flex-col sm:flex-row gap-4 lg:hidden mt-xl pb-xl">
    <button class="bg-primary hover:bg-on-secondary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg h-[56px] transition-all transform active:scale-95 shadow-md flex-1">Publish Job</button>
    <div class="flex gap-4 flex-1">
    <button class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-6 py-3 rounded-lg h-[44px] transition-colors flex-1 border border-outline-variant">Save Draft</button>
    <button class="text-on-surface-variant hover:text-error font-label-md text-label-md px-4 py-3 h-[44px] transition-colors">Cancel</button>
    </div>
    </div>
    </div>
    <!-- Right Column: Live Preview & Actions -->
    <div class="lg:col-span-1">
    <div class="sticky top-[100px] space-y-gutter">
    <!-- Actions Desktop -->
    <div class="hidden lg:flex flex-col gap-4 bg-surface rounded-xl shadow-level-1 p-md border border-surface-container-high">
    <button class="bg-primary hover:bg-on-secondary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg w-full transition-all transform active:scale-95 shadow-md flex justify-center items-center gap-2">
    <UIcon name="i-lucide-send" class="text-[20px]" /> Publish Job
                                </button>
    <div class="flex gap-2">
    <button class="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex-1 border border-outline-variant text-center">Save Draft</button>
    <button class="text-on-surface-variant hover:text-error hover:bg-error-container font-label-md text-label-md px-4 py-2 rounded-lg transition-colors text-center">Cancel</button>
    </div>
    </div>
    <!-- Live Preview Card -->
    <div class="bg-surface rounded-xl shadow-level-2 border border-surface-container-high overflow-hidden relative">
    <div class="bg-surface-container-low px-4 py-3 border-b border-surface-container-highest flex items-center justify-between">
    <span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2"><UIcon name="i-lucide-eye" class="text-[18px]" /> Live Preview</span>
    <span class="bg-secondary/10 text-secondary px-2 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider">Card View</span>
    </div>
    <div class="p-md">
    <div class="flex items-start gap-4 mb-4">
    <div class="w-12 h-12 rounded bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden shrink-0">
    <img alt="Company Logo" class="w-full h-full object-cover" data-alt="Modern corporate logo, sleek abstract geometric shape in Nova Blue (var(--color-primary-container)), white background, clean vector style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdBr7ofdqBi6X4nqEQGnVxBD76eAHbMDrt6fHUZtVemq-6qX7PLoAvzCpvAg71DY6M9fH3l4nZbrSBET8S9z-GPaZcIRsbo3ywwcDZGmjFZXkO4F91f0ZZNWxlmJfoNYbyXwgsHrjcviLqQZCIsX1wOFnBtY6p8BkiYDUjv3uZvynMPMcxbgA4tMIRyjpKdDLjZn-jMSyRoIWl5AVhFp1xR-qPAz15Ss6crizpt529zxmI4Gz_fmwrtu6a96dZ4M0kE9sTsdaCEsVo"/>
    </div>
    <div>
    <h4 class="font-headline-md text-headline-md text-on-surface leading-tight" id="previewTitle">Job Title Placeholder</h4>
    <p class="font-body-md text-body-md text-primary mt-1">TechCorp India</p>
    </div>
    </div>
    <div class="flex flex-wrap gap-2 mb-4">
    <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-map-pin" class="text-[14px]" /> <span id="previewCity">City, India</span>
    </span>
    <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-briefcase" class="text-[14px]" /> <span id="previewExp">0-5 Yrs</span>
    </span>
    <span class="inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant">
    <UIcon name="i-lucide-banknote" class="text-[14px]" /> <span id="previewSal">Not Disclosed</span>
    </span>
    </div>
    <div class="mt-4 pt-4 border-t border-surface-container-highest">
    <p class="font-body-md text-body-md text-on-surface-variant line-clamp-3 text-sm">
                                            This is a preview of how your job description will look to candidates. Start typing in the form to see updates here.
                                        </p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </main>
    
  </div>
</template>

<style scoped>
body { background-color: #F9FAFB; }
        .shadow-level-1 { box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08); }
        .shadow-level-2 { box-shadow: 0px 8px 30px rgba(26, 115, 232, 0.12); }
</style>

<script setup>
useHead({
  title: "Job Nova - Manage Jobs",
});
</script>

<template>
  <div>
    <!-- SideNavBar -->
    <nav
      class="bg-surface h-screen w-64 fixed left-0 top-0 shadow-sm flex flex-col h-full border-r border-outline-variant z-50"
    >
      <div class="p-6">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg"
          >
            C
          </div>
          <div>
            <h1
              class="font-headline-md text-headline-md font-bold text-primary"
            >
              Job Nova
            </h1>
            <p class="font-label-sm text-label-sm text-on-surface-variant">
              Employer Console
            </p>
          </div>
        </div>
      </div>
      <div class="flex-1 px-4 py-6 flex flex-col gap-2">
        <a
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 scale-98 active:scale-95 transition-transform rounded-lg"
          href="/employer-dashboard-2"
        >
          <UIcon name="i-lucide-layout-dashboard" data-weight="fill" />
          <span class="font-label-md text-label-md">Dashboard</span>
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 scale-98 active:scale-95 transition-transform rounded-lg"
          href="/company-profile-employer-dashboard"
        >
          <UIcon name="i-lucide-building-2" data-weight="fill" />
          <span class="font-label-md text-label-md">Company Profile</span>
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 scale-98 active:scale-95 transition-transform rounded-lg"
          href="/post-a-new-job-employer-dashboard"
        >
          <UIcon name="i-lucide-post-add" data-weight="fill" />
          <span class="font-label-md text-label-md">Post Job</span>
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-primary bg-secondary-container/10 rounded-lg font-bold hover:bg-surface-container-low transition-all duration-200 scale-98 active:scale-95 transition-transform"
          href="/manage-jobs-employer-dashboard"
        >
          <UIcon name="i-lucide-briefcase" data-weight="fill" />
          <span class="font-label-md text-label-md">Manage Jobs</span>
        </a>
        <a
          class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 scale-98 active:scale-95 transition-transform rounded-lg"
          href="/applicants-tracking-employer-dashboard"
        >
          <UIcon name="i-lucide-groups" data-weight="fill" />
          <span class="font-label-md text-label-md">Applicants</span>
        </a>
        <div class="mt-auto">
          <a
            class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 scale-98 active:scale-95 transition-transform rounded-lg"
            href="/login"
          >
            <UIcon name="i-lucide-log-out" data-weight="fill" />
            <span class="font-label-md text-label-md">Logout</span>
          </a>
        </div>
      </div>
    </nav>
    <!-- Main Content Area -->
    <div class="flex-1 ml-64 min-h-screen flex flex-col">
      <!-- TopNavBar -->
      <header
        class="bg-surface/80 backdrop-blur-md border-b border-outline-variant h-16 fixed top-0 right-0 w-[calc(100%-256px)] flex justify-between items-center px-8 z-40"
      >
        <div class="flex-1 flex items-center">
          <!-- Search bar usually here based on JSON search_bar: on_left, but prompt asked for title. Adjusting slightly to fit both generic topnav intent and prompt request for title. We'll put search here as per JSON, but make it job specific. -->
          <div class="relative w-96 hidden md:block">
            <UIcon
              name="i-lucide-search"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              class="w-full h-10 pl-12 pr-4 rounded-xl bg-surface-container-highest border-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant"
              placeholder="Quick search..."
              type="text"
            />
          </div>
          <h1
            class="font-headline-md text-headline-md font-bold text-primary ml-4 hidden"
          >
            Job Nova
          </h1>
        </div>
        <div class="flex items-center gap-4">
          <button
            class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-high"
          >
            <UIcon name="i-lucide-bell" />
          </button>
          <button
            class="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-high"
          >
            <UIcon name="i-lucide-settings" />
          </button>
          <div
            class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant ml-2"
          >
            <img
              alt="Employer Profile"
              class="w-full h-full object-cover"
              data-alt="A professional headshot of a corporate manager in a modern office setting. Light mode aesthetic with clean white and subtle blue tones. High-end editorial photography style."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwLY6jOBl2FGxsNSMamFS0LkAGQtIHB2D51gzwuWf3ttrTvkbmzEJFJiHDK3cZZI7kIhZhlXalBnZGFxSkXYTskMeH0fnZoW7giMsYS0ktb0h7h59qdxeoOsJgPFmxBpNM3L1DeuxotinuK5gkZnYlsw6x11_uBHdSbjq1-MzMU0pHIKXTox28wf_585cunM5VOFcS21Vgh7pQNRMwVMncn-SfguQXm2Km9D6xOO_Jhl8x-7a5huMuPl0PiA7909l2GosC7DNWEgjS"
            />
          </div>
        </div>
      </header>
      <!-- Page Content -->
      <main class="flex-1 mt-16 p-8 max-w-[1280px] mx-auto w-full">
        <!-- Page Header -->
        <div class="mb-8 flex justify-between items-end">
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface mb-2">
              Manage Jobs
            </h1>
            <p class="font-body-md text-body-md text-on-surface-variant">
              View, track and manage all your job postings.
            </p>
          </div>
          <button
            class="bg-primary hover:bg-surface-tint text-on-primary px-6 py-3 rounded-[12px] font-label-md text-label-md flex items-center gap-2 transition-transform scale-98 active:scale-95"
          >
            <UIcon name="i-lucide-plus" class="text-[20px]" />
            Post a New Job
          </button>
        </div>
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Active Jobs -->
          <div
            class="bg-surface-container-lowest rounded-2xl p-6 card-shadow flex items-start justify-between border border-outline-variant/30"
          >
            <div>
              <p
                class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2"
              >
                Active Jobs
              </p>
              <h2 class="font-display-lg text-display-lg text-on-surface">
                12
              </h2>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-primary"
            >
              <UIcon name="i-lucide-history" class="text-[28px]" />
            </div>
          </div>
          <!-- Draft Jobs -->
          <div
            class="bg-surface-container-lowest rounded-2xl p-6 card-shadow flex items-start justify-between border border-outline-variant/30"
          >
            <div>
              <p
                class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2"
              >
                Draft Jobs
              </p>
              <h2 class="font-display-lg text-display-lg text-on-surface">2</h2>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-surface-container-highest/50 flex items-center justify-center text-on-surface-variant"
            >
              <UIcon name="i-lucide-edit-document" class="text-[28px]" />
            </div>
          </div>
          <!-- Expired Jobs -->
          <div
            class="bg-surface-container-lowest rounded-2xl p-6 card-shadow flex items-start justify-between border border-outline-variant/30"
          >
            <div>
              <p
                class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2"
              >
                Expired Jobs
              </p>
              <h2 class="font-display-lg text-display-lg text-on-surface">5</h2>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-error-container/30 flex items-center justify-center text-error"
            >
              <UIcon name="i-lucide-event-busy" class="text-[28px]" />
            </div>
          </div>
          <!-- Total Applicants -->
          <div
            class="bg-surface-container-lowest rounded-2xl p-6 card-shadow flex items-start justify-between border border-outline-variant/30"
          >
            <div>
              <p
                class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2"
              >
                Total Applicants
              </p>
              <h2 class="font-display-lg text-display-lg text-on-surface">
                248
              </h2>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary"
            >
              <UIcon name="i-lucide-users" class="text-[28px]" />
            </div>
          </div>
        </div>
        <!-- Main Panel: Filters & Table -->
        <div
          class="bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/30 overflow-hidden"
        >
          <!-- Filters Row -->
          <div
            class="p-6 border-b border-outline-variant/40 flex flex-col md:flex-row gap-4 justify-between items-center bg-surface/30"
          >
            <div class="relative w-full md:w-[400px]">
              <UIcon
                name="i-lucide-search"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
              />
              <input
                class="w-full h-12 pl-12 pr-4 rounded-[12px] bg-surface-container-highest/40 border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant"
                placeholder="Search by job title..."
                type="text"
              />
            </div>
            <div class="flex gap-4 w-full md:w-auto">
              <select
                class="h-12 px-4 rounded-[12px] bg-surface-container-highest/40 border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all font-body-md text-body-md text-on-surface appearance-none pr-10 cursor-pointer"
                height="24"
                style="background-image: url('data:image/svg+xml;utf8,&lt;svg fill=\"
                viewbox='\"0'
                width='\"24\"'
                xmlns='\"http://www.w3.org/2000/svg\"'
              >
                '); background-repeat: no-repeat; background-position-x: 95%;
                background-position-y: 50%;"&gt;
                <option>Status: All</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Expired</option>
              </select>
              <select
                class="h-12 px-4 rounded-[12px] bg-surface-container-highest/40 border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all font-body-md text-body-md text-on-surface appearance-none pr-10 cursor-pointer"
                height='\"24\"'
                style="background-image: url('data:image/svg+xml;utf8,&lt;svg fill=\"
                viewbox='\"0'
                width='\"24\"'
                xmlns='\"http://www.w3.org/2000/svg\"'
              >
                '); background-repeat: no-repeat; background-position-x: 95%;
                background-position-y: 50%;"&gt;
                <option>Sort: Newest</option>
                <option>Sort: Oldest</option>
                <option>Most Applicants</option>
              </select>
            </div>
          </div>
          <!-- Job List Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="border-b border-outline-variant/40 bg-surface-container-lowest"
                >
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    Job Title
                  </th>
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    Location
                  </th>
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    Vacancies
                  </th>
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    Applicants
                  </th>
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    Posted Date
                  </th>
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    Status
                  </th>
                  <th
                    class="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-semibold text-right"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/20">
                <!-- Row 1 -->
                <tr class="table-row-hover transition-colors group">
                  <td class="py-4 px-6">
                    <p
                      class="font-headline-md text-[16px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                    >
                      Senior UI Designer
                    </p>
                    <p
                      class="font-body-md text-[13px] text-on-surface-variant mt-1"
                    >
                      Design Dept • Full Time
                    </p>
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    Mumbai (Hybrid)
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    2
                  </td>
                  <td class="py-4 px-6">
                    <a
                      class="inline-flex items-center justify-center bg-primary-container/10 text-primary font-label-md text-label-md px-3 py-1 rounded-full hover:bg-primary-container/20 transition-colors"
                      href="/applicants-tracking-employer-dashboard"
                    >
                      45
                      <UIcon
                        name="i-lucide-external-link"
                        class="text-[14px] ml-1"
                      />
                    </a>
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    12 Oct 2023
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#137333] border border-[#ceead6]"
                    >
                      Active
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                        title="View Job"
                      >
                        <UIcon name="i-lucide-eye" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <UIcon name="i-lucide-pencil" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <UIcon name="i-lucide-trash-2" class="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Row 2 -->
                <tr class="table-row-hover transition-colors group">
                  <td class="py-4 px-6">
                    <p
                      class="font-headline-md text-[16px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                    >
                      Frontend Developer
                    </p>
                    <p
                      class="font-body-md text-[13px] text-on-surface-variant mt-1"
                    >
                      Engineering • Full Time
                    </p>
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    Bangalore (Remote)
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    3
                  </td>
                  <td class="py-4 px-6">
                    <a
                      class="inline-flex items-center justify-center bg-primary-container/10 text-primary font-label-md text-label-md px-3 py-1 rounded-full hover:bg-primary-container/20 transition-colors"
                      href="/applicants-tracking-employer-dashboard"
                    >
                      128
                      <UIcon
                        name="i-lucide-external-link"
                        class="text-[14px] ml-1"
                      />
                    </a>
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    05 Oct 2023
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#137333] border border-[#ceead6]"
                    >
                      Active
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                        title="View Job"
                      >
                        <UIcon name="i-lucide-eye" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <UIcon name="i-lucide-pencil" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <UIcon name="i-lucide-trash-2" class="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Row 3 -->
                <tr class="table-row-hover transition-colors group">
                  <td class="py-4 px-6">
                    <p
                      class="font-headline-md text-[16px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                    >
                      Product Manager
                    </p>
                    <p
                      class="font-body-md text-[13px] text-on-surface-variant mt-1"
                    >
                      Product • Contract
                    </p>
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    Pune (On-site)
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    1
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="font-body-md text-body-md text-on-surface-variant"
                      >0</span
                    >
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    --
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant border border-outline-variant/50"
                    >
                      Draft
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                        title="Edit Draft"
                      >
                        <UIcon name="i-lucide-pencil" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                        title="Delete Draft"
                      >
                        <UIcon name="i-lucide-trash-2" class="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- Row 4 -->
                <tr
                  class="table-row-hover transition-colors group opacity-60 hover:opacity-100"
                >
                  <td class="py-4 px-6">
                    <p
                      class="font-headline-md text-[16px] font-semibold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                    >
                      Marketing Specialist
                    </p>
                    <p
                      class="font-body-md text-[13px] text-on-surface-variant mt-1"
                    >
                      Marketing • Full Time
                    </p>
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    Delhi (Hybrid)
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    2
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="font-body-md text-body-md text-on-surface-variant"
                      >75</span
                    >
                  </td>
                  <td
                    class="py-4 px-6 font-body-md text-body-md text-on-surface"
                  >
                    01 Aug 2023
                  </td>
                  <td class="py-4 px-6">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-error-container/50 text-error border border-error/20"
                    >
                      Expired
                    </span>
                  </td>
                  <td class="py-4 px-6 text-right">
                    <div
                      class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button
                        class="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                        title="Republish Job"
                      >
                        <UIcon name="i-lucide-rotate-cw" class="text-[20px]" />
                      </button>
                      <button
                        class="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <UIcon name="i-lucide-trash-2" class="text-[20px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination (Simple) -->
          <div
            class="p-4 border-t border-outline-variant/40 flex items-center justify-between bg-surface-container-lowest"
          >
            <p class="font-body-md text-[13px] text-on-surface-variant">
              Showing 1 to 4 of 19 entries
            </p>
            <div class="flex gap-1">
              <button
                class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50"
                disabled=""
              >
                <UIcon name="i-lucide-chevron-left" class="text-[18px]" />
              </button>
              <button
                class="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-on-primary font-label-md text-label-md"
              >
                1
              </button>
              <button
                class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md"
              >
                2
              </button>
              <button
                class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md"
              >
                3
              </button>
              <button
                class="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <UIcon name="i-lucide-chevron-right" class="text-[18px]" />
              </button>
            </div>
          </div>
        </div>
        <!-- Conceptual Empty State (Hidden by default, shown here as conceptual requirement) -->
        <div
          class="hidden flex flex-col items-center justify-center py-20 mt-8 bg-surface-container-lowest rounded-2xl card-shadow border border-outline-variant/30 border-dashed"
        >
          <div
            class="w-48 h-48 mb-6 bg-surface-container rounded-full flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-work-off"
              class="text-[64px] text-primary/40"
            />
          </div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-2">
            No jobs posted yet
          </h3>
          <p
            class="font-body-md text-body-md text-on-surface-variant mb-6 text-center max-w-md"
          >
            Your active, draft, and past job postings will appear here. Get
            started by posting your first opportunity.
          </p>
          <button
            class="bg-primary hover:bg-surface-tint text-on-primary px-6 py-3 rounded-[12px] font-label-md text-label-md flex items-center gap-2 transition-transform scale-98 active:scale-95 shadow-md"
          >
            <UIcon name="i-lucide-plus" class="text-[20px]" />
            Post Your First Job
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: var(--color-surface);
}
.card-shadow {
  box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
}
.table-row-hover:hover {
  background-color: var(--color-surface-container-low);
}
</style>

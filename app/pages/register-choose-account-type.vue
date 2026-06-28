<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

useHead({
  title: "Registration Step 1 - Job Nova",
});

const router = useRouter();
const selectedType = ref(null);

function selectType(type) {
  selectedType.value = type;
}

function handleContinue() {
  if (selectedType.value === "seeker") {
    router.push("/register-job-seeker");
  } else if (selectedType.value === "recruiter") {
    router.push("/register-employer-step-1");
  }
}
</script>

<template>
  <div>
    <!-- Top Navigation Header (Shared Component Mapping) -->
    <header
      class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50"
    >
      <div
        class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto"
      >
        <NuxtLink
          to="/"
          class="font-headline-md text-headline-md font-bold text-primary"
        >
          Job Nova
        </NuxtLink>
        <div class="hidden md:flex gap-lg items-center">
          <span
            class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >About Us</span
          >
          <span
            class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >Help Center</span
          >
        </div>
      </div>
    </header>
    <main
      class="flex-grow flex flex-col items-center justify-center px-lg py-xl"
    >
      <!-- Progress Indicator -->
      <div class="w-full mb-xl">
        <div class="flex justify-between items-center mb-sm">
          <span class="font-label-md text-label-md text-primary font-bold"
            >Step 1 of 3</span
          >
          <span class="font-label-md text-label-md text-on-surface-variant"
            >Account Type</span
          >
        </div>
        <div
          class="h-1.5 w-full bg-surface-container rounded-full overflow-hidden"
        >
          <div class="h-full bg-primary w-1/3 transition-all duration-500" />
        </div>
      </div>
      <!-- Heading Section -->
      <div class="text-center mb-xl">
        <h1 class="font-headline-lg text-headline-lg text-on-background mb-sm">
          Choose Your Journey
        </h1>
        <p class="font-body-md text-body-md text-on-surface-variant">
          Welcome to Job Nova. To provide the best experience for you, please
          select the type of account you'd like to create.
        </p>
      </div>
      <!-- Account Type Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-lg w-full max-w-4xl">
        <!-- Job Seeker Card -->
        <div
          class="selection-card cursor-pointer group bg-surface-container-lowest p-xl rounded-xl border-2 border-outline-variant shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col items-center text-center"
          :class="{ active: selectedType === 'seeker' }"
          tabindex="0"
          role="radio"
          :aria-checked="selectedType === 'seeker'"
          @click="selectType('seeker')"
          @keydown.enter="selectType('seeker')"
          @keydown.space.prevent="selectType('seeker')"
        >
          <div
            class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-lg group-hover:bg-primary-fixed transition-colors"
          >
            <UIcon
              name="i-lucide-person-search"
              class="text-[32px] text-primary"
              data-icon="person_search"
            />
          </div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-md">
            Job Seeker
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant mb-xl">
            Apply for Government and Private Jobs
          </p>
          <div class="mt-auto">
            <div
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center card-radio"
              :class="
                selectedType === 'seeker'
                  ? 'border-primary'
                  : 'border-outline-variant'
              "
            >
              <div
                class="w-3 h-3 rounded-full bg-primary transition-transform radio-dot"
                :class="selectedType === 'seeker' ? 'scale-100' : 'scale-0'"
              />
            </div>
          </div>
        </div>
        <!-- Recruiter Card -->
        <div
          class="selection-card cursor-pointer group bg-surface-container-lowest p-xl rounded-xl border-2 border-outline-variant shadow-[0px_4px_20px_rgba(26,115,232,0.08)] flex flex-col items-center text-center"
          :class="{ active: selectedType === 'recruiter' }"
          tabindex="0"
          role="radio"
          :aria-checked="selectedType === 'recruiter'"
          @click="selectType('recruiter')"
          @keydown.enter="selectType('recruiter')"
          @keydown.space.prevent="selectType('recruiter')"
        >
          <div
            class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-lg group-hover:bg-primary-fixed transition-colors"
          >
            <UIcon
              name="i-lucide-business-center"
              class="text-[32px] text-primary"
              data-icon="business_center"
            />
          </div>
          <h3 class="font-headline-md text-headline-md text-on-surface mb-md">
            Recruiter / Employer
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant mb-xl">
            Post jobs and hire candidates
          </p>
          <div class="mt-auto">
            <div
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center card-radio"
              :class="
                selectedType === 'recruiter'
                  ? 'border-primary'
                  : 'border-outline-variant'
              "
            >
              <div
                class="w-3 h-3 rounded-full bg-primary transition-transform radio-dot"
                :class="selectedType === 'recruiter' ? 'scale-100' : 'scale-0'"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Action Button -->
      <div class="mt-xl flex flex-col items-center">
        <button
          class="px-8 h-14 bg-primary-container text-on-primary font-label-md text-label-md rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-sm"
          :class="{
            'opacity-50 cursor-not-allowed': !selectedType,
            'hover:bg-primary shadow-lg': selectedType,
          }"
          :disabled="!selectedType"
          @click="handleContinue"
        >
          Continue
          <UIcon name="i-lucide-arrow-right" data-icon="arrow_forward" />
        </button>
        <p
          class="text-center mt-lg font-label-md text-label-md text-on-surface-variant"
        >
          Already have an account?
          <NuxtLink class="text-primary font-bold hover:underline" to="/login"
            >Login</NuxtLink
          >
        </p>
      </div>
    </main>
    <!-- Visual Background Element -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary opacity-5 blur-[120px] rounded-full"
      />
      <div
        class="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-secondary opacity-5 blur-[100px] rounded-full"
      />
    </div>
    <!-- Footer (Shared Component Mapping) -->
    <footer
      class="w-full mt-xl bg-surface-container-low border-t border-outline-variant"
    >
      <div
        class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-7xl mx-auto gap-md"
      >
        <NuxtLink
          to="/"
          class="font-headline-md text-headline-md font-bold text-primary"
        >
          Job Nova
        </NuxtLink>
        <div class="flex gap-md">
          <span
            class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all cursor-pointer"
            >Privacy Policy</span
          >
          <span
            class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all cursor-pointer"
            >Terms of Service</span
          >
        </div>
        <div class="font-label-md text-label-md text-on-surface-variant">
          © 2024 Job Nova India. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.selection-card {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.selection-card:hover {
  transform: translateY(-4px);
}
.selection-card.active {
  border-color: var(--color-primary);
  background-color: var(--color-surface-container-low);
  box-shadow: 0px 8px 30px rgba(26, 115, 232, 0.12);
}
</style>

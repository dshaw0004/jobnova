<script setup lang="ts">
import { ref, watch } from 'vue'

const modelValue = defineModel<string>({ default: '' })

// We want to initialize selectedCity and otherCity based on the initial modelValue
const selectedCity = ref('')
const otherCity = ref('')

const predefinedCities = [
  'Ahmedabad', 'Bangalore', 'Bhopal', 'Bhubaneswar', 'Chandigarh', 'Chennai', 'Coimbatore', 
  'Dehradun', 'Delhi', 'Gurgaon', 'Guwahati', 'Hyderabad', 'Indore', 'Jaipur', 'Jammu', 
  'Kochi', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Noida', 'Panaji', 
  'Patna', 'Pune', 'Raipur', 'Ranchi', 'Srinagar', 'Surat', 'Thiruvananthapuram', 
  'Vadodara', 'Visakhapatnam'
]

// Initialize based on incoming modelValue
watch(modelValue, (newVal) => {
  const currentComputedVal = selectedCity.value === 'Other' ? otherCity.value : selectedCity.value
  if (newVal === currentComputedVal) return

  if (!newVal) {
    selectedCity.value = ''
    otherCity.value = ''
  } else if (predefinedCities.includes(newVal)) {
    selectedCity.value = newVal
    otherCity.value = ''
  } else {
    selectedCity.value = 'Other'
    otherCity.value = newVal
  }
}, { immediate: true })

// Propagate updates to parent
watch([selectedCity, otherCity], () => {
  const nextVal = selectedCity.value === 'Other' ? otherCity.value : selectedCity.value
  if (modelValue.value !== nextVal) {
    modelValue.value = nextVal
  }
})
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <select
      v-model="selectedCity"
      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body-md text-on-surface"
    >
      <option disabled value="">Select City</option>
      <option v-for="city in predefinedCities" :key="city" :value="city">{{ city }}</option>
      <option value="Other">Other</option>
    </select>
    
    <input
      v-if="selectedCity === 'Other'"
      v-model="otherCity"
      required
      class="w-full px-4 py-3 bg-surface-container-highest border border-transparent rounded-lg focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 font-body-md text-on-surface"
      placeholder="Specify city name"
      type="text"
    />
  </div>
</template>

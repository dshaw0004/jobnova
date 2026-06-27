<script setup>
useHead({
  title: "Registration Step 2A - Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  function togglePassword(inputId, iconId) {
              const passwordInput = document.getElementById(inputId);
              const icon = document.getElementById(iconId);
              
              if (passwordInput.type === "password") {
                  passwordInput.type = "text";
                  icon.innerText = "visibility_off";
              } else {
                  passwordInput.type = "password";
                  icon.innerText = "visibility";
              }
          }
  
          document.getElementById('registrationForm').addEventListener('submit', function(e) {
              e.preventDefault();
              // Basic confirmation logic for prototype
              const pass = document.getElementById('password').value;
              const confirm = document.getElementById('confirmPassword').value;
              
              if (pass !== confirm) {
                  alert("Passwords do not match!");
                  return;
              }
              
              alert("Account details submitted! Redirecting to Step 3...");
          });
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar (Shared Component) -->
    <header class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
    <nav class="flex justify-between items-center h-[72px] px-lg max-w-container-max mx-auto">
    <div class="flex items-center gap-lg">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    </div>
    <div class="flex items-center gap-md">
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Login</a>
    <button class="bg-primary text-on-primary px-lg py-2 rounded-xl font-body-md text-body-md active:scale-95 duration-150">Post a Job</button>
    </div>
    </nav>
    </header>
    <main class="flex-grow flex items-center justify-center py-xl px-gutter">
    <div class="w-full max-w-[560px] bg-surface-container-lowest rounded-xl registration-card-shadow p-lg md:p-xl">
    <!-- Progress Indicator -->
    <div class="mb-xl"><div class="flex justify-between items-center mb-sm"><span class="font-label-md text-label-md text-primary font-semibold">Step 1 of 2</span><span class="font-label-md text-label-md text-on-surface-variant">Basic Information</span></div><div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden"><div class="bg-primary h-full rounded-full transition-all duration-500" style="width: 50%;"></div></div></div>
    <!-- Header Section -->
    <div class="mb-lg"><h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Basic Information</h1><p class="font-body-md text-body-md text-on-surface-variant">Let's start with your basic details to set up your profile.</p></div>
    <!-- Form -->
    <form class="space-y-md" id="registrationForm"><div class="space-y-md" id="step1-fields"><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface" for="fullName">Full Name</label><div class="relative"><UIcon name="i-lucide-user" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" /><input class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="fullName" placeholder="Enter your full name" required="" type="text"></div></div><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface" for="email">Email Address</label><div class="relative"><UIcon name="i-lucide-mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" /><input class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="email" placeholder="name@company.com" required="" type="email"></div></div><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface" for="mobile">Phone Number</label><div class="relative flex"><div class="flex items-center px-4 bg-surface-container-high rounded-l-xl text-on-surface-variant font-body-md border-r border-outline-variant">+91</div><input class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-r-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="mobile" placeholder="9876543210" required="" type="tel"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-md"><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface" for="password">Password</label><div class="relative"><UIcon name="i-lucide-lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" /><input class="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="password" placeholder="••••••••" required="" type="password"></div></div><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface" for="confirmPassword">Confirm Password</label><div class="relative"><UIcon name="i-lucide-lock-reset" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" /><input class="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="confirmPassword" placeholder="••••••••" required="" type="password"></div></div></div></div><div class="hidden space-y-md" id="step2-fields"><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface">Experience &amp; Skills</label><div class="grid grid-cols-1 md:grid-cols-2 gap-md"><input class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary" placeholder="Years of Experience" type="number"><input class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary" placeholder="Key Skills (e.g. React, Java)" type="text"></div></div><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface">Education</label><div class="grid grid-cols-1 md:grid-cols-2 gap-md"><select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary"><option>UG Qualification</option><option>B.Tech</option><option>B.Sc</option><option>B.Com</option></select><select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary"><option>PG Qualification</option><option>M.Tech</option><option>MBA</option><option>M.Sc</option></select></div></div><div class="space-y-xs"><label class="font-label-md text-label-md text-on-surface">Location</label><p class="text-label-sm text-on-surface-variant mb-xs">Select your location to receive better job recommendations.</p><div class="grid grid-cols-1 md:grid-cols-3 gap-sm"><select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary"><option>Country</option><option>India</option></select><select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary"><option>State</option></select><select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary"><option>City</option></select></div></div></div><button class="w-full h-[56px] bg-primary text-on-primary rounded-xl font-headline-md text-headline-md font-semibold hover:bg-secondary transition-all active:scale-[0.98] duration-150 mt-lg" id="submitBtn" type="submit">Continue</button><p class="text-center font-body-md text-body-md text-on-surface-variant mt-md">Already have an account? <a class="text-primary font-semibold hover:underline" href="#">Login here</a></p></form>
    </div>
    </main>
    <!-- Footer (Shared Component) -->
    <footer class="w-full mt-xl bg-surface-container-low border-t border-outline-variant">
    <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-container-max mx-auto gap-lg">
    <div class="flex flex-col items-center md:items-start">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">© 2024 Job Nova India. All rights reserved.</p>
    </div>
    <div class="flex flex-wrap justify-center gap-lg">
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">About Us</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Contact</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Privacy Policy</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Terms of Service</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Help Center</a>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body {
            background-color: #f9f9ff;
            font-family: 'Inter', sans-serif;
        }
        
        .registration-card-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
</style>

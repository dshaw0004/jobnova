<script setup>
useHead({
  title: "Job Seeker Registration - Job Nova"
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
  
          function nextStep() {
              // Check basic validation for step 1
              const step1Fields = ['fullName', 'email', 'phone', 'password', 'confirmPassword'];
              let isValid = true;
              step1Fields.forEach(id => {
                  if(!document.getElementById(id).value) isValid = false;
              });
  
              if(!isValid) {
                  alert("Please fill in all basic information fields.");
                  return;
              }
  
              if(document.getElementById('password').value !== document.getElementById('confirmPassword').value) {
                  alert("Passwords do not match.");
                  return;
              }
  
              document.getElementById('step1').classList.add('hidden-step');
              setTimeout(() => {
                  document.getElementById('step1').classList.add('hidden');
                  document.getElementById('step2').classList.remove('hidden');
                  document.getElementById('step2').classList.remove('hidden-step');
                  
                  // Update Progress Indicator
                  document.getElementById('stepIndicator').innerText = "Step 2 of 2";
                  document.getElementById('stepTitle').innerText = "Professional Information";
                  document.getElementById('progressBar').style.width = "100%";
              }, 300);
          }
  
          function prevStep() {
              document.getElementById('step2').classList.add('hidden-step');
              setTimeout(() => {
                  document.getElementById('step2').classList.add('hidden');
                  document.getElementById('step1').classList.remove('hidden');
                  document.getElementById('step1').classList.remove('hidden-step');
                  
                  // Update Progress Indicator
                  document.getElementById('stepIndicator').innerText = "Step 1 of 2";
                  document.getElementById('stepTitle').innerText = "Basic Information";
                  document.getElementById('progressBar').style.width = "50%";
              }, 300);
          }
  
          document.getElementById('multiStepForm').addEventListener('submit', function(e) {
              e.preventDefault();
              alert("Account created successfully! Redirecting to dashboard...");
          });
  
          // Initialize helper: ensuring state matches first step
          window.onload = function() {
              document.getElementById('step2').classList.add('hidden');
          };
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar -->
    <header class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
    <nav class="flex justify-between items-center h-[72px] px-lg max-w-7xl mx-auto">
    <div class="flex items-center gap-lg">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    </div>
    <div class="flex items-center gap-md">
    <a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/login">Login</a>
    <button class="bg-primary text-on-primary px-lg py-2 rounded-xl font-body-md text-body-md active:scale-95 duration-150">Post a Job</button>
    </div>
    </nav>
    </header>
    <main class="flex-grow flex items-center justify-center py-xl px-gutter">
    <div class="w-full max-w-[600px] bg-surface-container-lowest rounded-xl registration-card-shadow p-lg md:p-xl">
    <!-- Progress Indicator -->
    <div class="mb-xl">
    <div class="flex justify-between items-center mb-sm">
    <span class="font-label-md text-label-md text-primary font-semibold" id="stepIndicator">Step 1 of 2</span>
    <span class="font-label-md text-label-md text-on-surface-variant" id="stepTitle">Basic Information</span>
    </div>
    <div class="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
    <div class="bg-primary h-full rounded-full transition-all duration-500" id="progressBar" style="width: 50%;"></div>
    </div>
    </div>
    <!-- Form Container -->
    <form id="multiStepForm">
    <!-- Step 1: Basic Information -->
    <div class="step-transition" id="step1">
    <div class="mb-lg">
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Join Job Nova</h1>
    <p class="font-body-md text-body-md text-on-surface-variant">Let's start with your basic details to set up your account.</p>
    </div>
    <div class="space-y-md">
    <!-- Full Name -->
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="fullName">Full Name</label>
    <div class="relative">
    <UIcon name="i-lucide-user" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="fullName" placeholder="Enter your full name" required="" type="text">
    </div>
    </div>
    <!-- Email Address -->
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="email">Email Address</label>
    <div class="relative">
    <UIcon name="i-lucide-mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="email" placeholder="name@company.com" required="" type="email">
    </div>
    </div>
    <!-- Phone Number -->
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="phone">Phone Number</label>
    <div class="relative">
    <UIcon name="i-lucide-call" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full h-[52px] pl-12 pr-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="phone" placeholder="+1 (555) 000-0000" required="" type="tel">
    </div>
    </div>
    <!-- Password Pair -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="password">Password</label>
    <div class="relative">
    <UIcon name="i-lucide-lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="password" placeholder="••••••••" required="" type="password">
    <button class="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" onclick="togglePassword('password', 'pw-icon-1')" type="button">
    <UIcon name="i-lucide-eye" id="pw-icon-1" />
    </button>
    </div>
    </div>
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="confirmPassword">Confirm Password</label>
    <div class="relative">
    <UIcon name="i-lucide-lock-reset" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
    <input class="w-full h-[52px] pl-12 pr-12 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="confirmPassword" placeholder="••••••••" required="" type="password">
    <button class="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" onclick="togglePassword('confirmPassword', 'pw-icon-2')" type="button">
    <UIcon name="i-lucide-eye" id="pw-icon-2" />
    </button>
    </div>
    </div>
    </div>
    <button class="w-full h-[56px] bg-primary text-on-primary rounded-xl font-headline-md text-headline-md font-semibold hover:bg-secondary transition-all active:scale-[0.98] duration-150 mt-lg" onclick="nextStep()" type="button">
                                Continue
                            </button>
    <p class="text-center font-body-md text-body-md text-on-surface-variant mt-md">
                                Already have an account? <a class="text-primary font-semibold hover:underline" href="/login">Login here</a>
    </p>
    </div>
    </div>
    <!-- Step 2: Professional Information -->
    <div class="step-transition hidden-step" id="step2">
    <div class="mb-lg">
    <button class="flex items-center text-primary font-label-md mb-md hover:underline" onclick="prevStep()" type="button">
    <UIcon name="i-lucide-arrow-left" class="text-[20px] mr-1" /> Back
                            </button>
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Professional Profile</h1>
    <p class="font-body-md text-body-md text-on-surface-variant">Tell us about your background to find the best career matches.</p>
    </div>
    <div class="space-y-md">
    <!-- Experience & Skills Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="experience">Years of Experience</label>
    <input class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="experience" placeholder="e.g. 5" type="number">
    </div>
    <div class="space-y-xs">
    <label class="font-label-md text-label-md text-on-surface" for="skills">Key Skills</label>
    <input class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="skills" placeholder="Java, SQL, Design..." type="text">
    </div>
    </div>
    <!-- Education Section -->
    <div class="p-4 border border-outline-variant rounded-xl bg-surface-container-lowest space-y-md">
    <h3 class="font-label-md text-label-md font-semibold text-on-surface">Educational Qualifications</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-md">
    <div class="space-y-xs">
    <label class="font-label-sm text-label-sm text-on-surface-variant" for="ugDegree">UG Qualification</label>
    <select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest" id="ugDegree">
    <option value="">Select Degree</option>
    <option value="be">B.E / B.Tech</option>
    <option value="bsc">B.Sc</option>
    <option value="bcom">B.Com</option>
    <option value="ba">B.A</option>
    </select>
    </div>
    <div class="space-y-xs">
    <label class="font-label-sm text-label-sm text-on-surface-variant" for="pgDegree">PG Qualification</label>
    <select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest" id="pgDegree">
    <option value="">Select Degree</option>
    <option value="me">M.E / M.Tech</option>
    <option value="mba">MBA</option>
    <option value="mca">MCA</option>
    <option value="none">Not Applicable</option>
    </select>
    </div>
    </div>
    </div>
    <!-- Location Section -->
    <div class="p-4 border border-outline-variant rounded-xl bg-surface-container-lowest space-y-md">
    <div class="flex justify-between items-start">
    <h3 class="font-label-md text-label-md font-semibold text-on-surface">Current Location</h3>
    <span class="font-label-sm text-label-sm text-primary bg-primary-fixed px-2 py-1 rounded-full">Recommended</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
    <div class="space-y-xs">
    <label class="font-label-sm text-label-sm text-on-surface-variant">Country</label>
    <select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary" id="country">
    <option value="">Country</option>
    <option value="in">India</option>
    <option value="us">USA</option>
    </select>
    </div>
    <div class="space-y-xs">
    <label class="font-label-sm text-label-sm text-on-surface-variant">State</label>
    <select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary" id="state">
    <option value="">State</option>
    <option value="ka">Karnataka</option>
    <option value="ca">California</option>
    </select>
    </div>
    <div class="space-y-xs">
    <label class="font-label-sm text-label-sm text-on-surface-variant">City</label>
    <select class="w-full h-[52px] px-4 bg-surface-container-low border-none rounded-xl font-body-md focus:ring-2 focus:ring-primary" id="city">
    <option value="">City</option>
    <option value="blr">Bengaluru</option>
    <option value="sf">San Francisco</option>
    </select>
    </div>
    </div>
    <p class="font-label-sm text-label-sm text-on-surface-variant italic">
                                    Select your location to receive better job recommendations.
                                </p>
    </div>
    <button class="w-full h-[56px] bg-primary text-on-primary rounded-xl font-headline-md text-headline-md font-semibold hover:bg-secondary transition-all active:scale-[0.98] duration-150 mt-lg" type="submit">
                                Create Account
                            </button>
    </div>
    </div>
    </form>
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full mt-xl bg-surface-container-low border-t border-outline-variant">
    <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-7xl mx-auto gap-lg">
    <div class="flex flex-col items-center md:items-start">
    <span class="font-headline-md text-headline-md font-bold text-primary">Job Nova</span>
    <p class="font-label-md text-label-md text-on-surface-variant mt-xs">© 2024 Job Nova India. All rights reserved.</p>
    </div>
    <div class="flex flex-wrap justify-center gap-lg">
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">About Us</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Contact</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Privacy Policy</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Terms of Service</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:underline hover:text-primary transition-all" href="/">Help Center</a>
    </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body {
            background-color: var(--color-surface);
            font-family: 'Inter', sans-serif;
        }
        
        .registration-card-shadow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .step-transition {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .hidden-step {
            display: none;
            opacity: 0;
            transform: translateY(10px);
        }
</style>

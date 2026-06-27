<script setup>
useHead({
  title: "Registration Success | Job Nova"
})

import { onMounted } from 'vue'

onMounted(() => {
  try {
  // Simple Confetti Animation for the Success Screen
          const canvas = document.getElementById('confetti');
          const ctx = canvas.getContext('2d');
          let pieces = [];
          const numberOfPieces = 50;
          const colors = ['#005bbf', '#1a73e8', '#c55500', '#2b5bb5', '#ffdbcb'];
  
          function updateCanvasSize() {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
          }
  
          class Piece {
              constructor() {
                  this.x = Math.random() * canvas.width;
                  this.y = Math.random() * canvas.height - canvas.height;
                  this.rotation = Math.random() * 360;
                  this.color = colors[Math.floor(Math.random() * colors.length)];
                  this.size = Math.random() * 10 + 5;
                  this.speed = Math.random() * 3 + 2;
                  this.rotationSpeed = Math.random() * 2;
              }
  
              update() {
                  this.y += this.speed;
                  this.rotation += this.rotationSpeed;
                  if (this.y > canvas.height) {
                      this.y = -20;
                      this.x = Math.random() * canvas.width;
                  }
              }
  
              draw() {
                  ctx.save();
                  ctx.translate(this.x, this.y);
                  ctx.rotate(this.rotation * Math.PI / 180);
                  ctx.fillStyle = this.color;
                  ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                  ctx.restore();
              }
          }
  
          function initConfetti() {
              updateCanvasSize();
              for (let i = 0; i < numberOfPieces; i++) {
                  pieces.push(new Piece());
              }
          }
  
          function animate() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              pieces.forEach(p => {
                  p.update();
                  p.draw();
              });
              requestAnimationFrame(animate);
          }
  
          window.addEventListener('resize', updateCanvasSize);
          initConfetti();
          animate();
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- TopNavBar (Simplified for Transactional State) -->
    <header class="w-full top-0 sticky bg-surface-container-lowest shadow-[0px_4px_20px_rgba(26,115,232,0.08)] z-50">
    <div class="flex justify-between items-center h-[72px] px-lg max-w-container-max mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary">Job Nova</div>
    <div class="hidden md:flex items-center gap-md">
    <span class="font-label-md text-label-md text-on-surface-variant">Step 3 of 3</span>
    </div>
    </div>
    </header>
    <main class="flex-grow flex items-center justify-center p-lg relative overflow-hidden">
    <!-- Confetti Background Layer -->
    <canvas class="confetti-canvas" id="confetti"></canvas>
    <!-- Success Container -->
    <div class="max-w-[560px] w-full bg-surface-container-lowest rounded-xl success-card p-xl flex flex-col items-center text-center relative z-10 animate-in fade-in zoom-in duration-700">
    <!-- Success Illustration Area -->
    <div class="w-full mb-xl">
    <div class="bg-surface-container-low rounded-xl p-lg border border-outline-variant mb-lg">
    <div class="flex items-center gap-md mb-sm">
    <UIcon name="i-lucide-clock" class="text-primary animate-pulse" />
    <span class="font-headline-md text-headline-md text-primary">Status: Pending Approval</span>
    </div>
    <p class="font-label-md text-label-md text-on-surface-variant text-left">
                Your company profile has been submitted for verification. Our team will review your company information and activate your employer account once approved. You will receive an email notification after approval.
            </p>
    </div>
    <div class="flex flex-col gap-md text-left px-md">
    <div class="flex items-center gap-md">
    <UIcon name="i-lucide-check-circle" class="text-primary" />
    <span class="font-label-md text-label-md text-on-surface">Registration Submitted</span>
    </div>
    <div class="flex items-center gap-md">
    <UIcon name="i-lucide-hourglass-empty" class="text-primary animate-pulse" />
    <span class="font-label-md text-label-md text-primary font-bold">Verification In Progress</span>
    </div>
    <div class="flex items-center gap-md opacity-40">
    <UIcon name="i-lucide-circle" />
    <span class="font-label-md text-label-md text-on-surface">Account Approval</span>
    </div>
    <div class="flex items-center gap-md opacity-40">
    <UIcon name="i-lucide-circle" />
    <span class="font-label-md text-label-md text-on-surface">Access Employer Dashboard</span>
    </div>
    </div>
    </div>
    <!-- Content Hierarchy -->
    <h1 class="font-display-lg text-display-lg text-primary mb-sm md:text-display-lg text-headline-lg-mobile">Registration Submitted Successfully</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant max-w-[400px] mb-xl">Thank you for registering your company on Job Nova.</p>
    <!-- Action Area -->
    <div class="w-full flex flex-col gap-md">
    <div class="bg-primary-container/10 border border-primary/20 rounded-lg p-md mb-md">
    <p class="font-label-sm text-label-sm text-primary">
                Verification may take up to 24–48 hours. Please ensure your company details are accurate.
            </p>
    </div>
    <button class="w-full h-[56px] bg-primary text-on-primary font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-150 shadow-lg hover:shadow-primary/20" onclick="window.location.href='#login'">
            Back to Login
        </button>
    <button class="w-full h-[56px] border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded-xl flex items-center justify-center gap-sm active:scale-[0.98] transition-all duration-150 hover:bg-surface-container-low" onclick="window.location.href='#support'">
            Contact Support
        </button>
    </div>
    <!-- Bento-style Quick Perks (Contextual for New User) -->
    </div>
    <!-- Decorative Illustration Image (Subtle Background) -->
    <div class="absolute -bottom-20 -right-20 opacity-10 pointer-events-none hidden lg:block">
    <img alt="" class="w-[600px] grayscale" data-alt="A professional team in a modern Indian office space celebrating a corporate achievement. The setting is bright and filled with natural light, reflecting the high-end Job Nova brand. People are smiling and high-fiving in a clean, minimalist environment with soft blue and white tones. The mood is joyful, professional, and aspirational." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjJ_HuvtSljBJxcaya_qfkWA0vNa2U-jjxXNR8-OQwEi1zwkOA13r8x3udMikxK5AL22ht16G1ZEumReTsNvZhUOPlXIXjRmseDp4-Xksv1p2jnRGQM6zay0fp66bJsGom7KbDLE50m-bFcxbFEhxe553aihs5hwLk3EUEjZh9rNkfuTiwoPtl47qC9ofvL7Cn8WFEqgoiDXWbxvVIiNJcy2i4fBGj2ve_osLoB8O989-K9HX6-To0mh70CHTXYay9PfRASbyffL7P">
    </div>
    </main>
    <!-- Footer -->
    <footer class="w-full bg-surface-container-low border-t border-outline-variant">
    <div class="flex flex-col md:flex-row justify-between items-center py-lg px-lg max-w-container-max mx-auto">
    <div class="font-headline-md text-headline-md font-bold text-primary mb-md md:mb-0">Job Nova</div>
    <div class="flex gap-lg flex-wrap justify-center">
    <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Help Center</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
    <a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
    </div>
    <div class="font-label-md text-label-md text-on-surface-variant mt-md md:mt-0">
                    © 2024 Job Nova India. All rights reserved.
                </div>
    </div>
    </footer>
    
  </div>
</template>

<style scoped>
body {
            background-color: #f9f9ff;
            color: #191c23;
        }
        .success-card {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        .confetti-canvas {
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 0;
        }
</style>

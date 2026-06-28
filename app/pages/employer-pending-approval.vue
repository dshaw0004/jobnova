<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

useHead({
  title: "Registration Successful - Job Nova"
})

const router = useRouter()

onMounted(() => {
  try {
    // Simple confetti-like effect for success celebration
    const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: Particle[] = [];

    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        x: number
        y: number
        size: number
        speedY: number
        speedX: number
        color: string
        rotation: number
        rotationSpeed: number

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 6 + 2;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.color = `hsla(${210 + Math.random() * 20}, 70%, 50%, ${Math.random() * 0.5 + 0.2})`;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            if (!ctx) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }

    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Hover scale interaction for the primary card
    const mainCard = document.querySelector('.success-glow') as HTMLElement | null;
    if (mainCard) {
        mainCard.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = mainCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / 50;
            const deltaY = (y - centerY) / 50;
            mainCard.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
        });

        mainCard.addEventListener('mouseleave', () => {
            mainCard.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            mainCard.style.transition = 'transform 0.5s ease';
        });

        mainCard.addEventListener('mouseenter', () => {
            mainCard.style.transition = 'none';
        });
    }
  } catch (e) {
    console.error('Error in page script:', e)
  }
})
</script>

<template>
  <div>
    <!-- Top Navigation (Shell Implementation) -->
    <header class="w-full h-[72px] bg-surface flex justify-between items-center px-lg shadow-sm z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
    <div class="flex items-center gap-sm">
    <span class="text-primary font-headline-md text-headline-md font-bold tracking-tight">Job Nova</span>
    </div>
    <nav class="hidden md:flex gap-lg">
    <span class="text-on-surface-variant font-body-md hover:text-primary transition-colors cursor-pointer">Dashboard</span>
    <span class="text-on-surface-variant font-body-md hover:text-primary transition-colors cursor-pointer">Job Postings</span>
    <span class="text-on-surface-variant font-body-md hover:text-primary transition-colors cursor-pointer">Candidates</span>
    </nav>
    <div class="flex items-center gap-md">
    <button class="bg-primary text-on-primary-container px-lg h-[44px] rounded-xl font-label-md active:scale-95 transition-transform">
                        Post a Job
                    </button>
    </div>
    </div>
    </header>
    <!-- Main Content Canvas -->
    <main class="relative flex-grow w-full flex items-center justify-center p-md overflow-hidden">
    <!-- Atmospheric Background Element -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-40">
    <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[80px]"></div>
    </div>
    <!-- Success Content Card -->
    <div class="relative z-10 w-full max-w-[560px] bg-surface-container-lowest rounded-[32px] p-xl success-glow border border-outline-variant/40 text-center flex flex-col items-center">
    <!-- Icon Section -->
    <div class="w-24 h-24 bg-primary-container text-on-primary rounded-full flex items-center justify-center mb-lg animate-float">
    <UIcon name="i-lucide-verified-user" class="text-[48px]" data-icon="verified_user" />
    </div>
    <!-- Headlines -->
    <h1 class="font-headline-lg text-headline-lg text-on-surface mb-md">Registration Received!</h1>
    <p class="font-body-md text-on-surface-variant max-w-[420px] mb-xl">
                    Thank you for joining Job Nova. Your recruiter account is currently being reviewed by our team.
                </p>
    <!-- Status Card Implementation -->
    <div class="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-lg mb-xl flex flex-col items-center gap-sm">
    <div class="flex items-center gap-xs">
    <UIcon name="i-lucide-clock" class="text-primary" data-icon="schedule" />
    <span class="font-label-md text-primary">Status: Pending Verification</span>
    </div>
    <div class="w-1/2 h-1 bg-surface-variant rounded-full overflow-hidden">
    <div class="h-full bg-primary animate-[shimmer_2s_infinite]" style="width: 60%; background: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-container) 100%);"></div>
    </div>
    </div>
    <!-- Information Details -->
    <div class="flex flex-start gap-md mb-xl text-left bg-surface-bright p-md rounded-xl border-l-4 border-primary">
    <UIcon name="i-lucide-info" class="text-primary-container" data-icon="info" />
    <p class="font-label-md text-on-surface-variant leading-relaxed">
                        Our team typically reviews employer registrations within 24-48 business hours. You will receive an email once your account is approved.
                    </p>
    </div>
    <!-- Action Button -->
    <button
      class="w-full bg-primary text-on-primary-container h-14 rounded-xl font-label-md text-lg flex items-center justify-center gap-md hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
      @click="router.push('/')"
    >
                    Return to Homepage
                    <UIcon name="i-lucide-arrow-right" data-icon="arrow_forward" />
    </button>
    <p class="mt-lg font-label-sm text-outline">
                    Need immediate help? <a class="text-primary hover:underline" href="/">Contact Support</a>
    </p>
    </div>
    <!-- Success Patterns: Decorative Floating Dots -->
    <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-[20%] left-[15%] w-3 h-3 bg-primary rounded-full opacity-20 animate-pulse"></div>
    <div class="absolute top-[40%] right-[12%] w-2 h-2 bg-secondary-container rounded-full opacity-30"></div>
    <div class="absolute bottom-[30%] left-[10%] w-4 h-4 bg-tertiary rounded-full opacity-10 animate-bounce"></div>
    <div class="absolute bottom-[15%] right-[20%] w-3 h-3 bg-primary-container rounded-full opacity-25"></div>
    </div>
    </main>
    <!-- Footer Implementation (from JSON) -->
    <footer class="w-full py-xl px-lg flex flex-col md:flex-row justify-between items-center gap-lg bg-surface-container-highest mt-auto">
    <div class="flex flex-col items-center md:items-start">
    <span class="font-headline-md text-headline-md text-on-surface">Job Nova</span>
    <p class="font-label-sm text-label-sm text-outline mt-xs">© 2024 Job Nova India. All rights reserved.</p>
    </div>
    <div class="flex gap-lg flex-wrap justify-center">
    <a class="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors" href="/">Terms of Service</a>
    <a class="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors" href="/">Privacy Policy</a>
    <a class="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors" href="/">Help Center</a>
    <a class="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors" href="/">Contact Us</a>
    </div>
    </footer>
    <!-- Success Confetti/Atmospheric Canvas Interaction -->
    <canvas class="fixed inset-0 pointer-events-none z-[60]" id="confettiCanvas"></canvas>
    
  </div>
</template>

<style scoped>

        .success-glow {
            box-shadow: 0px 4px 20px rgba(26, 115, 232, 0.08);
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
</style>

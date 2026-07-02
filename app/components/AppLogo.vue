<template>
  <svg
    width="1020"
    height="200"
    viewBox="0 0 1020 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="select-none"
  >
    <!-- Stylized Modern Icon (Combination of Rocket and Briefcase) -->
    <g transform="translate(30, 25)">
      <!-- Outer Circle / Shield -->
      <rect
        x="0"
        y="0"
        width="150"
        height="150"
        rx="40"
        fill="var(--color-primary-container, #e8f0fe)"
      />
      <!-- Briefcase Handle -->
      <path
        d="M55 45V35C55 29.4772 59.4772 25 65 25H85C90.5228 25 95 29.4772 95 35V45"
        stroke="var(--color-primary, #1a73e8)"
        stroke-width="8"
        stroke-linecap="round"
      />
      <!-- Briefcase Body / Rocket Nose -->
      <path
        d="M35 55C35 49.4772 39.4772 45 45 45H105C110.523 45 115 49.4772 115 55V95C115 106.046 106.046 115 95 115H55C43.9543 115 35 106.046 35 95V55Z"
        fill="var(--color-primary, #1a73e8)"
      />
      <!-- Rocket Wing Left -->
      <path
        d="M35 80L15 105V95C15 86.7157 21.7157 80 30 80H35Z"
        fill="var(--color-primary, #1a73e8)"
        opacity="0.8"
      />
      <!-- Rocket Wing Right -->
      <path
        d="M115 80L135 105V95C135 86.7157 128.284 80 120 80H115Z"
        fill="var(--color-primary, #1a73e8)"
        opacity="0.8"
      />
      <!-- Inner Details (Lines) -->
      <path
        d="M60 75H90"
        stroke="var(--color-primary-container, #e8f0fe)"
        stroke-width="6"
        stroke-linecap="round"
      />
    </g>
    <!-- Text: Job Nova -->
    <text
      x="210"
      y="138"
      font-family="Outfit, Inter, system-ui, sans-serif"
      font-size="115"
      font-weight="900"
      fill="var(--color-primary, #1a73e8)"
      letter-spacing="-1.5"
    >
      Job
    </text>
    <text
      x="425"
      y="138"
      font-family="Outfit, Inter, system-ui, sans-serif"
      font-size="115"
      font-weight="900"
      fill="var(--color-on-surface, #1d1b20)"
      letter-spacing="-1.5"
    >
      Nova
    </text>
  </svg>
</template>

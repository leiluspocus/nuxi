<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  msg: String,
  error: Boolean
})
</script>

<template>
  <div
    class="flex animate-bounce px-2 absolute right-0 bottom-8 border-2 border-solid border-red-200 rounded-sm bg-white p-2 z-10 dark:text-black"
    v-show="error"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="red"
      class="stroke-red-500 mr-2 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p>{{ msg }}</p>
  </div>
</template>
<style></style>

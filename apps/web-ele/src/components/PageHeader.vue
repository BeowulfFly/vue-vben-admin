<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="mb-4 flex items-center justify-between">
    <h2 class="m-0 text-lg font-semibold">{{ title }}</h2>
    <div class="flex items-center gap-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

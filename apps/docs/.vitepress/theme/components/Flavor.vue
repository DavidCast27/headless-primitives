<script setup lang="ts">
import { stylePreference } from '../state'

defineProps<{
  only: 'css' | 'tailwind'
}>()
</script>

<template>
  <div v-if="stylePreference === only" class="hp-flavor-content">
    <slot />
  </div>
</template>

<style scoped>
.hp-flavor-content {
  margin-top: 1rem;
}
</style>

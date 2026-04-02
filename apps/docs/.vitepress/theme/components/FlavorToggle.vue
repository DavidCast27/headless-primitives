<script setup lang="ts">
import { stylePreference, setStylePreference } from '../state'

defineProps<{
  compact?: boolean
}>()
</script>

<template>
  <div class="hp-flavor-toggle" :class="{ 'is-compact': compact }">
    <button 
      class="hp-flavor-btn"
      :class="{ active: stylePreference === 'css' }" 
      @click="setStylePreference('css')"
      title="Vanilla CSS"
    >
      CSS
    </button>
    <button 
      class="hp-flavor-btn"
      :class="{ active: stylePreference === 'tailwind' }" 
      @click="setStylePreference('tailwind')"
      title="Tailwind CSS"
    >
      TW
    </button>
  </div>
</template>

<style scoped>
.hp-flavor-toggle {
  display: inline-flex;
  background: var(--vp-c-bg-mute);
  padding: 2px;
  border-radius: 6px;
  gap: 2px;
  border: 1px solid var(--vp-c-divider);
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}

.hp-flavor-btn {
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: all 0.15s ease;
  border: none;
  cursor: pointer;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hp-flavor-btn:hover {
  color: var(--vp-c-text-1);
}

.hp-flavor-btn.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Variante para integrar en cabeceras de código */
.is-compact {
  background: transparent;
  border-color: rgba(255,255,255,0.1);
}

.dark .is-compact {
  border-color: var(--vp-c-divider);
}
</style>

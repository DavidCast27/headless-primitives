<script setup lang="ts">
import FlavorToggle from "./FlavorToggle.vue";
</script>

<template>
  <div class="hp-code-snippet">
    <div class="hp-snippet-actions">
      <FlavorToggle compact />
    </div>
    <slot />
  </div>
</template>

<style scoped>
.hp-code-snippet {
  position: relative;
  margin: 1.5rem 0;
}

.hp-snippet-actions {
  position: absolute;
  top: 8px;
  right: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  pointer-events: auto;
}

/* Ajuste para que no se pise con el botón de copiar en móvil si es necesario */
@media (max-width: 640px) {
  .hp-snippet-actions {
    right: 48px; /* Deja espacio para el botón de copiar de VitePress */
  }
}

/* Estilo para que las pestañas de VitePress dejen espacio si hay muchas */
:deep(.vp-code-group) {
  margin: 0 !important;
}

:deep(.vp-code-group .tabs) {
  padding-right: 100px; /* Asegura que las pestañas no choquen con el selector */
}
</style>

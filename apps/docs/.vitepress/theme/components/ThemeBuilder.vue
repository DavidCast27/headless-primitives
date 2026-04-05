<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// ---------------------------------------------------------------------------
// DEFINICIÓN DE TOKENS
// Todos los tokens --hp-* agrupados por categoría, con sus valores por defecto.
// ---------------------------------------------------------------------------

interface Token {
  name: string
  label: string
  default: string
  type: 'color' | 'size' | 'shadow' | 'text' | 'number' | 'opacity'
  hint?: string
}

interface TokenGroup {
  id: string
  label: string
  tokens: Token[]
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    id: 'accent',
    label: 'Acento (Marca)',
    tokens: [
      { name: '--hp-accent', label: 'Acento', default: '#0369a1', type: 'color', hint: 'Color principal de marca' },
      { name: '--hp-accent-hover', label: 'Acento Hover', default: '#075985', type: 'color', hint: 'Estado hover' },
      { name: '--hp-accent-active', label: 'Acento Activo', default: '#0c4a6e', type: 'color', hint: 'Estado presionado/activo' },
      { name: '--hp-accent-foreground', label: 'Primer plano del acento', default: '#ffffff', type: 'color', hint: 'Texto sobre fondo de acento' },
    ],
  },
  {
    id: 'surfaces',
    label: 'Superficies',
    tokens: [
      { name: '--hp-bg', label: 'Fondo', default: '#ffffff', type: 'color', hint: 'Fondo de la página' },
      { name: '--hp-bg-subtle', label: 'Fondo sutil', default: '#f8fafc', type: 'color', hint: 'Fondo de zonas en reposo' },
      { name: '--hp-bg-muted', label: 'Fondo apagado', default: '#f1f5f9', type: 'color', hint: 'Hover de botones, pista de progreso' },
      { name: '--hp-surface', label: 'Superficie', default: '#ffffff', type: 'color', hint: 'Superficies de componentes' },
      { name: '--hp-surface-raised', label: 'Superficie elevada', default: '#ffffff', type: 'color', hint: 'Superficies elevadas' },
    ],
  },
  {
    id: 'text',
    label: 'Texto',
    tokens: [
      { name: '--hp-text', label: 'Texto primario', default: '#0f172a', type: 'color', hint: 'Texto principal' },
      { name: '--hp-text-secondary', label: 'Texto secundario', default: '#64748b', type: 'color', hint: 'Textos secundarios / descripciones' },
      { name: '--hp-text-disabled', label: 'Texto deshabilitado', default: '#94a3b8', type: 'color', hint: 'Estado deshabilitado (exento de WCAG)' },
      { name: '--hp-text-on-accent', label: 'Texto sobre acento', default: '#ffffff', type: 'color', hint: 'Texto sobre fondo de acento' },
      { name: '--hp-text-error', label: 'Texto de error', default: '#dc2626', type: 'color', hint: 'Mensajes de error en validación' },
    ],
  },
  {
    id: 'borders',
    label: 'Bordes',
    tokens: [
      { name: '--hp-border', label: 'Borde', default: '#e2e8f0', type: 'color', hint: 'Separadores visuales (no interactivos)' },
      { name: '--hp-border-strong', label: 'Borde fuerte', default: '#64748b', type: 'color', hint: 'Bordes de componentes interactivos (WCAG 3:1)' },
    ],
  },
  {
    id: 'radius',
    label: 'Radio de borde',
    tokens: [
      { name: '--hp-radius-sm', label: 'Radio pequeño', default: '4px', type: 'size', hint: 'Checkboxes, etiquetas' },
      { name: '--hp-radius', label: 'Radio predeterminado', default: '6px', type: 'size', hint: 'Botones, inputs' },
      { name: '--hp-radius-md', label: 'Radio mediano', default: '8px', type: 'size', hint: 'Cards, toasts' },
      { name: '--hp-radius-lg', label: 'Radio grande', default: '12px', type: 'size', hint: 'Diálogos' },
      { name: '--hp-radius-full', label: 'Radio completo', default: '9999px', type: 'size', hint: 'Switch, avatar, pills' },
    ],
  },
  {
    id: 'shadows',
    label: 'Sombras',
    tokens: [
      { name: '--hp-shadow-sm', label: 'Sombra pequeña', default: '0 1px 2px 0 rgb(0 0 0 / 0.05)', type: 'shadow', hint: 'Pulgar del switch' },
      { name: '--hp-shadow', label: 'Sombra predeterminada', default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', type: 'shadow', hint: 'Botones elevados' },
      { name: '--hp-shadow-md', label: 'Sombra mediana', default: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', type: 'shadow', hint: 'Tooltips, popovers' },
      { name: '--hp-shadow-lg', label: 'Sombra grande', default: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', type: 'shadow', hint: 'Diálogos, toasts' },
    ],
  },
  {
    id: 'typography',
    label: 'Tipografía',
    tokens: [
      { name: '--hp-font-size-xs', label: 'Tamaño XS', default: '0.75rem', type: 'size', hint: 'Descripción de toast, error de campo' },
      { name: '--hp-font-size-sm', label: 'Tamaño SM', default: '0.875rem', type: 'size', hint: 'Texto de componentes por defecto' },
      { name: '--hp-font-size-base', label: 'Tamaño base', default: '1rem', type: 'size', hint: 'Heredado del documento' },
      { name: '--hp-font-size-lg', label: 'Tamaño LG', default: '1.125rem', type: 'size', hint: 'Título de diálogo' },
      { name: '--hp-font-weight-normal', label: 'Peso normal', default: '400', type: 'number', hint: 'Peso predeterminado' },
      { name: '--hp-font-weight-medium', label: 'Peso mediano', default: '500', type: 'number', hint: 'Etiquetas, botones' },
      { name: '--hp-font-weight-semibold', label: 'Peso seminegrita', default: '600', type: 'number', hint: 'Título de diálogo, título de toast' },
    ],
  },
  {
    id: 'spacing',
    label: 'Espaciado',
    tokens: [
      { name: '--hp-space-1', label: 'Espacio 1', default: '0.25rem', type: 'size', hint: 'Separaciones muy ajustadas' },
      { name: '--hp-space-2', label: 'Espacio 2', default: '0.5rem', type: 'size', hint: 'Padding pequeño' },
      { name: '--hp-space-3', label: 'Espacio 3', default: '0.75rem', type: 'size', hint: 'Padding mediano' },
      { name: '--hp-space-4', label: 'Espacio 4', default: '1rem', type: 'size', hint: 'Padding estándar' },
    ],
  },
  {
    id: 'motion',
    label: 'Movimiento y opacidad',
    tokens: [
      { name: '--hp-transition-fast', label: 'Transición rápida', default: '100ms ease', type: 'text', hint: 'Mostrar/ocultar tooltip' },
      { name: '--hp-transition', label: 'Transición predeterminada', default: '150ms ease', type: 'text', hint: 'Transiciones interactivas por defecto' },
      { name: '--hp-transition-slow', label: 'Transición lenta', default: '200ms ease', type: 'text', hint: 'Entrada de diálogos y toasts' },
      { name: '--hp-opacity-disabled', label: 'Opacidad deshabilitado', default: '0.5', type: 'opacity', hint: 'Elementos deshabilitados' },
    ],
  },
  {
    id: 'focus',
    label: 'Foco y overlay',
    tokens: [
      { name: '--hp-focus-outline-color', label: 'Color de foco', default: '#2563eb', type: 'color', hint: 'Color del anillo de foco' },
      { name: '--hp-focus-outline-width', label: 'Grosor de foco', default: '2px', type: 'size', hint: 'Grosor del anillo de foco' },
      { name: '--hp-backdrop-bg', label: 'Backdrop', default: 'rgb(0 0 0 / 0.5)', type: 'text', hint: 'Fondo del backdrop en diálogos' },
    ],
  },
]

// ---------------------------------------------------------------------------
// ESTADO REACTIVO
// ---------------------------------------------------------------------------

// Mapa plano de nombre de token -> valor actual, inicializado con los valores por defecto
const tokenValues = ref<Record<string, string>>({})

function initTokenValues() {
  const map: Record<string, string> = {}
  for (const group of TOKEN_GROUPS) {
    for (const token of group.tokens) {
      map[token.name] = token.default
    }
  }
  tokenValues.value = map
}

initTokenValues()

// Pestaña activa del grupo
const activeGroup = ref(TOKEN_GROUPS[0].id)

// Estado del botón de copiar
const copyState = ref<'idle' | 'copied'>('idle')

// Estado interactivo para la vista previa
const previewDialogOpen = ref(false)
const previewAlertDialogOpen = ref(false)

// Tooltip con posicionamiento fixed
const tooltipVisible = ref(false)
const tooltipStyle = ref({})
const tooltipTriggerRef = ref<HTMLElement | null>(null)
let tooltipTimeout: number | null = null

function showTooltip() {
  if (tooltipTimeout) clearTimeout(tooltipTimeout)
  tooltipTimeout = window.setTimeout(() => {
    const el = tooltipTriggerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    tooltipStyle.value = {
      position: 'fixed',
      top: `${rect.top - 36}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translateX(-50%)',
      zIndex: 9999,
    }
    tooltipVisible.value = true
  }, 300)
}

function hideTooltip() {
  if (tooltipTimeout) clearTimeout(tooltipTimeout)
  tooltipVisible.value = false
}

// ---------------------------------------------------------------------------
// APLICAR TOKENS A :root EN TIEMPO REAL
// ---------------------------------------------------------------------------

let styleEl: HTMLStyleElement | null = null

function applyTokens() {
  if (typeof document === 'undefined') return

  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = 'hp-theme-builder-overrides'
    document.head.appendChild(styleEl)
  }

  const declarations = Object.entries(tokenValues.value)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')

  styleEl.textContent = `:root {\n${declarations}\n}`
}

// Observa todos los cambios de tokens
watch(tokenValues, applyTokens, { deep: true })

onMounted(() => {
  applyTokens()
})

// ---------------------------------------------------------------------------
// CSS GENERADO
// ---------------------------------------------------------------------------

const generatedCSS = computed(() => {
  const lines = Object.entries(tokenValues.value)
    .filter(([name, value]) => {
      const group = TOKEN_GROUPS.flatMap(g => g.tokens).find(t => t.name === name)
      return value !== group?.default
    })
    .map(([name, value]) => `  ${name}: ${value};`)

  if (lines.length === 0) {
    return `/* Sin cambios desde los valores por defecto — edita tokens para ver las sobreescrituras aquí */\n:root {\n  /* todos los tokens en sus valores predeterminados */\n}`
  }

  return `:root {\n${lines.join('\n')}\n}`
})

const fullCSS = computed(() => {
  const lines = Object.entries(tokenValues.value)
    .map(([name, value]) => `  ${name}: ${value};`)
  return `:root {\n${lines.join('\n')}\n}`
})

// ---------------------------------------------------------------------------
// ACCIONES
// ---------------------------------------------------------------------------

function resetAll() {
  initTokenValues()
  applyTokens()
}

function resetGroup(groupId: string) {
  const group = TOKEN_GROUPS.find(g => g.id === groupId)
  if (!group) return
  for (const token of group.tokens) {
    tokenValues.value[token.name] = token.default
  }
}

async function copyCSS() {
  try {
    await navigator.clipboard.writeText(fullCSS.value)
    copyState.value = 'copied'
    setTimeout(() => { copyState.value = 'idle' }, 2000)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = fullCSS.value
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copyState.value = 'copied'
    setTimeout(() => { copyState.value = 'idle' }, 2000)
  }
}

async function copyOverridesCSS() {
  try {
    await navigator.clipboard.writeText(generatedCSS.value)
    copyState.value = 'copied'
    setTimeout(() => { copyState.value = 'idle' }, 2000)
  } catch {
    copyState.value = 'idle'
  }
}

// ---------------------------------------------------------------------------
// UTILIDADES
// ---------------------------------------------------------------------------

function isColor(token: Token): boolean {
  return token.type === 'color'
}

function isSize(token: Token): boolean {
  return token.type === 'size' || token.type === 'number' || token.type === 'opacity'
}

function isModified(name: string): boolean {
  const token = TOKEN_GROUPS.flatMap(g => g.tokens).find(t => t.name === name)
  return token ? tokenValues.value[name] !== token.default : false
}

function modifiedCount(groupId: string): number {
  const group = TOKEN_GROUPS.find(g => g.id === groupId)
  if (!group) return 0
  return group.tokens.filter(t => isModified(t.name)).length
}

const totalModified = computed(() =>
  TOKEN_GROUPS.reduce((sum, g) => sum + modifiedCount(g.id), 0)
)
</script>

<template>
  <div class="tb-root">

    <!-- BARRA DE CABECERA -->
    <div class="tb-header">
      <div class="tb-header-left">
        <h2 class="tb-title">Constructor de Tema</h2>
        <span v-if="totalModified > 0" class="tb-modified-badge">{{ totalModified }} modificados</span>
      </div>
      <div class="tb-header-actions">
        <button class="tb-btn tb-btn--ghost" @click="resetAll" title="Restablecer todos los tokens a sus valores por defecto">
          Restablecer todo
        </button>
        <button
          class="tb-btn tb-btn--primary"
          @click="copyCSS"
        >
          {{ copyState === 'copied' ? '¡Copiado!' : 'Copiar CSS completo' }}
        </button>
      </div>
    </div>

    <div class="tb-layout">

      <!-- IZQUIERDA: EDITOR -->
      <div class="tb-editor">

        <!-- Lista vertical de grupos -->
        <div class="tb-editor-body">
          <nav class="tb-group-nav" role="tablist" aria-label="Grupos de tokens">
            <button
              v-for="group in TOKEN_GROUPS"
              :key="group.id"
              class="tb-group-nav-item"
              :class="{ 'is-active': activeGroup === group.id }"
              role="tab"
              :aria-selected="activeGroup === group.id"
              @click="activeGroup = group.id"
            >
              {{ group.label }}
              <span v-if="modifiedCount(group.id) > 0" class="tb-dot" />
            </button>
          </nav>

          <!-- Entradas de tokens para el grupo activo -->
          <div class="tb-token-panels">
            <div
              v-for="group in TOKEN_GROUPS"
              v-show="activeGroup === group.id"
              :key="group.id"
              class="tb-token-panel"
              role="tabpanel"
            >
          <div class="tb-panel-header">
            <span class="tb-panel-title">{{ group.label }}</span>
            <button
              v-if="modifiedCount(group.id) > 0"
              class="tb-btn-tiny"
              @click="resetGroup(group.id)"
            >
              Restablecer grupo
            </button>
          </div>

          <div class="tb-token-list">
            <div
              v-for="token in group.tokens"
              :key="token.name"
              class="tb-token-row"
              :class="{ 'is-modified': isModified(token.name) }"
            >
              <div class="tb-token-meta">
                <label :for="`token-${token.name}`" class="tb-token-label">
                  {{ token.label }}
                  <span v-if="isModified(token.name)" class="tb-modified-dot" title="Modificado desde el valor por defecto" />
                </label>
                <span class="tb-token-name">{{ token.name }}</span>
                <span v-if="token.hint" class="tb-token-hint">{{ token.hint }}</span>
              </div>
              <div class="tb-token-input-group">
                <!-- Selector de color + entrada de texto -->
                <template v-if="isColor(token)">
                  <input
                    :id="`token-${token.name}-picker`"
                    type="color"
                    class="tb-color-picker"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                    :title="`Selector de color para ${token.name}`"
                  />
                  <input
                    :id="`token-${token.name}`"
                    type="text"
                    class="tb-text-input"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                    spellcheck="false"
                  />
                </template>

                <!-- Entrada de tamaño para valores px/rem -->
                <template v-else-if="token.type === 'size'">
                  <input
                    :id="`token-${token.name}`"
                    type="text"
                    class="tb-text-input tb-text-input--wide"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                    spellcheck="false"
                  />
                </template>

                <!-- Control deslizante de opacidad -->
                <template v-else-if="token.type === 'opacity'">
                  <input
                    :id="`token-${token.name}-range`"
                    type="range"
                    class="tb-range"
                    min="0"
                    max="1"
                    step="0.05"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                  />
                  <input
                    :id="`token-${token.name}`"
                    type="text"
                    class="tb-text-input tb-text-input--narrow"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                    spellcheck="false"
                  />
                </template>

                <!-- Número (pesos tipográficos) -->
                <template v-else-if="token.type === 'number'">
                  <input
                    :id="`token-${token.name}-range`"
                    type="range"
                    class="tb-range"
                    min="100"
                    max="900"
                    step="100"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                  />
                  <input
                    :id="`token-${token.name}`"
                    type="text"
                    class="tb-text-input tb-text-input--narrow"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                    spellcheck="false"
                  />
                </template>

                <!-- Sombra / texto — entrada de texto libre -->
                <template v-else>
                  <input
                    :id="`token-${token.name}`"
                    type="text"
                    class="tb-text-input tb-text-input--wide"
                    :value="tokenValues[token.name]"
                    @input="(e) => { tokenValues[token.name] = (e.target as HTMLInputElement).value }"
                    spellcheck="false"
                  />
                </template>

                <!-- Restablecer token individual -->
                <button
                  v-if="isModified(token.name)"
                  class="tb-reset-token"
                  :title="`Restablecer ${token.name} al valor por defecto`"
                  @click="tokenValues[token.name] = token.default"
                >
                  ↺
                </button>
              </div>
            </div>
          </div>
            </div><!-- /tb-token-panel -->
          </div><!-- /tb-token-panels -->
        </div><!-- /tb-editor-body -->

        <!-- Panel de CSS generado -->
        <div class="tb-generated">
          <div class="tb-generated-header">
            <span class="tb-panel-title">CSS generado (solo sobreescrituras)</span>
            <button class="tb-btn-tiny" @click="copyOverridesCSS">
              {{ copyState === 'copied' ? '¡Copiado!' : 'Copiar' }}
            </button>
          </div>
          <pre class="tb-code"><code>{{ generatedCSS }}</code></pre>
        </div>
      </div>

      <!-- DERECHA: VISTA PREVIA DE COMPONENTES -->
      <!--
        ===========================================================================
        PANEL DE VISTA PREVIA
        ===========================================================================
        CÓMO AGREGAR UN NUEVO COMPONENTE:
        1. Registro: el componente ya está registrado globalmente en theme/index.ts
           (p. ej. import "@headless-primitives/mi-componente")
        2. Agrega un bloque <section class="tb-preview-section"> a continuación con:
           - Un encabezado <h4 class="tb-preview-section-title">
           - El HTML del componente dentro de <div class="tb-preview-demo">
        3. Convención de nombres: usa los mismos nombres de etiqueta que la librería (hp-*)
           y agrega class="tbp-*" para cualquier estilo exclusivo de la vista previa

        Ejemplo:
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Mi Componente</h4>
            <div class="tb-preview-demo">
              <hp-mi-componente>...</hp-mi-componente>
            </div>
          </section>
        ===========================================================================
      -->
      <div class="tb-preview-pane">
        <div class="tb-preview-header">
          <span class="tb-panel-title">Vista previa en vivo</span>
          <span class="tb-preview-hint">Todos los componentes renderizados con tus tokens</span>
        </div>

        <div class="tb-preview-scroll">

          <!-- BOTÓN -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Botón</h4>
            <div class="tb-preview-demo tb-preview-demo--row">
              <hp-button class="tbp-btn tbp-btn--primary">Primario</hp-button>
              <hp-button class="tbp-btn tbp-btn--secondary">Secundario</hp-button>
              <hp-button class="tbp-btn tbp-btn--ghost">Fantasma</hp-button>
              <hp-button class="tbp-btn tbp-btn--primary" disabled>Deshabilitado</hp-button>
            </div>
          </section>

          <!-- CHECKBOX -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Casilla de verificación</h4>
            <div class="tb-preview-demo tb-preview-demo--row">
              <div class="tbp-field-row">
                <hp-checkbox id="tbp-chk1" class="tbp-checkbox"></hp-checkbox>
                <hp-label for="tbp-chk1" class="tbp-label">Sin marcar</hp-label>
              </div>
              <div class="tbp-field-row">
                <hp-checkbox id="tbp-chk2" checked class="tbp-checkbox"></hp-checkbox>
                <hp-label for="tbp-chk2" class="tbp-label">Marcado</hp-label>
              </div>
              <div class="tbp-field-row">
                <hp-checkbox id="tbp-chk3" disabled class="tbp-checkbox"></hp-checkbox>
                <hp-label for="tbp-chk3" class="tbp-label">Deshabilitado</hp-label>
              </div>
            </div>
          </section>

          <!-- GRUPO DE RADIO -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Grupo de radio</h4>
            <div class="tb-preview-demo">
              <hp-radio-group value="r1" class="tbp-radio-group">
                <div class="tbp-field-row">
                  <hp-radio value="r1" id="tbp-r1" class="tbp-radio"></hp-radio>
                  <hp-label for="tbp-r1" class="tbp-label">Opción uno</hp-label>
                </div>
                <div class="tbp-field-row">
                  <hp-radio value="r2" id="tbp-r2" class="tbp-radio"></hp-radio>
                  <hp-label for="tbp-r2" class="tbp-label">Opción dos</hp-label>
                </div>
                <div class="tbp-field-row">
                  <hp-radio value="r3" id="tbp-r3" class="tbp-radio" disabled></hp-radio>
                  <hp-label for="tbp-r3" class="tbp-label">Deshabilitado</hp-label>
                </div>
              </hp-radio-group>
            </div>
          </section>

          <!-- INTERRUPTOR -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Interruptor</h4>
            <div class="tb-preview-demo tb-preview-demo--row">
              <div class="tbp-field-row">
                <hp-switch id="tbp-sw1" class="tbp-switch"></hp-switch>
                <hp-label for="tbp-sw1" class="tbp-label">Apagado</hp-label>
              </div>
              <div class="tbp-field-row">
                <hp-switch id="tbp-sw2" checked class="tbp-switch"></hp-switch>
                <hp-label for="tbp-sw2" class="tbp-label">Encendido</hp-label>
              </div>
              <div class="tbp-field-row">
                <hp-switch id="tbp-sw3" disabled class="tbp-switch"></hp-switch>
                <hp-label for="tbp-sw3" class="tbp-label">Deshabilitado</hp-label>
              </div>
            </div>
          </section>

          <!-- PROGRESO -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Progreso</h4>
            <div class="tb-preview-demo">
              <div class="tbp-progress-wrapper">
                <span class="tbp-label">Determinado (65%)</span>
                <hp-progress value="65" class="tbp-progress">
                  <hp-progress-indicator></hp-progress-indicator>
                </hp-progress>
              </div>
              <div class="tbp-progress-wrapper">
                <span class="tbp-label">Indeterminado</span>
                <hp-progress class="tbp-progress">
                  <hp-progress-indicator></hp-progress-indicator>
                </hp-progress>
              </div>
            </div>
          </section>

          <!-- SEPARADOR -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Separador</h4>
            <div class="tb-preview-demo">
              <p class="tbp-label">Encima de la línea</p>
              <hp-separator class="tbp-separator-h"></hp-separator>
              <p class="tbp-label">Debajo de la línea</p>
              <div style="display: flex; align-items: center; gap: 12px; height: 20px; margin-top: 8px;">
                <span class="tbp-label">Izquierda</span>
                <hp-separator orientation="vertical" class="tbp-separator-v"></hp-separator>
                <span class="tbp-label">Derecha</span>
              </div>
            </div>
          </section>

          <!-- AVATAR -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Avatar</h4>
            <div class="tb-preview-demo tb-preview-demo--row">
              <hp-avatar class="tbp-avatar">
                <hp-avatar-image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
                  alt="Avatar de usuario"
                ></hp-avatar-image>
                <hp-avatar-fallback class="tbp-avatar-fallback">JD</hp-avatar-fallback>
              </hp-avatar>
              <hp-avatar class="tbp-avatar">
                <hp-avatar-image src="broken.jpg" alt="Imagen rota"></hp-avatar-image>
                <hp-avatar-fallback class="tbp-avatar-fallback">ER</hp-avatar-fallback>
              </hp-avatar>
              <hp-avatar class="tbp-avatar tbp-avatar--lg">
                <hp-avatar-image src="broken.jpg" alt="Grande"></hp-avatar-image>
                <hp-avatar-fallback class="tbp-avatar-fallback">AB</hp-avatar-fallback>
              </hp-avatar>
            </div>
          </section>

          <!-- GRUPO DE ALTERNANCIA -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Grupo de alternancia</h4>
            <div class="tb-preview-demo">
              <hp-toggle-group value="b" class="tbp-toggle-group">
                <hp-toggle value="a" class="tbp-toggle">Izquierda</hp-toggle>
                <hp-toggle value="b" class="tbp-toggle">Centro</hp-toggle>
                <hp-toggle value="c" class="tbp-toggle">Derecha</hp-toggle>
                <hp-toggle value="d" disabled class="tbp-toggle">Off</hp-toggle>
              </hp-toggle-group>
            </div>
          </section>

          <!-- PESTAÑAS -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Pestañas</h4>
            <div class="tb-preview-demo">
              <hp-tabs value="t1" class="tbp-tabs">
                <hp-tab-list class="tbp-tab-list">
                  <hp-tab value="t1" class="tbp-tab">Perfil</hp-tab>
                  <hp-tab value="t2" class="tbp-tab">Configuración</hp-tab>
                  <hp-tab value="t3" class="tbp-tab">Notificaciones</hp-tab>
                </hp-tab-list>
                <hp-tab-panel value="t1" class="tbp-tab-panel">Gestiona aquí la información de tu perfil.</hp-tab-panel>
                <hp-tab-panel value="t2" class="tbp-tab-panel">Configura los ajustes de tu aplicación.</hp-tab-panel>
                <hp-tab-panel value="t3" class="tbp-tab-panel">Controla cómo recibes tus notificaciones.</hp-tab-panel>
              </hp-tabs>
            </div>
          </section>

          <!-- ACORDEÓN -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Acordeón</h4>
            <div class="tb-preview-demo">
              <hp-accordion single-panel class="tbp-accordion">
                <hp-accordion-item value="acc1" open class="tbp-accordion-item">
                  <hp-accordion-trigger class="tbp-accordion-trigger">
                    <span>¿Qué es Headless Primitives?</span>
                    <span class="tbp-accordion-icon">▾</span>
                  </hp-accordion-trigger>
                  <hp-accordion-content class="tbp-accordion-content">Una librería de componentes web headless y accesibles.</hp-accordion-content>
                </hp-accordion-item>
                <hp-accordion-item value="acc2" class="tbp-accordion-item">
                  <hp-accordion-trigger class="tbp-accordion-trigger">
                    <span>¿Por qué usarla?</span>
                    <span class="tbp-accordion-icon">▾</span>
                  </hp-accordion-trigger>
                  <hp-accordion-content class="tbp-accordion-content">El comportamiento y la accesibilidad están resueltos — tú pones los estilos.</hp-accordion-content>
                </hp-accordion-item>
                <hp-accordion-item value="acc3" disabled class="tbp-accordion-item">
                  <hp-accordion-trigger class="tbp-accordion-trigger">
                    <span>Elemento deshabilitado</span>
                    <span class="tbp-accordion-icon">▾</span>
                  </hp-accordion-trigger>
                  <hp-accordion-content class="tbp-accordion-content">No visible.</hp-accordion-content>
                </hp-accordion-item>
              </hp-accordion>
            </div>
          </section>

          <!-- COLAPSABLE -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Colapsable</h4>
            <div class="tb-preview-demo">
              <hp-collapsible class="tbp-collapsible">
                <hp-collapsible-trigger class="tbp-collapsible-trigger">
                  Mostrar detalles
                  <span class="tbp-accordion-icon">▾</span>
                </hp-collapsible-trigger>
                <hp-collapsible-content class="tbp-collapsible-content">
                  Este contenido está oculto por defecto y se revela al hacer clic.
                </hp-collapsible-content>
              </hp-collapsible>
            </div>
          </section>

          <!-- CAMPO -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Campo de formulario</h4>
            <div class="tb-preview-demo">
              <div class="tbp-field-stack">
                <hp-field>
                  <div class="tbp-field-inner">
                    <hp-field-label class="tbp-field-label">Correo electrónico</hp-field-label>
                    <hp-field-description class="tbp-field-desc">Nunca compartiremos tu correo.</hp-field-description>
                    <hp-field-control>
                      <input type="email" class="tbp-input" placeholder="tu@ejemplo.com" />
                    </hp-field-control>
                  </div>
                </hp-field>
                <hp-field>
                  <div class="tbp-field-inner">
                    <hp-field-label class="tbp-field-label">Nombre de usuario</hp-field-label>
                    <hp-field-control>
                      <input type="text" class="tbp-input tbp-input--error" value="¡ya existe!" />
                    </hp-field-control>
                    <hp-field-error class="tbp-field-error">Este nombre de usuario ya está en uso.</hp-field-error>
                  </div>
                </hp-field>
              </div>
            </div>
          </section>

          <!-- TOOLTIP -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Tooltip</h4>
            <div class="tb-preview-demo tb-preview-demo--row">
              <div class="tbp-tooltip-wrap">
                <hp-button
                  class="tbp-btn tbp-btn--secondary"
                  @mouseenter="showTooltip"
                  @mouseleave="hideTooltip"
                  @focus="showTooltip"
                  @blur="hideTooltip"
                  ref="tooltipTriggerRef"
                >Pasa el cursor</hp-button>
                <Teleport to="body">
                  <div
                    v-if="tooltipVisible"
                    class="tbp-tooltip-floating"
                    role="tooltip"
                    :style="tooltipStyle"
                  >Contenido del tooltip</div>
                </Teleport>
              </div>
            </div>
          </section>

          <!-- POPOVER -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Popover</h4>
            <div class="tb-preview-demo" style="overflow: visible; min-height: 100px;">
              <hp-popover align="start" class="tbp-popover-host">
                <hp-popover-trigger>
                  <hp-button class="tbp-btn tbp-btn--secondary">Abrir popover</hp-button>
                </hp-popover-trigger>
                <hp-popover-content class="tbp-popover-content">
                  <p class="tbp-popover-text">Contenido del popover. Haz clic fuera para cerrar.</p>
                  <hp-button
                    class="tbp-btn tbp-btn--ghost tbp-btn--sm"
                    onclick="this.closest('hp-popover').close()"
                  >Cerrar</hp-button>
                </hp-popover-content>
              </hp-popover>
            </div>
          </section>

          <!-- TOAST -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Toast</h4>
            <div class="tb-preview-demo tb-preview-demo--row">
              <hp-toast-container
                id="tbp-toast-container"
                data-position="bottom-right"
              ></hp-toast-container>
              <hp-button
                class="tbp-btn tbp-btn--primary"
                onclick="document.getElementById('tbp-toast-container').addToast('Cambios guardados correctamente', { duration: 3000 })"
              >
                Mostrar toast
              </hp-button>
              <hp-button
                class="tbp-btn tbp-btn--secondary"
                onclick="(function(){ var t = document.getElementById('tbp-toast-container').addToast('Ocurrió un error inesperado', { duration: 3000 }); t.style.borderLeftColor = 'var(--hp-text-error)'; })()"
              >
                Toast de error
              </hp-button>
            </div>
          </section>

          <!-- DIÁLOGO -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Diálogo</h4>
            <div class="tb-preview-demo">
              <button class="tbp-btn tbp-btn--primary" @click="previewDialogOpen = true">
                Abrir diálogo
              </button>
              <Teleport to="body">
                <div v-if="previewDialogOpen" class="tbp-dialog-overlay" @click.self="previewDialogOpen = false">
                  <div class="tbp-dialog-content" role="dialog" aria-modal="true" aria-labelledby="tbp-dlg-title">
                    <h2 id="tbp-dlg-title" class="tbp-dialog-title">Título del diálogo</h2>
                    <p class="tbp-dialog-body">Este es el cuerpo del diálogo. Se adapta a los valores de token actuales.</p>
                    <div class="tbp-dialog-footer">
                      <button class="tbp-btn tbp-btn--ghost" @click="previewDialogOpen = false">Cancelar</button>
                      <button class="tbp-btn tbp-btn--primary" @click="previewDialogOpen = false">Confirmar</button>
                    </div>
                  </div>
                </div>
              </Teleport>
            </div>
          </section>

          <!-- DIÁLOGO DE ALERTA -->
          <section class="tb-preview-section">
            <h4 class="tb-preview-section-title">Diálogo de alerta</h4>
            <div class="tb-preview-demo">
              <button class="tbp-btn tbp-btn--danger" @click="previewAlertDialogOpen = true">
                Abrir diálogo de alerta
              </button>
              <Teleport to="body">
                <div v-if="previewAlertDialogOpen" class="tbp-dialog-overlay">
                  <div class="tbp-dialog-content" role="alertdialog" aria-modal="true" aria-labelledby="tbp-alert-title" aria-describedby="tbp-alert-body">
                    <h2 id="tbp-alert-title" class="tbp-dialog-title tbp-dialog-title--danger">¿Eliminar elemento?</h2>
                    <p id="tbp-alert-body" class="tbp-dialog-body">Esta acción no se puede deshacer. El elemento será eliminado permanentemente.</p>
                    <div class="tbp-dialog-footer">
                      <button class="tbp-btn tbp-btn--ghost" @click="previewAlertDialogOpen = false">Cancelar</button>
                      <button class="tbp-btn tbp-btn--danger" @click="previewAlertDialogOpen = false">Eliminar</button>
                    </div>
                  </div>
                </div>
              </Teleport>
            </div>
          </section>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===========================================================================
   CONSTRUCTOR DE TEMA — ESTILOS DEL COMPONENTE
   Todos los valores referencian CSS Custom Properties para que la vista previa
   refleje los tokens que se están editando. El chrome del editor usa tokens
   --vp-* de VitePress.
   =========================================================================== */

.tb-root {
  font-family: var(--vp-font-family-base);
  font-size: 14px;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem 0;
  background: var(--vp-c-bg);
}

/* CABECERA */
.tb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  flex-wrap: wrap;
  gap: 10px;
}

.tb-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tb-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  border: none;
  color: var(--vp-c-text-1);
  line-height: 1;
}

.tb-modified-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(59, 130, 246, 0.25);
}

.tb-header-actions {
  display: flex;
  gap: 8px;
}

/* BOTONES */
.tb-btn {
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: opacity 0.15s, transform 0.1s;
  line-height: 1.4;
}

.tb-btn:active {
  transform: scale(0.97);
}

.tb-btn--ghost {
  background: transparent;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.tb-btn--ghost:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-2);
}

.tb-btn--primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.tb-btn--primary:hover {
  opacity: 0.88;
}

.tb-btn-tiny {
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-3);
  transition: color 0.15s;
}

.tb-btn-tiny:hover {
  color: var(--vp-c-text-1);
}

/* DISPOSICIÓN */
.tb-layout {
  display: flex;
  flex-direction: column;
}

/* PANEL DEL EDITOR */
.tb-editor {
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

/* EDITOR BODY: nav lateral + panel de tokens */
.tb-editor-body {
  display: grid;
  grid-template-columns: 160px 1fr;
  min-height: 400px;
}

/* NAV VERTICAL DE GRUPOS */
.tb-group-nav {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 8px 0;
  overflow-y: auto;
}

.tb-group-nav-item {
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  padding: 7px 14px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  transition: color 0.12s, background 0.12s;
  border-left: 2px solid transparent;
  white-space: nowrap;
}

.tb-group-nav-item:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
}

.tb-group-nav-item.is-active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-left-color: var(--vp-c-brand-1);
}

/* PANELES DE TOKENS */
.tb-token-panels {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 500px;
}

.tb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  flex-shrink: 0;
}

/* PANEL DE TOKENS */
.tb-token-panel {
  overscroll-behavior: contain;
}

.tb-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 6px;
}

.tb-panel-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}

/* LISTA DE TOKENS */
.tb-token-list {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tb-token-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: border-color 0.1s;
}

.tb-token-row:hover {
  border-color: var(--vp-c-text-3);
}

.tb-token-row.is-modified {
  background: rgba(59, 130, 246, 0.04);
  border-color: var(--vp-c-brand-1);
}

.tb-token-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tb-token-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: default;
}

.tb-modified-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.tb-token-name {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  color: var(--vp-c-text-3);
}

.tb-token-hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

/* GRUPO DE ENTRADAS */
.tb-token-input-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.tb-color-picker {
  width: 32px;
  height: 28px;
  padding: 2px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  cursor: pointer;
  background: var(--vp-c-bg);
  flex-shrink: 0;
}

.tb-text-input {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  padding: 5px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  flex: 1;
  min-width: 80px;
  transition: border-color 0.15s;
}

.tb-text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.tb-text-input--wide {
  flex: 1;
}

.tb-text-input--narrow {
  width: 60px;
  flex: none;
}

.tb-range {
  width: 80px;
  cursor: pointer;
  accent-color: var(--vp-c-brand-1);
}

.tb-reset-token {
  font-size: 14px;
  line-height: 1;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.12s, border-color 0.12s;
  flex-shrink: 0;
}

.tb-reset-token:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-2);
}

/* CSS GENERADO */
.tb-generated {
  border-top: 1px solid var(--vp-c-divider);
  max-height: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tb-generated-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  flex-shrink: 0;
}

.tb-code {
  flex: 1;
  overflow-y: auto;
  margin: 0;
  padding: 8px 14px 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  white-space: pre;
  overscroll-behavior: contain;
}

/* PANEL DE VISTA PREVIA */
.tb-preview-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tb-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
}

.tb-preview-hint {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.tb-preview-scroll {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tb-preview-section {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 16px;
  margin-bottom: 4px;
}

.tb-preview-section:last-child {
  border-bottom: none;
}

.tb-preview-section-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  margin: 0 0 10px 0;
  padding: 0;
  border: none;
}

.tb-preview-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tb-preview-demo--row {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

/* ===========================================================================
   ESTILOS DE COMPONENTES EN LA VISTA PREVIA
   Estos estilos usan tokens --hp-* para que los cambios del editor se reflejen aquí.
   =========================================================================== */

/* Display blocks para custom elements */
hp-checkbox, hp-switch, hp-tabs, hp-tab-list, hp-tab, hp-tab-panel,
hp-accordion, hp-accordion-item, hp-accordion-trigger, hp-accordion-content,
hp-toggle-group, hp-toggle, hp-collapsible, hp-collapsible-trigger, hp-collapsible-content,
hp-radio-group, hp-radio, hp-label, hp-progress, hp-progress-indicator,
hp-separator, hp-avatar, hp-avatar-image, hp-avatar-fallback,
hp-tooltip, hp-tooltip-trigger, hp-tooltip-content,
hp-popover, hp-popover-trigger, hp-popover-content,
hp-field, hp-field-label, hp-field-description, hp-field-control, hp-field-error,
hp-button {
  display: block;
}

hp-button, hp-tab, hp-toggle, hp-accordion-trigger, hp-collapsible-trigger,
hp-checkbox, hp-switch, hp-radio {
  display: inline-flex;
  align-items: center;
}

/* Botón */
.tbp-btn {
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  padding: var(--hp-space-2, 0.5rem) var(--hp-space-4, 1rem);
  border-radius: var(--hp-radius, 6px);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--hp-transition, 150ms ease);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tbp-btn:focus-visible {
  outline: var(--hp-focus-outline-width, 2px) solid var(--hp-focus-outline-color, #2563eb);
  outline-offset: 2px;
}

.tbp-btn[disabled] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
  pointer-events: none;
}

.tbp-btn--primary {
  background: var(--hp-accent, #0369a1);
  color: var(--hp-accent-foreground, #ffffff);
}

.tbp-btn--primary:hover:not([disabled]) {
  background: var(--hp-accent-hover, #075985);
}

.tbp-btn--primary:active:not([disabled]) {
  background: var(--hp-accent-active, #0c4a6e);
}

.tbp-btn--secondary {
  background: var(--hp-surface, #ffffff);
  color: var(--hp-text, #0f172a);
  border-color: var(--hp-border-strong, #64748b);
}

.tbp-btn--secondary:hover:not([disabled]) {
  background: var(--hp-bg-muted, #f1f5f9);
}

.tbp-btn--ghost {
  background: transparent;
  color: var(--hp-text-secondary, #64748b);
  border-color: var(--hp-border, #e2e8f0);
}

.tbp-btn--ghost:hover:not([disabled]) {
  background: var(--hp-bg-muted, #f1f5f9);
  color: var(--hp-text, #0f172a);
}

.tbp-btn--danger {
  background: var(--hp-text-error, #dc2626);
  color: #fff;
}

.tbp-btn--danger:hover:not([disabled]) {
  opacity: 0.88;
}

.tbp-btn--sm {
  font-size: var(--hp-font-size-xs, 0.75rem);
  padding: var(--hp-space-1, 0.25rem) var(--hp-space-2, 0.5rem);
}

/* Etiqueta */
.tbp-label {
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text, #0f172a);
  line-height: 1.4;
}

/* Fila de campo */
.tbp-field-row {
  display: flex;
  align-items: center;
  gap: var(--hp-space-2, 0.5rem);
}

/* Casilla de verificación */
.tbp-checkbox {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 2px solid var(--hp-border-strong, #64748b);
  border-radius: var(--hp-radius-sm, 4px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--hp-transition, 150ms ease);
  background: var(--hp-surface, #ffffff);
  user-select: none;
}

.tbp-checkbox:hover {
  border-color: var(--hp-accent, #0369a1);
}

.tbp-checkbox[data-state="checked"] {
  background: var(--hp-accent, #0369a1);
  border-color: var(--hp-accent, #0369a1);
}

.tbp-checkbox[data-state="checked"]::after {
  content: "✓";
  font-size: 11px;
  color: var(--hp-accent-foreground, #ffffff);
}

.tbp-checkbox[aria-disabled="true"] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
  pointer-events: none;
}

/* Radio */
.tbp-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--hp-space-2, 0.5rem);
}

.tbp-radio {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 2px solid var(--hp-border-strong, #64748b);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--hp-transition, 150ms ease);
  background: var(--hp-surface, #ffffff);
}

.tbp-radio:hover {
  border-color: var(--hp-accent, #0369a1);
}

.tbp-radio[aria-checked="true"] {
  border-color: var(--hp-accent, #0369a1);
}

.tbp-radio[aria-checked="true"]::after {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hp-accent, #0369a1);
}

.tbp-radio[disabled] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
}

/* Interruptor */
.tbp-switch {
  width: 40px;
  height: 22px;
  min-width: 40px;
  background: var(--hp-bg-muted, #f1f5f9);
  border-radius: var(--hp-radius-full, 9999px);
  cursor: pointer;
  position: relative;
  border: 1px solid var(--hp-border, #e2e8f0);
  transition: var(--hp-transition, 150ms ease);
  user-select: none;
  display: block;
}

.tbp-switch:hover {
  border-color: var(--hp-border-strong, #64748b);
}

.tbp-switch[data-state="checked"] {
  background: var(--hp-accent, #0369a1);
  border-color: var(--hp-accent, #0369a1);
}

.tbp-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: var(--hp-surface, #ffffff);
  border-radius: 50%;
  box-shadow: var(--hp-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
  transition: transform var(--hp-transition, 150ms ease);
}

.tbp-switch[data-state="checked"]::after {
  transform: translateX(18px);
}

.tbp-switch[aria-disabled="true"] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
  pointer-events: none;
}

/* Progreso */
.tbp-progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.tbp-progress {
  display: block;
  width: 100%;
  height: 8px;
  background: var(--hp-bg-muted, #f1f5f9);
  border-radius: var(--hp-radius-full, 9999px);
  overflow: hidden;
}

hp-progress-indicator {
  display: block;
  height: 100%;
  background: var(--hp-accent, #0369a1);
  border-radius: var(--hp-radius-full, 9999px);
  width: calc(var(--hp-progress-percentage, 0) * 1%);
  transition: width var(--hp-transition-slow, 200ms ease);
}

/* Separador */
.tbp-separator-h {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--hp-border, #e2e8f0);
  margin: 8px 0;
}

.tbp-separator-v {
  display: inline-block;
  width: 1px;
  height: 100%;
  background: var(--hp-border, #e2e8f0);
}

/* Avatar */
.tbp-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--hp-radius-full, 9999px);
  background: var(--hp-bg-muted, #f1f5f9);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tbp-avatar--lg {
  width: 56px;
  height: 56px;
}

.tbp-avatar-fallback {
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-semibold, 600);
  color: var(--hp-text-secondary, #64748b);
}

/* Grupo de alternancia */
hp-toggle-group.tbp-toggle-group {
  display: inline-flex;
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius, 6px);
  background: var(--hp-surface, #ffffff);
  overflow: hidden;
}

.tbp-toggle-group {
  display: inline-flex;
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius, 6px);
  background: var(--hp-surface, #ffffff);
  overflow: hidden;
}

hp-toggle.tbp-toggle {
  display: inline-flex;
  align-items: center;
}

.tbp-toggle {
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  padding: var(--hp-space-2, 0.5rem) var(--hp-space-3, 0.75rem);
  background: transparent;
  border: none;
  border-right: 1px solid var(--hp-border, #e2e8f0);
  color: var(--hp-text-secondary, #64748b);
  cursor: pointer;
  transition: var(--hp-transition, 150ms ease);
  display: inline-flex;
  align-items: center;
}

.tbp-toggle:last-child {
  border-right: none;
}

.tbp-toggle:hover:not([disabled]):not([aria-pressed="true"]):not([data-state="on"]) {
  background: var(--hp-bg-muted, #f1f5f9);
  color: var(--hp-text, #0f172a);
}

.tbp-toggle[aria-pressed="true"],
.tbp-toggle[data-state="on"] {
  background: var(--hp-bg-muted, #f1f5f9);
  color: var(--hp-text, #0f172a);
}

.tbp-toggle[disabled] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
}

/* Pestañas */
hp-tabs.tbp-tabs {
  display: block;
  width: 100%;
}

.tbp-tabs {
  width: 100%;
}

hp-tab-list.tbp-tab-list {
  display: flex;
  border-bottom: 2px solid var(--hp-border, #e2e8f0);
}

.tbp-tab-list {
  display: flex;
  border-bottom: 2px solid var(--hp-border, #e2e8f0);
}

.tbp-tab {
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  padding: var(--hp-space-2, 0.5rem) var(--hp-space-4, 1rem);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  color: var(--hp-text-secondary, #64748b);
  transition: var(--hp-transition, 150ms ease);
  display: inline-flex;
  align-items: center;
}

.tbp-tab:hover {
  color: var(--hp-text, #0f172a);
  background: var(--hp-bg-muted, #f1f5f9);
}

.tbp-tab[data-state="selected"],
.tbp-tab[aria-selected="true"] {
  color: var(--hp-accent, #0369a1);
  border-bottom-color: var(--hp-accent, #0369a1);
}

.tbp-tab[disabled] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
}

hp-tab-panel.tbp-tab-panel {
  display: block;
}

.tbp-tab-panel {
  padding: var(--hp-space-4, 1rem) 0;
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text, #0f172a);
}

hp-tab-panel.tbp-tab-panel[data-state="unselected"] {
  display: none;
}

/* Acordeón */
hp-accordion.tbp-accordion {
  display: block;
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius-md, 8px);
  overflow: hidden;
  background: var(--hp-surface, #ffffff);
  width: 100%;
}

.tbp-accordion {
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius-md, 8px);
  overflow: hidden;
  background: var(--hp-surface, #ffffff);
  width: 100%;
}

hp-accordion-item.tbp-accordion-item {
  display: block;
  border-bottom: 1px solid var(--hp-border, #e2e8f0);
}

.tbp-accordion-item {
  border-bottom: 1px solid var(--hp-border, #e2e8f0);
}

.tbp-accordion-item:last-child {
  border-bottom: none;
}

hp-accordion-trigger.tbp-accordion-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: var(--hp-space-3, 0.75rem) var(--hp-space-4, 1rem);
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  color: var(--hp-text, #0f172a);
  cursor: pointer;
  text-align: left;
  transition: var(--hp-transition, 150ms ease);
}

.tbp-accordion-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: var(--hp-space-3, 0.75rem) var(--hp-space-4, 1rem);
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  color: var(--hp-text, #0f172a);
  cursor: pointer;
  text-align: left;
  transition: var(--hp-transition, 150ms ease);
}

.tbp-accordion-trigger:hover:not([disabled]) {
  background: var(--hp-bg-muted, #f1f5f9);
}

.tbp-accordion-trigger[aria-expanded="true"] {
  color: var(--hp-accent, #0369a1);
}

.tbp-accordion-trigger[disabled] {
  opacity: var(--hp-opacity-disabled, 0.5);
  cursor: not-allowed;
}

.tbp-accordion-icon {
  font-size: 12px;
  transition: transform var(--hp-transition, 150ms ease);
  flex-shrink: 0;
}

.tbp-accordion-trigger[aria-expanded="true"] .tbp-accordion-icon {
  transform: rotate(180deg);
}

hp-accordion-content.tbp-accordion-content {
  display: block;
  padding: 0 var(--hp-space-4, 1rem) var(--hp-space-3, 0.75rem);
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text-secondary, #64748b);
}

.tbp-accordion-content {
  display: block;
  padding: 0 var(--hp-space-4, 1rem) var(--hp-space-3, 0.75rem);
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text-secondary, #64748b);
}

hp-accordion-content.tbp-accordion-content[data-state="closed"] {
  display: none;
}

/* Colapsable */
.tbp-collapsible {
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius, 6px);
  overflow: hidden;
  width: 100%;
}

.tbp-collapsible-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: var(--hp-space-3, 0.75rem) var(--hp-space-4, 1rem);
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  color: var(--hp-text, #0f172a);
  cursor: pointer;
  text-align: left;
  transition: var(--hp-transition, 150ms ease);
}

.tbp-collapsible-trigger:hover {
  background: var(--hp-bg-muted, #f1f5f9);
}

.tbp-collapsible-content {
  display: block;
  padding: var(--hp-space-3, 0.75rem) var(--hp-space-4, 1rem);
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text-secondary, #64748b);
  border-top: 1px solid var(--hp-border, #e2e8f0);
}

/* Campo de formulario */
.tbp-field-stack {
  display: flex;
  flex-direction: column;
  gap: var(--hp-space-4, 1rem);
  width: 100%;
  max-width: 300px;
}

.tbp-field-inner {
  display: flex;
  flex-direction: column;
  gap: var(--hp-space-1, 0.25rem);
}

.tbp-field-label {
  font-size: var(--hp-font-size-sm, 0.875rem);
  font-weight: var(--hp-font-weight-medium, 500);
  color: var(--hp-text, #0f172a);
}

.tbp-field-desc {
  font-size: var(--hp-font-size-xs, 0.75rem);
  color: var(--hp-text-secondary, #64748b);
}

.tbp-field-error {
  font-size: var(--hp-font-size-xs, 0.75rem);
  color: var(--hp-text-error, #dc2626);
}

.tbp-input {
  font-family: inherit;
  font-size: var(--hp-font-size-sm, 0.875rem);
  padding: var(--hp-space-2, 0.5rem) var(--hp-space-3, 0.75rem);
  border: 1px solid var(--hp-border-strong, #64748b);
  border-radius: var(--hp-radius, 6px);
  background: var(--hp-surface, #ffffff);
  color: var(--hp-text, #0f172a);
  width: 100%;
  transition: var(--hp-transition, 150ms ease);
}

.tbp-input:focus {
  outline: none;
  border-color: var(--hp-accent, #0369a1);
  box-shadow: 0 0 0 var(--hp-focus-outline-width, 2px) var(--hp-focus-outline-color, #2563eb);
}

.tbp-input--error {
  border-color: var(--hp-text-error, #dc2626);
}

/* Tooltip */
.tbp-tooltip-wrap {
  display: inline-block;
  position: relative;
}

.tbp-tooltip-floating {
  background: var(--hp-text, #0f172a);
  color: var(--hp-surface, #ffffff);
  font-size: var(--hp-font-size-xs, 0.75rem);
  font-family: var(--vp-font-family-base);
  padding: var(--hp-space-1, 0.25rem) var(--hp-space-2, 0.5rem);
  border-radius: var(--hp-radius-sm, 4px);
  box-shadow: var(--hp-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
  white-space: nowrap;
  pointer-events: none;
}

/* Popover */
.tbp-popover-host {
  display: inline-block;
  position: relative;
}

.tbp-popover-content {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 50;
  min-width: 200px;
  background: var(--hp-surface, #ffffff);
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius-md, 8px);
  box-shadow: var(--hp-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
  padding: var(--hp-space-3, 0.75rem);
  display: flex;
  flex-direction: column;
  gap: var(--hp-space-2, 0.5rem);
}

.tbp-popover-text {
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text-secondary, #64748b);
  margin: 0;
}

/* Diálogo (overlay Vue) */
.tbp-dialog-overlay {
  position: fixed;
  inset: 0;
  background: var(--hp-backdrop-bg, rgb(0 0 0 / 0.5));
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tbp-dialog-content {
  position: relative;
  z-index: 1001;
  background: var(--hp-surface, #ffffff);
  border: 1px solid var(--hp-border, #e2e8f0);
  border-radius: var(--hp-radius-lg, 12px);
  box-shadow: var(--hp-shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
  padding: var(--hp-space-4, 1rem);
  width: 90%;
  max-width: 400px;
  color: var(--hp-text, #0f172a);
}

.tbp-dialog-title {
  font-size: var(--hp-font-size-lg, 1.125rem);
  font-weight: var(--hp-font-weight-semibold, 600);
  color: var(--hp-text, #0f172a);
  margin: 0 0 var(--hp-space-2, 0.5rem);
  border: none;
  padding: 0;
}

.tbp-dialog-title--danger {
  color: var(--hp-text-error, #dc2626);
}

.tbp-dialog-body {
  font-size: var(--hp-font-size-sm, 0.875rem);
  color: var(--hp-text-secondary, #64748b);
  margin: 0 0 var(--hp-space-4, 1rem);
  line-height: 1.6;
}

.tbp-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--hp-space-2, 0.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .tbp-btn,
  .tbp-checkbox,
  .tbp-switch,
  .tbp-switch::after,
  .tbp-tab,
  .tbp-toggle,
  .tbp-accordion-trigger,
  .tbp-collapsible-trigger,
  .tbp-accordion-icon,
  .tbp-input,
  .tb-btn {
    transition: none;
  }
}
</style>

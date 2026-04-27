# Integración con Frameworks

Headless Primitives son **Web Components estándar**. Funcionan en cualquier framework que renderice HTML — sin adaptadores, sin wrappers, sin dependencias extra.

Esta guía cubre los patrones de integración para React, Vue 3 y Angular, incluyendo el manejo de eventos personalizados, bindings de propiedades y declaraciones de tipos TypeScript.

---

## React

### Configuración

Instala el paquete y regístralo una sola vez en tu punto de entrada:

```tsx
// main.tsx  o  App.tsx
import "@headless-primitives/button";
import "@headless-primitives/checkbox";
import "@headless-primitives/dialog";
// ...resto de componentes que uses
```

#### TypeScript — declarar los elementos en JSX

React no conoce las etiquetas `hp-*` por defecto. Añade un archivo de declaración global:

```ts
// src/hp-elements.d.ts
import type { HTMLAttributes } from "react";

type HpProps = HTMLAttributes<HTMLElement> & {
  [attr: string]: unknown;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hp-button": HpProps;
      "hp-checkbox": HpProps;
      "hp-switch": HpProps;
      "hp-dialog": HpProps;
      "hp-dialog-backdrop": HpProps;
      "hp-dialog-content": HpProps;
      "hp-dialog-title": HpProps;
      "hp-dialog-close": HpProps;
      "hp-select": HpProps;
      "hp-select-trigger": HpProps;
      "hp-select-content": HpProps;
      "hp-select-item": HpProps;
      "hp-select-value": HpProps;
      "hp-tabs": HpProps;
      "hp-tab-list": HpProps;
      "hp-tab": HpProps;
      "hp-tab-panel": HpProps;
      "hp-accordion": HpProps;
      "hp-accordion-item": HpProps;
      "hp-accordion-trigger": HpProps;
      "hp-accordion-content": HpProps;
      // Añade aquí los demás componentes según los vayas usando
    }
  }
}
```

> **Tip:** puedes ampliar `HpProps` con las props específicas de cada elemento (`value`, `checked`, `open`, etc.) para obtener autocompletado más preciso.

---

### Eventos personalizados

Los eventos `hp-*` son **Custom Events nativos** con prefijo propio. React no los conoce de forma nativa (hasta React 19), por lo que debes usar `ref` + `addEventListener`:

```tsx
import { useRef, useEffect } from "react";
import "@headless-primitives/checkbox";

export function MyCheckbox() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ checked: boolean }>).detail;
      console.log("checked:", detail.checked);
    };

    el.addEventListener("hp-change", handler);
    return () => el.removeEventListener("hp-change", handler);
  }, []);

  return <hp-checkbox ref={ref} />;
}
```

#### Hook reutilizable `useHpEvent`

Para no repetir el patrón en cada componente, extráelo a un hook:

```tsx
// hooks/useHpEvent.ts
import { useEffect, RefObject } from "react";

export function useHpEvent<T = unknown>(
  ref: RefObject<HTMLElement | null>,
  event: string,
  handler: (detail: T) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const listener = (e: Event) => handler((e as CustomEvent<T>).detail);
    el.addEventListener(event, listener);
    return () => el.removeEventListener(event, listener);
  }, [ref, event, handler]);
}
```

Uso:

```tsx
import { useRef } from "react";
import { useHpEvent } from "../hooks/useHpEvent";

export function VolumeSlider() {
  const ref = useRef<HTMLElement>(null);

  useHpEvent<{ value: number }>(ref, "hp-change", ({ value }) => {
    console.log("volumen:", value);
  });

  return <hp-slider ref={ref} value="50" min="0" max="100" label="Volumen" show-value />;
}
```

---

### Ejemplo completo — formulario con Dialog de confirmación

```tsx
import { useRef, useState } from "react";
import { useHpEvent } from "../hooks/useHpEvent";
import "@headless-primitives/checkbox";
import "@headless-primitives/select";
import "@headless-primitives/dialog";
import "@headless-primitives/button";

export function SettingsForm() {
  const [notifications, setNotifications] = useState(false);
  const [theme, setTheme] = useState("system");
  const [dialogOpen, setDialogOpen] = useState(false);

  const checkboxRef = useRef<HTMLElement>(null);
  const selectRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useHpEvent<{ checked: boolean }>(checkboxRef, "hp-change", ({ checked }) => {
    setNotifications(checked);
  });

  useHpEvent<{ value: string }>(selectRef, "hp-change", ({ value }) => {
    setTheme(value);
  });

  useHpEvent(dialogRef, "hp-close", () => setDialogOpen(false));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDialogOpen(true);
      }}
    >
      {/* Checkbox */}
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <hp-checkbox
          ref={checkboxRef}
          checked={notifications ? "" : undefined}
          class="my-checkbox"
        />
        Activar notificaciones
      </label>

      {/* Select */}
      <hp-select
        ref={selectRef}
        name="theme"
        value={theme}
        placeholder="Selecciona tema"
        class="my-select"
      >
        <hp-select-trigger class="my-select-trigger">
          <hp-select-value />
        </hp-select-trigger>
        <hp-select-content class="my-select-content">
          <hp-select-item value="light" class="my-select-item">
            Claro
          </hp-select-item>
          <hp-select-item value="dark" class="my-select-item">
            Oscuro
          </hp-select-item>
          <hp-select-item value="system" class="my-select-item">
            Sistema
          </hp-select-item>
        </hp-select-content>
      </hp-select>

      <button type="submit" className="btn-primary">
        Guardar cambios
      </button>

      {/* Dialog de confirmación */}
      <hp-dialog ref={dialogRef} open={dialogOpen ? "" : undefined} class="my-dialog">
        <hp-dialog-backdrop class="my-backdrop" />
        <hp-dialog-content
          role="dialog"
          aria-modal="true"
          aria-labelledby="dlg-title"
          class="my-dialog-content"
        >
          <hp-dialog-title id="dlg-title" class="my-dialog-title">
            ¿Guardar cambios?
          </hp-dialog-title>
          <p>
            Tema: <strong>{theme}</strong> · Notificaciones:{" "}
            <strong>{notifications ? "Sí" : "No"}</strong>
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <hp-dialog-close class="btn-ghost">Cancelar</hp-dialog-close>
            <button
              className="btn-primary"
              onClick={() => {
                alert("¡Guardado!");
                setDialogOpen(false);
              }}
            >
              Confirmar
            </button>
          </div>
        </hp-dialog-content>
      </hp-dialog>
    </form>
  );
}
```

> **Atributos booleanos en React:** los Custom Elements usan el estándar HTML — un atributo existe o no existe. Para pasar `true` usa `""` (string vacío); para `false`, `undefined`. React elimina del DOM los atributos con valor `undefined`.

---

### React 19

React 19 introduce soporte mejorado para Custom Elements: los props se mapean automáticamente a propiedades del DOM cuando corresponde, y los eventos se pueden enlazar con la convención `on<EventName>`. Mientras el ecosistema se estabiliza, el patrón `useRef` + `addEventListener` sigue siendo el más robusto y compatible.

---

## Vue 3

### Configuración

Indica a Vue que las etiquetas `hp-*` son Custom Elements para que no intente resolverlas como componentes Vue:

::: code-group

```ts [vite.config.ts]
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("hp-"),
        },
      },
    }),
  ],
});
```

```ts [vue.config.js  (Vue CLI)]
module.exports = {
  chainWebpack(config) {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => ({
        ...options,
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("hp-"),
        },
      }));
  },
};
```

:::

Importa los componentes en `main.ts`:

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

import "@headless-primitives/button";
import "@headless-primitives/checkbox";
import "@headless-primitives/select";
// ...

createApp(App).mount("#app");
```

---

### Eventos y bindings

Vue trata los Custom Events nativos como eventos normales. Usa `@hp-change` directamente en la plantilla:

```vue
<template>
  <hp-checkbox @hp-change="onCheck" :checked="isChecked ? '' : undefined" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const isChecked = ref(false);

function onCheck(e: CustomEvent<{ checked: boolean }>) {
  isChecked.value = e.detail.checked;
}
</script>
```

Para pasar **propiedades** al Custom Element usa `:` (v-bind). Para **atributos HTML**, usa también `:` — Vue resuelve la diferencia automáticamente para elementos nativos:

```vue
<hp-select :value="selectedFruit" @hp-change="(e) => (selectedFruit = e.detail.value)">
  ...
</hp-select>
```

---

### TypeScript — tipos globales para plantillas

Crea un archivo de declaración para obtener autocompletado en las plantillas Vue:

```ts
// src/hp-elements.d.ts
import type { DefineComponent } from "vue";

type HpElement = DefineComponent<Record<string, unknown>, object, unknown>;

declare module "@vue/runtime-dom" {
  interface GlobalComponents {
    HpButton: HpElement;
    HpCheckbox: HpElement;
    HpSwitch: HpElement;
    HpSelect: HpElement;
    HpSelectTrigger: HpElement;
    HpSelectContent: HpElement;
    HpSelectItem: HpElement;
    HpSelectValue: HpElement;
    HpDialog: HpElement;
    HpDialogContent: HpElement;
    HpDialogBackdrop: HpElement;
    HpDialogTitle: HpElement;
    HpDialogClose: HpElement;
    HpTabs: HpElement;
    HpTabList: HpElement;
    HpTab: HpElement;
    HpTabPanel: HpElement;
    // ...añade los demás según los necesites
  }
}
```

> Vue reconoce los kebab-case y PascalCase: `<hp-checkbox>` y `<HpCheckbox>` son equivalentes.

---

### Ejemplo completo — Tabs con Accordion interno

```vue
<template>
  <hp-tabs :value="activeTab" @hp-change="activeTab = $event.detail.value" class="my-tabs">
    <hp-tab-list class="my-tab-list">
      <hp-tab value="general" class="my-tab">General</hp-tab>
      <hp-tab value="advanced" class="my-tab">Avanzado</hp-tab>
      <hp-tab value="notifications" class="my-tab">Notificaciones</hp-tab>
    </hp-tab-list>

    <!-- Pestaña General -->
    <hp-tab-panel value="general" class="my-panel">
      <hp-accordion single-panel class="my-accordion">
        <hp-accordion-item value="profile" open class="my-item">
          <hp-accordion-trigger class="my-trigger">
            Perfil <span class="icon">▾</span>
          </hp-accordion-trigger>
          <hp-accordion-content class="my-content">
            <label>
              Nombre
              <input v-model="form.name" type="text" class="my-input" />
            </label>
          </hp-accordion-content>
        </hp-accordion-item>

        <hp-accordion-item value="password" class="my-item">
          <hp-accordion-trigger class="my-trigger">
            Contraseña <span class="icon">▾</span>
          </hp-accordion-trigger>
          <hp-accordion-content class="my-content">
            <label>
              Nueva contraseña
              <input v-model="form.password" type="password" class="my-input" />
            </label>
          </hp-accordion-content>
        </hp-accordion-item>
      </hp-accordion>
    </hp-tab-panel>

    <!-- Pestaña Avanzado -->
    <hp-tab-panel value="advanced" class="my-panel">
      <hp-select
        :value="form.language"
        @hp-change="form.language = $event.detail.value"
        placeholder="Idioma"
        class="my-select"
      >
        <hp-select-trigger class="my-select-trigger">
          <hp-select-value />
        </hp-select-trigger>
        <hp-select-content class="my-select-content">
          <hp-select-item value="es" class="my-select-item">Español</hp-select-item>
          <hp-select-item value="en" class="my-select-item">English</hp-select-item>
          <hp-select-item value="fr" class="my-select-item">Français</hp-select-item>
        </hp-select-content>
      </hp-select>
    </hp-tab-panel>

    <!-- Pestaña Notificaciones -->
    <hp-tab-panel value="notifications" class="my-panel">
      <label v-for="item in notifications" :key="item.id" class="notification-row">
        <hp-checkbox
          :checked="item.enabled ? '' : undefined"
          @hp-change="item.enabled = $event.detail.checked"
          class="my-checkbox"
        />
        {{ item.label }}
      </label>
    </hp-tab-panel>
  </hp-tabs>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import "@headless-primitives/tabs";
import "@headless-primitives/accordion";
import "@headless-primitives/select";
import "@headless-primitives/checkbox";

const activeTab = ref("general");

const form = reactive({
  name: "",
  password: "",
  language: "es",
});

const notifications = reactive([
  { id: "email", label: "Correo electrónico", enabled: true },
  { id: "push", label: "Notificaciones push", enabled: false },
  { id: "weekly", label: "Resumen semanal", enabled: true },
]);
</script>
```

---

## Angular

### Configuración

Angular requiere `CUSTOM_ELEMENTS_SCHEMA` para aceptar etiquetas desconocidas como `hp-*`.

::: code-group

```ts [Standalone component (Angular 16+)]
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@headless-primitives/button";
import "@headless-primitives/checkbox";
import "@headless-primitives/select";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
```

```ts [NgModule (Angular 14 y anteriores)]
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import "@headless-primitives/button";
import "@headless-primitives/checkbox";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

:::

---

### Eventos y bindings

Angular usa `(hp-change)` para eventos y `[attr.value]` para atributos:

```html
<!-- Evento personalizado -->
<hp-checkbox (hp-change)="onCheck($event)"></hp-checkbox>

<!-- Atributo dinámico -->
<hp-tabs [attr.value]="activeTab" (hp-change)="activeTab = $event.detail.value"> ... </hp-tabs>
```

```ts
onCheck(event: CustomEvent<{ checked: boolean }>) {
  this.isChecked = event.detail.checked;
}
```

> **`[attr.value]` vs `[value]`:** usa `[attr.value]` para que Angular escriba el **atributo HTML**. `[value]` intenta asignar una **propiedad JS** del elemento — en la mayoría de los componentes `hp-*` ambos funcionan, pero `[attr.value]` es más explícito y seguro.

---

### TypeScript — declarar propiedades del elemento

Extiende la interfaz del DOM para obtener tipos en el template checker:

```ts
// src/hp-elements.d.ts
export {};

declare global {
  interface HpBaseElement extends HTMLElement {
    value?: string;
    checked?: boolean;
    open?: boolean;
    disabled?: boolean;
  }

  interface HTMLElementTagNameMap {
    "hp-button": HpBaseElement;
    "hp-checkbox": HpBaseElement;
    "hp-switch": HpBaseElement;
    "hp-select": HpBaseElement;
    "hp-select-trigger": HpBaseElement;
    "hp-select-content": HpBaseElement;
    "hp-select-item": HpBaseElement;
    "hp-select-value": HpBaseElement;
    "hp-dialog": HpBaseElement;
    "hp-dialog-backdrop": HpBaseElement;
    "hp-dialog-content": HpBaseElement;
    "hp-dialog-title": HpBaseElement;
    "hp-dialog-close": HpBaseElement;
    "hp-tabs": HpBaseElement;
    "hp-tab-list": HpBaseElement;
    "hp-tab": HpBaseElement;
    "hp-tab-panel": HpBaseElement;
    // ...
  }
}
```

---

### Ejemplo completo — formulario reactivo con validación

```ts
// settings-form.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import "@headless-primitives/select";
import "@headless-primitives/checkbox";
import "@headless-primitives/button";
import "@headless-primitives/toast";

@Component({
  selector: "app-settings-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- Select de tema -->
      <div class="field">
        <label class="field-label">Tema de la aplicación</label>
        <hp-select
          [attr.value]="form.value.theme"
          (hp-change)="form.patchValue({ theme: $event.detail.value })"
          placeholder="Selecciona un tema"
          class="my-select"
        >
          <hp-select-trigger class="my-select-trigger">
            <hp-select-value></hp-select-value>
          </hp-select-trigger>
          <hp-select-content class="my-select-content">
            <hp-select-item value="light" class="my-select-item">Claro</hp-select-item>
            <hp-select-item value="dark" class="my-select-item">Oscuro</hp-select-item>
            <hp-select-item value="system" class="my-select-item">Sistema</hp-select-item>
          </hp-select-content>
        </hp-select>
        <span *ngIf="form.get('theme')?.invalid && form.get('theme')?.touched" class="field-error">
          Selecciona un tema
        </span>
      </div>

      <!-- Checkbox de términos -->
      <div class="field-row">
        <hp-checkbox
          [attr.checked]="form.value.terms ? '' : null"
          (hp-change)="form.patchValue({ terms: $event.detail.checked })"
          class="my-checkbox"
        ></hp-checkbox>
        <label class="field-label">Acepto los términos y condiciones</label>
      </div>

      <!-- Botón submit -->
      <button type="submit" class="btn-primary" [disabled]="form.invalid">
        Guardar configuración
      </button>

      <!-- Toast container -->
      <hp-toast-container #toastContainer data-position="bottom-right"></hp-toast-container>
    </form>
  `,
})
export class SettingsFormComponent {
  form = this.fb.group({
    theme: ["", Validators.required],
    terms: [false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      console.log("Formulario válido:", this.form.value);
      // Mostrar toast de éxito
      const toast = document.querySelector("hp-toast-container") as any;
      toast?.addToast("Configuración guardada", { duration: 3000 });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
```

---

## Patrones comunes entre frameworks

### Atributos booleanos

Los Custom Elements usan el estándar HTML: el atributo existe o no existe.

| Estado   | HTML nativo      | React                 | Vue                               | Angular                            |
| -------- | ---------------- | --------------------- | --------------------------------- | ---------------------------------- |
| Activo   | `checked`        | `checked=""`          | `:checked="val ? '' : undefined"` | `[attr.checked]="val ? '' : null"` |
| Inactivo | _(sin atributo)_ | `checked={undefined}` | `:checked="undefined"`            | `[attr.checked]="null"`            |

### Controlar apertura de overlays

Todos los overlays (`hp-dialog`, `hp-drawer`, `hp-popover`) se abren/cierran con el atributo `open`. También exponen una API imperativa:

```ts
// API imperativa — funciona igual en los tres frameworks
const dialog = document.querySelector("hp-dialog") as any;
dialog.open(); // abre
dialog.close(); // cierra
```

### Acceder a la instancia del elemento

::: code-group

```tsx [React]
const ref = useRef<HTMLElement>(null);
// Después del mount:
// ref.current es el elemento DOM
```

```vue [Vue]
<hp-dialog ref="dialogRef" />

// En el script: const dialogRef = useTemplateRef("dialogRef"); // dialogRef.value es el elemento
DOM
```

```ts [Angular]
@ViewChild("myDialog") dialogRef!: ElementRef<HTMLElement>;
// this.dialogRef.nativeElement es el elemento DOM
```

:::

---

## Preguntas frecuentes

**¿Necesito instalar algo especial para usar Web Components en mi framework?**
No. Los Web Components son un estándar del navegador. Solo necesitas importar el paquete `@headless-primitives/...` y el Custom Element queda registrado globalmente.

**¿Funciona con SSR (Next.js, Nuxt, Angular Universal)?**
Los Custom Elements requieren el DOM del navegador. Usa guards de `typeof window !== 'undefined'` o importación dinámica del lado del cliente para evitar errores en el servidor. Ejemplo en Next.js:

```tsx
// next.js — importación dinámica
import dynamic from "next/dynamic";

const MyForm = dynamic(() => import("../components/MyForm"), { ssr: false });
```

**¿Los eventos de los componentes hp-\* son typesafe?**
Sí, si extiendes las declaraciones TypeScript como se muestra arriba. Puedes castear el evento: `(e as CustomEvent<{ checked: boolean }>).detail.checked`.

**¿Se puede usar con React Server Components?**
No directamente. Los `hp-*` elementos son interactivos y necesitan JavaScript del cliente. Marca los componentes que los usen con `"use client"`.

# Contribuir a Headless Primitives

¡Gracias por tu interés en contribuir! 🎉

## Requisitos Previos

- **Node.js** 24+ (requerido por Vite 8 / Rolldown)
- **pnpm** como gestor de paquetes (no uses npm ni yarn)

## Configuración Local

```bash
# 1. Clona el repositorio
git clone https://github.com/DavidCast27/headless-primitives.git
cd headless-primitives

# 2. Instala dependencias
pnpm install

# 3. Ejecuta los tests
pnpm run test

# 4. Levanta el playground visual
pnpm run dev

# 5. Levanta la documentación
pnpm run docs:dev
```

## Flujo de Desarrollo

1. Crea una rama desde `main`: `git checkout -b feat/mi-feature`.
2. Realiza tus cambios siguiendo las reglas de `AGENTS.md`.
3. Asegúrate de que pasen los checks: `pnpm run lint && pnpm run typecheck && pnpm run test`.
4. Haz commit usando **Conventional Commits**:
   - `feat: add new dialog primitive`
   - `fix: resolve focus trap in button`
   - `docs: update quick start guide`
   - `chore: update dependencies`
5. Abre un Pull Request contra `main`.

## Reglas para Agentes de IA

Si estás usando un agente de IA (Copilot, Cursor, etc.) para contribuir, lee obligatoriamente el archivo `AGENTS.md` en la raíz del proyecto.

## Estructura del Proyecto

```
headless-primitives/
├── apps/
│   ├── docs/          # Portal de documentación (VitePress)
│   └── playground/    # Entorno visual de pruebas (Vite)
├── packages/
│   └── vanilla/
│       └── button/    # Primitivo: hp-button
├── docs/
│   └── adr/           # Architecture Decision Records
└── AGENTS.md          # Reglas para agentes de IA
```

# AGENTS.md

## Proyecto

"Diario de Estudio": web de una sola página y solo cliente para registrar sesiones de estudio (registrar sesión, racha actual y lista de sesiones). Los datos viven en `localStorage`; no hay backend. Todos los textos de la interfaz están en español y deben seguir así.

## Comandos

- Solo pnpm (`pnpm-lock.yaml` es el lockfile).
- `pnpm dev`, `pnpm build`, `pnpm preview`.
- El servidor de desarrollo debe ejecutarse en segundo plano: `pnpm astro dev --background`. Gestiónalo con `pnpm astro dev stop|status|logs`. Nunca lo ejecutes en primer plano.
- No existen tests, linter ni script de typecheck. Verifica con `pnpm build` y probando la página en un navegador.
- Node >= 22.23.4 (`engines` en `package.json`).

## Estructura

- El proyecto Astro está en la raíz del repo; no existe la carpeta `astro/`.
- `src/pages/index.astro` — todo el marcado más un `<script>` de cliente con la lógica. Sin framework de UI y sin carpeta de componentes.
- `src/layouts/Layout.astro` — estructura HTML base, importa `src/styles/global.css`, carga Google Fonts.
- `src/styles/global.css` — import de Tailwind, tokens de diseño y clases propias.

## Tailwind 4 (no v3)

- Instalado con `@tailwindcss/vite` en `astro.config.mjs`. No hay `tailwind.config.*`; no lo añadas.
- Los tokens se declaran en `@theme` dentro de `src/styles/global.css`: `paper`, `ink`, `ink-soft`, `rule`, `marker`, `alerta`, y `font-display` / `font-body`. Usa las utilidades que generan (`text-ink-soft`, `border-rule`, `font-display`) en vez de valores hex directos.
- `.racha-numero` y `.sesion*` están definidas fuera de `@layer`, así que sobrescriben a las utilidades de Tailwind. Edítalas en `global.css` en lugar de añadir clases de utilidad que compitan.
- El `<script>` de la página es JavaScript plano aunque `tsconfig.json` extienda `astro/tsconfigs/strict`; no hay archivos `.ts`.

## Reglas del dominio (fáciles de equivocar)

- Las fechas son cadenas locales `YYYY-MM-DD` construidas con `getFullYear/getMonth/getDate`. Nunca uses `toISOString()`: UTC puede cambiar el día.
- `sumarDias()` construye las fechas a las 12:00 locales para que el cambio de hora no salte un día.
- Racha = días consecutivos con al menos una sesión terminando hoy. Si hoy no hay sesión pero ayer sí, la racha sigue viva y cuenta desde ayer. Las fechas futuras nunca cuentan.
- Récord = tirada consecutiva más larga de días con sesión. Se deriva de las sesiones con `calcularRecord()`, no se persiste, e ignora fechas futuras. `calcularRacha()` da la racha viva actual.
- Tiempo semanal = suma de `minutes` de las sesiones entre el lunes y el domingo de la semana actual, hasta hoy. Se deriva con `minutosSemana()`; `inicioSemana()` asume lunes como primer día. Las fechas futuras no cuentan.
- Persistencia: clave `diario-estudio.sesiones.v1`; forma de sesión `{ id, date, topic, minutes, creado }`. Se pinta ordenado por `date` desc y luego `creado` desc.
- Pinta el tema escrito por el usuario con `textContent`, nunca con `innerHTML`.

## Convenciones

- Todos los textos visibles van en español; las fechas usan `es-ES`. Los comentarios del código también en español.
- Mobile-first y accesible: etiquetas asociadas a los inputs, `aria-live` para errores, foco visible y `prefers-reduced-motion` respetado.
- `.agents/` y `skills-lock.json` son herramientas del agente y están en `.gitignore`; no los commitees.

## Memoria

- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).

## Flujo de trabajo

- `.opencode/commands/feature.md` exige un plan escrito (implementación, archivos afectados, casos límite y actualizaciones de `AGENTS.md`/`MEMORY.md`) antes de escribir código.

## Documentación

- Astro: https://docs.astro.build
- Estilos / Tailwind en Astro: https://docs.astro.build/en/guides/styling/

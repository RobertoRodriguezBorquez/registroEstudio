---
name: Diario de Estudio
description: Registra cada sesión de estudio como un fichaje y mantén viva la racha.
colors:
  wall: "#d5d8d2"
  card: "#eadfc4"
  card-soft: "#f4ecda"
  ink: "#1a1a17"
  ink-soft: "#5c5647"
  rule: "#c9be9f"
  stamp: "#a52f23"
  stamp-deep: "#86251b"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 16vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "3px"
  md: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.card-soft}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.stamp-deep}"
  field:
    backgroundColor: "{colors.card-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8.8px 9.6px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Diario de Estudio

## Overview

**Creative North Star: "La Tarjeta de Fichar"**

La página es una tarjeta de control horario de papel manila sobre la pared de un taller: tipografía de formulario, reglas finas de cartón y un sello rojo que cae cuando fichas. El mundo aporta solo tipografía, paleta, densidad y un movimiento de firma; la estructura, la navegación y los controles son los estándar de la web, porque la persona viene a registrar una sesión, no a contemplar un artefacto.

La densidad es compacta y numérica: cifras tabulares en racha, récord, semana, minutos y fechas. La tarjeta ocupa el primer viewport con el formulario justo debajo, de modo que registrar no exige buscar nada. La lista de sesiones vive sobre la pared, separada por reglas, no dentro de otra tarjeta.

La anti-referencia confirmada es el cuaderno anterior: papel crema, subrayador amarillo y serif editorial. El manila es más industrial que nostálgico y el rojo de sello sustituye al amarillo como único acento.

**Key Characteristics:**
- Papel manila como superficie principal; pared verde-gris fría como fondo.
- Un solo acento saturado, el rojo de sello, reservado a la acción y al estado.
- Cifras tabulares y reglas de 1 px en lugar de cajas y sombras por todas partes.
- Siete perforaciones como lectura rápida de la semana; el sello FICHADO como único movimiento.

## Colors

Paleta de oficina: cartón, tinta y un rojo de tampón. El contraste entre el manila cálido y la pared fría separa la tarjeta del fondo sin recurrir a sombras grandes.

### Primary
- **Vermilion Stamp** (`#a52f23`): botón de guardar, aro del día de hoy, texto de error y sello FICHADO. Es el único color saturado de la página.
- **Ink-Dried Vermilion** (`#86251b`): estado hover del botón; el rojo se oscurece, nunca cambia de familia.

### Neutral
- **Press Ink** (`#1a1a17`): texto principal, barra de cabecera y tinta de la tarjeta.
- **Faded Ink** (`#5c5647`): rótulos, notas, fechas secundarias y placeholders; contraste ≥ 4.5:1 sobre manila y pared.
- **Manila Card** (`#eadfc4`): superficie de la tarjeta de racha.
- **Card Stock** (`#f4ecda`): campos del formulario y texto sobre tinta o sello.
- **Workshop Wall** (`#d5d8d2`): fondo de la página y relleno de las perforaciones.
- **Cardboard Rule** (`#c9be9f`): reglas, bordes y separadores de 1 px.

### Named Rules
**The One Stamp Rule.** El rojo de sello aparece en tres lugares y solo tres: la acción principal, el día de hoy y el sello que confirma el fichaje. Nunca decora secciones ni titula.

**The Manila Is the Paper Rule.** Las superficies que representan papel usan `card` o `card-soft`; la pared nunca se usa como relleno de una tarjeta.

## Typography

**Display Font:** Archivo (con `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Archivo (misma familia)

**Character:** Una grotesca de señalización con formas cerradas y cifras de ancho fijo. Hace de titulación, de texto y de dato sin cambiar de voz; la jerarquía se construye con tamaño, peso y espacio, no con una segunda familia.

### Hierarchy
- **Display** (700, `clamp(4rem, 16vw, 5.25rem)`, 0.82, −0.035em): número de la racha, en línea con su unidad y la llama.
- **Headline** (600, 0.875rem, 1.3): títulos de sección («Añadir sesión», «Sesiones»).
- **Title** (600, 1rem, 1.3): valores de la ficha (récord y semana) y cifra de minutos.
- **Body** (400, 0.92–1rem, 1.4–1.5): temas de la lista, notas y texto de estado vacío.
- **Label** (600, 0.7rem, 1.2, 0.1em, mayúsculas): rótulos de campo y de dato.

### Named Rules
**The Tabular Numbers Rule.** Todo número que se compara en vertical (racha, récord, semana, minutos, fechas) usa `font-variant-numeric: tabular-nums`.

**The Two-Step Rule.** El salto de escala es corto a propósito: cuerpo 16 px, dato 16 px, título 14 px y número 64–84 px. No hay pasos intermedios decorativos.

## Layout

Móvil primero, una columna: cabecera de tinta, tarjeta de racha, formulario y lista. A 390×844 el botón de guardar queda dentro del primer viewport. A partir de 1024 px la página se parte en dos columnas de 544 px y el resto (`main` máximo 76rem, gap 40 px): tarjeta y formulario a la izquierda, registro a la derecha; ambas columnas empiezan a la misma altura.

La retícula interior de la tarjeta es de reglas de 1 px: el mini calendario y la ficha de datos se separan con `border-top` y una columna central con `border-left`. El ritmo de espacio es 4/8/12/16/24/32/40 px; siempre hay más aire encima de un título que debajo.

## Elevation & Depth

Elevación mínima y material. Solo la tarjeta se levanta de la pared, con una sombra corta y descentrada; las perforaciones se hunden con sombras interiores. No hay halos, cristal ni sombras duras.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 1px 0 rgba(26,26,23,0.14), 0 16px 28px -20px rgba(26,26,23,0.6)`): solo en `.tarjeta`.
- **Punch recess** (`inset 0 2px 3px rgba(26,26,23,0.45), inset 0 -1px 1px rgba(255,255,255,0.6), 0 0 0 1px rgba(26,26,23,0.1)`): perforación de un día fichado en el mini calendario.

### Named Rules
**The One Lift Rule.** En una pantalla solo se levanta un elemento: la tarjeta de control. Todo lo demás se separa con reglas o con el cambio de superficie.

## Shapes

Esquinas casi rectas: 3 px en campos, botones y sello; 4 px en la tarjeta. Las perforaciones son círculos perfectos (`border-radius: 9999px`, `aspect-ratio: 1`). Los bordes son de 1 px, salvo el del sello, que es de 2 px para leerse como tampón. El sello se rota −6° y ningún otro elemento se inclina.

## Components

### Buttons
- **Shape:** rectángulo de 3 px de radio, ancho completo en móvil y automático desde 640 px.
- **Primary:** fondo `stamp`, texto `card-soft`, 12 px × 20 px, Archivo 600 14 px.
- **Hover / Focus:** el fondo pasa a `stamp-deep`; el foco usa el contorno de tinta de 2 px con 3 px de separación. `active` baja 1 px.

### Cards / Containers
- **Corner Style:** 4 px.
- **Background:** `card` (manila).
- **Shadow Strategy:** Card lift, solo aquí.
- **Border:** 1 px `rule`.
- **Internal Padding:** 20 px en móvil, 24 px desde 640 px.

### Inputs / Fields
- **Style:** fondo `card-soft`, borde de 1 px `rule`, radio 3 px, texto 16 px (evita el zoom de iOS) y cifras tabulares.
- **Focus:** el borde pasa a `ink` y el contorno global de foco se mantiene.
- **Error:** borde `stamp` y `aria-invalid="true"`; el mensaje va en `role="alert"` y se asocia con `aria-describedby`.

### Streak Line
Número de racha, unidad y llama en una sola línea flex con alineación por línea base. La llama es un SVG propio de 30 px en `stamp`, nunca un emoji del sistema. El sello FICHADO entra al final de esa línea con `margin-left: auto`.

### Mini Calendar
Rejilla fija de 42 celdas (seis filas), de lunes a domingo, dentro de la tarjeta de la racha. Cabecera con mes y año en `Title`, flanqueada por dos botones de 26 px con flechas «‹ ›» y `aria-label`. Cada celda es un círculo de ~26 px, solo visual: la fecha se elige en el formulario. Día fichado: perforación recesada con el número encima. Hoy: aro de 2 px en `stamp` encajado en el hueco de la rejilla. Día futuro: número en `ink-soft`, sin acción y anunciado como «no disponible». El estado futuro gana siempre al de sesión guardada. La cabecera de días se genera desde un lunes conocido, nunca desde los días 1–7 del mes visible.

### Stamp
Texto FICHADO en 11.2 px, 700, 0.14em, borde de 2 px `stamp`, rotado −6°; aparece con una escala de 1.7 a 1 en 240 ms y se queda. Es el único objeto estampado de la página.

### Session Row
Tres columnas: fecha (día y mes en tinta, año en `ink-soft`), tema y minutos. Separación por `border-bottom` de 1 px `rule`; el tema rompe con `overflow-wrap: anywhere`.

### Header Bar
Barra de tinta a todo el ancho con el título a la izquierda y la fecha de hoy en `es-ES` a la derecha, en versalitas espaciadas.

## Do's and Don'ts

### Do:
- **Do** usar las utilidades de los tokens (`bg-card`, `text-ink-soft`, `border-rule`, `text-stamp`) en lugar de hex sueltos.
- **Do** mantener el rojo de sello para la acción, hoy y el sello; si hace falta otro estado, oscurecer el mismo tono.
- **Do** conservar las cifras tabulares y la alineación por línea base en toda la ficha.
- **Do** mantener el formulario dentro del primer viewport a 390×844.
- **Do** pasar `impeccable detect` contra la página servida antes de commitear cambios visuales.

### Don't:
- **Don't** volver al papel crema, al subrayador amarillo ni a la serif editorial: son la anti-referencia.
- **Don't** meter la lista de sesiones en tarjetas hijas ni convertir la ficha en un dashboard de widgets.
- **Don't** usar emoji como icono; la llama es SVG.
- **Don't** añadir una segunda sombra de elevación ni halos de color.
- **Don't** cambiar la clave de `localStorage`, la forma de la sesión ni las reglas de fecha por motivos visuales.

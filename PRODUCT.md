# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Una sola persona: alguien que aprende a programar por su cuenta y registra sus sesiones de estudio desde el móvil, al terminar de estudiar o al día siguiente.

## Product Purpose

Convertir el esfuerzo diario en una racha visible que motive a seguir. La web sirve para anotar una sesión de estudio en segundos y comprobar que la racha sigue viva. El éxito es que registrar sea tan rápido que no dé pereza, y que la racha no se rompa por olvido.

## Positioning

La racha se gana con días, no con minutos: un día con al menos una sesión cuenta, y si hoy todavía no has estudiado la racha sigue viva hasta que acabe el día. Ese trato (perdonar el día en curso, no los huecos) es lo que un contador de horas no puede copiar sin cambiar su mecanismo.

## Operating Context

- Se usa en el móvil, a menudo por la noche, después de la sesión de estudio o al recordar una sesión de ayer.
- Sesiones de entre 15 y 120 minutos, repartidas entre varios temas.
- Registro ocasional: unos segundos por sesión, no una sesión de trabajo dentro de la web.
- Los datos viven en el navegador del usuario; no hay cuenta ni sincronización entre dispositivos.

## Capabilities and Constraints

- Registrar una sesión con fecha (por defecto hoy, editable), tema obligatorio y minutos enteros mayores que 0.
- Mostrar la racha actual, el récord personal de días consecutivos y el tiempo estudiado en la semana actual.
- Listar las sesiones de la más reciente a la más antigua.
- Persistir en `localStorage` con la clave `diario-estudio.sesiones.v1` y la forma `{ id, date, topic, minutes, creado }`.
- Fechas locales `YYYY-MM-DD`; nunca UTC. La semana va de lunes a domingo.
- Stack: Astro 7 + Tailwind 4, sin backend, sin framework de UI, sin cuentas.
- Todos los textos de la interfaz en español.
- Las sesiones con fecha futura no cuentan para racha, récord ni semana.

## Evidence on Hand

No hay testimonios, métricas de uso, clientes ni datos de terceros. No inventar cifras, valoraciones ni funcionalidades que no existan.

## Product Principles

1. Registrar en menos de quince segundos.
2. La racha premia la constancia diaria, no la duración.
3. Las fechas son siempre la hora local del usuario.
4. Sin fricción: abrir y usar, sin cuenta ni ajustes.
5. La motivación se ve de un vistazo, no se explica.

## Accessibility & Inclusion

- Móvil primero; la interfaz debe sostenerse desde 320 px.
- Contraste AA, foco visible, navegación por teclado y errores anunciados a lectores de pantalla.
- Respetar `prefers-reduced-motion`.

# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.
## Estado actual
- v1 rediseñada con la skill impeccable: registrar sesiones (fecha, tema, minutos), racha
actual, récord, tiempo estudiado esta semana y lista. Datos en localStorage.
- `PRODUCT.md` (verdad del producto), `DESIGN.md` (mundo visual) y `.impeccable/design.json`.
## Decisiones (y por qué)
- Rediseño, no pulido: se sustituyó el cuaderno por el mundo "Fichar" (tarjeta de control
horario), elegido por el usuario frente a la dirección que asignó la tirada.
- La racha se lee como siete perforaciones y un sello FICHADO al guardar; el formulario
sube al primer viewport para registrar en menos de 15 s.
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- El récord y el tiempo semanal se derivan de las sesiones, no se guardan, para que no se
desincronicen; la semana va de lunes a domingo.
- La llama es SVG propio, no emoji: el emoji no renderiza en todos los sistemas y la skill
prohíbe glifos como iconos.
- El eco de la fecha en español desambigua el formato nativo del navegador.
## Aprendizajes y errores a evitar
- Un taladro fichado debe ser una perforación (relleno de pared + sombra interior), no un
disco de tinta: el material es parte del mundo.
- Los rótulos por debajo de 11 px fallan el detector; un fondo crema también.
- El hover del botón solo oscurece el rojo (`stamp-deep`); en táctil no debe cambiar a tinta.
- Para el récord, deduplicar fechas y ordenarlas de forma ascendente; el orden descendente
que usa la lista no sirve.
- El récord, la racha actual y el tiempo semanal ignoran las fechas futuras.
- `getDay()` devuelve 0 para domingo: hay que convertirlo con `(getDay() + 6) % 7` para que
la semana empiece en lunes.
- El detector necesita un Chrome: `IMPECCABLE_BROWSER` apunta al chromium de Playwright y
`LD_LIBRARY_PATH` a `/tmp/opencode/sysroot/usr/lib/x86_64-linux-gnu` si faltan libnspr4/libnss3.
## Próximos pasos
- El rediseño está fusionado en `master` (merge `98b34de`) y desplegado en `origin`.
- `feature/rediseno` se conserva por si se quiere abrir un PR de revisión; las ramas
`feature/rachas` y `feature/tiempoSemana` ya se borraron del remoto.

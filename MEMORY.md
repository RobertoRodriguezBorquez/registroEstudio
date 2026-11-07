# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.
## Estado actual
- v1 rediseñada con la skill impeccable: registrar sesiones (fecha, tema, minutos), racha
actual, récord, tiempo estudiado esta semana y lista. Datos en localStorage.
- Mini calendario dentro de la tarjeta de la racha: 42 celdas fijas de lunes a domingo, días
con sesión perforados, hoy con aro de sello y futuros desactivados. Es solo visual.
- Formulario con fecha máxima hoy y error en español; al guardar, el calendario salta al mes
de la sesión. 14 tests de fecha y calendario con `pnpm test`.
- `PRODUCT.md`, `DESIGN.md` y `.impeccable/design.json`.
## Decisiones (y por qué)
- La miniatura sustituye a la fila de siete taladros: muestra el mes completo sin duplicar
información y deja el botón de guardar dentro del primer viewport a 390×844.
- Rejilla fija de 42 celdas para que el calendario no cambie de alto entre meses de 5 y 6
semanas. Días no interactivos: a 26 px serían un mal objetivo táctil; la fecha se elige en
el formulario.
- La cabecera de días se genera desde un lunes conocido (2024-01-01), nunca desde los días
1–7 del mes visible; así no se desalinea cuando el mes empieza en domingo.
- El estado futuro gana al de sesión guardada: una sesión futura nunca se pinta como hecha.
- `pintar()` lee `localStorage` una vez y pasa las sesiones a `pintarCalendario()`; la lógica
pura vive en `src/scripts/calendario.js` para poder testearla sin navegador.
- `leerSesiones()` filtra sesiones corruptas: un `localStorage` editado a mano no rompe la
lista ni el calendario.
- El récord y el tiempo semanal se derivan de las sesiones, no se guardan, para que no se
desincronicen; la semana va de lunes a domingo.
## Aprendizajes y errores a evitar
- No usar `role="grid"` sin filas ni celdas: la miniatura usa `role="group"` y cada día un
texto oculto con la fecha completa.
- La cabecera `L M X J V S D` es la prueba rápida: si sale desplazada, se está construyendo
desde el día 1 del mes en vez de desde un lunes.
- Una sesión en fecha futura se pinta solo como `dia--futuro`; el formulario además la
bloquea con `max=hoy` y validación al enviar.
- Los días futuros usan `ink-soft` (no rgba tenue) para mantener contraste AA.
- La perforación se pinta en la celda completa; no necesita `::after` ni `position: relative`.
- `getDay()` devuelve 0 para domingo: hay que convertirlo con `(getDay() + 6) % 7` para que
la semana empiece en lunes. Las fechas se construyen a mediodía para cruzar el cambio de hora.
- Tras tocar la tarjeta, medir que el botón de guardar siga dentro del primer viewport.
- El detector necesita un Chrome: `IMPECCABLE_BROWSER` apunta al chromium de Playwright y
`LD_LIBRARY_PATH` a `/tmp/opencode/sysroot/usr/lib/x86_64-linux-gnu` si faltan libnspr4/libnss3.
## Próximos pasos
- El rediseño Fichar y el mini calendario viven en `master`; `feature/rediseno` se conserva
por si se quiere abrir un PR de revisión.
- Las capturas de revisión van a `.impeccable/review/` (ignorado por git).

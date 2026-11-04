# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.
## Estado actual
- v1 funcionando: registrar sesiones (fecha, tema, minutos), racha actual, récord
personal y lista de sesiones.
- Datos en localStorage.
## Decisiones (y por qué)
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- El récord se deriva de las sesiones en vez de guardarse: no puede desincronizarse al
borrar o editar datos.
## Aprendizajes y errores a evitar
- Para el récord, deduplicar fechas y ordenarlas de forma ascendente; el orden descendente
que usa la lista no sirve.
- El récord y la racha actual ignoran las fechas futuras.
## Próximos pasos
- (vacío por ahora) 
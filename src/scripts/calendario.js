// Funciones puras de fecha y calendario.
// Se importan desde el <script> de la página y se prueban con Node.
// Todas las fechas son cadenas locales "AAAA-MM-DD", nunca UTC.

/** Devuelve la fecha local en formato "AAAA-MM-DD".
 *  Usamos getFullYear/getMonth/getDate (hora local), nunca toISOString(). */
export function fechaLocal(fecha) {
	const anio = fecha.getFullYear();
	const mes = String(fecha.getMonth() + 1).padStart(2, "0");
	const dia = String(fecha.getDate()).padStart(2, "0");
	return `${anio}-${mes}-${dia}`;
}

/** Convierte "AAAA-MM-DD" en un Date local a mediodía. */
export function fechaDeISO(fechaISO) {
	const [anio, mes, dia] = fechaISO.split("-").map(Number);
	return new Date(anio, mes - 1, dia, 12, 0, 0);
}

/** Comprueba que una cadena es una fecha real en formato "AAAA-MM-DD".
 *  Rechaza tanto formatos raros como días que no existen (2026-02-30). */
export function esFechaISOValida(fechaISO) {
	if (typeof fechaISO !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fechaISO)) {
		return false;
	}

	const fecha = fechaDeISO(fechaISO);
	return !Number.isNaN(fecha.getTime()) && fechaLocal(fecha) === fechaISO;
}

/** Suma o resta días a una fecha "AAAA-MM-DD" sin pasar por UTC.
 *  Fijamos las 12:00 para que el cambio de hora no mueva el día. */
export function sumarDias(fechaISO, dias) {
	const fecha = fechaDeISO(fechaISO);
	fecha.setDate(fecha.getDate() + dias);
	return fechaLocal(fecha);
}

/** Primer día del mes siguiente o anterior a una fecha. */
export function mesVecino(fechaISO, direccion) {
	const fecha = fechaDeISO(fechaISO);
	const primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1, 12);
	primerDia.setMonth(primerDia.getMonth() + direccion);
	return fechaLocal(primerDia);
}

/** Número de días de un mes. Mes 0 = enero. */
export function diasDelMes(anio, mes) {
	return new Date(anio, mes + 1, 0).getDate();
}

/** Día de la semana del primer día del mes, con lunes = 0 y domingo = 6. */
export function primerDiaSemana(anio, mes) {
	return (new Date(anio, mes, 1, 12).getDay() + 6) % 7;
}

/** Construye las 42 celdas (6 filas) de un mes.
 *  Las celdas vacías rellenan el hueco antes del día 1 y el final del mes.
 *  Una sesión en fecha futura nunca se marca como hecha. */
export function construirCeldas(anio, mes, hoyISO, diasConSesion) {
	const inicio = primerDiaSemana(anio, mes);
	const totalDias = diasDelMes(anio, mes);
	const celdas = [];

	for (let posicion = 0; posicion < 42; posicion += 1) {
		if (posicion < inicio || posicion >= inicio + totalDias) {
			celdas.push({ vacia: true });
			continue;
		}

		const dia = posicion - inicio + 1;
		const fechaISO = `${anio}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
		const esHoy = fechaISO === hoyISO;
		const esFuturo = fechaISO > hoyISO;
		const hecho = !esFuturo && diasConSesion.has(fechaISO);

		celdas.push({ vacia: false, fechaISO, dia, esHoy, esFuturo, hecho });
	}

	return celdas;
}

const formatoDiaSemana = new Intl.DateTimeFormat("es-ES", { weekday: "narrow" });

/** Etiquetas de la cabecera, siempre de lunes a domingo.
 *  Partimos de un lunes conocido (1 de enero de 2024) para no depender
 *  de en qué día cae el mes que se pinta. */
export function etiquetasSemana() {
	const lunes = new Date(2024, 0, 1, 12);

	return Array.from({ length: 7 }, (_, i) => {
		const fecha = new Date(lunes);
		fecha.setDate(lunes.getDate() + i);
		return formatoDiaSemana.format(fecha);
	});
}

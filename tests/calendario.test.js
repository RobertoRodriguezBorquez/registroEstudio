import test from "node:test";
import assert from "node:assert/strict";

import {
	fechaLocal,
	fechaDeISO,
	esFechaISOValida,
	sumarDias,
	mesVecino,
	diasDelMes,
	primerDiaSemana,
	construirCeldas,
	etiquetasSemana,
} from "../src/scripts/calendario.js";

test("la cabecera de días va siempre de lunes a domingo", () => {
	assert.deepEqual(etiquetasSemana(), ["L", "M", "X", "J", "V", "S", "D"]);
});

test("fechaLocal usa la fecha local y rellena con ceros", () => {
	assert.equal(fechaLocal(new Date(2026, 0, 5, 12)), "2026-01-05");
	assert.equal(fechaLocal(new Date(2026, 11, 31, 23, 59)), "2026-12-31");
});

test("fechaDeISO devuelve un Date local a mediodía", () => {
	const fecha = fechaDeISO("2026-11-07");
	assert.equal(fecha.getFullYear(), 2026);
	assert.equal(fecha.getMonth(), 10);
	assert.equal(fecha.getDate(), 7);
	assert.equal(fecha.getHours(), 12);
});

test("esFechaISOValida rechaza fechas imposibles y formatos raros", () => {
	assert.equal(esFechaISOValida("2026-11-07"), true);
	assert.equal(esFechaISOValida("2024-02-29"), true);
	assert.equal(esFechaISOValida("2025-02-29"), false);
	assert.equal(esFechaISOValida("2026-02-30"), false);
	assert.equal(esFechaISOValida("2026-13-01"), false);
	assert.equal(esFechaISOValida("07/11/2026"), false);
	assert.equal(esFechaISOValida(""), false);
	assert.equal(esFechaISOValida(null), false);
});

test("sumarDias cruza el cambio de hora sin saltarse días", () => {
	assert.equal(sumarDias("2026-03-28", 1), "2026-03-29");
	assert.equal(sumarDias("2026-03-29", 1), "2026-03-30");
	assert.equal(sumarDias("2026-10-24", 1), "2026-10-25");
	assert.equal(sumarDias("2026-10-25", 1), "2026-10-26");
	assert.equal(sumarDias("2026-01-01", -1), "2025-12-31");
});

test("mesVecino cambia de año en ambos sentidos", () => {
	assert.equal(mesVecino("2026-12-15", 1), "2027-01-01");
	assert.equal(mesVecino("2027-01-15", -1), "2026-12-01");
	assert.equal(mesVecino("2026-11-07", 1), "2026-12-01");
});

test("diasDelMes conoce meses de 28, 29, 30 y 31 días", () => {
	assert.equal(diasDelMes(2025, 1), 28);
	assert.equal(diasDelMes(2024, 1), 29);
	assert.equal(diasDelMes(2028, 1), 29);
	assert.equal(diasDelMes(2026, 3), 30);
	assert.equal(diasDelMes(2026, 4), 31);
});

test("primerDiaSemana usa lunes como 0 y domingo como 6", () => {
	assert.equal(primerDiaSemana(2024, 0), 0); // lunes 1 de enero de 2024
	assert.equal(primerDiaSemana(2024, 1), 3); // jueves 1 de febrero de 2024
	assert.equal(primerDiaSemana(2026, 10), 6); // domingo 1 de noviembre de 2026
	assert.equal(primerDiaSemana(2026, 11), 1); // martes 1 de diciembre de 2026
	assert.equal(primerDiaSemana(2027, 1), 0); // lunes 1 de febrero de 2027
});

test("construirCeldas coloca el día 1 bajo su día de la semana", () => {
	const celdas = construirCeldas(2026, 10, "2026-11-07", new Set());

	assert.equal(celdas.length, 42);
	assert.equal(celdas.slice(0, 6).every((celda) => celda.vacia), true);
	assert.equal(celdas[6].fechaISO, "2026-11-01");
	assert.equal(celdas[35].fechaISO, "2026-11-30");
	assert.equal(celdas.slice(36).every((celda) => celda.vacia), true);
});

test("construirCeldas mantiene 42 celdas todos los meses", () => {
	for (let mes = 0; mes < 12; mes += 1) {
		assert.equal(construirCeldas(2026, mes, "2026-11-07", new Set()).length, 42);
	}
});

test("construirCeldas incluye el 29 de febrero en año bisiesto", () => {
	const celdas = construirCeldas(2024, 1, "2024-02-15", new Set());
	const dias = celdas.filter((celda) => !celda.vacia);

	assert.equal(dias.length, 29);
	assert.equal(dias.at(-1).fechaISO, "2024-02-29");
});

test("una sesión de hoy se marca como hecha", () => {
	const celdas = construirCeldas(2026, 10, "2026-11-07", new Set(["2026-11-07"]));
	const dia7 = celdas.find((celda) => celda.fechaISO === "2026-11-07");

	assert.equal(dia7.esHoy, true);
	assert.equal(dia7.esFuturo, false);
	assert.equal(dia7.hecho, true);
});

test("una sesión en el futuro nunca se marca como hecha", () => {
	const celdas = construirCeldas(2026, 10, "2026-11-07", new Set(["2026-11-20"]));
	const dia20 = celdas.find((celda) => celda.fechaISO === "2026-11-20");

	assert.equal(dia20.esFuturo, true);
	assert.equal(dia20.hecho, false);
});

test("una sesión de otro mes no se cuela en la rejilla", () => {
	const celdas = construirCeldas(2026, 10, "2026-11-07", new Set(["2026-10-31"]));
	const dias = celdas.filter((celda) => !celda.vacia);

	assert.equal(dias.some((celda) => celda.fechaISO === "2026-10-31"), false);
	assert.equal(dias.some((celda) => celda.hecho), false);
});

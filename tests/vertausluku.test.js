import laskeVertausluvut from "../vertausluku.js";
import ehdokasRekisteri from "../ehdokasRekisteri.js";

import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";

describe("laskeVertausluvut", () => {
  beforeEach(() => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 2 },
      { numero: 102, nimi: "Kalle Korhonen", aanet: 3 },
      { numero: 103, nimi: "Sari Virtanen", aanet: 2 },
      { numero: 104, nimi: "Jukka Jokinen", aanet: 5 }
    ]

    mock.method(ehdokasRekisteri, 'haeLista', () => {
      return lista;
    });
  });
  afterEach(() => {
    mock.reset();
  });

  it('listan eniten ääniä saaneen ehdokkaan vertausluku on listan äänten summa', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 12);
  });
  it('listan toiseksi eniten ääniä saaneen ehdokkaan vertausluku on puolet listan äänien summasta', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[1].vertausluku, 6);
  });
  it('ensimmäinen ehdokas on eniten ääniä saanut', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].numero, 104);
  });
  it('saman äänimäärän saaneet ehdokkaat on merkitty arvotuiksi', () => {
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[2].arvottu, true);
    assert.equal(tulos[3].arvottu, true);
  });
  it('saman äänimäärän saaneet ehdokkaat ovat satunnaisessa järjestyksessä', () => {
    const set = new Set();
    for (let i = 0; i < 10; i++) {
      const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
      set.add(tulos[2].numero);
    }
    assert.equal(set.size, 2);
  });
  it('toimii jos yhdellä ehdokkaalla', () => {
    const lista = [
      { numero: 101, nimi: "Maija Meikäläinen", aanet: 2 }
    ];
    mock.method(ehdokasRekisteri, 'haeLista', () => {
      return lista;
    });
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos[0].vertausluku, 2);
  });
  it('toimii tyhjällä listalla', () => {
    const lista = [];
    mock.method(ehdokasRekisteri, 'haeLista', () => {
      return lista;
    });
    const tulos = laskeVertausluvut(ehdokasRekisteri.haeLista(1));
    assert.equal(tulos.length, 0);
  });
});
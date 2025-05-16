/**
 * Laskee D'Hondtin vertausluvut yhdelle listalle
 * @param {Object[]} ehdokkaat - Taulukko ehdokasobjekteja, joissa numero, nimi ja äänimäärä
 * @returns {Object[]} - Sama taulukko, mutta lisättynä vertausluvuilla
 */
function laskeVertausluvut(ehdokkaat) {
  // Järjestetään ehdokkaat äänimäärän mukaan laskevasti
  const jarjestetyt = [...ehdokkaat].sort((a, b) => b.aanet - a.aanet);

  // Tässä merkitään arvotut ehdokkaat (saman äänimäärän saaneet)
  let edellinenAanet = null;
  let merkityt = [];

  for (let i = 0; i < jarjestetyt.length; i++) {
    const ehdokas = jarjestetyt[i];
    if (edellinenAanet !== null && ehdokas.aanet === edellinenAanet) {
      ehdokas.arvottu = true;
      let edellinenEhdokas = merkityt.pop();
      edellinenEhdokas.arvottu = true;

      // Arvotaan ehdokkaat satunnaiseen järjestykseen
      if (Math.random() < 0.5) {
        merkityt.push(ehdokas);
        merkityt.push(edellinenEhdokas);
      }
      else {
        merkityt.push(edellinenEhdokas);
        merkityt.push(ehdokas);
      }
    }
    else {
      merkityt.push(ehdokas);
    }
    edellinenAanet = ehdokas.aanet;
  }

  // Laske äänien summa
  const aanetYhteensa = merkityt.reduce((summa, ehdokas) => summa + ehdokas.aanet, 0);

  // Lasketaan vertausluvut: äänet / sija listassa
  return merkityt.map((ehdokas, index) => ({
    ...ehdokas,
    vertausluku: aanetYhteensa / (index + 1)
  }));
}

export default laskeVertausluvut;
export { laskeVertausluvut };

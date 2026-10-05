// 1. Datele de test și valorile permise
const rezervari = [
  { id: 1, destinatie: "Ritz Paris", platita: true, tip_masa: "mic-dejun" },
  { id: 2, destinatie: "Chalet Zermatt", platita: false, tip_masa: "demipensiune" },
  { id: 3, destinatie: "Maldives Resort", platita: true, tip_masa: "all-inclusive" }
];

const TIPURI_MASA = ["mic-dejun", "demipensiune", "all-inclusive"];

// 2. Funcții de citire
function listeazaDestinatii(lista) {
  return lista.map((r) => r.destinatie);
}

function numaraNeplatite(lista) {
  return lista.filter((r) => !r.platita).length;
}

function cautaDupaDestinatie(lista, text) {
  return lista.filter((r) => r.destinatie.toLowerCase().includes(text.toLowerCase()));
}

// 3. Funcții de adăugare și modificare (Imutabile)
function nextId(lista) {
  return lista.reduce((max, r) => Math.max(max, r.id), 0) + 1;
}

function adaugaRezervare(lista, destinatie, tip_masa = "mic-dejun") {
  const destCurat = destinatie.trim();
  
  // Validare
  if (!destCurat) {
    console.log("Destinația nu poate fi goală.");
    return lista;
  }
  if (!TIPURI_MASA.includes(tip_masa)) {
    console.log("Tip de masă invalid.");
    return lista;
  }

  const nou = { id: nextId(lista), destinatie: destCurat, platita: false, tip_masa };
  return [...lista, nou];
}

function comutaPlatita(lista, id) {
  return lista.map((r) => r.id === id ? { ...r, platita: !r.platita } : r);
}

function stergeRezervare(lista, id) {
  return lista.filter((r) => r.id !== id);
}

// 4. Teste în consolă
console.log("--- Citire ---");
console.log("Destinații:", listeazaDestinatii(rezervari).join(", "));
console.log("Neplătite:", numaraNeplatite(rezervari));
console.log("Căutare 'zermatt':", listeazaDestinatii(cautaDupaDestinatie(rezervari, "zermatt")).join(", "));

console.log("--- Adăugare ---");
let lista = adaugaRezervare(rezervari, "Hotel Transilvania", "demipensiune");
console.log("Lista nouă:", lista.length, "rezervări");
console.log("Originalul a rămas cu:", rezervari.length, "rezervări");

console.log("--- Modificare și ștergere ---");
lista = comutaPlatita(lista, 2);
console.log("După plata rezervării cu id 2, neplătite:", numaraNeplatite(lista));
lista = stergeRezervare(lista, 3);
console.log("După ștergerea id 3:", listeazaDestinatii(lista).join(", "));

console.log("--- Validare ---");
adaugaRezervare(lista, "   ");
adaugaRezervare(lista, "Vila de la Mare", "ultra-all-inclusive");
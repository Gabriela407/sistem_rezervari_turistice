const rezervari = [
  { id: 1, destinatie: "🗼 Ritz Paris", platita: true, tip_masa: "mic-dejun" },
  { id: 2, destinatie: "🏔️ Chalet Zermatt", platita: false, tip_masa: "demipensiune" },
  { id: 3, destinatie: "🏝️ Maldives Resort", platita: true, tip_masa: "all-inclusive" }
];

export default function App() {
  const platite = rezervari.filter((r) => r.platita).length;

  return (
    <>
      <header className="app-header">
        <h1>✈️ Rezervări Turistice</h1>
        <p>🌍 Gestionează pachetele turistice ale clienților cu stil.</p>
        <p className="app-count">
          🛎️ {rezervari.length} rezervări, dintre care {platite} plătite
        </p>
      </header>
      <main className="container">
        <section className="panel">
          <h2>🧳 Rezervările mele</h2>
          {/* Temporar: date brute */}
          <pre>{JSON.stringify(rezervari, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}
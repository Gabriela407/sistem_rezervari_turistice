import { useState } from "react";
import RezervariList from "./components/RezervariList.jsx";
import "./App.css";

const rezervariInitiale = [
  { id: 1, destinatie: "🗼 Ritz Paris", platita: true, tip_masa: "mic-dejun" },
  { id: 2, destinatie: "🏔️ Chalet Zermatt", platita: false, tip_masa: "demipensiune" },
  { id: 3, destinatie: "🏝️ Maldives Resort", platita: true, tip_masa: "all-inclusive" }
];

export default function App() {
  const [temaIntunecata, setTemaIntunecata] = useState(false);

  const toggleTema = () => {
    setTemaIntunecata((prev) => !prev);
  };

  return (
    <div className={`app-wrapper ${temaIntunecata ? "dark-theme" : ""}`}>
      {/* Buton Schimbă Tema */}
      <div className="top-bar">
        <button type="button" className="theme-toggle-btn" onClick={toggleTema}>
          {temaIntunecata ? "☀️ Schimbă Tema" : "🌙 Schimbă Tema"}
        </button>
      </div>

      <main className="main-layout">
        {/* Panou Stânga: Formular Adăugare */}
        <section className="card-panel panel-form">
          <h2 className="panel-title">
            <span className="icon">📍</span> Adaugă rezervare
          </h2>
          <hr className="divider" />

          <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="destinatie">Destinație</label>
              <input
                id="destinatie"
                type="text"
                placeholder="Ex: 🗼 Ritz Paris"
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="tip_masa">Tip masă</label>
              <select id="tip_masa" defaultValue="mic-dejun" disabled>
                <option value="mic-dejun">☕ Mic dejun</option>
                <option value="demipensiune">🍽️ Demipensiune</option>
                <option value="all-inclusive">🍹 All Inclusive</option>
              </select>
            </div>

            <button type="button" className="btn-submit">
              ➕ Adaugă
            </button>
          </form>
        </section>

        {/* Panou Dreapta: Lista din componente */}
        <section className="card-panel panel-list">
          <h2 className="panel-title">
            <span className="icon">🧳</span> Rezervările mele
          </h2>
          <hr className="divider" />

          <RezervariList rezervari={rezervariInitiale} />
        </section>
      </main>

      <footer className="app-footer">
        ⛵ Proiect Tehnologii Web • Etapa 4
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";
import RezervariList from "./components/rezervariList.jsx";
import "./App.css";

const REZERVARI_INITIALE = [
  {
    id: 1,
    destinatie: "🗼 Ritz Paris",
    platita: true,
    tip_masa: "mic-dejun",
    pret: 1200,
    nopti: 4,
    stele: "⭐⭐⭐⭐⭐"
  },
  {
    id: 2,
    destinatie: "🏔️ Chalet Zermatt",
    platita: false,
    tip_masa: "demipensiune",
    pret: 850,
    nopti: 5,
    stele: "⭐⭐⭐⭐"
  },
  {
    id: 3,
    destinatie: "🏝️ Maldives Resort",
    platita: true,
    tip_masa: "all-inclusive",
    pret: 2400,
    nopti: 7,
    stele: "⭐⭐⭐⭐⭐"
  }
];

export default function App() {
  const [rezervari, setRezervari] = useState(REZERVARI_INITIALE);
  const [filtruText, setFiltruText] = useState("");
  const [filtruStare, setFiltruStare] = useState("toate");
  const [temaIntunecata, setTemaIntunecata] = useState(false);

  const [destinatie, setDestinatie] = useState("");
  const [tipMasa, setTipMasa] = useState("mic-dejun");
  const [pret, setPret] = useState("");
  const [nopti, setNopti] = useState("3");
  const [estePlatitaLaAdaugare, setEstePlatitaLaAdaugare] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = temaIntunecata
      ? "dark"
      : "light";
  }, [temaIntunecata]);

  const platite = rezervari.filter((r) => r.platita).length;

  const venitTotal = rezervari
    .filter((r) => r.platita)
    .reduce((total, r) => total + (Number(r.pret) || 0), 0);

  function handleAdaugaRezervare(e) {
    e.preventDefault();

    const nume = destinatie.trim();
    const pretNumeric = Number(pret);
    const noptiNumerice = Number(nopti);

    if (
      !nume ||
      pret === "" ||
      !Number.isFinite(pretNumeric) ||
      pretNumeric <= 0 ||
      !Number.isInteger(noptiNumerice) ||
      noptiNumerice < 1
    ) {
      return;
    }

    const nouaRezervare = {
      id: Date.now(),
      destinatie: nume,
      platita: estePlatitaLaAdaugare,
      tip_masa: tipMasa,
      pret: pretNumeric,
      nopti: noptiNumerice,
      stele: "⭐⭐⭐⭐"
    };

    setRezervari((prev) => [...prev, nouaRezervare]);

    setDestinatie("");
    setTipMasa("mic-dejun");
    setPret("");
    setNopti("3");
    setEstePlatitaLaAdaugare(false);
  }

  function handleTogglePlata(id) {
    setRezervari((prev) =>
      prev.map((rezervare) =>
        rezervare.id === id
          ? { ...rezervare, platita: !rezervare.platita }
          : rezervare
      )
    );
  }

  function handleSterge(id) {
    setRezervari((prev) =>
      prev.filter((rezervare) => rezervare.id !== id)
    );
  }

  const rezervariFiltrate = rezervari.filter((rezervare) => {
    const potrivire = rezervare.destinatie
      .toLowerCase()
      .includes(filtruText.trim().toLowerCase());

    if (filtruStare === "platite") {
      return potrivire && rezervare.platita;
    }

    if (filtruStare === "neplatite") {
      return potrivire && !rezervare.platita;
    }

    return potrivire;
  });

  return (
    <div className={`app-wrapper ${temaIntunecata ? "dark-theme" : ""}`}>
      <div className="top-bar">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setTemaIntunecata((prev) => !prev)}
          aria-pressed={temaIntunecata}
        >
          {temaIntunecata ? "☀️ Mod luminos" : "🌙 Mod întunecat"}
        </button>
      </div>

      <header className="app-header">
        <h1 className="main-title">✈️ Rezervări Turistice</h1>
        <p className="subtitle">
          🌍 Gestionează pachetele turistice ale clienților.
        </p>

        <div className="header-stats">
          <span className="counter-pill">
            🛎️ {rezervari.length} rezervări ({platite} plătite)
          </span>

          <span className="counter-pill pill-money">
            💵 Încasări: {venitTotal.toLocaleString("ro-RO")} EUR
          </span>
        </div>
      </header>

      <main className="main-layout">
        <section className="card-panel panel-form">
          <h2 className="panel-title">
            <span className="icon">📍</span> Rezervare nouă
          </h2>

          <hr className="divider" />

          <form className="booking-form" onSubmit={handleAdaugaRezervare}>
            <div className="form-group">
              <label htmlFor="destinatie">Destinație / Hotel</label>
              <input
                id="destinatie"
                type="text"
                placeholder="Ex: 🗼 Ritz Paris"
                value={destinatie}
                onChange={(e) => setDestinatie(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pret">Preț (EUR)</label>
                <input
                  id="pret"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="500"
                  value={pret}
                  onChange={(e) => setPret(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nopti">Nopți</label>
                <input
                  id="nopti"
                  type="number"
                  min="1"
                  step="1"
                  value={nopti}
                  onChange={(e) => setNopti(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tip_masa">Pachet masă</label>
              <select
                id="tip_masa"
                value={tipMasa}
                onChange={(e) => setTipMasa(e.target.value)}
              >
                <option value="mic-dejun">☕ Mic dejun</option>
                <option value="demipensiune">🍽️ Demipensiune</option>
                <option value="all-inclusive">🍹 All Inclusive</option>
              </select>
            </div>

            <div className="form-group plata-checkbox">
              <input
                id="estePlatita"
                type="checkbox"
                checked={estePlatitaLaAdaugare}
                onChange={(e) =>
                  setEstePlatitaLaAdaugare(e.target.checked)
                }
              />
              <label htmlFor="estePlatita">
                Marchează ca deja plătită
              </label>
            </div>

            <button type="submit" className="btn-submit">
              ➕ Înregistrează pachetul
            </button>
          </form>
        </section>

        <section className="card-panel panel-list">
          <div className="list-top-bar">
            <h2 className="panel-title">
              <span className="icon">🧳</span> Pachete curente
            </h2>

            <div className="filter-tabs">
              <button
                type="button"
                className={`tab-btn ${filtruStare === "toate" ? "active" : ""}`}
                onClick={() => setFiltruStare("toate")}
              >
                Toate
              </button>

              <button
                type="button"
                className={`tab-btn ${filtruStare === "platite" ? "active" : ""}`}
                onClick={() => setFiltruStare("platite")}
              >
                Plătite
              </button>

              <button
                type="button"
                className={`tab-btn ${filtruStare === "neplatite" ? "active" : ""}`}
                onClick={() => setFiltruStare("neplatite")}
              >
                Neplătite
              </button>
            </div>
          </div>

          <div className="search-box">
            <input
              type="search"
              placeholder="🔍 Caută după destinație..."
              aria-label="Caută după destinație"
              value={filtruText}
              onChange={(e) => setFiltruText(e.target.value)}
            />
          </div>

          <hr className="divider" />

          <RezervariList
            rezervari={rezervariFiltrate}
            onTogglePlata={handleTogglePlata}
            onSterge={handleSterge}
          />
        </section>
      </main>

      <footer className="app-footer">
        Sistem rezervări turistice - 2026
      </footer>
    </div>
  );
}

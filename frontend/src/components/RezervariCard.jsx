
const ETICHETE_MASA = {
  "mic-dejun": "☕ Mic dejun",
  demipensiune: "🍽️ Demipensiune",
  "all-inclusive": "🍹 All Inclusive"
};

export default function RezervariCard({
  rezervare,
  onTogglePlata,
  onSterge
}) {
  const estePlatita = Boolean(rezervare.platita);

  return (
    <li
      className={`rezervare-item ${
        estePlatita ? "platita" : "neplatita"
      }`}
    >
      <div className="rezervare-detalii">
        <div className="destinatie-header">
          <h3 className="destinatie-titlu">
            {rezervare.destinatie}
          </h3>

          <span className="hotel-stele">
            {rezervare.stele || "⭐⭐⭐⭐"}
          </span>
        </div>

        <div className="meta-info">
          <span className={`badge badge-${rezervare.tip_masa}`}>
            {ETICHETE_MASA[rezervare.tip_masa] || rezervare.tip_masa}
          </span>

          <span className="badge-pret">
            💰 {Number(rezervare.pret).toLocaleString("ro-RO")} EUR
          </span>

          <span className="badge-nopti">
            🌙 {rezervare.nopti} nopți
          </span>
        </div>
      </div>

      <div className="rezervare-actiuni">
        <button
          type="button"
          className={`status-btn ${
            estePlatita ? "btn-platit" : "btn-asteptare"
          }`}
          onClick={() => onTogglePlata(rezervare.id)}
          title="Schimbă starea plății"
        >
          {estePlatita ? "✅ Plătită" : "⏳ Neplătită"}
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={() => onSterge(rezervare.id)}
          title="Șterge rezervarea"
          aria-label={`Șterge rezervarea ${rezervare.destinatie}`}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

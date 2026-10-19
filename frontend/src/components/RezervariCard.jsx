const ETICHETE_MASA = {
  "mic-dejun": { text: "☕ Mic dejun", clasa: "badge-mic-dejun" },
  "demipensiune": { text: "🍽️ Demipensiune", clasa: "badge-demipensiune" },
  "all-inclusive": { text: "🍹 All Inclusive", clasa: "badge-all-inclusive" }
};

export default function RezervariCard({ rezervare, onTogglePlata, onSterge }) {
  const masa = ETICHETE_MASA[rezervare.tip_masa] || { text: rezervare.tip_masa, clasa: "" };

  return (
    <li className={`rezervare-item ${rezervare.platita ? "platita" : "neplatita"}`}>
      <div className="rezervare-detalii">
        <div className="destinatie-header">
          <h3 className="destinatie-titlu">{rezervare.destinatie}</h3>
          <span className="hotel-stele">{rezervare.stele || "⭐⭐⭐⭐"}</span>
        </div>
        
        <div className="meta-info">
          <span className={`badge ${masa.clasa}`}>{masa.text}</span>
          <span className="badge-pret">💰 {rezervare.pret || 500} EUR</span>
          <span className="badge-nopti">🌙 {rezervare.nopti || 3} nopți</span>
        </div>
      </div>

      <div className="rezervare-actiuni">
        <button
          type="button"
          className={`status-btn ${rezervare.platita ? "btn-platit" : "btn-asteptare"}`}
          onClick={() => onTogglePlata(rezervare.id)}
          title="Apasă pentru a schimba starea plății"
        >
          {rezervare.platita ? "✅ Plătită" : "⏳ Neplătită"}
        </button>

        <button
          type="button"
          className="btn-delete"
          onClick={() => onSterge(rezervare.id)}
          title="Șterge rezervarea"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
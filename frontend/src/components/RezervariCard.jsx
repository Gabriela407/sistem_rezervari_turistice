const ETICHETE_MASA = {
  "mic-dejun": "☕ Mic dejun",
  "demipensiune": "🍽️ Demipensiune",
  "all-inclusive": "🍹 All Inclusive"
};

export default function RezervariCard({ rezervare }) {
  const estePlatita = rezervare.platita;

  return (
    <li className={`rezervare-item ${estePlatita ? "platita" : "neplatita"}`}>
      <div className="rezervare-detalii">
        <h3 className="destinatie-titlu">{rezervare.destinatie}</h3>
        <span className={`badge badge-${rezervare.tip_masa}`}>
          {ETICHETE_MASA[rezervare.tip_masa] || rezervare.tip_masa}
        </span>
      </div>
      <div className="rezervare-status">
        <span className={`status-tag ${estePlatita ? "status-platita" : "status-neplatita"}`}>
          {estePlatita ? "✅ Plătită" : "⏳ Neplătită"}
        </span>
      </div>
    </li>
  );
}
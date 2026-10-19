import RezervariCard from "./RezervariCard.jsx";

export default function RezervariList({ rezervari, onTogglePlata, onSterge }) {
  
  if (!rezervari || rezervari.length === 0) {
    return (
      <div className="empty-box">
        <span className="empty-icon">🏖️</span>
        <p className="empty-message">Nu există nicio rezervare înregistrată.</p>
        <small className="empty-hint">Folosește formularul din stânga pentru a adăuga o destinație.</small>
      </div>
    );
  }

  return (
    <ul className="rezervari-list">
      {rezervari.map((rezervare) => (
        <RezervariCard
          key={rezervare.id}
          rezervare={rezervare}
          onTogglePlata={onTogglePlata}
          onSterge={onSterge}
        />
      ))}
    </ul>
  );
}
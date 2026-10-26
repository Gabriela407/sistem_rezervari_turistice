
import RezervariCard from "./RezervariCard.jsx";

export default function RezervariList({
  rezervari,
  onTogglePlata,
  onSterge
}) {
  if (!rezervari || rezervari.length === 0) {
    return (
      <p className="empty-message">
        Nu există nicio rezervare pentru criteriile selectate.
      </p>
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

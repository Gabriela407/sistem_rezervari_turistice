import RezervariCard from "./RezervariCard.jsx";

export default function RezervariList({ rezervari }) {
  if (!rezervari || rezervari.length === 0) {
    return <p className="empty-message">Nu există nicio rezervare.</p>;
  }

  return (
    <ul className="rezervari-list">
      {rezervari.map((rezervare) => (
        <RezervariCard key={rezervare.id} rezervare={rezervare} />
      ))}
    </ul>
  );
}
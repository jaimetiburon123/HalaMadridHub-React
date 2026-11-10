// Presentational: it only receives a player through props and shows it.
export default function PlayerCard({ player }) {
  return (
    <article className="player-card">
      <img src={player.photo || '/player-placeholder.svg'} alt={player.name} loading="lazy" />
      <h3>{player.name}</h3>
      <p className="player-meta">
        {player.position}
        {player.age !== null && ` · ${player.age} y/o`}
      </p>
      <p className="player-meta">{player.nationality}</p>
      {player.number && <span className="player-number">{player.number}</span>}
    </article>
  );
}

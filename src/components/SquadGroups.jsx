import EmptyState from './EmptyState.jsx';
import PlayerCard from './PlayerCard.jsx';

export default function SquadGroups({ groups }) {
  if (groups.length === 0) {
    return <EmptyState message="No players match your search." />;
  }
  return groups.map(({ line, players }) => (
    <section key={line} className="line-group">
      <h3 className="line-title">
        {line} ({players.length})
      </h3>
      <div className="squad-grid">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </section>
  ));
}

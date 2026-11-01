import EmptyState from './EmptyState.jsx';
import MatchCard from './MatchCard.jsx';

export default function MatchList({ last, next }) {
  if (last.length === 0 && next.length === 0) {
    return <EmptyState message="No matches available right now." />;
  }
  return (
    <div className="matches">
      {last.map((match) => (
        <MatchCard key={match.id} match={match} label="Last result" />
      ))}
      {next.map((match) => (
        <MatchCard key={match.id} match={match} label="Next match" />
      ))}
    </div>
  );
}

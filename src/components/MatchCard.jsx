import TeamSide from './TeamSide.jsx';

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
});

// Reused for both the last result and the next match: only `label` and the data change.
export default function MatchCard({ match, label }) {
  // Everything below is derived from the props during the render.
  const played = match.result !== null;
  const score = played ? `${match.home.score} – ${match.away.score}` : 'vs';
  const when = match.date ? dateFormat.format(match.date) : 'Date TBC';
  const footer = [when, match.venue].filter(Boolean).join(' · ');

  return (
    <article className={played ? `match-card match-card--${match.result}` : 'match-card'}>
      <div className="match-header">
        <span className="match-label">{label}</span>
        <span>{match.competition}</span>
      </div>
      <div className="match-body">
        <TeamSide team={match.home} />
        <span className="match-score">{score}</span>
        <TeamSide team={match.away} />
      </div>
      <p className="match-footer">{footer}</p>
    </article>
  );
}

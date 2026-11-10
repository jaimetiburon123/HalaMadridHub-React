// Reused for both the last result and the next match: only `label` and the data change.
export default function MatchCard({ match, label }) {
  // Everything below is derived from the props during the render.
  const played = match.result !== null;
  const score = played ? `${match.home.score} – ${match.away.score}` : 'vs';
  const when = match.date ? match.date.toLocaleString('en-GB') : 'Date TBC';

  return (
    <article className={played ? `match-card match-card--${match.result}` : 'match-card'}>
      <div className="match-header">
        <span className="match-label">{label}</span>
        <span>{match.competition}</span>
      </div>
      <div className="match-body">
        <div className="match-team">
          {match.home.badge && <img src={match.home.badge} alt="" />}
          <span>{match.home.name}</span>
        </div>
        <span className="match-score">{score}</span>
        <div className="match-team">
          {match.away.badge && <img src={match.away.badge} alt="" />}
          <span>{match.away.name}</span>
        </div>
      </div>
      <p className="match-footer">
        {when}
        {match.venue && ` · ${match.venue}`}
      </p>
    </article>
  );
}

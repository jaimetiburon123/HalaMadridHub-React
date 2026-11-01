import { useState } from 'react';

// One side of a match card: badge (hidden if the image fails) and team name.
export default function TeamSide({ team }) {
  const [badgeFailed, setBadgeFailed] = useState(false);

  return (
    <div className="match-team">
      {team.badge && !badgeFailed && (
        <img src={team.badge} alt="" onError={() => setBadgeFailed(true)} />
      )}
      <span>{team.name}</span>
    </div>
  );
}

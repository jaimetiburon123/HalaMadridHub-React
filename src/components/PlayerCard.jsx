import { useState } from 'react';

const PLACEHOLDER_PHOTO = '/player-placeholder.svg';

export default function PlayerCard({ player }) {
  // Only real state here: whether the photo failed to load (then the placeholder is used).
  const [photoFailed, setPhotoFailed] = useState(false);
  const photo = player.photo && !photoFailed ? player.photo : PLACEHOLDER_PHOTO;

  return (
    <article className="player-card">
      <img src={photo} alt={player.name} loading="lazy" onError={() => setPhotoFailed(true)} />
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

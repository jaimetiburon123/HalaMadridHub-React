import useClock from '../hooks/useClock.js';

const pad = (n) => String(n).padStart(2, '0');

// Only this component re-renders every second, not the whole match centre.
export default function Countdown({ date }) {
  const now = useClock();

  if (!date) return <p className="countdown countdown--done">Kick-off time to be confirmed</p>;

  // Derived from the clock and the prop on every render: nothing to store.
  const seconds = Math.floor((date - now) / 1000);
  if (seconds <= 0) return <p className="countdown countdown--done">The match has kicked off!</p>;

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return (
    <p className="countdown">
      <span className="countdown-label">Kick-off in</span>
      {days > 0 && <strong>{days}d </strong>}
      <strong>
        {pad(hours)}h {pad(minutes)}m {pad(seconds % 60)}s
      </strong>
    </p>
  );
}

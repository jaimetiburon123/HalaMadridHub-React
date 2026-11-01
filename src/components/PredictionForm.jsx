import { useState } from 'react';
import { isValidScore } from '../logic/prediction.js';

// Controlled inputs for a score. The draft is local state: only this form needs it while typing.
// The saved prediction lives higher up and arrives through onSave.
export default function PredictionForm({ match, initial, onSave }) {
  const [home, setHome] = useState(initial ? String(initial.home) : '');
  const [away, setAway] = useState(initial ? String(initial.away) : '');
  // Derived: whether the button can be used depends only on the two inputs.
  const valid = isValidScore(home) && isValidScore(away);

  function handleSubmit(event) {
    event.preventDefault();
    if (!valid) return;
    onSave({ home: Number(home), away: Number(away) });
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <label htmlFor="pred-home">{match.home.name}</label>
      <input
        id="pred-home"
        type="number"
        min="0"
        max="20"
        value={home}
        onChange={(e) => setHome(e.target.value)}
      />
      <span aria-hidden="true">–</span>
      <input
        id="pred-away"
        type="number"
        min="0"
        max="20"
        value={away}
        onChange={(e) => setAway(e.target.value)}
      />
      <label htmlFor="pred-away">{match.away.name}</label>
      <button type="submit" className="btn" disabled={!valid}>
        {initial ? 'Update prediction' : 'Save prediction'}
      </button>
    </form>
  );
}

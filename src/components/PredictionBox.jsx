import useLocalStorage from '../hooks/useLocalStorage.js';
import { isPredictionOpen, scorePrediction } from '../logic/prediction.js';
import PredictionForm from './PredictionForm.jsx';

// Predict the next match; once a predicted match has been played, show how it went.
// `matches` = every match the API returned (last + next), so a prediction can be checked
// whichever list the played match appears in.
export default function PredictionBox({ next, matches }) {
  // { [matchId]: { home, away } } — one saved prediction per match, kept after a reload.
  const [predictions, setPredictions] = useLocalStorage('hmh-predictions', {});

  // Derived: the most recent played match that has a prediction, and how the user did.
  const checked = matches
    .filter((match) => match.result !== null && predictions[match.id])
    .map((match) => ({ match, verdict: scorePrediction(predictions[match.id], match) }))
    .at(-1);

  const saved = next ? predictions[next.id] : undefined;
  const open = next ? isPredictionOpen(next) : false;

  function savePrediction(prediction) {
    // Immutable update: a new object with the new prediction, the old ones untouched.
    setPredictions((prev) => ({ ...prev, [next.id]: prediction }));
  }

  return (
    <div className="prediction">
      <h3>Predict the score</h3>

      {checked && (
        <p className={`prediction-verdict prediction-verdict--${checked.verdict.outcome}`} role="status">
          {checked.match.home.name} {checked.match.home.score} – {checked.match.away.score}{' '}
          {checked.match.away.name}: you said {predictions[checked.match.id].home} –{' '}
          {predictions[checked.match.id].away}. {checked.verdict.message}
        </p>
      )}

      {!next && <p className="prediction-note">No upcoming match announced yet.</p>}
      {next && !open && <p className="prediction-note">Predictions are closed for this match.</p>}
      {next && open && (
        <>
          {saved && (
            <p className="prediction-note">
              Your prediction: {saved.home} – {saved.away}. You can change it until kick-off.
            </p>
          )}
          {/* key: if the next match changes, the form starts again with that match's prediction */}
          <PredictionForm key={next.id} match={next} initial={saved} onSave={savePrediction} />
        </>
      )}
    </div>
  );
}

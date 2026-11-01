// Logic layer: pure functions for the score prediction game.

// Predictions close when the match already has a score or its kick-off time has passed.
export function isPredictionOpen(match, now = new Date()) {
  if (match.result !== null) return false;
  return match.date === null || match.date > now;
}

const winner = (home, away) => (home > away ? 'home' : home < away ? 'away' : 'draw');

// Compares a saved { home, away } prediction with a played match.
export function scorePrediction(prediction, match) {
  if (!prediction || match.result === null) return null;
  const { home, away } = match;
  if (prediction.home === home.score && prediction.away === away.score) {
    return { outcome: 'exact', message: 'Exact score! You called it 🎯' };
  }
  if (winner(prediction.home, prediction.away) === winner(home.score, away.score)) {
    return { outcome: 'winner', message: 'You got the result right, not the exact score.' };
  }
  return { outcome: 'miss', message: 'Not this time. Better luck in the next one!' };
}

// A valid score is a whole number between 0 and 20.
export function isValidScore(value) {
  return value !== '' && Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) <= 20;
}

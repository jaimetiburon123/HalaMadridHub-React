// Logic layer: pure functions that transform squad data (map/filter/reduce).
const LINES = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards', 'Others'];

// Turns TheSportsDB's detailed positions into the four lines of a team.
function positionToLine(position) {
  const p = (position || '').toLowerCase();
  if (p.includes('goalkeeper')) return 'Goalkeepers';
  if (p.includes('back') || p.includes('defen')) return 'Defenders';
  if (p.includes('midfield')) return 'Midfielders';
  if (p.includes('wing') || p.includes('forward') || p.includes('striker')) return 'Forwards';
  return 'Others';
}

// Approximate age from the birth year (null if the API has no birth date).
function ageFrom(dateBorn) {
  if (!dateBorn) return null;
  return new Date().getFullYear() - Number(dateBorn.slice(0, 4));
}

// Raw API player -> clean object the components can trust.
export function normalizePlayers(rawPlayers) {
  return rawPlayers
    .filter((p) => p && p.strPlayer)
    .map((p) => ({
      id: p.idPlayer,
      name: p.strPlayer,
      position: p.strPosition || 'Unknown',
      line: positionToLine(p.strPosition),
      nationality: p.strNationality || 'Unknown',
      number: p.strNumber || '',
      age: ageFrom(p.dateBorn),
      photo: p.strCutout || p.strThumb || '',
    }));
}

export function filterPlayers(players, { query, line }) {
  const text = query.trim().toLowerCase();
  return players
    .filter((p) => line === 'All' || p.line === line)
    .filter((p) => p.name.toLowerCase().includes(text) || p.nationality.toLowerCase().includes(text));
}

// [{ line: 'Goalkeepers', players: [...] }, ...] in pitch order, empty lines left out.
export function groupByLine(players) {
  return LINES.map((line) => ({ line, players: players.filter((p) => p.line === line) })).filter(
    (group) => group.players.length > 0
  );
}

export function squadStats(players) {
  const ages = players.map((p) => p.age).filter((age) => age !== null);
  const averageAge = ages.length > 0 ? ages.reduce((sum, age) => sum + age, 0) / ages.length : null;
  const spanish = players.filter((p) => p.nationality === 'Spain').length;
  return { total: players.length, averageAge, spanish };
}

export const availableLines = (players) => ['All', ...groupByLine(players).map((g) => g.line)];

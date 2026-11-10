// Logic layer: turns the raw API matches into clean objects the components can trust.
import { REAL_MADRID_ID } from '../api/sportsdb.js';

const toNumber = (value) => {
  const n = Number(value);
  return value === null || value === undefined || value === '' || Number.isNaN(n) ? null : n;
};

function normalizeMatch(event) {
  const isHome = event.idHomeTeam === REAL_MADRID_ID;
  const home = toNumber(event.intHomeScore);
  const away = toNumber(event.intAwayScore);

  // 'W', 'D' or 'L' from Real Madrid's point of view, or null if not played yet.
  let result = null;
  if (home !== null && away !== null) {
    const ours = isHome ? home : away;
    const theirs = isHome ? away : home;
    result = ours > theirs ? 'W' : ours < theirs ? 'L' : 'D';
  }

  const date = event.strTimestamp ? new Date(`${event.strTimestamp}Z`) : null;
  return {
    id: event.idEvent,
    competition: event.strLeague || 'Match',
    date: date && !Number.isNaN(date.getTime()) ? date : null,
    venue: event.strVenue || '',
    home: { name: event.strHomeTeam || 'TBD', badge: event.strHomeTeamBadge || '', score: home },
    away: { name: event.strAwayTeam || 'TBD', badge: event.strAwayTeamBadge || '', score: away },
    result,
  };
}

export const normalizeMatches = (events) =>
  events.filter((e) => e && e.idEvent).map(normalizeMatch);

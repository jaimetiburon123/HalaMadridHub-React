// API layer: the only place that talks to TheSportsDB.
// Components never call fetch directly: they use these functions through useFetch.
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/123';
export const REAL_MADRID_ID = '133738';

// fetch does NOT fail on 404 or 500, so response.ok has to be checked by hand.
// `signal` lets the component cancel the request (see useFetch).
async function request(endpoint, signal) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(`TheSportsDB responded with status ${response.status}.`);
  }
  return response.json();
}

export async function getSquad({ signal }) {
  const data = await request(`lookup_all_players.php?id=${REAL_MADRID_ID}`, signal);
  return Array.isArray(data?.player) ? data.player : [];
}

export async function getLastMatches({ signal }) {
  const data = await request(`eventslast.php?id=${REAL_MADRID_ID}`, signal);
  return Array.isArray(data?.results) ? data.results : [];
}

export async function getNextMatches({ signal }) {
  const data = await request(`eventsnext.php?id=${REAL_MADRID_ID}`, signal);
  return Array.isArray(data?.events) ? data.events : [];
}

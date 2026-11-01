import { getLeagueTable } from '../api/sportsdb.js';
import { normalizeTable, seasonSummary, currentSeason } from '../logic/matches.js';
import useFetch from '../hooks/useFetch.js';
import Panel from './Panel.jsx';
import Loading from './Loading.jsx';
import ErrorBox from './ErrorBox.jsx';
import EmptyState from './EmptyState.jsx';
import StatTiles from './StatTiles.jsx';
import LeagueTable from './LeagueTable.jsx';

async function loadTable({ signal }) {
  return normalizeTable(await getLeagueTable({ signal, season: currentSeason() }));
}

const signed = (n) => (n > 0 ? `+${n}` : String(n));

// Derived from the table during the render: it is never stored in state.
function summaryTiles(summary) {
  return [
    { label: 'Position', value: `${summary.rank}º` },
    { label: 'Points', value: summary.points },
    { label: 'Win rate', value: `${summary.winRate}%` },
    { label: 'Goal diff.', value: signed(summary.goalDifference) },
    { label: 'Goals / game', value: summary.goalsPerGame.toFixed(2) },
    {
      label: 'Behind leader',
      value: summary.pointsBehindLeader > 0 ? `${summary.pointsBehindLeader} pts` : 'Leaders!',
    },
  ];
}

export default function SeasonPanel() {
  const { data: table, error, isPending, retry } = useFetch(loadTable);
  const summary = table ? seasonSummary(table) : null;

  return (
    <Panel title="La Liga season">
      {isPending && <Loading text="Reading the La Liga table..." />}
      {error && <ErrorBox message={error.message} onRetry={retry} />}
      {table && table.length === 0 && <EmptyState message="League table not available right now." />}
      {summary && <StatTiles items={summaryTiles(summary)} />}
      {table && table.length > 0 && <LeagueTable rows={table} />}
    </Panel>
  );
}

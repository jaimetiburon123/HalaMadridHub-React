import { useState } from 'react';
import { getSquad } from '../api/sportsdb.js';
import {
  normalizePlayers, filterPlayers, groupByLine, squadStats, availableLines,
} from '../logic/squad.js';
import useFetch from '../hooks/useFetch.js';
import Panel from './Panel.jsx';
import Loading from './Loading.jsx';
import ErrorBox from './ErrorBox.jsx';
import EmptyState from './EmptyState.jsx';
import StatTiles from './StatTiles.jsx';
import SquadFilters from './SquadFilters.jsx';
import SquadGroups from './SquadGroups.jsx';

async function loadSquad({ signal }) {
  return normalizePlayers(await getSquad({ signal }));
}

function statItems(stats) {
  return [
    { label: 'Players', value: stats.total },
    { label: 'Average age', value: stats.averageAge !== null ? stats.averageAge.toFixed(1) : '—' },
    { label: 'Nationalities', value: stats.nationalityCount },
    {
      label: 'Most common',
      value: stats.topNationality ? `${stats.topNationality[0]} (${stats.topNationality[1]})` : '—',
    },
    { label: 'Youngest', value: stats.youngest ? `${stats.youngest.name} (${stats.youngest.age})` : '—' },
  ];
}

export default function SquadPanel() {
  const { data: players, error, isPending, retry } = useFetch(loadSquad);
  // The only state of the section: what the user typed and which line is selected.
  // It lives here (not in SquadFilters) because the filters AND the grid both need it.
  const [query, setQuery] = useState('');
  const [line, setLine] = useState('All');

  if (isPending) {
    return (
      <Panel title="The squad">
        <Loading text="Warming up at Valdebebas..." />
      </Panel>
    );
  }
  if (error) {
    return (
      <Panel title="The squad">
        <ErrorBox message={error.message} onRetry={retry} />
      </Panel>
    );
  }
  if (players.length === 0) {
    return (
      <Panel title="The squad">
        <EmptyState message="No players found right now." />
      </Panel>
    );
  }

  // Derived during the render, never stored: 10 players is not an expensive calculation,
  // so no useMemo (slide: "a useMemo there is noise").
  const visibleGroups = groupByLine(filterPlayers(players, { query, line }));

  return (
    <Panel title="The squad">
      <StatTiles items={statItems(squadStats(players))} />
      <SquadFilters
        lines={availableLines(players)}
        query={query}
        line={line}
        onQueryChange={setQuery}
        onLineChange={setLine}
      />
      <SquadGroups groups={visibleGroups} />
    </Panel>
  );
}

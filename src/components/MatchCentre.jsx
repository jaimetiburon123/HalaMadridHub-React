import { getLastMatches, getNextMatches } from '../api/sportsdb.js';
import { normalizeMatches } from '../logic/matches.js';
import useFetch from '../hooks/useFetch.js';
import Panel from './Panel.jsx';
import Loading from './Loading.jsx';
import ErrorBox from './ErrorBox.jsx';
import MatchList from './MatchList.jsx';
import Countdown from './Countdown.jsx';
import PredictionBox from './PredictionBox.jsx';

// Defined outside the component so it is the same function on every render (stable dependency).
async function loadMatches({ signal }) {
  const [last, next] = await Promise.all([getLastMatches({ signal }), getNextMatches({ signal })]);
  return { last: normalizeMatches(last), next: normalizeMatches(next) };
}

export default function MatchCentre() {
  const { data, error, isPending, retry } = useFetch(loadMatches);
  // Derived from the fetched data: the first upcoming match, if there is one.
  const next = data?.next[0] ?? null;

  return (
    <Panel title="Match centre">
      {isPending && <Loading text="Checking the fixture list..." />}
      {error && <ErrorBox message={error.message} onRetry={retry} />}
      {data && (
        <>
          <MatchList last={data.last} next={data.next} />
          {next && <Countdown date={next.date} />}
          <PredictionBox next={next} matches={[...data.last, ...data.next]} />
        </>
      )}
    </Panel>
  );
}

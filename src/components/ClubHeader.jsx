import { getTeam } from '../api/sportsdb.js';
import useFetch from '../hooks/useFetch.js';
import KitPicker from './KitPicker.jsx';

export default function ClubHeader() {
  // The header is a nice extra: while loading or if it fails, the plain title is shown.
  const { data: team } = useFetch(getTeam);

  const details = team
    ? [
        team.intFormedYear && `Since ${team.intFormedYear}`,
        team.strStadium,
        team.intStadiumCapacity &&
          `${Number(team.intStadiumCapacity).toLocaleString('en-GB')} seats`,
      ].filter(Boolean)
    : [];

  return (
    <header className="site-header">
      <div className="club">
        {team?.strBadge && (
          <img className="club-badge" src={team.strBadge} alt={`${team.strTeam ?? 'Club'} badge`} />
        )}
        <div className="club-titles">
          <h1>Hala Madrid Hub</h1>
          {details.length > 0 && <p className="club-details">{details.join(' · ')}</p>}
        </div>
        <KitPicker />
      </div>
    </header>
  );
}

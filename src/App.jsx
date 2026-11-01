import ClubHeader from './components/ClubHeader.jsx';
import MatchCentre from './components/MatchCentre.jsx';
import SeasonPanel from './components/SeasonPanel.jsx';
import SquadPanel from './components/SquadPanel.jsx';

export default function App() {
  return (
    <>
      <ClubHeader />
      <main>
        <MatchCentre />
        <SeasonPanel />
        <SquadPanel />
      </main>
    </>
  );
}

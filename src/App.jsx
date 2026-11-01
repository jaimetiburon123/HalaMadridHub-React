import ClubHeader from './components/ClubHeader.jsx';
import MatchCentre from './components/MatchCentre.jsx';
import Panel from './components/Panel.jsx';

export default function App() {
  return (
    <>
      <ClubHeader />
      <main>
        <MatchCentre />
        <Panel title="La Liga season">
          <p>Coming soon.</p>
        </Panel>
        <Panel title="The squad">
          <p>Coming soon.</p>
        </Panel>
      </main>
    </>
  );
}

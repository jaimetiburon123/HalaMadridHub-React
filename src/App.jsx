import { KitContext, KITS } from './context/KitContext.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import ClubHeader from './components/ClubHeader.jsx';
import MatchCentre from './components/MatchCentre.jsx';
import SquadPanel from './components/SquadPanel.jsx';

export default function App() {
  // The kit is remembered between visits, so it uses the useLocalStorage hook.
  const [savedKit, setKit] = useLocalStorage('hmh-kit', 'home');
  // Derived: if localStorage holds an old or invalid value, fall back to the home kit.
  const kit = KITS.some((k) => k.id === savedKit) ? savedKit : 'home';

  return (
    // React 19: the context itself is the provider, no .Provider needed.
    <KitContext value={{ kit, setKit }}>
      <div className={`app kit-${kit}`}>
        <ClubHeader />
        <main>
          <MatchCentre />
          <SquadPanel />
        </main>
      </div>
    </KitContext>
  );
}

import Panel from './components/Panel.jsx';

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="club">
          <div className="club-titles">
            <h1>Hala Madrid Hub</h1>
          </div>
        </div>
      </header>
      <main>
        <Panel title="Match centre">
          <p>Coming soon.</p>
        </Panel>
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

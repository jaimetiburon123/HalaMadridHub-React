import KitPicker from './KitPicker.jsx';

export default function ClubHeader() {
  return (
    <header className="site-header">
      <div className="club">
        <div className="club-titles">
          <h1>Hala Madrid Hub</h1>
        </div>
        <KitPicker />
      </div>
    </header>
  );
}

// Reused by the season summary and the squad stats.
// `items` is a list of { label, value }; the label is unique, so it works as the key.
export default function StatTiles({ items }) {
  return (
    <div className="stats">
      {items.map(({ label, value }) => (
        <div key={label} className="stat">
          <span className="stat-value">{value}</span>
          <span className="stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

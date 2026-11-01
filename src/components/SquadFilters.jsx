// Presentational: it has no state of its own. The values come from SquadPanel through props
// and every change goes back up as a function call (lifting state up).
export default function SquadFilters({ lines, query, line, onQueryChange, onLineChange }) {
  return (
    <div className="filters">
      <input
        type="search"
        className="search"
        placeholder="Search player or nationality..."
        aria-label="Search players"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <div className="chips">
        {lines.map((option) => (
          <button
            key={option}
            type="button"
            className="chip"
            aria-pressed={option === line}
            onClick={() => onLineChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

import FormChips from './FormChips.jsx';

const signed = (n) => (n > 0 ? `+${n}` : String(n));

export default function LeagueTable({ rows }) {
  return (
    <div className="table-scroll">
      <table className="league-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.team} className={row.isUs ? 'is-us' : undefined}>
              <td>{row.rank ?? '—'}</td>
              <td>{row.team}</td>
              <td>{row.played}</td>
              <td>{row.won}</td>
              <td>{row.drawn}</td>
              <td>{row.lost}</td>
              <td>{signed(row.goalsFor - row.goalsAgainst)}</td>
              <td>{row.points}</td>
              <td>
                <FormChips letters={row.form.letters} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

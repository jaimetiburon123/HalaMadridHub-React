export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="state state--loading" role="status">
      <span className="spinner" aria-hidden="true" />
      {text}
    </div>
  );
}

export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <strong>Something went wrong</strong>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

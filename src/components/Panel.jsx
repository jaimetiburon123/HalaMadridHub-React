// Wrapper for every section of the page: a title and whatever goes inside as children.
export default function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

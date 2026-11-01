// Recent form as coloured W/D/L chips. The letters are a fixed sequence that is never
// reordered or filtered, so the index is a valid key here (slide: "index only in static lists").
export default function FormChips({ letters }) {
  return (
    <span className="form">
      {letters.map((letter, index) => (
        <span key={index} className={`form-chip form-chip--${letter}`}>
          {letter}
        </span>
      ))}
    </span>
  );
}

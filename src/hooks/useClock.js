import { useState, useEffect } from 'react';

// Custom hook: the current time, updated every second (the useClock pattern from the slides).
// Every component that calls it gets its own clock: hooks share logic, not state.
export default function useClock() {
  const [now, setNow] = useState(() => new Date());

  // Justified effect: synchronising with a timer, something outside React.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    // Cleanup: without it, every remount would leave another interval running.
    return () => clearInterval(id);
  }, []);

  return now;
}

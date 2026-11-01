import { useState, useEffect } from 'react';

// Custom hook (bonus): runs an async loader and returns { data, error, isPending, retry }.
// `loader` receives { signal } and must be a stable function (defined outside the component),
// otherwise the effect would run again on every render.
export default function useFetch(loader) {
  const [result, setResult] = useState({ data: null, error: null, isPending: true });
  // Changing this number is what makes the effect run again when the user presses "Try again".
  const [attempt, setAttempt] = useState(0);

  // Justified effect: synchronising the component with the network (something outside React).
  useEffect(() => {
    const controller = new AbortController();

    loader({ signal: controller.signal })
      .then((data) => setResult({ data, error: null, isPending: false }))
      .catch((error) => {
        // A cancelled request is not a failure: the component is gone or a new attempt started.
        if (error.name === 'AbortError') return;
        setResult({ data: null, error, isPending: false });
      });

    // Cleanup: cancel the request on unmount or before running again.
    return () => controller.abort();
  }, [loader, attempt]);

  function retry() {
    setResult({ data: null, error: null, isPending: true });
    setAttempt((a) => a + 1);
  }

  return { ...result, retry };
}

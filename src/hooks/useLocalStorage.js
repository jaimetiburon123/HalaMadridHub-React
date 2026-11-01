import { useState, useEffect } from 'react';

function read(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  } catch {
    // Storage blocked or corrupted data: start from the initial value.
    return initialValue;
  }
}

// Custom hook (bonus): works like useState, but the value survives a page reload.
export default function useLocalStorage(key, initialValue) {
  // Lazy initial state: localStorage is only read on the first render, not on every one.
  const [value, setValue] = useState(() => read(key, initialValue));

  // Justified effect: synchronising the state with localStorage (outside React).
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: the app keeps working, it just won't remember.
    }
  }, [key, value]);

  return [value, setValue];
}

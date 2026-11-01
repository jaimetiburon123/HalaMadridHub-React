import { useContext } from 'react';
import { KitContext, KITS } from '../context/KitContext.js';

// Reads the kit straight from the context: ClubHeader does not need to know about it.
export default function KitPicker() {
  const { kit, setKit } = useContext(KitContext);

  return (
    <div className="kit-picker" role="group" aria-label="Choose a kit">
      {KITS.map((option) => (
        <button
          key={option.id}
          type="button"
          className="kit-option"
          aria-pressed={option.id === kit}
          onClick={() => setKit(option.id)}
        >
          <span aria-hidden="true">{option.icon}</span> {option.label}
        </button>
      ))}
    </div>
  );
}

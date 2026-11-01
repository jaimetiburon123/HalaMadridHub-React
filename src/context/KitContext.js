import { createContext } from 'react';

// The three Real Madrid kits the page can wear. The id is also the CSS class suffix.
export const KITS = [
  { id: 'home', label: 'Home', icon: '⚪' },
  { id: 'away', label: 'Away', icon: '🌙' },
  { id: 'third', label: 'Third', icon: '🌸' },
];

// Which kit the page is wearing and how to change it.
// It is a context because it is global UI data: the picker lives deep inside the header,
// and passing it through every level as props would be prop drilling.
export const KitContext = createContext({ kit: 'home', setKit: () => {} });

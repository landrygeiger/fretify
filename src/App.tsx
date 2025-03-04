import { useState } from 'react';
import Fretboard from './components/Fretboard/Fretboard';

const App = () => {
  const [numFrets, setNumFrets] = useState(12);
  const [numStrings, setNumStrings] = useState(6);
  const [highlightedNote, setHighlightedNote] = useState<{
    string: number;
    fret: number;
  } | null>(null);

  return (
    <>
      <Fretboard
        numFrets={numFrets}
        numStrings={numStrings}
        canClickNotes
        highlightedNote={highlightedNote}
        onClick={(fret, string) => setHighlightedNote({ string, fret })}
      />
      <p>Highlighted Note: {JSON.stringify(highlightedNote)}</p>
      <div>
        <p>Frets</p>
        <button onClick={() => setNumFrets(numFrets + 1)}>+</button>
        <button onClick={() => setNumFrets(numFrets - 1)}>-</button>
      </div>
      <div>
        <p>Strings</p>
        <button onClick={() => setNumStrings(numStrings + 1)}>+</button>
        <button onClick={() => setNumStrings(numStrings - 1)}>-</button>
      </div>
    </>
  );
};

export default App;

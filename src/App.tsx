import { useState } from 'react';
import Fretboard from './components/Fretboard/Fretboard';
import NoteInput from './components/NoteInput/NoteInput';
import Button from './components/Base/Button';
import Text from './components/Base/Text';

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
        onClick={(string, fret) => setHighlightedNote({ string, fret })}
      />
      <NoteInput onClick={console.log} className={'my-4'} />
      <Text className="font-playfair-display">
        Highlighted Note: {JSON.stringify(highlightedNote)}
      </Text>
      <div>
        <Text className="font-playfair-display">Frets</Text>
        <Button onClick={() => setNumFrets(numFrets + 1)}>+</Button>
        <Button onClick={() => setNumFrets(numFrets - 1)}>-</Button>
      </div>
      <div>
        <Text>Strings</Text>
        <Button onClick={() => setNumStrings(numStrings + 1)}>+</Button>
        <Button onClick={() => setNumStrings(numStrings - 1)}>-</Button>
      </div>
    </>
  );
};

export default App;

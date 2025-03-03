import { useState } from 'react';
import Fretboard from './components/Fretboard';

const App = () => {
  const [numFrets, setNumFrets] = useState(12);
  const [numStrings, setNumStrings] = useState(6);

  return (
    <>
      <Fretboard numFrets={numFrets} numStrings={numStrings} />
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

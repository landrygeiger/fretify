import { FC, useState } from 'react';
import Fretboard from './Fretboard/Fretboard';
import NoteInput from './NoteInput/NoteInput';
import * as Note from '../types/note';
import { randomInt } from '../utils/math';
import { fretToNoteNumber, STANDARD_TUNING } from '../utils/fretboard';
import Text from './Base/Text';
import { flashElement } from '../utils/element';
import useTimer from '../hooks/useTimer';

const NoteIdentification: FC = () => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [highlightedNote, setHighlightedNote] = useState({
    string: randomInt(1, 7),
    fret: randomInt(0, 13),
  });

  const { timerCount, startTimer, stopTimer } = useTimer({
    seconds: 5,
    onStop: () => console.log('done!'),
  });

  const handleGuess = (guess: Note.Note) => {
    const realNumber = fretToNoteNumber(
      highlightedNote.string,
      highlightedNote.fret,
      STANDARD_TUNING
    );
    const guessedNumber = Note.toNumber(guess);
    const isCorrect = realNumber === guessedNumber;

    document
      .querySelectorAll(`.${Note.toClassName(guess)}`)
      .forEach((element) =>
        flashElement(element, isCorrect ? 'green' : 'red', 200)
      );

    setScore({
      correct: score.correct + (isCorrect ? 1 : 0),
      incorrect: score.incorrect + (!isCorrect ? 1 : 0),
    });
    setHighlightedNote({
      string: randomInt(1, 7),
      fret: randomInt(0, 13),
    });
  };

  return (
    <div>
      <Text className="mb-8">
        Correct: {score.correct}/{score.correct + score.incorrect}
      </Text>
      <Fretboard
        numFrets={13}
        numStrings={6}
        highlightedNote={highlightedNote}
      />
      <NoteInput className={'mt-8'} onClick={handleGuess} enableHotkeys />
      <p>{timerCount}</p>
      <button onClick={startTimer}>start</button>
      <button onClick={stopTimer}>stop</button>
    </div>
  );
};

export default NoteIdentification;

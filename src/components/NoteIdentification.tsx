import { FC } from 'react';
import useNoteIdentification from '../hooks/useNoteIdentification';
import * as Note from '../types/note';
import { flashClass } from '../utils/element';
import Text from './Base/Text';
import Fretboard from './Fretboard/Fretboard';
import NoteInput from './NoteInput/NoteInput';

const FRETBOARD_RANGE = {
  strings: {
    min: 1,
    max: 6,
  },
  frets: {
    min: 0,
    max: 12,
  },
};

const NoteIdentification: FC = () => {
  const { score, guess, startTimer, stopTimer, timerCount, highlightedNote } =
    useNoteIdentification({
      fretboardRange: FRETBOARD_RANGE,
    });

  const handleGuess = (note: Note.Note) =>
    guess({
      guess: note,
      onCorrect: () => flashClass(Note.toClassName(note), 'green'),
      onIncorrect: () => flashClass(Note.toClassName(note), 'red'),
    });

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

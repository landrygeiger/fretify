import { useState } from 'react';
import * as Note from '../types/note';
import { fretToNoteNumber, STANDARD_TUNING } from '../utils/fretboard';
import { randomInt } from '../utils/math';
import useTimer from './useTimer';

type HookParams = {
  fretboardRange: {
    strings: { min: number; max: number };
    frets: { min: number; max: number };
  };
};

type GuessParams = {
  guess: Note.Note;
  onCorrect: () => unknown;
  onIncorrect: () => unknown;
};

const useNoteIdentification = ({ fretboardRange }: HookParams) => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [highlightedNote, setHighlightedNote] = useState({
    string: randomInt(
      fretboardRange.strings.min,
      fretboardRange.strings.max + 1
    ),
    fret: randomInt(fretboardRange.frets.min, fretboardRange.frets.max + 1),
  });

  const { timerCount, startTimer, stopTimer } = useTimer({
    seconds: 5,
    onStop: () => console.log('done!'),
  });

  const guess = ({ guess, onCorrect, onIncorrect }: GuessParams) => {
    const realNumber = fretToNoteNumber(
      highlightedNote.string,
      highlightedNote.fret,
      STANDARD_TUNING
    );
    const guessedNumber = Note.toNumber(guess);
    const isCorrect = realNumber === guessedNumber;

    (isCorrect ? onCorrect : onIncorrect)();

    setScore({
      correct: score.correct + (isCorrect ? 1 : 0),
      incorrect: score.incorrect + (!isCorrect ? 1 : 0),
    });
    setHighlightedNote({
      string: randomInt(
        fretboardRange.strings.min,
        fretboardRange.strings.max + 1
      ),
      fret: randomInt(fretboardRange.frets.min, fretboardRange.frets.max + 1),
    });
  };

  return {
    score,
    guess,
    timerCount,
    startTimer,
    stopTimer,
    highlightedNote,
  };
};

export default useNoteIdentification;

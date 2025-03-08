import * as Note from '../types/note';

const FRET_DISTANCE_FACTOR = 1 / 17.817154;

export const STANDARD_TUNING: Note.Note[] = [
  { base: 'E', modifier: null },
  { base: 'B', modifier: null },
  { base: 'G', modifier: null },
  { base: 'D', modifier: null },
  { base: 'A', modifier: null },
  { base: 'E', modifier: null },
];

export const calcRelativeFretDistances = (
  numFrets: number,
  remainingLength: number = 1
): number[] => {
  if (numFrets <= 0) return [];

  const newFretWidth = remainingLength * FRET_DISTANCE_FACTOR;
  const remainingFretboardWidth = remainingLength - newFretWidth;

  return [newFretWidth].concat(
    calcRelativeFretDistances(numFrets - 1, remainingFretboardWidth)
  );
};

export const determineInlay = (fretNum: number) => {
  if (fretNum % 12 == 0 && fretNum != 0) {
    return 'double-dot' as const;
  } else if (
    (fretNum % 12) % 2 == 1 &&
    fretNum % 12 != 11 &&
    fretNum % 12 != 1
  ) {
    return 'single-dot' as const;
  } else {
    return 'none' as const;
  }
};

export const fretToNoteNumber = (
  string: number,
  fret: number,
  tuning: Note.Note[]
) => (Note.toNumber(tuning[string - 1]) + fret) % 12;

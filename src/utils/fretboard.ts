const FRET_DISTANCE_FACTOR = 1 / 17.817154;

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
